import type { QuizData } from '../types';

export const generateChapterQuiz = async (chapter: number): Promise<QuizData> => {
    try {
        // En lugar de llamar a Gemini directamente, llamamos a nuestra propia función de Netlify.
        // La URL es relativa a la raíz del sitio.
        const response = await fetch('/.netlify/functions/generate-quiz', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ chapter }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || `Error del servidor: ${response.statusText}`);
        }

        const quizData = await response.json();

        if (!Array.isArray(quizData) || quizData.length === 0) {
          throw new Error("La respuesta de la API no es un array de preguntas válido.");
        }

        const firstQuestion = quizData[0];
        if (!firstQuestion.question || !Array.isArray(firstQuestion.options) || !firstQuestion.correctAnswer) {
             throw new Error("La estructura de los datos de la pregunta es incorrecta.");
        }
        
        return quizData as QuizData;
    } catch (error) {
        console.error("Error al llamar a la función de Netlify:", error);
        throw new Error("No se pudo generar el contenido del quiz.");
    }
};
