import React from "react";
import { useFormContext } from "react-hook-form";

import {
    FormValuesFromQuestions,
    QuestionConfig,
} from "@/types/question-config";
import { getLabelFromValue } from "@/utils/get-label-from-value";

interface SummaryProps {
    questions: QuestionConfig[];
    answers: FormValuesFromQuestions<QuestionConfig[]>;
    handleEdit: (index: number) => void;
}

export const Summary: React.FC<SummaryProps> = ({
    questions,
    answers,
    handleEdit,
}) => {
    const { formState } = useFormContext();
    const { isSubmitSuccessful, isDirty, isSubmitting } = formState;

    return (
        <div>
            <h2 className="text-lg font-semibold mb-4">Summary</h2>
            <ul className="space-y-2">
                {questions.map((question, index) => {
                    const answer = answers[question.id];

                    const renderedAnswer = Array.isArray(answer)
                        ? answer
                              .map((ans) =>
                                  getLabelFromValue(ans, question.options)
                              )
                              .join(", ")
                        : getLabelFromValue(answer, question.options);

                    return (
                        <li key={question.id} className="border-b pb-2">
                            <strong>{question.prompt}</strong>:{" "}
                            {renderedAnswer ? renderedAnswer : "N/A"}
                            <button
                                type="button"
                                onClick={() => handleEdit(index)}
                                className="ml-4 text-blue-500 hover:underline"
                            >
                                Edit
                            </button>
                        </li>
                    );
                })}
            </ul>
            <div className="flex items-center gap-x-4 mt-6">
                <button
                    type="submit"
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                    Submit
                </button>
                {isSubmitSuccessful && !isSubmitting && !isDirty && (
                    <p className="text-sm text-gray-500">Check the console!</p>
                )}
            </div>
        </div>
    );
};
