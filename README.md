# Quantum-Readiness Index (QRI) Survey

A web-based assessment tool to help organizations evaluate their readiness for post-quantum cryptography (PQC). The tool provides a comprehensive evaluation across 14 key factors spanning governance, technical, and operational dimensions.

## Features

- Interactive assessment of 14 quantum-readiness factors
- Weighted scoring system
- Radar chart visualization
- Detailed, actionable guidance for improvement
- Factor-specific recommendations
- Cloudflare-specific implementation guidance

## Setup

1. Clone the repository:
```bash
git clone https://github.com/JohnEngates/pqcsurvey.git
cd pqcsurvey
```

2. Start a local web server:
```bash
python3 -m http.server 8000
```

3. Open in your browser:
```
http://localhost:8000/survey.html
```

## Usage

1. Rate your organization's maturity level for each factor from 1 (non-existent/ad hoc) to 5 (best practice)
2. Click "Calculate QRI" to view your results
3. Review your:
   - Overall QRI score
   - Radar chart visualization
   - Priority focus areas
   - Factor-specific guidance
   - Cloudflare implementation recommendations

## License

MIT License - feel free to use and modify as needed.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. 