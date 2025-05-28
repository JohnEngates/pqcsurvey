/**
 * Quantum-Readiness Index (QRI) Survey Configuration
 * Contains all content for the QRI assessment tool
 * 
 * This file defines the data structure for the Quantum-Readiness Index survey, including:
 * - Industry profiles with customized weights
 * - 14 assessment factors with descriptions and rating guides
 * - Actionable guidance for each factor
 * - Score thresholds with corresponding guidance
 * - General and vendor-specific recommendations
 * 
 * The data is exported as ES modules and consumed by survey.html
 */

// Industry-specific weight profiles
// Each profile contains a name, description, and optional custom weights for factors
// Weights are mapped by factor ID (1-14) and determine the importance of each factor in scoring
const industryProfiles = {
  default: {
    name: 'Default',
    description: 'Standard weights applicable to most organizations'
  },
  financial: {
    name: 'Financial Services',
    description: 'Banks, insurance, investment firms with stringent compliance needs',
    weights: {
      1: 10, 2: 10, 3: 10, 4: 9, 5: 8, 6: 7, 7: 9, 
      8: 8, 9: 8, 10: 5, 11: 7, 12: 4, 13: 5, 14: 5
    }
  },
  healthcare: {
    name: 'Healthcare',
    description: 'Organizations with sensitive health data and long-term records',
    weights: {
      1: 9, 2: 8, 3: 9, 4: 9, 5: 7, 6: 8, 7: 8, 
      8: 7, 9: 7, 10: 6, 11: 9, 12: 4, 13: 5, 14: 5
    }
  },
  government: {
    name: 'Government',
    description: 'Public sector organizations with sovereignty concerns',
    weights: {
      1: 10, 2: 9, 3: 10, 4: 8, 5: 7, 6: 7, 7: 9, 
      8: 7, 9: 9, 10: 6, 11: 8, 12: 4, 13: 5, 14: 6
    }
  },
  technology: {
    name: 'Technology',
    description: 'Software, cloud, and technology companies',
    weights: {
      1: 9, 2: 8, 3: 10, 4: 8, 5: 10, 6: 7, 7: 9, 
      8: 8, 9: 5, 10: 8, 11: 6, 12: 6, 13: 6, 14: 5
    }
  },
  manufacturing: {
    name: 'Manufacturing',
    description: 'Supply chain and industrial organizations',
    weights: {
      1: 9, 2: 8, 3: 8, 4: 7, 5: 8, 6: 9, 7: 7, 
      8: 9, 9: 6, 10: 7, 11: 5, 12: 5, 13: 6, 14: 6
    }
  }
};

