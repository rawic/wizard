import { useCallback } from "react";
import {
    FieldValues,
    UseFormGetValues,
    UseFormSetValue,
} from "react-hook-form";

import { FormValues } from "@/types/question-config";

export const useQuestionLogic = (
    id: string,
    setValue: UseFormSetValue<FieldValues>,
    getValues: UseFormGetValues<FormValues>,
    type: string
) => {
    const initializeCheckboxValue = useCallback(() => {
        if (type === "checkbox" && getValues(id) === undefined) {
            setValue(id, []);
        }
    }, [id, setValue, getValues, type]);

    return { initializeCheckboxValue };
};
