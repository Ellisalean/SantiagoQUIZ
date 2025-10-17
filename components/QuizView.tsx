import React, { useState, useMemo } from 'react';
import type { Chapter, QuizData } from '../types';
import { CHAPTER_THEMES, TOTAL_CHAPTERS } from '../constants';
import QuestionSlide from './QuestionSlide';
import EndScreen from './EndScreen';
import ArrowLeftIcon from './icons/ArrowLeftIcon';
import ArrowRightIcon from './icons/ArrowRightIcon';


interface QuizViewProps {
    chapter: Chapter;
    quizData: QuizData;
    onNextChapter: () => void;
    onRetry: () => void;
    onReturnToMenu: () => void;
}

const QuizView: React.FC<QuizViewProps> = ({ chapter, quizData, onNextChapter, onRetry, onReturnToMenu }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState<(string | null)[]>(Array(quizData.length).fill(null));

    const theme = useMemo(() => CHAPTER_THEMES[chapter], [chapter]);
    const isEndScreen = currentQuestionIndex === quizData.length;

    const handleAnswerSelect = (answer: string) => {
        if (userAnswers[currentQuestionIndex] === null) {
            const newAnswers = [...userAnswers];
            newAnswers[currentQuestionIndex] = answer;
            setUserAnswers(newAnswers);
        }
    };
    
    const handleNext = () => {
      if (currentQuestionIndex < quizData.length) {
            setCurrentQuestionIndex(prev => prev + 1);
        }
    };

    const handlePrev = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(prev => prev - 1);
        }
    };

    return (
        <div 
            className={`${theme.text} w-full max-w-4xl min-h-[600px] rounded-2xl shadow-2xl p-6 md:p-10 flex flex-col relative overflow-hidden isolate transition-all duration-500`}
            style={{
                backgroundImage: `url(${theme.bgImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <div className={`absolute inset-0 ${theme.bg} opacity-90 -z-10 rounded-2xl`}></div>
            {/* Navigation Arrows */}
            {!isEndScreen && (
                <>
                    {currentQuestionIndex > 0 && (
                        <button onClick={handlePrev} className={`absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full ${theme.buttonBg} ${theme.buttonHoverBg} ${theme.buttonText} transition-opacity opacity-70 hover:opacity-100`}>
                            <ArrowLeftIcon />
                        </button>
                    )}
                    {currentQuestionIndex < quizData.length -1 && userAnswers[currentQuestionIndex] !== null && (
                         <button onClick={handleNext} className={`absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full ${theme.buttonBg} ${theme.buttonHoverBg} ${theme.buttonText} transition-opacity opacity-70 hover:opacity-100 animate-pulse`}>
                            <ArrowRightIcon />
                        </button>
                    )}
                </>
            )}
            
            <div className="flex-grow flex flex-col justify-center">
                 {isEndScreen ? (
                     <EndScreen 
                        chapter={chapter}
                        onNextChapter={onNextChapter}
                        onRetry={onRetry}
                        onReturnToMenu={onReturnToMenu}
                        theme={theme}
                     />
                 ) : (
                    <QuestionSlide 
                        question={quizData[currentQuestionIndex]}
                        questionNumber={currentQuestionIndex + 1}
                        totalQuestions={quizData.length}
                        selectedAnswer={userAnswers[currentQuestionIndex]}
                        onAnswerSelect={handleAnswerSelect}
                        theme={theme}
                    />
                 )}
            </div>
            
            {/* Progress Bar & Final Slide Button */}
             <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-11/12 md:w-4/5">
                {!isEndScreen && userAnswers[currentQuestionIndex] !== null && currentQuestionIndex === quizData.length -1 && (
                     <button 
                        onClick={handleNext}
                        className={`w-full py-3 px-6 rounded-lg font-bold ${theme.buttonBg} ${theme.buttonText} ${theme.buttonHoverBg} transition-transform transform hover:scale-105 shadow-lg animate-pulse`}>
                         Ver Resultados
                    </button>
                 )}
                 {!isEndScreen && (
                    <div className="w-full bg-slate-700/50 rounded-full h-2.5 mt-4">
                        <div className={`${theme.buttonBg} h-2.5 rounded-full`} style={{ width: `${((currentQuestionIndex + 1) / quizData.length) * 100}%` }}></div>
                    </div>
                 )}
            </div>
        </div>
    );
};

export default QuizView;