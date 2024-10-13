import React from "react";

interface NavigationButtonsProps {
    currentStep: number;
    prevStep: () => void;
    nextStep: () => void;
    skipStep: () => void;
    isValid: boolean;
    isSkippable: boolean;
    isEditing: boolean;
    hasValue: boolean;
}

export const NavigationButtons: React.FC<NavigationButtonsProps> = ({
    currentStep,
    prevStep,
    nextStep,
    skipStep,
    isValid,
    isSkippable,
    isEditing,
    hasValue,
}) => {
    return (
        <div className="flex justify-between mt-4">
            <button
                type="button"
                onClick={prevStep}
                disabled={currentStep === 0}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded disabled:bg-gray-100"
            >
                Previous
            </button>
            {!hasValue && isSkippable && (
                <button
                    type="button"
                    onClick={skipStep}
                    className="px-4 py-2 bg-blue-400 text-white rounded hover:bg-blue-600"
                >
                    Skip
                </button>
            )}
            {isEditing ? (
                <button
                    type="button"
                    onClick={nextStep}
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                    Review Answers
                </button>
            ) : (
                <button
                    type="button"
                    onClick={nextStep}
                    disabled={!isValid}
                    className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 disabled:bg-gray-300"
                >
                    Next
                </button>
            )}
        </div>
    );
};
