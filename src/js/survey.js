import { factors, industryProfiles } from '../config/survey-config.js';
import { calculateScore } from './scoring.js';
import { generateResults } from './recommendations.js';

let currentWeights = {};

export async function initializeSurvey() {
  console.log('Initializing survey components...');
  
  // Initialize industry selector
  initializeIndustrySelector();
  
  // Initialize survey form
  initializeSurveyForm();
  
  // Initialize current weights with defaults
  factors.forEach(f => {
    currentWeights[f.id] = f.w;
  });
  
  console.log('Survey initialization complete');
}

function initializeIndustrySelector() {
  const industrySelector = document.getElementById('industrySelector');
  if (!industrySelector) {
    console.error('Could not find industrySelector container');
    return;
  }
  
  // Create industry options
  Object.entries(industryProfiles).forEach(([key, profile]) => {
    const option = document.createElement('option');
    option.value = key;
    option.textContent = profile.name;
    industrySelector.appendChild(option);
  });
  
  // Add change handler
  industrySelector.addEventListener('change', (e) => {
    const selectedProfile = e.target.value;
    applyIndustryWeights(selectedProfile);
  });
}

function applyIndustryWeights(profileKey) {
  const profile = industryProfiles[profileKey];
  if (!profile) return;
  
  // Update description
  document.getElementById('industryDescription').textContent = profile.description || '';
  
  // Show custom weight panel
  document.getElementById('customWeights').classList.remove('hidden');
  
  // Apply weights
  factors.forEach(f => {
    const weight = profile.weights ? (profile.weights[f.id] || f.w) : f.w;
    currentWeights[f.id] = weight;
    
    // Update UI
    const weightSpan = document.getElementById(`weight-${f.id}`);
    if (weightSpan) weightSpan.textContent = weight;
    
    // Update slider if exists
    const weightSlider = document.getElementById(`weightSlider-${f.id}`);
    if (weightSlider) weightSlider.value = weight;
  });
  
  updateWeightLabels();
}

function updateWeightLabels() {
  factors.forEach(f => {
    const weight = currentWeights[f.id] || f.w;
    const spans = document.querySelectorAll(`.weight-label-${f.id}`);
    spans.forEach(span => {
      span.textContent = weight;
    });
  });
}

function initializeSurveyForm() {
  const blockContainer = document.getElementById('factorBlocks');
  const weightsContainer = document.getElementById('weightSliders');
  
  if (!blockContainer || !weightsContainer) {
    console.error('Could not find required containers');
    return;
  }

  // Create factor blocks
  factors.forEach(f => {
    createFactorBlock(f, blockContainer);
    createWeightSlider(f, weightsContainer);
  });
}

function createFactorBlock(factor, container) {
  const block = document.createElement('div');
  block.className = 'p-4 sm:p-6 bg-white rounded-lg shadow-md border border-gray-200';
  block.innerHTML = `
    <p class="font-medium mb-1 text-sm sm:text-base">${factor.id}. ${factor.label} <span class="text-xs sm:text-sm text-slate-500">(Weight <span class="weight-label-${factor.id}" id="weight-${factor.id}">${factor.w}</span>)</span></p>
    <p class="text-xs sm:text-sm mb-2 text-slate-600">${factor.desc}</p>
    <details class="text-xs text-slate-500 mb-2"><summary class="cursor-pointer underline">Rating guide</summary>
      <ul class="list-disc ml-4 sm:ml-6 mt-2 space-y-1">
        ${factor.guide.map((txt, idx) => `<li><strong>${idx + 1}</strong> – ${txt}</li>`).join('')}
      </ul>
    </details>
    <div class="flex flex-wrap gap-2 sm:gap-4 ml-2 sm:ml-4">
      ${[1,2,3,4,5].map(v => `<label class='flex items-center gap-1 text-sm'><input type='radio' name='q${factor.id}' value='${v}' required> ${v}</label>`).join('')}
    </div>
  `;
  container.appendChild(block);
}

function createWeightSlider(factor, container) {
  const weightSlider = document.createElement('div');
  weightSlider.className = 'flex items-center gap-3 p-3 border-b border-gray-200';
  weightSlider.innerHTML = `
    <div class="w-48 text-sm font-medium">${factor.label}</div>
    <input 
      type="range" 
      id="weightSlider-${factor.id}" 
      min="1" 
      max="10" 
      value="${factor.w}" 
      class="flex-grow">
    <div class="w-6 text-center weight-label-${factor.id}">${factor.w}</div>
  `;
  container.appendChild(weightSlider);
  
  // Add event listener for weight changes
  const slider = weightSlider.querySelector(`#weightSlider-${factor.id}`);
  if (slider) {
    slider.addEventListener('input', (e) => {
      const newWeight = parseInt(e.target.value);
      currentWeights[factor.id] = newWeight;

      // Update all instances of this weight label
      document.querySelectorAll(`.weight-label-${factor.id}`).forEach(el => {
        el.textContent = newWeight;
      });
    });
  }
}

export function handleFormSubmission() {
  const form = document.getElementById('qriForm');
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Collect form data
    const scores = factors.map(f => {
      const radio = document.querySelector(`input[name="q${f.id}"]:checked`);
      if (!radio) {
        console.error(`No selection for factor ${f.id}`);
        return null;
      }
      const value = parseInt(radio.value);
      const weight = currentWeights[f.id] || f.w;
      return { ...f, score: value, weight: weight };
    });

    if (scores.some(score => score === null)) {
      alert('Please rate all factors before submitting');
      return;
    }

    // Calculate results
    const result = calculateScore(scores);
    
    // Generate and display results
    generateResults(result, scores);
    
    // Show results section
    document.getElementById('results').classList.remove('hidden');
    
    // Scroll to results
    document.getElementById('results').scrollIntoView({ behavior: 'smooth' });
  });
}

export { currentWeights };