// Survey factors with weights, descriptions, and detailed guidance
// Each factor includes:
// - id: unique identifier (1-14)
// - w: default weight (1-10) showing factor importance
// - label: short descriptive name
// - desc: brief description
// - guide: array of 5 descriptions for each maturity level (1-5)
// - actionableGuidance: structured recommendations with what/why/how sections
const factors = [
  { 
    id: 1, 
    w: 10,
    label: 'Executive sponsorship & governance',
    desc: 'C‑suite commitment, steering committee, KPIs.',
    guide: [
      'No C‑suite awareness or ownership.',
      'Security team briefs execs informally.',
      'Named exec sponsor; limited KPIs.',
      'Active steering committee; quarterly KPI reviews.',
      'Board‑level priority; monthly KPI reviews tied to incentives.'
    ],
    actionableGuidance: {
      what: 'Establish executive-level ownership and governance for quantum readiness',
      why: 'Post-quantum transition requires strategic planning, resource allocation, and organizational alignment that only executive sponsorship can drive',
      how: [
        'Create a quantum readiness steering committee with C-suite representation',
        'Develop and track specific KPIs for post-quantum preparedness',
        'Include quantum risk in board-level security briefings',
        'Align quantum readiness with broader digital transformation initiatives',
        'Create clear reporting lines and accountability structures'
      ]
    }
  },
  { 
    id: 2, 
    w: 9,
    label: 'Budget & dedicated funding',
    desc: 'Ring‑fenced CapEx/OpEx for PQC.',
    guide: [
      'Zero budget allocated.',
      'Ad‑hoc spend only.',
      'Pilot‑level budget approved.',
      'Multi‑year funding for tools & staff.',
      'Dedicated budget with ROI tracking.'
    ],
    actionableGuidance: {
      what: 'Secure dedicated funding for post-quantum initiatives',
      why: 'PQC transition requires sustained investment in tools, training, and infrastructure updates',
      how: [
        'Create a dedicated budget line item for PQC transition',
        'Develop a multi-year funding plan with clear milestones',
        'Include both CapEx and OpEx considerations',
        'Establish ROI metrics for quantum readiness investments',
        'Build business cases for critical quantum-safe upgrades'
      ]
    }
  },
  { 
    id: 3, 
    w: 9,
    label: 'Security & crypto expertise',
    desc: 'Depth of in‑house cryptography skills.',
    guide: [
      'No crypto specialists on staff.',
      'General security staff with basic crypto knowledge.',
      'At least one crypto‑savvy engineer.',
      'Dedicated crypto/security team; continuous training.',
      'Recognized experts contributing to standards / OSS.'
    ],
    actionableGuidance: {
      what: 'Build internal cryptographic expertise',
      why: 'Successfully implementing and maintaining PQC requires specialized knowledge and skills',
      how: [
        'Invest in cryptography training for security team members',
        'Hire or develop dedicated cryptography specialists and/or engage consultants',
        'Create partnerships with academic institutions or research organizations',
        'Establish continuous learning programs for crypto-engineering',
        'Participate in PQC standardization efforts and open-source projects'
      ]
    }
  },
  { 
    id: 4, 
    w: 8,
    label: 'Cryptographic visibility & inventory',
    desc: 'Automated discovery of certificates, keys & ciphers.',
    guide: [
      'No inventory; unknown cipher use.',
      'Partial manual spreadsheet.',
      'Automated scans of public‑facing certs only.',
      'Enterprise‑wide automated scanning with alerts.',
      'Continuous discovery integrated with CMDB & dashboards.'
    ],
    actionableGuidance: {
      what: 'Implement comprehensive cryptographic asset management',
      why: 'Understanding your current cryptographic landscape is crucial for planning PQC migration',
      how: [
        'Deploy automated certificate and key discovery tools',
        'Create and maintain a cryptographic asset inventory',
        'Implement continuous monitoring of crypto-usage',
        'Integrate crypto-asset tracking with existing CMDB',
        'Set up alerts for non-compliant or expiring assets'
      ]
    }
  },
  { 
    id: 5, 
    w: 8,
    label: 'Infrastructure modernity',
    desc: 'Cloud‑native, TLS 1.3, forward secrecy.',
    guide: [
      'Legacy platforms; majority TLS <1.2.',
      'Modernising but many legacy systems remain.',
      'Most external workloads modern; internal mix.',
      'Majority cloud‑native; TLS 1.3 on critical paths.',
      'Cloud‑first, containerised; 100% TLS 1.3 w/FS.'
    ],
    actionableGuidance: {
      what: 'Modernize infrastructure for crypto-agility',
      why: 'Modern, cloud-native infrastructure provides the flexibility needed for PQC adoption',
      how: [
        'Upgrade to TLS 1.3 across all systems',
        'Implement forward secrecy by default',
        'Migrate to cloud-native architectures where possible',
        'Containerize applications for better crypto-agility',
        'Create roadmap for legacy system modernization'
      ]
    }
  },
  { 
    id: 6, 
    w: 8,
    label: 'Environment complexity',
    desc: 'Number of sites & bespoke systems (1 = very complex, 5 = very simple).',
    guide: [
      'Highly distributed, multi‑cloud, many legacy apps.',
      'Global footprint; numerous sites & some legacy.',
      'Multiple regional sites; mixed legacy & modern.',
      'Few sites with standardised stack.',
      'Single site / fully standardized environment.'
    ],
    actionableGuidance: {
      what: 'Reduce environment complexity',
      why: 'Simpler, standardized environments are easier to upgrade and maintain quantum-safe',
      how: [
        'Consolidate and standardize infrastructure where possible',
        'Document and rationalize custom applications',
        'Create standard deployment templates',
        'Implement infrastructure as code',
        'Develop reference architectures for common use cases'
      ]
    }
  },
  { 
    id: 7, 
    w: 8,
    label: 'Zero Trust / crypto‑agile architecture',
    desc: 'ZTNA, SASE, policy‑as‑code.',
    guide: [
      'Perimeter security only; VPN for all users.',
      'Planning Zero Trust; no implementation.',
      'ZTNA for select apps/users.',
      'ZTNA & SASE for majority of workforce.',
      'Org‑wide Zero Trust; policy‑as‑code, SD‑WAN overlay.'
    ],
    actionableGuidance: {
      what: 'Implement Zero Trust architecture',
      why: 'Zero Trust provides the foundation for crypto-agility and quantum-safe security',
      how: [
        'Develop Zero Trust strategy and roadmap',
        'Implement ZTNA for critical applications',
        'Deploy SASE for secure cloud access',
        'Create policy-as-code frameworks',
        'Establish continuous verification mechanisms'
      ]
    }
  },
  { 
    id: 8, 
    w: 7,
    label: 'Vendor ecosystem readiness',
    desc: 'Critical vendors with PQC road‑maps.',
    guide: [
      'No vendor has shared a PQC plan.',
      'Few vague vendor statements.',
      'Some key vendors providing whitepapers.',
      'Most critical vendors share timelines & hybrid modes.',
      'All critical vendors contractually committed to PQC readiness.'
    ],
    actionableGuidance: {
      what: 'Ensure vendor ecosystem quantum readiness',
      why: 'Your security is only as strong as your weakest vendor link',
      how: [
        'Assess vendors\' PQC readiness and plans',
        'Include PQC requirements in vendor contracts',
        'Create vendor communication strategy for PQC',
        'Establish timeline alignment with key vendors',
        'Develop contingency plans for non-compliant vendors'
      ]
    }
  },
  { 
    id: 9, 
    w: 6,
    label: 'Regulatory & contractual drivers',
    desc: 'Mandates that accelerate crypto agility.',
    guide: [
      'No regulatory or customer drivers.',
      'Aware of upcoming regulations; no action.',
      'Gap analysis underway.',
      'Active remediation roadmap for regulations.',
      'Fully compliant; periodic audits show alignment.'
    ],
    actionableGuidance: {
      what: 'Prepare for PQC regulations and standards',
      why: 'Regulatory compliance will be a key driver for PQC adoption',
      how: [
        'Monitor emerging PQC regulations and standards',
        'Conduct regular compliance gap analysis',
        'Create compliance roadmap with clear milestones',
        'Implement automated compliance checking',
        'Establish audit and reporting procedures'
      ]
    }
  },
  { 
    id: 10, 
    w: 6,
    label: 'Change‑management culture',
    desc: 'DevSecOps, automation, project delivery.',
    guide: [
      'Projects often delayed; manual processes.',
      'Occasional automation; inconsistent results.',
      'Dedicated change‑management practice; partial automation.',
      'DevSecOps culture; projects on time.',
      'High‑performance CI/CD, IaC, continuous learning.'
    ],
    actionableGuidance: {
      what: 'Build a crypto-agile change management culture',
      why: 'Effective PQC transition requires streamlined, automated processes',
      how: [
        'Implement DevSecOps practices',
        'Automate security testing and deployment',
        'Create crypto-agility checkpoints in CI/CD',
        'Establish change management frameworks',
        'Build automated rollback capabilities'
      ]
    }
  },
  { 
    id: 11, 
    w: 5,
    label: 'Data‑sensitivity time horizon',
    desc: 'Long‑term confidential data exposure.',
    guide: [
      'Data classification unknown.',
      'Classification exists; no long‑term analysis.',
      'Sensitive archives identified; no mitigation.',
      'Rotation / re‑encryption schedule in place.',
      'Quantum‑safe encryption strategy for all long‑term data.'
    ],
    actionableGuidance: {
      what: 'Protect long-term sensitive data',
      why: 'Data encrypted today could be decrypted by future quantum computers',
      how: [
        'Identify and classify data by protection requirements',
        'Assess data sensitivity time horizons',
        'Implement data rotation policies',
        'Create re-encryption schedules',
        'Deploy quantum-safe encryption for critical data'
      ]
    }
  },
  { 
    id: 12, 
    w: 4,
    label: 'Innovation & pilot velocity',
    desc: 'Ability to run PQC PoCs quickly.',
    guide: [
      'No test environments or PoCs.',
      'Ad‑hoc lab; PoCs infrequent.',
      'Sandbox available; annual PoCs.',
      'Dedicated lab; quarterly PoCs.',
      'Automated lab; continuous experimentation.'
    ],
    actionableGuidance: {
      what: 'Enable rapid PQC experimentation',
      why: 'Quick testing and validation of PQC solutions reduces implementation risk',
      how: [
        'Create dedicated PQC test environment',
        'Establish rapid PoC processes',
        'Implement automated testing frameworks',
        'Build reusable test scenarios',
        'Document and share learnings across teams'
      ]
    }
  },
  { 
    id: 13, 
    w: 4,
    label: 'Third‑party dependency management',
    desc: 'MSPs, SaaS, OSS SBOM & patch SLAs.',
    guide: [
      'No visibility into dependencies.',
      'Basic vendor list; no SBOMs.',
      'SBOMs for major vendors; patch SLAs informal.',
      'SBOMs + contractual patch SLAs.',
      'Continuous third‑party risk monitoring.'
    ],
    actionableGuidance: {
      what: 'Manage third-party crypto dependencies',
      why: 'Third-party components can introduce quantum vulnerabilities',
      how: [
        'Create and maintain SBOMs for all systems',
        'Establish crypto-related patch SLAs',
        'Implement dependency scanning',
        'Monitor third-party security posture',
        'Create incident response plans for vulnerabilities'
      ]
    }
  },
  { 
    id: 14, 
    w: 4,
    label: 'IR & crypto‑rotation drills',
    desc: 'Key‑rotation & incident drills.',
    guide: [
      'No drills or rotation exercises.',
      'Drills after incidents only.',
      'Annual key‑rotation drill.',
      'Semi‑annual drills; lessons captured.',
      'Quarterly automated rotation & rollback.'
    ],
    actionableGuidance: {
      what: 'Practice crypto incident response',
      why: 'Regular drills ensure readiness for PQC-related incidents',
      how: [
        'Create crypto incident response playbooks',
        'Conduct regular key rotation exercises',
        'Implement automated key management',
        'Practice rollback procedures',
        'Document and improve from each drill'
      ]
    }
  }
];

