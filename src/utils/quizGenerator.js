// Simple Quiz Generator Utility
// Generates quiz questions from text using pattern matching and NLP-like techniques

export const generateQuizFromText = (text, numberOfQuestions = 10) => {
    if (!text || text.trim().length === 0) {
        throw new Error('Please provide some text');
    }

    // Clean and split text into sentences
    const sentences = text
        .replace(/\n\n+/g, '. ')
        .split(/[.!?]+/)
        .map(s => s.trim())
        .filter(s => s.length > 10);

    if (sentences.length < 3) {
        throw new Error('Please provide more text to generate questions');
    }

    const questions = [];

    // Question Type 1: Definition/Fill in the blank
    const nounPhrases = extractKeyPhrases(text);
    nounPhrases.slice(0, Math.ceil(numberOfQuestions / 3)).forEach(phrase => {
        const sentence = sentences.find(s => s.toLowerCase().includes(phrase.toLowerCase()));
        if (sentence) {
            const options = generateOptions(phrase, text);
            questions.push({
                type: 'multiple-choice',
                question: `What does "${phrase}" refer to in the context provided?`,
                options: options,
                correct: 0,
                explanation: sentence.substring(0, 150) + '...'
            });
        }
    });

    // Question Type 2: True/False about main ideas
    sentences.slice(0, Math.ceil(numberOfQuestions / 3)).forEach(sentence => {
        if (sentence.length > 20) {
            questions.push({
                type: 'true-false',
                question: sentence.substring(0, 120) + '?',
                correct: true,
                explanation: 'This statement is directly from the provided text.'
            });
        }
    });

    // Question Type 3: Short answer based on context
    const keywords = extractKeywords(text);
    keywords.slice(0, Math.ceil(numberOfQuestions / 3)).forEach(keyword => {
        questions.push({
            type: 'short-answer',
            question: `Explain the significance of "${keyword}" based on the provided text.`,
            hints: [`Look for mentions of "${keyword}" in the text`, 'Consider the context around this term'],
            correct_answer: `[Student should provide an answer mentioning how ${keyword} is used in the context]`
        });
    });

    return questions.slice(0, numberOfQuestions).map((q, idx) => ({
        ...q,
        id: idx + 1
    }));
};

// Extract key noun phrases from text
const extractKeyPhrases = (text) => {
    // Simple extraction of capitalized phrases and important terms
    const phrases = [];
    const words = text.split(/\s+/);
    
    for (let i = 0; i < words.length - 1; i++) {
        const phrase = words.slice(i, i + 2).join(' ');
        if (phrase.length > 5 && /[A-Z]/.test(phrase[0])) {
            phrases.push(phrase);
        }
    }

    return [...new Set(phrases)].slice(0, 10);
};

// Extract important keywords
const extractKeywords = (text) => {
    const stopWords = new Set([
        'the', 'a', 'an', 'and', 'or', 'but', 'is', 'are', 'was', 'were',
        'be', 'been', 'being', 'have', 'has', 'had', 'do', 'does', 'did',
        'will', 'would', 'could', 'should', 'may', 'might', 'must', 'can',
        'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'from', 'up',
        'about', 'into', 'through', 'during', 'which', 'that', 'this', 'these'
    ]);

    const words = text.toLowerCase()
        .split(/\s+/)
        .filter(word => {
            const cleaned = word.replace(/[^\w]/g, '');
            return cleaned.length > 3 && !stopWords.has(cleaned);
        });

    const frequency = {};
    words.forEach(word => {
        frequency[word] = (frequency[word] || 0) + 1;
    });

    return Object.entries(frequency)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10)
        .map(([word]) => word);
};

// Generate multiple choice options
const generateOptions = (correct, text) => {
    const options = [correct];
    
    // Generate plausible wrong answers by extracting similar phrases
    const phrases = extractKeyPhrases(text);
    phrases.forEach(phrase => {
        if (phrase !== correct && options.length < 4) {
            options.push(phrase);
        }
    });

    // Shuffle if we have enough options
    while (options.length < 4) {
        options.push(`Incorrect Option ${options.length}`);
    }

    return options.sort(() => Math.random() - 0.5);
};

// Score quiz responses
export const scoreQuiz = (responses, questions) => {
    let score = 0;
    const results = responses.map((response, idx) => {
        const question = questions[idx];
        let isCorrect = false;

        if (question.type === 'true-false') {
            isCorrect = response === question.correct;
        } else if (question.type === 'multiple-choice') {
            isCorrect = response === question.correct;
        } else if (question.type === 'short-answer') {
            // For short answers, we'd need backend evaluation
            isCorrect = response.length > 10; // Simple heuristic
        }

        if (isCorrect) score++;

        return {
            questionId: question.id,
            correct: isCorrect,
            userResponse: response,
            explanation: question.explanation
        };
    });

    return {
        score,
        total: questions.length,
        percentage: Math.round((score / questions.length) * 100),
        results
    };
};
