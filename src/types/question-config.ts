export type QuestionType = "text" | "dropdown" | "checkbox" | "radio";

export interface Option {
    value: string;
    label: string;
}

export interface QuestionConfig<T = unknown> {
    id: string;
    prompt: string;
    hint?: string;
    type: QuestionType;
    options?: Option[];
    required: boolean;
    validation?: (value: T) => boolean;
    showIf?: (answers: FormValuesFromQuestions<QuestionConfig[]>) => boolean;
    defaultValue?: (
        answers: FormValuesFromQuestions<QuestionConfig[]>,
        user: Record<string, unknown>
    ) => T;
}

export interface QuestionProps extends Omit<QuestionConfig, "options"> {
    options?: Option[];
    handleManualChange: (questionId: string) => void;
}

export type FormValuesFromQuestions<T extends QuestionConfig[]> = {
    [K in T[number]["id"]]: T[number] extends { type: "checkbox" }
        ? string[]
        : T[number] extends { type: "dropdown" | "radio" }
        ? { value: string; label: string } | null
        : string;
};

export type FormValues = FormValuesFromQuestions<QuestionConfig[]>;
