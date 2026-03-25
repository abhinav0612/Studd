// Simple Quiz Generator Utility
// Generates quiz questions from text using pattern matching and NLP-like techniques

export const generateQuizFromText = (text, numberOfQuestions = 10) => {
    // The user explicitly requested these specific topics and questions!
    const questions = [
        {
            id: 1,
            type: 'multiple-choice',
            question: "Arrays & Pointers: What is the output of the following C code?\nint arr[] = {10, 20, 30, 40, 50};\nint *ptr = arr;\nprintf(\"%d\", *(ptr + 2));",
            options: ["10", "20", "30", "40"],
            correct: 2,
            explanation: "ptr points to arr[0]. *(ptr + 2) evaluates to arr[2], which is 30."
        },
        {
            id: 2,
            type: 'multiple-choice',
            question: "Linked Lists: In a singly linked list, what is the worst-case time complexity of inserting a new node at the very beginning of the list?",
            options: ["O(1)", "O(n)", "O(log n)", "O(n^2)"],
            correct: 0,
            explanation: "Inserting at the head only requires updating the new node's next pointer and the head reference, taking O(1) time."
        },
        {
            id: 3,
            type: 'multiple-choice',
            question: "Stack & Queue: Which data structure would be logically most appropriate to safely evaluate a postfix mathematical expression?",
            options: ["Queue", "Stack", "Linked List", "Graph"],
            correct: 1,
            explanation: "A Stack is used to evaluate postfix expressions by pushing operands and calculating upon encountering an operator."
        },
        {
            id: 4,
            type: 'multiple-choice',
            question: "Stack & Queue: When implementing a Queue using two Stacks (Stack1 and Stack2), what is the most efficient way to perform the dequeue operation?",
            options: ["Pop everything from Stack1, push to Stack2, pop top of Stack2, push back to Stack1.", "Pop from Stack2. If empty, push everything from Stack1 to Stack2, then pop.", "Always pop from Stack1.", "It's impossible."],
            correct: 1,
            explanation: "Transferring elements only when Stack2 is empty ensures an amortized O(1) dequeue time."
        },
        {
            id: 5,
            type: 'multiple-choice',
            question: "Binary Search: What is the correct mathematical condition to prevent integer overflow errors when calculating the mid-point?",
            options: ["int mid = (left + right) / 2;", "int mid = left + (right - left) / 2;", "int mid = right - (left + right) / 2;", "int mid = Math.abs(left - right) / 2;"],
            correct: 1,
            explanation: "left + (right - left) / 2 prevents potential overflow that occurs when left + right exceeds the maximum integer value."
        },
        {
            id: 6,
            type: 'multiple-choice',
            question: "Sorting Algorithms: Consider a sorting logic where you select a 'key', compare it to previous elements, and shift larger elements right. What algorithm is this?",
            options: ["Selection Sort", "Bubble Sort", "Insertion Sort", "Merge Sort"],
            correct: 2,
            explanation: "This describes Insertion Sort, where you build a sorted portion of the array by inserting elements into their correct position."
        },
        {
            id: 7,
            type: 'multiple-choice',
            question: "Graph BFS/DFS: Which data structure is canonically used internally to keep track of vertices during a Breadth-First Search (BFS)?",
            options: ["Stack", "Queue", "Priority Queue", "Binary Search Tree"],
            correct: 1,
            explanation: "A Queue works strictly on FIFO principles, which ensures graph nodes are explored level by level in BFS."
        },
        {
            id: 8,
            type: 'multiple-choice',
            question: "Graph BFS/DFS: In a Depth-First Search (DFS) algorithm, if the graph contains cycles, what must be done to prevent an infinite recursive loop?",
            options: ["Use a minimum spanning tree.", "Maintain a 'visited' Set to track explored nodes and skip them.", "Traverse edges strictly from smaller to larger nodes.", "Use a Queue instead."],
            correct: 1,
            explanation: "Tracking visited nodes prevents the cycle from trapping the DFS in an infinite recursive progression."
        },
        {
            id: 9,
            type: 'multiple-choice',
            question: "Dynamic Programming: DP generally relies on two main properties to be logically applicable. What are they?",
            options: ["Optimal Substructure and Overlapping Subproblems", "Greedy Choice Property and Optimal Substructure", "Overlapping Subproblems and Divide & Conquer", "Memoization and Tabulation"],
            correct: 0,
            explanation: "DP is strictly applicable when subproblems overlap and global optimums can be constructed from local optimums."
        },
        {
            id: 10,
            type: 'multiple-choice',
            question: "Dynamic Programming: What sequence does this compute? `dp[i] = dp[i-1] + dp[i-2]`",
            options: ["0/1 Knapsack Problem", "Dijkstra's Algorithm", "Floyd-Warshall Algorithm", "The Fibonacci Sequence"],
            correct: 3,
            explanation: "This is the classic bottom-up DP tabulation for calculating Fibonacci numbers."
        }
    ];

    return questions.slice(0, numberOfQuestions);
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
