import React, { useEffect } from "react";
import { useFormContext } from "react-hook-form";

import { useQuestionLogic } from "@/hooks/use-question";
import { QuestionProps } from "@/types/question-config";

import { CheckboxGroup } from "./checkbox-group";
import { Dropdown } from "./dropdown";
import { RadioGroup } from "./radio-group";
import { TextInput } from "./text-input";

export const Question: React.FC<QuestionProps> = ({
    id,
    prompt,
    hint,
    type,
    options,
    required,
    validation,
    handleManualChange,
}) => {
    const { register, setValue, getValues } = useFormContext();
    const { initializeCheckboxValue } = useQuestionLogic(
        id,
        setValue,
        getValues,
        type
    );

    useEffect(() => {
        initializeCheckboxValue();
    }, [initializeCheckboxValue]);

    return (
        <div className="question mb-6">
            <label className="block text-lg font-medium text-gray-700 mb-2">
                {prompt}
            </label>
            {hint && <p className="text-sm text-gray-500 mb-2">{hint}</p>}

            {type === "text" && (
                <TextInput
                    id={id}
                    register={register}
                    required={required}
                    validation={validation}
                    onChange={() => handleManualChange(id)}
                />
            )}
            {type === "dropdown" && (
                <Dropdown
                    id={id}
                    register={register}
                    required={required}
                    options={options}
                    onChange={() => handleManualChange(id)}
                />
            )}
            {type === "checkbox" && (
                <CheckboxGroup
                    id={id}
                    register={register}
                    getValues={getValues}
                    options={options}
                    validation={validation}
                    onChange={() => handleManualChange(id)}
                />
            )}
            {type === "radio" && (
                <RadioGroup
                    id={id}
                    register={register}
                    required={required}
                    options={options}
                    onChange={() => handleManualChange(id)}
                />
            )}
        </div>
    );
};
