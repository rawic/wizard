export function getAnswerValue(
    answer: string | { value: string; label: string } | undefined
): string | undefined {
    if (typeof answer === "object" && answer !== null && "value" in answer) {
        return answer.value;
    }
    return typeof answer === "string" ? answer : undefined;
}
