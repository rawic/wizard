import React from "react";
import { UseFormRegister } from "react-hook-form";

import { FormValues } from "@/types/question-config";

interface TextInputProps {
    id: string;
    register: UseFormRegister<FormValues>;
    required?: boolean;
    validation?: (value: unknown) => boolean | undefined;
    onChange?: () => void;
}

export const TextInput: React.FC<TextInputProps> = ({
    id,
    register,
    required,
    validation,
    onChange,
}) => (
    <input
        type="text"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        {...register(id, { required, validate: validation, onChange })}
    />
);
