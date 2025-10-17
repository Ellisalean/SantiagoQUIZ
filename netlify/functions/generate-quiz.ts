import { GoogleGenAI, Type } from "@google/genai";
import type { Handler } from "@netlify/functions";

// La API Key se lee de forma segura desde las variables de entorno del servidor de Netlify
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

const quizSchema = {
  type: Type.ARRAY,
  items: {
    type: Type.OBJECT,
    properties: {
      question: { type: Type.STRING },
      options: { type: Type.ARRAY, items: { type: Type.STRING } },
      correctAnswer: { type: Type.STRING },
    },
    required: ["question", "options", "correctAnswer"],
  },
};

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { chapter } = JSON.parse(event.body || '{}');

    if (!chapter || typeof chapter !== 'number') {
      return { statusCode: 400, body: JSON.stringify({ error: 'Falta el número del capítulo.' }) };
    }

    const prompt = `Crea un quiz de 10 preguntas de opción múltiple (4 opciones cada una) sobre el capítulo ${chapter} del libro de Santiago de la Biblia. Asegúrate de que las preguntas cubran diferentes temas del capítulo y varíen en dificultad. El idioma debe ser español.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: quizSchema,
      },
    });

    const jsonText = response.text.trim();
    // Validamos que el resultado sea un JSON válido antes de enviarlo
    JSON.parse(jsonText); 
    
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: jsonText,
    };

  } catch (error) {
    console.error("Error en la función de Netlify:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'No se pudo generar el contenido del quiz.' }),
    };
  }
};
