import React from 'react';
import type { Chapter } from '../types';
import { CHAPTER_THEMES } from '../constants';

interface LoadingScreenProps {
    chapter: Chapter;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ chapter }) => {
    const theme = CHAPTER_THEMES[chapter];

    return (
        <div 
            className={`w-full max-w-4xl min-h-[600px] rounded-2xl shadow-2xl p-10 flex flex-col items-center justify-center relative overflow-hidden isolate transition-all duration-500 ${theme.text}`}
            style={{
                backgroundImage: `url(${theme.bgImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <div className={`absolute inset-0 ${theme.bg} opacity-90 -z-10 rounded-2xl`}></div>
            <div className={`w-16 h-16 border-4 ${theme.accent} border-t-transparent rounded-full animate-spin mb-6`}></div>
            <h2 className="text-3xl font-bold mb-2">Quiz para el Capítulo {chapter}</h2>
            <p className="text-lg opacity-80">Prepárate...</p>
        </div>
    );
};

export default LoadingScreen;
