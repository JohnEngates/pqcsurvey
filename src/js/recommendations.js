import { generalRecommendations, cloudflareRecommendations } from '../config/survey-config.js';
import { identifyPriorities } from './scoring.js';
import { createRadarChart, renderCategoryBreakdown } from './visualization.js';

export function generateResults(result, scores) {
  // Display basic score information
  displayScoreInfo(result);
  
  // Render visualizations
  createRadarChart(scores);
  renderCategoryBreakdown(result.categories);
  
  // Generate implementation timeline
  generateImplementationTimeline(scores);
  
  // Generate factor-specific guidance
  generateFactorGuidance(scores);
  
  // Display Cloudflare recommendations
  displayCloudflareGuidance();
  
  // Setup toggle for all factors view
  setupFactorToggle(scores);
}

function displayScoreInfo(result) {
  // Display score with industry profile
  const industrySelector = document.getElementById('industrySelector');
  const industryName = industrySelector.options[industrySelector.selectedIndex].text;
  
  document.getElementById('scoreDisplay').textContent = 
    `Your QRI Score: ${result.percentage}% (${industryName} weight profile)`;
  
  // Set assessment date
  const today = new Date();
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  document.getElementById('assessmentDate').textContent = 
    `Assessment Date: ${today.toLocaleDateString('en-US', options)}`;
  
  // Display threshold message and guidance
  document.getElementById('scoreMessage').textContent = result.threshold.message;
  document.getElementById('priorityFocus').textContent = result.threshold.guidance.priority;
  document.getElementById('priorityActions').innerHTML = result.threshold.guidance.actions
    .map(action => `<li>${action}</li>`)
    .join('');
}

function generateImplementationTimeline(scores) {
  const priorities = identifyPriorities(scores);
  
  if (priorities.immediate.length > 0) {
    // Use factor-specific priorities
    document.getElementById('immediatePriorities').innerHTML = priorities.immediate
      .map(f => `<li><strong>${f.label}:</strong> ${f.actionableGuidance.what}</li>`)
      .join('');
      
    document.getElementById('mediumPriorities').innerHTML = priorities.medium
      .map(f => `<li><strong>${f.label}:</strong> ${f.actionableGuidance.what}</li>`)
      .join('');
      
    // Add general recommendations if not enough specific priorities
    if (priorities.medium.length < 3) {
      const general = generalRecommendations[0].items.slice(0, 3 - priorities.medium.length);
      document.getElementById('mediumPriorities').innerHTML += general
        .map(item => `<li>${item}</li>`)
        .join('');
    }
    
    document.getElementById('longPriorities').innerHTML = priorities.long
      .map(f => `<li><strong>${f.label}:</strong> ${f.actionableGuidance.what}</li>`)
      .join('');
      
    // Add general recommendations if not enough specific priorities
    if (priorities.long.length < 3) {
      const general = generalRecommendations[2].items.slice(0, 3 - priorities.long.length);
      document.getElementById('longPriorities').innerHTML += general
        .map(item => `<li>${item}</li>`)
        .join('');
    }
  } else {
    // Fallback for high-scoring organizations
    const recommendations = generalRecommendations.flatMap(cat => cat.items);
    const chunks = [
      recommendations.slice(0, 3),
      recommendations.slice(3, 6),
      recommendations.slice(6, 9)
    ];
    
    document.getElementById('immediatePriorities').innerHTML = chunks[0]
      .map(item => `<li>${item}</li>`)
      .join('');
    document.getElementById('mediumPriorities').innerHTML = chunks[1]
      .map(item => `<li>${item}</li>`)
      .join('');
    document.getElementById('longPriorities').innerHTML = chunks[2]
      .map(item => `<li>${item}</li>`)
      .join('');
  }
}

function generateFactorGuidance(scores) {
  // Generate guidance for low-scoring factors
  const lowScores = scores
    .filter(f => f.score <= 3)
    .sort((a, b) => (a.score * a.weight) - (b.score * b.weight));

  document.getElementById('lowScoreGuidance').innerHTML = lowScores
    .map(f => createFactorGuidanceCard(f, 'orange'))
    .join('');

  // Generate guidance for all factors
  document.getElementById('allFactorsGuidance').innerHTML = scores
    .sort((a, b) => b.weight - a.weight)
    .map(f => createFactorGuidanceCard(f, 'gray'))
    .join('');
}

