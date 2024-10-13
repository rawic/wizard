"use client";

import { UserData, Wizard } from "@/components";
import { QuestionConfig } from "@/types/question-config";
import { getAnswerValue } from "@/utils/get-answer-value";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const questionConfig: QuestionConfig<any>[] = [
    {
        id: "question1",
        prompt: "Jakie masz obywatelstwo?",
        hint: "Wybierz obywatelstwo",
        type: "dropdown",
        options: [
            { value: "german", label: "Niemieckie" },
            { value: "polish", label: "Polskie" },
            { value: "other", label: "Inne" },
        ],
        required: true,
    },
    {
        id: "question2",
        prompt: "W jakim kraju mieszkasz?",
        hint: "Wybierz kraj zamieszkania",
        type: "dropdown",
        options: [
            { value: "poland", label: "Polska" },
            { value: "germany", label: "Niemcy" },
            { value: "other", label: "Inne" },
        ],
        required: true,
        defaultValue: (answers) => {
            const citizenship = getAnswerValue(answers["question1"]);

            if (citizenship === "polish") return "poland";
            if (citizenship === "german") return "germany";

            return "other";
        },
    },
    {
        id: "question3",
        prompt: "Jak masz na imię?",
        hint: "Podaj swoje imię",
        type: "text",
        required: true,
        defaultValue: (answers, user) => user?.name,
    },
    {
        id: "question4",
        prompt: "Jakie masz zwierzę?",
        hint: "Wybierz zwierzę z listy",
        type: "dropdown",
        options: [
            { value: "dog", label: "Pies" },
            { value: "cat", label: "Kot" },
            { value: "other", label: "Inne" },
        ],
        required: true,
    },
    {
        id: "question5",
        prompt: "Podaj wiek psa",
        hint: "Wiek w latach",
        type: "text",
        required: true,
        validation: (value: number) => value > 0 && value < 20,
        showIf: (answers) => {
            const answerValue = getAnswerValue(answers["question4"]);
            return answerValue === "dog";
        },
    },
    {
        id: "question6",
        prompt: "Jaki jest Twój adres email?",
        hint: "Podaj poprawny adres email",
        type: "text",
        required: true,
        validation: (value: string) => /.+@.+\..+/.test(value),
    },
    {
        id: "question7",
        prompt: "Jakie są Twoje hobby?",
        hint: "Zaznacz wszystkie, które Cię interesują",
        type: "checkbox",
        options: [
            { value: "sport", label: "Sport" },
            { value: "music", label: "Muzyka" },
            { value: "travel", label: "Podróże" },
            { value: "books", label: "Książki" },
        ],
        required: false,
    },
    {
        id: "question8",
        prompt: "Czy placki to Twoje ulubione jedzenie?",
        hint: "Zaznacz tak lub nie",
        type: "radio",
        options: [
            { value: "yes", label: "Tak" },
            { value: "no", label: "Nie" },
        ],
        defaultValue: (answers, user) =>
            user?.favoriteFood === "Placki" ? "yes" : "no",
        required: true,
    },
];

export default function Home() {
    return (
        <>
            <UserData />
            <Wizard questions={questionConfig} />
        </>
    );
}
