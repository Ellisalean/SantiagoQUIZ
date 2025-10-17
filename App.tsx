
import React, { useState, useCallback } from 'react';
import type { Chapter, QuizData, ViewState } from './types';
import MainMenu from './components/MainMenu';
import QuizView from './components/QuizView';
import LoadingScreen from './components/LoadingScreen';
import { generateChapterQuiz } from './services/geminiService';

const App: React.FC = () => {
    const [view, setView] = useState<ViewState>('menu');
    const [currentChapter, setCurrentChapter] = useState<Chapter | null>(null);
    const [quizData, setQuizData] = useState<QuizData | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleChapterSelect = useCallback(async (chapter: Chapter) => {
        setCurrentChapter(chapter);
        setView('loading');
        setError(null);
        try {
            const data = await generateChapterQuiz(chapter);
            setQuizData(data);
            setView('quiz');
        } catch (e) {
            console.error("Failed to generate quiz:", e);
            setError('No se pudieron generar las preguntas. Por favor, inténtelo de nuevo más tarde.');
            setView('menu');
        }
    }, []);

    const handleReturnToMenu = () => {
        setView('menu');
        setCurrentChapter(null);
        setQuizData(null);
    };

    const renderContent = () => {
        switch (view) {
            case 'loading':
                return <LoadingScreen chapter={currentChapter!} />;
            case 'quiz':
                return <QuizView 
                            chapter={currentChapter!} 
                            quizData={quizData!} 
                            onNextChapter={() => handleChapterSelect((currentChapter! + 1) as Chapter)}
                            onRetry={() => handleChapterSelect(currentChapter!)}
                            onReturnToMenu={handleReturnToMenu} 
                        />;
            case 'menu':
            default:
                return <MainMenu onChapterSelect={handleChapterSelect} error={error} />;
        }
    };

    return (
        <main className="min-h-screen w-full flex items-center justify-center p-4 transition-colors duration-500">
            {renderContent()}
        </main>
    );
};

export default App;
