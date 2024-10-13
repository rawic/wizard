"use client";

import React from "react";
import { FormProvider, useForm } from "react-hook-form";

import { useWizard } from "@/hooks/use-wizard";
import { FormValues } from "@/types/question-config";

import { QuestionStep } from "./question-step";
import { Summary } from "./summary";
import { WizardProps } from "./types";

export const Wizard: React.FC<WizardProps> = ({ questions }) => {
    const methods = useForm<FormValues>({ mode: "onChange" });

    const {
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
        handleManualChange,
        handleEditQuestion,
        answers,
    } = useWizard(methods, questions);

    const isLastStep = currentStep === visibleQuestions.length - 1;
    const currentQuestion = visibleQuestions[currentStep];
    const currentAnswer = methods.watch(currentQuestion.id);

    const hasValue = Array.isArray(currentAnswer)
        ? currentAnswer.length > 0
        : Boolean(currentAnswer);

    return (
        <FormProvider {...methods}>
            <form
                onSubmit={methods.handleSubmit(handleSubmitWizard)}
                className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-lg w-full"
            >
                {!isSummary ? (
                    <div className="space-y-6">
                        {visibleQuestions.map((question, index) => (
                            <QuestionStep
                                key={question.id}
                                question={question}
                                currentStep={currentStep}
                                index={index}
                                prevStep={prevStep}
                                nextStep={nextStep}
                                skipStep={skipCurrentStep}
                                isValid={isValid}
                                isEditing={isEditing}
                                isLastStep={isLastStep}
                                handleSummary={handleSummary}
                                totalSteps={visibleQuestions.length}
                                handleManualChange={handleManualChange}
                                hasValue={hasValue}
                            />
                        ))}
                    </div>
                ) : (
                    <Summary
                        questions={visibleQuestions}
                        answers={answers}
                        handleEdit={handleEditQuestion}
                    />
                )}
            </form>
        </FormProvider>
    );
};
