
import React from 'react';
import type { Chapter, ChapterTheme } from '../types';
import { TOTAL_CHAPTERS } from '../constants';
import HomeIcon from './icons/HomeIcon';
import RedoIcon from './icons/RedoIcon';
import ArrowRightIcon from './icons/ArrowRightIcon';

interface EndScreenProps {
    chapter: Chapter;
    theme: ChapterTheme;
    onNextChapter: () => void;
    onRetry: () => void;
    onReturnToMenu: () => void;
}

const EndScreen: React.FC<EndScreenProps> = ({ chapter, theme, onNextChapter, onRetry, onReturnToMenu }) => {
    const isLastChapter = chapter === TOTAL_CHAPTERS;

    return (
        <div className="flex flex-col items-center justify-center text-center h-full animate-fade-in">
            <h2 className="text-4xl font-bold mb-4">¡Capítulo {chapter} Completado!</h2>
            <p className="text-xl opacity-80 mb-10">¿Qué te gustaría hacer ahora?</p>
            <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
                <button 
                    onClick={onReturnToMenu}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-lg font-bold bg-slate-600/50 hover:bg-slate-500/50 transition-colors`}>
                    <HomeIcon /> Menú Principal
                </button>
                <button 
                    onClick={onRetry}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-lg font-bold ${theme.buttonBg} ${theme.buttonText} ${theme.buttonHoverBg} transition-transform transform hover:scale-105 shadow-lg`}>
                    <RedoIcon /> Volver a Intentar
                </button>
            </div>
            {!isLastChapter && (
                 <button 
                    onClick={onNextChapter}
                    className={`w-full max-w-md mt-4 flex items-center justify-center gap-2 py-3 px-6 rounded-lg font-bold border-2 ${theme.accent} text-white hover:bg-white/10 transition-colors`}>
                    Siguiente Capítulo <ArrowRightIcon />
                </button>
            )}
        </div>
    );
};

export default EndScreen;
