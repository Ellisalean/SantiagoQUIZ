
import React from 'react';
import type { Question, ChapterTheme } from '../types';

interface QuestionSlideProps {
    question: Question;
    questionNumber: number;
    totalQuestions: number;
    selectedAnswer: string | null;
    onAnswerSelect: (answer: string) => void;
    theme: ChapterTheme;
}

const QuestionSlide: React.FC<QuestionSlideProps> = ({ question, questionNumber, totalQuestions, selectedAnswer, onAnswerSelect, theme }) => {
    
    const getButtonClass = (option: string) => {
        if (selectedAnswer === null) {
            return `bg-slate-700/50 hover:bg-slate-600/50`;
        }

        const isCorrect = option === question.correctAnswer;
        const isSelected = option === selectedAnswer;

        if (isCorrect) {
            return 'bg-green-500 text-white scale-105 ring-2 ring-white';
        }
        if (isSelected && !isCorrect) {
            return 'bg-red-500 text-white';
        }
        return 'bg-slate-800/30 opacity-60';
    };

    return (
        <div className="flex flex-col items-center justify-center text-center h-full">
            <p className="font-semibold mb-4 opacity-80">{`Pregunta ${questionNumber} de ${totalQuestions}`}</p>
            <h2 className={`text-2xl md:text-3xl font-bold mb-8 border-b-4 ${theme.accent} pb-4`}>
                {question.question}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl">
                {question.options.map((option, index) => (
                    <button
                        key={index}
                        onClick={() => onAnswerSelect(option)}
                        disabled={selectedAnswer !== null}
                        className={`p-4 rounded-lg text-lg font-medium transition-all duration-300 transform ${getButtonClass(option)} ${selectedAnswer === null ? 'cursor-pointer' : 'cursor-not-allowed'}`}
                    >
                        {option}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default QuestionSlide;
