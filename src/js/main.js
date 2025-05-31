import { initializeSurvey, handleFormSubmission } from './survey.js';

document.addEventListener('DOMContentLoaded', async () => {
  console.log('Starting QRI Survey application...');
  
  try {
    // Initialize all components
    await initializeSurvey();
    handleFormSubmission();
    
    // Setup weight controls toggle
    setupWeightControlsToggle();
    
    console.log('QRI Survey application initialized successfully');
  } catch (error) {
    console.error('Error initializing application:', error);
  }
});

function setupWeightControlsToggle() {
  const toggleBtn = document.getElementById('toggleWeights');
  const weightControls = document.getElementById('weightControls');
  
  if (toggleBtn && weightControls) {
    toggleBtn.addEventListener('click', () => {
      const isHidden = weightControls.classList.contains('hidden');
      weightControls.classList.toggle('hidden');
      toggleBtn.textContent = isHidden ? 'Hide Weight Controls' : 'Show Weight Controls';
    });
  }
}