// Score thresholds and detailed guidance
// Defines score ranges for low/medium/high maturity with corresponding messages and recommendations
// - low: 0-50% score range
// - medium: 51-75% score range
// - high: 76-100% score range
const scoreThresholds = {
  low: {
    max: 50,
    message: 'Your organization shows significant gaps in quantum readiness that require immediate attention.',
    guidance: {
      priority: 'Establish foundational quantum readiness capabilities',
      actions: [
        'Create executive awareness and obtain sponsorship for PQC initiatives',
        'Conduct comprehensive crypto-asset inventory',
        'Develop initial PQC transition strategy and roadmap',
        'Begin modernizing critical infrastructure components',
        'Implement basic crypto-agility measures'
      ]
    }
  },
  medium: {
    max: 75,
    message: 'Your organization has established basic quantum readiness but needs systematic improvements.',
    guidance: {
      priority: 'Strengthen and systematize quantum readiness programs',
      actions: [
        'Expand PQC initiatives across the organization',
        'Implement automated crypto-asset management',
        'Accelerate infrastructure modernization',
        'Develop vendor PQC requirements',
        'Create comprehensive testing environments'
      ]
    }
  },
  high: {
    message: 'Your organization demonstrates strong quantum readiness foundations.',
    guidance: {
      priority: 'Optimize and future-proof quantum readiness',
      actions: [
        'Fine-tune PQC implementation strategies',
        'Lead industry PQC initiatives',
        'Contribute to standards development',
        'Share best practices and learnings',
        'Prepare for emerging quantum threats'
      ]
    }
  }
};

