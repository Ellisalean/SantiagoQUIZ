
import { GoogleGenAI, Type } from "@google/genai";
import type { QuizData } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

const quizSchema = {
  type: Type.ARRAY,
  items: {
    type: Type.OBJECT,
    properties: {
      question: {
        type: Type.STRING,
        description: 'La pregunta del quiz, en español.',
      },
      options: {
        type: Type.ARRAY,
        items: {
          type: Type.STRING,
        },
        description: 'Un array de 4 posibles respuestas en string.',
      },
      correctAnswer: {
        type: Type.STRING,
        description: 'El texto exacto de la respuesta correcta de entre las opciones.',
      },
    },
    required: ["question", "options", "correctAnswer"],
  },
};

export const generateChapterQuiz = async (chapter: number): Promise<QuizData> => {
    const prompt = `Crea un quiz de 10 preguntas de opción múltiple (4 opciones cada una) sobre el capítulo ${chapter} del libro de Santiago de la Biblia. Asegúrate de que las preguntas cubran diferentes temas del capítulo y varíen en dificultad. El idioma debe ser español.`;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: quizSchema,
            },
        });

        const jsonText = response.text.trim();
        const quizData = JSON.parse(jsonText);
        
        if (!Array.isArray(quizData) || quizData.length === 0) {
          throw new Error("La respuesta de la API no es un array de preguntas válido.");
        }

        // Validate structure of first question as a sample
        const firstQuestion = quizData[0];
        if (!firstQuestion.question || !Array.isArray(firstQuestion.options) || !firstQuestion.correctAnswer) {
             throw new Error("La estructura de los datos de la pregunta es incorrecta.");
        }
        
        return quizData as QuizData;
    } catch (error) {
        console.error("Error al generar el quiz con Gemini:", error);
        throw new Error("No se pudo generar el contenido del quiz.");
    }
};
