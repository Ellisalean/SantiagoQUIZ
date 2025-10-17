export type Chapter = 1 | 2 | 3 | 4 | 5;

export type ViewState = 'menu' | 'loading' | 'quiz';

export interface Question {
    question: string;
    options: string[];
    correctAnswer: string;
}

export type QuizData = Question[];

export interface ChapterTheme {
    bg: string;
    text: string;
    accent: string;
    buttonBg: string;
    buttonHoverBg: string;
    buttonText: string;
    bgImage: string;
}