import { useMemo } from "react";

import { FormValues, QuestionConfig } from "@/types/question-config";

export const useVisibleQuestions = (
    questions: QuestionConfig[],
    answers: FormValues
): QuestionConfig[] => {
    return useMemo(
        () =>
            questions.filter(
                (question) => !question.showIf || question.showIf(answers)
            ),
        [questions, answers]
    );
};
