/**
 * Mock data for testing - exactly 10 top programming languages
 */
const MOCK_LANGUAGE_DATA = {
  torvalds: [
    { name: "C", bytes: 3500000, percentage: 35.2 },
    { name: "Python", bytes: 1800000, percentage: 18.1 },
    { name: "JavaScript", bytes: 1200000, percentage: 12.1 },
    { name: "Shell", bytes: 800000, percentage: 8.1 },
    { name: "TypeScript", bytes: 650000, percentage: 6.5 },
    { name: "Go", bytes: 500000, percentage: 5.0 },
    { name: "Java", bytes: 450000, percentage: 4.5 },
    { name: "Rust", bytes: 400000, percentage: 4.0 },
    { name: "Assembly", bytes: 350000, percentage: 3.5 },
    { name: "HTML", bytes: 300000, percentage: 3.0 }
  ],
  
  gaearon: [
    { name: "JavaScript", bytes: 2800000, percentage: 28.0 },
    { name: "TypeScript", bytes: 2200000, percentage: 22.0 },
    { name: "Python", bytes: 1500000, percentage: 15.0 },
    { name: "CSS", bytes: 1000000, percentage: 10.0 },
    { name: "HTML", bytes: 800000, percentage: 8.0 },
    { name: "Java", bytes: 600000, percentage: 6.0 },
    { name: "C", bytes: 400000, percentage: 4.0 },
    { name: "Go", bytes: 300000, percentage: 3.0 },
    { name: "Rust", bytes: 250000, percentage: 2.5 },
    { name: "Shell", bytes: 150000, percentage: 1.5 }
  ],
  
  microsoft: [
    { name: "C#", bytes: 3850000, percentage: 38.5 },
    { name: "TypeScript", bytes: 2840000, percentage: 28.4 },
    { name: "JavaScript", bytes: 1550000, percentage: 15.5 },
    { name: "Python", bytes: 800000, percentage: 8.0 },
    { name: "Java", bytes: 500000, percentage: 5.0 },
    { name: "C", bytes: 200000, percentage: 2.0 },
    { name: "Go", bytes: 120000, percentage: 1.2 },
    { name: "Rust", bytes: 80000, percentage: 0.8 },
    { name: "HTML", bytes: 50000, percentage: 0.5 },
    { name: "CSS", bytes: 20000, percentage: 0.2 }
  ],
  
  vercel: [
    { name: "JavaScript", bytes: 4570000, percentage: 45.7 },
    { name: "TypeScript", bytes: 4000000, percentage: 40.0 },
    { name: "Python", bytes: 600000, percentage: 6.0 },
    { name: "Go", bytes: 300000, percentage: 3.0 },
    { name: "Rust", bytes: 200000, percentage: 2.0 },
    { name: "CSS", bytes: 150000, percentage: 1.5 },
    { name: "HTML", bytes: 100000, percentage: 1.0 },
    { name: "Shell", bytes: 80000, percentage: 0.8 },
    { name: "Java", bytes: 50000, percentage: 0.5 },
    { name: "C", bytes: 20000, percentage: 0.2 }
  ]
};

/**
 * Returns mock data for well-known users when GitHub API is unavailable
 */
function getMockData(username) {
  const userData = MOCK_LANGUAGE_DATA[username.toLowerCase()];
  if (userData) {
    // Ensure exactly 10 languages
    return userData.slice(0, 10);
  }
  
  // Default for unknown users
  return [
    { name: "JavaScript", bytes: 2500000, percentage: 25.0 },
    { name: "Python", bytes: 2000000, percentage: 20.0 },
    { name: "TypeScript", bytes: 1500000, percentage: 15.0 },
    { name: "Java", bytes: 1200000, percentage: 12.0 },
    { name: "C", bytes: 1000000, percentage: 10.0 },
    { name: "Go", bytes: 800000, percentage: 8.0 },
    { name: "Rust", bytes: 600000, percentage: 6.0 },
    { name: "HTML", bytes: 300000, percentage: 3.0 },
    { name: "CSS", bytes: 100000, percentage: 1.0 }
  ];
}

module.exports = { getMockData };