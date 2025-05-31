import { scoreThresholds } from '../config/survey-config.js';

export function calculateScore(scores) {
  // Calculate total score using weighted formula
  const totalScore = scores.reduce((sum, f) => sum + (f.score * f.weight), 0);
  const maxScore = scores.reduce((sum, f) => sum + (5 * f.weight), 0);
  const percentage = Math.round((totalScore / maxScore) * 100);

  // Determine threshold category
  const threshold = percentage <= scoreThresholds.low.max ? scoreThresholds.low :
                   percentage <= scoreThresholds.medium.max ? scoreThresholds.medium :
                   scoreThresholds.high;

  // Calculate category breakdown
  const categories = calculateCategoryBreakdown(scores);

  return {
    percentage,
    threshold,
    categories,
    totalScore,
    maxScore
  };
}

function calculateCategoryBreakdown(scores) {
  const categories = [
    { name: 'Governance', factors: [1, 2, 9] },
    { name: 'Technical', factors: [3, 4, 5, 6, 7] },
    { name: 'Operations', factors: [8, 10, 11, 12, 13, 14] }
  ];
  
  return categories.map(category => {
    const categoryFactors = scores.filter(f => category.factors.includes(f.id));
    const categoryScore = Math.round(
      (categoryFactors.reduce((sum, f) => sum + (f.score * f.weight), 0) /
       categoryFactors.reduce((sum, f) => sum + (5 * f.weight), 0)) * 100
    );

    const colorClass = categoryScore < 50 ? 'bg-red-500' :
                      categoryScore < 75 ? 'bg-yellow-500' :
                      'bg-[#f6821f]';

    const factorsList = categoryFactors.map(f => `${f.id}. ${f.label}`).join(', ');

    return {
      name: category.name,
      score: categoryScore,
      colorClass,
      factorsList,
      factors: categoryFactors
    };
  });
}

export function identifyPriorities(scores) {
  // Identify low-scoring factors (<=3) sorted by weighted impact
  const lowScores = scores
    .filter(f => f.score <= 3)
    .sort((a, b) => (a.score * a.weight) - (b.score * b.weight));

  return {
    immediate: lowScores.slice(0, Math.min(3, lowScores.length)),
    medium: lowScores.slice(Math.min(3, lowScores.length), Math.min(6, lowScores.length)),
    long: lowScores.slice(Math.min(6, lowScores.length))
  };
}
