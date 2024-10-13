import React from "react";
import { UseFormRegister } from "react-hook-form";

import { FormValues, Option } from "@/types/question-config";

interface DropdownProps {
    id: string;
    register: UseFormRegister<FormValues>;
    required?: boolean;
    options?: Option[];
    onChange?: () => void;
}

export const Dropdown: React.FC<DropdownProps> = ({
    id,
    register,
    required,
    options,
    onChange,
}) => (
    <select
        {...register(id, { required, onChange })}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
        <option value="">Select an option</option>
        {options?.map((option) => (
            <option key={option.value} value={option.value}>
                {option.label}
            </option>
        ))}
    </select>
);
