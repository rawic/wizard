import { useCallback, useEffect, useState } from "react";
import { FieldValues, UseFormReturn } from "react-hook-form";

import { FormValues, QuestionConfig } from "@/types/question-config";

import { useUser } from "./use-user";
import { useVisibleQuestions } from "./use-visible-questions";

export const useWizard = (
    methods: UseFormReturn<FieldValues>,
    questions: QuestionConfig[]
) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [isSummary, setIsSummary] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [skippedQuestions, setSkippedQuestions] = useState<Set<string>>(
        new Set()
    );

    const [manuallyChanged, setManuallyChanged] = useState<Set<string>>(
        new Set()
    );

    const user = useUser();
    const { getValues, setValue, watch, reset, formState } = methods;
    const answers = watch();
    const visibleQuestions = useVisibleQuestions(questions, answers);

    const { isValid } = formState;

    const handleManualChange = (questionId: string) => {
        setManuallyChanged((prev) => new Set(prev).add(questionId));
    };

    useEffect(() => {
        const updatedAnswers = getValues();

        visibleQuestions.forEach((question) => {
            const currentVal = updatedAnswers[question.id];

            if (!manuallyChanged.has(question.id)) {
                if (question.type === "checkbox") {
                    if (!Array.isArray(currentVal)) {
                        setValue(question.id, [], { shouldValidate: true });
                    }
                } else if (question.defaultValue) {
                    const defaultVal = question.defaultValue(
                        updatedAnswers,
                        user
                    );

                    if (defaultVal !== currentVal) {
                        setValue(question.id, defaultVal ?? "", {
                            shouldValidate: true,
                        });
                    }
                }
            }
        });
    }, [answers, visibleQuestions, getValues, setValue, user, manuallyChanged]);

    const nextStep = useCallback(() => {
        if (isEditing) {
            const firstUnansweredStep = visibleQuestions.findIndex(
                (question) => {
                    const answer = getValues()[question.id];
                    return (
                        !skippedQuestions.has(question.id) &&
                        (answer === undefined || answer === "")
                    );
                }
            );

            if (firstUnansweredStep !== -1) {
                setCurrentStep(firstUnansweredStep);
            } else {
                setIsSummary(true);
                setIsEditing(false);
            }
        } else {
            setCurrentStep((prev) =>
                Math.min(prev + 1, visibleQuestions.length - 1)
            );
        }
    }, [isEditing, getValues, skippedQuestions, visibleQuestions]);

    const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

    const skipCurrentStep = () => {
        const currentQuestion = visibleQuestions[currentStep];
        if (currentQuestion) {
            setSkippedQuestions((prev) =>
                new Set(prev).add(currentQuestion.id)
            );
            nextStep();
        }
    };

    const handleSummary = () => {
        const firstUnansweredStep = visibleQuestions.findIndex((question) => {
            const answer = getValues()[question.id];
            return (
                !skippedQuestions.has(question.id) &&
                (answer === undefined || answer === "")
            );
        });

        if (firstUnansweredStep !== -1) {
            setCurrentStep(firstUnansweredStep);
        } else {
            setIsSummary(true);
        }
    };

    const handleSubmitWizard = (data: FormValues) => {
        const filteredData = Object.entries(data).reduce(
            (acc, [key, value]) => {
                if (
                    value !== undefined &&
                    value !== null &&
                    (typeof value !== "string" || value.trim() !== "") &&
                    (!Array.isArray(value) || value.length > 0)
                ) {
                    acc[key] = value;
                }
                return acc;
            },
            {} as FormValues
        );

        console.log("Final filtered data:", filteredData);
        reset(data);
    };

    const handleEditQuestion = (index: number) => {
        setCurrentStep(index);
        setIsSummary(false);
        setIsEditing(true);
    };

    return {
        currentStep,
        visibleQuestions,
        isSummary,
        isValid,
        isEditing,
        nextStep,
        prevStep,
        skipCurrentStep,
        handleSummary,
        handleSubmitWizard,
        handleEditQuestion,
        answers,
        handleManualChange,
    };
};
