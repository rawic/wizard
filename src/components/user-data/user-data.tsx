"use client";

import { useUser } from '@/hooks/use-user';

export const UserData = () => {
    const userData = useUser();

    return (
        <div className="flex flex-col items-center absolute left-4 top-4 bg-slate-50 rounded-md p-4 text-slate-500 min-w-[250px]">
            <div className="font-bold mb-4">User Data</div>
            <ul className="divide-y-[1px] text-sm w-full">
                {Object.entries(userData).map(([key, value]) => (
                    <li key={key} className="py-2">
                        <span className="font-bold">{key}:</span> {value}
                    </li>
                ))}
            </ul>
        </div>
    );
};
