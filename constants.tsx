import type { Chapter, ChapterTheme } from './types';

export const TOTAL_CHAPTERS = 5;

export const CHAPTER_THEMES: Record<Chapter, ChapterTheme> = {
    1: {
        bg: 'bg-slate-800',
        text: 'text-slate-100',
        accent: 'border-cyan-400',
        buttonBg: 'bg-cyan-500',
        buttonHoverBg: 'hover:bg-cyan-600',
        buttonText: 'text-white',
        bgImage: 'https://source.unsplash.com/1600x900/?faith,mountain'
    },
    2: {
        bg: 'bg-teal-800',
        text: 'text-teal-50',
        accent: 'border-emerald-400',
        buttonBg: 'bg-emerald-500',
        buttonHoverBg: 'hover:bg-emerald-600',
        buttonText: 'text-white',
        bgImage: 'https://source.unsplash.com/1600x900/?community,people'
    },
    3: {
        bg: 'bg-indigo-800',
        text: 'text-indigo-100',
        accent: 'border-violet-400',
        buttonBg: 'bg-violet-500',
        buttonHoverBg: 'hover:bg-violet-600',
        buttonText: 'text-white',
        bgImage: 'https://source.unsplash.com/1600x900/?ocean,ship'
    },
    4: {
        bg: 'bg-rose-800',
        text: 'text-rose-50',
        accent: 'border-pink-400',
        buttonBg: 'bg-pink-500',
        buttonHoverBg: 'hover:bg-pink-600',
        buttonText: 'text-white',
        bgImage: 'https://source.unsplash.com/1600x900/?plant,light'
    },
    5: {
        bg: 'bg-amber-800',
        text: 'text-amber-50',
        accent: 'border-yellow-400',
        buttonBg: 'bg-yellow-500',
        buttonHoverBg: 'hover:bg-yellow-600',
        buttonText: 'text-slate-900',
        bgImage: 'https://source.unsplash.com/1600x900/?field,rain'
    }
};