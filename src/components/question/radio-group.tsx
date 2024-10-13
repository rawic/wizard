import React from "react";
import { UseFormRegister } from "react-hook-form";

import { FormValues, Option } from "@/types/question-config";

interface RadioGroupProps {
    id: string;
    register: UseFormRegister<FormValues>;
    required?: boolean;
    options?: Option[];
    onChange?: () => void;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
    id,
    register,
    required,
    options,
    onChange,
}) => {
    return (
        <div>
            {options?.map((option) => (
                <label
                    key={option.value}
                    className="flex items-center space-x-2"
                >
                    <input
                        type="radio"
                        className="form-radio h-5 w-5 text-blue-600"
                        {...register(id, { required, onChange })}
                        value={option.value}
                    />
                    <span className="text-gray-700">{option.label}</span>
                </label>
            ))}
        </div>
    );
};
