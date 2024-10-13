import React from "react";
import { UseFormGetValues, UseFormRegister } from "react-hook-form";

import { FormValues, Option } from "@/types/question-config";

interface CheckboxGroupProps {
    id: string;
    register: UseFormRegister<FormValues>;
    getValues: UseFormGetValues<FormValues>;
    options?: Option[];
    validation?: (value: unknown) => boolean | undefined;
    onChange?: () => void;
}

export const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
    id,
    register,
    getValues,
    options,
    validation,
    onChange,
}) => (
    <div>
        {options?.map((option) => (
            <label key={option.value} className="flex items-center space-x-2">
                <input
                    type="checkbox"
                    className="form-checkbox h-5 w-5 text-blue-600"
                    {...register(id, { validate: validation, onChange })}
                    value={option.value}
                    defaultChecked={
                        Array.isArray(getValues(id)) &&
                        getValues(id).includes(option.value)
                    }
                />
                <span className="text-gray-700">{option.label}</span>
            </label>
        ))}
    </div>
);