function createFactorGuidanceCard(factor, theme) {
  const isLowScore = theme === 'orange';
  const scoreColor = factor.score <= 2 ? 'text-red-600 bg-red-50' :
                    factor.score <= 3 ? 'text-yellow-600 bg-yellow-50' :
                    'text-green-600 bg-green-50';
  
  const scoreIcon = factor.score <= 2 ?
    '<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>' :
    factor.score <= 3 ?
    '<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>' :
    '<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>';

  const themeClass = isLowScore ? 'bg-orange-50 border-orange-100' : 'bg-white border-gray-100';
  const titleColor = isLowScore ? 'text-orange-800' : 'text-gray-800';

  let card = `
    <div class="${themeClass} p-5 rounded-lg shadow-sm border hover:shadow-md transition-all duration-300">
      <div class="flex justify-between items-center mb-3">
        <div class="flex items-center">
          <div class="w-8 h-8 rounded-full ${isLowScore ? 'bg-orange-100' : 'bg-gray-100'} flex items-center justify-center mr-3">
            <span class="font-bold ${isLowScore ? 'text-orange-500' : 'text-gray-500'}">${factor.id}</span>
          </div>
          <h4 class="font-semibold ${titleColor} text-lg">${factor.label}</h4>
        </div>
  `;

  if (!isLowScore) {
    card += `
        <span class="font-medium ${scoreColor} px-3 py-1 rounded-full text-sm flex items-center">
          ${scoreIcon}
          Score: ${factor.score}/5
        </span>
    `;
  }

  card += `
      </div>
      <p class="text-sm ${isLowScore ? 'text-orange-900' : 'text-gray-700'} mt-2 border-l-2 ${isLowScore ? 'border-orange-200' : 'border-gray-200'} pl-3">${factor.actionableGuidance.what}</p>
  `;

  if (isLowScore) {
    card += `
      <div class="mt-4 bg-white p-3 rounded-md">
        <p class="text-sm text-orange-700"><strong class="text-orange-800">Why:</strong> ${factor.actionableGuidance.why}</p>
      </div>
      <div class="mt-4">
        <strong class="text-sm text-orange-800 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
          </svg>
          How to Improve:
        </strong>
        <ul class="list-disc ml-5 mt-2 space-y-2 text-sm text-orange-900">
          ${factor.actionableGuidance.how.map(step => `<li>${step}</li>`).join('')}
        </ul>
      </div>
    `;
  } else {
    card += `
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div class="bg-gray-50 p-3 rounded-md">
          <strong class="text-sm text-gray-700 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
            Current state:
          </strong>
          <p class="text-sm text-gray-600 mt-1">${factor.guide[factor.score - 1]}</p>
        </div>
        <div class="bg-gray-50 p-3 rounded-md">
          <strong class="text-sm text-gray-700 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
            Target state:
          </strong>
          <p class="text-sm text-gray-600 mt-1">${factor.guide[4]}</p>
        </div>
      </div>
    `;
  }

  card += '</div>';
  return card;
}

function displayCloudflareGuidance() {
  document.getElementById('cloudflareBenefits').innerHTML = cloudflareRecommendations.infrastructure.benefits
    .map(benefit => `<li>${benefit}</li>`)
    .join('');
  
  document.getElementById('cloudflareFeatures').innerHTML = cloudflareRecommendations.infrastructure.features
    .map(feature => `<li>${feature}</li>`)
    .join('');
  
  document.getElementById('cloudflareSteps').innerHTML = cloudflareRecommendations.implementation
    .map(step => `<li>${step}</li>`)
    .join('');
}

function setupFactorToggle(scores) {
  const toggleBtn = document.getElementById('toggleAllFactors');
  const lowScoreGuidance = document.getElementById('lowScoreGuidance');
  const allFactorsGuidance = document.getElementById('allFactorsGuidance');
  
  if (toggleBtn && lowScoreGuidance && allFactorsGuidance) {
    toggleBtn.addEventListener('click', () => {
      const isShowingAll = !allFactorsGuidance.classList.contains('hidden');
      
      if (isShowingAll) {
        // Show only low scores
        allFactorsGuidance.classList.add('hidden');
        lowScoreGuidance.classList.remove('hidden');
        toggleBtn.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="16"></line>
            <line x1="8" y1="12" x2="16" y2="12"></line>
          </svg>
          Show All Factors
        `;
      } else {
        // Show all factors
        lowScoreGuidance.classList.add('hidden');
        allFactorsGuidance.classList.remove('hidden');
        toggleBtn.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          Show Priority Areas Only
        `;
      }
    });
  }
}
