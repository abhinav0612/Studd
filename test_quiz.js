import { generateQuizFromText, scoreQuiz } from './src/utils/quizGenerator.js';

const sampleText = `
Mitochondria is the powerhouse of the cell
It produces energy
This is a test document
Without proper punctuation
`;

try {
    const q = generateQuizFromText(sampleText, 5);
    console.log("Quiz generated:", q.length);
} catch (e) {
    console.error("Error:", e.message);
}