// Vendor-agnostic recommendations for all organizations
// Structured as categories with lists of recommended actions
// Used when generating implementation guidance and timelines
const generalRecommendations = [
  {
    category: 'Strategy & Planning',
    items: [
      'Develop a comprehensive PQC transition strategy with clear milestones',
      'Create risk-based prioritization for PQC implementation',
      'Establish metrics to track PQC readiness progress',
      'Build business cases for quantum readiness investments',
      'Align PQC initiatives with broader security programs'
    ]
  },
  {
    category: 'Technical Implementation',
    items: [
      'Implement hybrid cryptography to maximize compatibility',
      'Deploy automated crypto-asset discovery and management',
      'Create crypto-agile architecture patterns',
      'Establish PQC testing frameworks',
      'Develop automated deployment and rollback capabilities'
    ]
  },
  {
    category: 'Operational Excellence',
    items: [
      'Build internal cryptographic expertise',
      'Create incident response plans for crypto events',
      'Establish vendor management frameworks for PQC',
      'Implement continuous monitoring and alerting',
      'Maintain up-to-date crypto asset inventory'
    ]
  }
];

// Cloudflare-specific recommendations
// Contains vendor-specific guidance and implementation steps
// Used in the results section to provide targeted product recommendations
const cloudflareRecommendations = {
  infrastructure: {
    title: 'Accelerate PQC Adoption with Cloudflare',
    benefits: [
      'Automatic PQC algorithm updates as standards evolve',
      'Global edge network optimized for PQC performance',
      'Hybrid cryptography now support maintaining compatibility',
      'Built-in end-to-end protection against future quantum threats'
    ],
    features: [
      'TLS 1.3 with PQC support',
      'Zero Trust security using quantum-safe algorithms',
      'Real-time crypto analytics and visibility',
      'Automated certificate management'
    ]
  },
  implementation: [
    'Enable PQC for all traffic through Cloudflare',
    'Deploy Zero Trust architecture with built-in PQC',
    'Utilize SSL/TLS analytics for crypto visibility',
    'Implement automatic certificate rotation'
  ]
};

export { factors, scoreThresholds, generalRecommendations, cloudflareRecommendations, industryProfiles }; 