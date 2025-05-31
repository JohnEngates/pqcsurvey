# Quantum-Readiness Index (QRI) Survey - Refactored

This is the modular version of the QRI survey application. The original monolithic `index.html` file has been broken down into logical components for better maintainability.

## Project Structure

```
src/
├── index.html              # Main HTML structure (minimal)
├── css/
│   └── styles.css          # All CSS styles
├── js/
│   ├── main.js             # Application entry point
│   ├── survey.js           # Survey form logic
│   ├── scoring.js          # Score calculation logic
│   ├── visualization.js    # Chart rendering
│   └── recommendations.js  # Results generation
├── config/
│   └── survey-config.js    # Survey data configuration
└── README.md              # This file
```

## Components Overview

### main.js
- Application initialization
- Event listeners setup
- Component orchestration

### survey.js
- Industry profile selector
- Factor weight management
- Survey form generation
- Form submission handling

### scoring.js
- Score calculation algorithms
- Category breakdown logic
- Priority identification

### visualization.js
- Radar chart rendering using Chart.js
- Category breakdown visualization

### recommendations.js
- Results display logic
- Implementation timeline generation
- Factor-specific guidance
- Cloudflare recommendations

### config/survey-config.js
- Survey factors data
- Industry profiles
- Score thresholds
- Recommendation templates

## Running the Application

1. Start a local web server in the `src/` directory:
   ```bash
   cd src/
   python3 -m http.server 8000
   ```

2. Open your browser and navigate to:
   ```
   http://localhost:8000
   ```

## Benefits of Refactoring

- **Maintainability**: Easier to update individual components
- **Readability**: Clear separation of concerns
- **Debugging**: Isolated functionality for easier testing
- **Collaboration**: Multiple developers can work on different modules
- **Reusability**: Components can be reused in other projects
- **Performance**: Better browser caching with separate files
