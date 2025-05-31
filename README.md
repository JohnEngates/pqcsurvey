# Quantum-Readiness Index (QRI) Survey

A web-based assessment tool to help organizations evaluate their readiness for post-quantum cryptography (PQC). The tool provides a comprehensive evaluation across 14 key factors spanning governance, technical, and operational dimensions.

This interactive survey helps organizations benchmark their preparedness for the transition to quantum-safe cryptography, providing targeted recommendations and industry-specific insights.

## Features

- Interactive assessment of 14 quantum-readiness factors covering governance, technical, and operational dimensions
- Industry-specific weighted scoring system with customizable weights
- Radar chart visualization for at-a-glance maturity assessment
- Detailed, actionable guidance for improvement with short, medium, and long-term priorities
- Factor-specific recommendations with what/why/how guidance
- Cloudflare-specific implementation guidance for accelerated adoption

## Setup

1. Clone the repository:
```bash
git clone https://github.com/JohnEngates/pqcsurvey-claude.git
cd pqcsurvey-claude
```

2. Start a local web server:
```bash
python3 -m http.server 8000
```

3. Open in your browser:
```
http://localhost:8000
```

## Usage

1. Select your industry profile to apply appropriate factor weightings (or customize weights manually)
2. Rate your organization's maturity level for each factor from 1 (non-existent/ad hoc) to 5 (best practice)
3. Click "Calculate QRI" to view your results
4. Review your assessment:
   - Overall QRI score and category breakdown
   - Radar chart visualization of all 14 factors
   - Priority focus areas with implementation timeline
   - Factor-specific guidance and recommendations
   - Cloudflare implementation recommendations for PQC adoption

The tool automatically generates personalized guidance based on your lowest-scoring factors, providing targeted recommendations for immediate, medium-term, and long-term actions.

## License

This project is licensed under the [MIT License](LICENSE).

## Project Structure

- `index.html` - Main application entry point
- `src/config/survey-config.js` - Configuration file containing:
  - Industry-specific weight profiles
  - 14 assessment factors with detailed guidance
  - Score thresholds and recommendations
  - General and vendor-specific guidance
- `src/js/` - JavaScript modules:
  - `main.js` - Application initialization and coordination
  - `survey.js` - Survey form handling and user interactions
  - `scoring.js` - QRI calculation and scoring algorithms
  - `visualization.js` - Chart rendering and visual components
  - `recommendations.js` - Recommendation engine and guidance generation
- `src/css/styles.css` - Application styling and layout

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request to enhance the survey factors, improve the UI, or add new industry profiles. 