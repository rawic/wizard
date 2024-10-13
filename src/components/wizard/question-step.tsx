import React from "react";

import { QuestionConfig } from "@/types/question-config";

import { Question } from "../question";
import { NavigationButtons } from "./navigation-buttons";

interface QuestionStepProps {
    question: QuestionConfig;
    currentStep: number;
    index: number;
    prevStep: () => void;
    nextStep: () => void;
    skipStep: () => void;
    isValid: boolean;
    isEditing: boolean;
    isLastStep: boolean;
    handleSummary: () => void;
    totalSteps: number;
    handleManualChange: (questionId: string) => void;
    hasValue: boolean;
}

export const QuestionStep: React.FC<QuestionStepProps> = ({
    question,
    currentStep,
    index,
    prevStep,
    nextStep,
    skipStep,
    isValid,
    isEditing,
    isLastStep,
    handleSummary,
    totalSteps,
    handleManualChange,
    hasValue,
}) => {
    if (index !== currentStep) return null;

    return (
        <div>
            <Question
                id={question.id}
                prompt={question.prompt}
                hint={question.hint}
                type={question.type}
                options={question.options}
                required={question.required}
                validation={question.validation}
                handleManualChange={handleManualChange}
            />
            <NavigationButtons
                currentStep={currentStep}
                prevStep={prevStep}
                nextStep={isLastStep ? handleSummary : nextStep}
                skipStep={skipStep}
                isValid={isValid}
                isSkippable={!question.required}
                isEditing={isEditing}
                hasValue={hasValue}
            />
            <p className="mt-4 text-sm text-gray-500">
                Step {currentStep + 1} of {totalSteps}
            </p>
        </div>
    );
};
