export const getLabelFromValue = (
    value: string | boolean,
    options?: { value: string | boolean; label: string }[]
): string => {
    if (!options) return String(value);
    const option = options.find((opt) => opt.value === value);
    return option ? option.label : String(value);
};
