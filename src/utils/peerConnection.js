// Peer Connection Utility
// Handles finding, connecting with, and managing study partners

export const recommendPeers = (currentUserInterests, allUsers) => {
    // Calculate similarity score between users based on interests
    return allUsers
        .map(user => ({
            ...user,
            compatibilityScore: calculateCompatibility(currentUserInterests, user.interests),
            commonInterests: findCommonInterests(currentUserInterests, user.interests)
        }))
        .filter(user => user.compatibilityScore > 0)
        .sort((a, b) => b.compatibilityScore - a.compatibilityScore);
};

const calculateCompatibility = (interests1, interests2) => {
    if (!interests1 || !interests2) return 0;
    
    const common = interests1.filter(i => 
        interests2.some(j => j.toLowerCase() === i.toLowerCase())
    );
    
    const total = new Set([...interests1, ...interests2]).size;
    return total > 0 ? Math.round((common.length / total) * 100) : 0;
};

const findCommonInterests = (interests1, interests2) => {
    if (!interests1 || !interests2) return [];
    
    return interests1.filter(i => 
        interests2.some(j => j.toLowerCase() === i.toLowerCase())
    );
};

// Connection request management
export const createConnectionRequest = (fromUser, toUser) => {
    return {
        id: Date.now(),
        from: fromUser.id,
        to: toUser.id,
        fromUser,
        toUser,
        status: 'pending', // pending, accepted, rejected
        createdAt: new Date().toISOString(),
        message: `${fromUser.name} wants to study together!`
    };
};

// Study session coordination
export const createStudySession = (participants, topic, startTime, duration = 60) => {
    return {
        id: Date.now(),
        participants: participants.map(p => ({
            id: p.id,
            name: p.name,
            role: 'participant'
        })),
        topic,
        startTime,
        duration,
        status: 'scheduled', // scheduled, ongoing, completed
        createdAt: new Date().toISOString(),
        maxParticipants: 10,
        currentParticipants: participants.length,
        resources: []
    };
};

// Mock peer data generator
export const generateMockPeers = () => {
    const interests = [
        ['Machine Learning', 'Python', 'Data Science'],
        ['Web Development', 'React', 'JavaScript'],
        ['Data Structures', 'Algorithms', 'Competitive Programming'],
        ['Mobile Apps', 'Flutter', 'UI/UX'],
        ['Cloud Computing', 'AWS', 'DevOps'],
        ['Machine Learning', 'Data Science', 'Statistics'],
        ['Frontend Development', 'React', 'CSS'],
        ['Backend Development', 'Node.js', 'Database Design']
    ];

    const names = [
        'Alex Kumar', 'Priya Sharma', 'Mike Johnson', 'Sarah Chen',
        'David Brown', 'Emma Wilson', 'Raj Patel', 'Lisa Anderson'
    ];

    return names.map((name, idx) => ({
        id: idx + 1,
        name,
        major: ['Computer Science', 'Engineering', 'Business', 'Data Science'][idx % 4],
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`,
        interests: interests[idx],
        availability: ['Available Now', 'Available Today', 'Available This Week'][Math.floor(Math.random() * 3)],
        rating: (3 + Math.random() * 2).toFixed(1),
        reviews: Math.floor(Math.random() * 50) + 5
    }));
};

// Activity tracking for study sessions
export const trackStudyActivity = (userId, activity, duration) => {
    return {
        id: Date.now(),
        userId,
        activity,
        duration, // in minutes
        timestamp: new Date().toISOString(),
        pointsEarned: Math.ceil(duration / 15) * 10 // 10 points per 15 mins
    };
};

// Leaderboard calculation
export const calculateLeaderboard = (users) => {
    return users
        .map(user => ({
            ...user,
            totalPoints: user.activities ? 
                user.activities.reduce((sum, a) => sum + (a.pointsEarned || 0), 0) : 0
        }))
        .sort((a, b) => b.totalPoints - a.totalPoints)
        .map((user, idx) => ({
            ...user,
            rank: idx + 1
        }));
};
