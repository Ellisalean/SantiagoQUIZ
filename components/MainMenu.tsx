
import React from 'react';
import type { Chapter } from '../types';
import { CHAPTER_THEMES, TOTAL_CHAPTERS } from '../constants';

interface MainMenuProps {
    onChapterSelect: (chapter: Chapter) => void;
    error: string | null;
}

const MainMenu: React.FC<MainMenuProps> = ({ onChapterSelect, error }) => {
    const chapters = Array.from({ length: TOTAL_CHAPTERS }, (_, i) => (i + 1) as Chapter);

    return (
        <div className="bg-slate-900/80 backdrop-blur-sm p-8 rounded-2xl shadow-2xl w-full max-w-4xl text-center border border-slate-700">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">Quiz del Libro de Santiago</h1>
            <p className="text-slate-400 mb-8 text-lg">Selecciona un capítulo para comenzar</p>
            {error && <p className="bg-red-500/20 text-red-300 p-3 rounded-lg mb-6">{error}</p>}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {chapters.map((chapter) => {
                    const theme = CHAPTER_THEMES[chapter];
                    return (
                        <button
                            key={chapter}
                            onClick={() => onChapterSelect(chapter)}
                            className={`p-6 rounded-lg font-bold text-2xl transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-opacity-50 ${theme.buttonBg} ${theme.buttonText} ${theme.buttonHoverBg} focus:ring-cyan-300`}
                        >
                            Capítulo {chapter}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default MainMenu;
