export type Topic = {
  id: string;
  title: string;
  estimatedHours: number;
  url?: string;
};

export type Phase = {
  phaseNumber: number;
  title: string;
  weekRange: string;
  topics: Topic[];
};

export type TrackConfig = {
  trackId: string;
  trackName: string;
  phases: Phase[];
};

// ─── FS Core ────────────────────────────────────────────────────────────────

const fsCorePhases: Phase[] = [
  {
    phaseNumber: 1,
    title: 'Foundations',
    weekRange: 'Weeks 1–3',
    topics: [
      { id: 'html-fundamentals', title: 'HTML5 Fundamentals', estimatedHours: 3, url:'https://www.youtube.com/watch?v=qz0aGYrrlhU' },
      { id: 'css3-responsive', title: 'CSS3 & Responsive Design', estimatedHours: 4, url:'https://www.youtube.com/watch?v=0hrJGWrCux0' },
      { id: 'flexbox-grid', title: 'Flexbox & Grid', estimatedHours: 3, url:'https://www.youtube.com/watch?v=gT6rHhOZEO0' },
      { id: 'vscode-setup', title: 'VS Code Setup & Productivity', estimatedHours: 1, url:'https://www.youtube.com/watch?v=ifTF3ags0XI' },
      { id: 'chrome-devtools', title: 'Chrome DevTools', estimatedHours: 1.5, url:'https://www.youtube.com/watch?v=gTVpBbFWry8' },
    ],
  },
  {
    phaseNumber: 2,
    title: 'JavaScript',
    weekRange: 'Weeks 4–7',
    topics: [
      { id: 'es6-essentials', title: 'ES6+ Essentials', estimatedHours: 3, url:'https://www.youtube.com/watch?v=NCwa_xi0Uuc' },
      { id: 'dom-manipulation', title: 'DOM Manipulation', estimatedHours: 4, url:'https://www.youtube.com/watch?v=5fb2aPlgoys' },
      { id: 'async-programming', title: 'Async Programming (Promises, async/await)', estimatedHours: 2, url:'https://www.youtube.com/watch?v=ZYb_ZU8LNxs' },
      { id: 'typescript-basics', title: 'TypeScript Basics', estimatedHours: 3, url:'https://www.youtube.com/watch?v=ZvZ7gvcmPmI' },
      { id: 'oop-js', title: 'OOP in JavaScript', estimatedHours: 3, url:'https://www.youtube.com/watch?v=PFmuCDHHpwk' },
      { id: 'event-loop', title: 'Event Loop', estimatedHours: 1.5, url:'https://www.youtube.com/watch?v=4IYcwOfW3BM' },
    ],
  },
  {
    phaseNumber: 3,
    title: 'Frontend Framework (React)',
    weekRange: 'Weeks 8–12',
    topics: [
      { id: 'react-fundamentals', title: 'React Fundamentals & Components', estimatedHours: 7, url:'https://www.youtube.com/watch?v=DLX62G4lc44' },
      { id: 'react-hooks', title: 'Hooks (useState, useEffect, useContext)', estimatedHours: 3, url:'https://www.youtube.com/watch?v=HnXPKtro4SM&t=3s' },
      { id: 'state-management', title: 'State Management', estimatedHours: 4, url:'https://www.youtube.com/watch?v=-bEzt5ISACA' },
      { id: 'react-routing', title: 'Routing (React Router)', estimatedHours: 2, url:'https://www.youtube.com/watch?v=943D7U74_sQ' },
      { id: 'nextjs-basics', title: 'Next.js Basics', estimatedHours: 3, url:'https://www.youtube.com/watch?v=ZVnjOPwW4ZA' },
    ],
  },
  {
    phaseNumber: 4,
    title: 'Backend Development',
    weekRange: 'Weeks 13–17',
    topics: [
      { id: 'nodejs-express', title: 'Node.js & Express.js', estimatedHours: 10, url:'https://www.youtube.com/watch?v=Oe421EPjeBE' },
      { id: 'rest-api', title: 'REST API Design', estimatedHours: 2, url:'https://www.youtube.com/watch?v=rtWH70_MMHM' },
      { id: 'auth-jwt', title: 'Authentication (JWT, OAuth)', estimatedHours: 2, url:'https://www.youtube.com/watch?v=nI8PYZNFtac' },
      { id: 'websockets', title: 'WebSockets', estimatedHours: 3, url:'https://www.youtube.com/watch?v=CzcfeL7ymbU' },
      { id: 'deployment', title: 'Deployment (Nginx, Cloud)', estimatedHours: 2, url:'https://www.youtube.com/watch?v=9t9Mp0BGnyI' },
    ],
  },
  {
    phaseNumber: 5,
    title: 'Databases',
    weekRange: 'Weeks 18–21',
    topics: [
      { id: 'sql-postgresql', title: 'SQL Fundamentals (PostgreSQL)', estimatedHours: 6, url:'https://www.youtube.com/watch?v=qw--VYLpxG4' },
      { id: 'nosql-mongodb', title: 'NoSQL (MongoDB)', estimatedHours: 3, url:'https://www.youtube.com/watch?v=c2M-rlkkT5o' },
      { id: 'orm-prisma', title: 'ORM (Prisma / Mongoose)', estimatedHours: 3, url:'https://www.youtube.com/watch?v=gimSKEsWYb4' },
      { id: 'db-design', title: 'Database Design Patterns', estimatedHours: 6, url:'https://www.youtube.com/watch?v=26ls5lNiijk' },
    ],
  },
  {
    phaseNumber: 6,
    title: 'Product Developer Skills',
    weekRange: 'Weeks 22–25',
    topics: [
      { id: 'ship-projects', title: 'Build & Ship 4 Novel Projects', estimatedHours: 40 },
      { id: 'case-studies', title: 'Write Project Case Studies', estimatedHours: 3, url:'https://www.youtube.com/watch?v=Mj9IGfINV1A' },
      { id: 'linkedin-optimise', title: 'LinkedIn Profile Optimization', estimatedHours: 1.5, url:'https://www.youtube.com/watch?v=K6uO-52UHTw' },
      { id: 'resume-prep', title: 'Resume Preparation', estimatedHours: 4 },
      { id: 'github-portfolio', title: 'GitHub Portfolio Curation', estimatedHours: 4 },
      { id: 'mock-interview', title: 'Mock Interview Practice', estimatedHours: 8 },
    ],
  },
];

// ─── FS + AI ─────────────────────────────────────────────────────────────────

const fsAiPhases: Phase[] = [
  ...fsCorePhases,
  {
    phaseNumber: 7,
    title: 'AI Integration',
    weekRange: 'Weeks 26–30',
    topics: [
      { id: 'ai-llm-intro', title: 'Introduction to LLMs & Transformers', estimatedHours: 6 },
      { id: 'prompt-engineering', title: 'Prompt Engineering', estimatedHours: 6 },
      { id: 'openai-api', title: 'OpenAI / Anthropic API Integration', estimatedHours: 8 },
      { id: 'langchain', title: 'LangChain Fundamentals', estimatedHours: 8 },
      { id: 'rag', title: 'RAG (Retrieval-Augmented Generation)', estimatedHours: 8 },
      { id: 'vector-db', title: 'Vector Databases (Pinecone)', estimatedHours: 6 },
      { id: 'ai-features', title: 'Building AI-Powered Features', estimatedHours: 10 },
      { id: 'huggingface', title: 'Hugging Face Models', estimatedHours: 6 },
      { id: 'ai-project', title: 'AI Project: Build an AI-powered product', estimatedHours: 20 },
    ],
  },
];

// ─── FS + Data Science ────────────────────────────────────────────────────────

const fsDsPhases: Phase[] = [
  ...fsCorePhases,
  {
    phaseNumber: 7,
    title: 'Data Science',
    weekRange: 'Weeks 26–34',
    topics: [
      { id: 'python-ds', title: 'Python for Data Science (Pandas, NumPy)', estimatedHours: 12 },
      { id: 'stats-probability', title: 'Statistics & Probability', estimatedHours: 10 },
      { id: 'data-viz', title: 'Data Visualization (Matplotlib, Seaborn)', estimatedHours: 8 },
      { id: 'ml-fundamentals', title: 'Machine Learning Fundamentals', estimatedHours: 10 },
      { id: 'supervised-learning', title: 'Supervised Learning (Regression, Classification)', estimatedHours: 10 },
      { id: 'unsupervised-learning', title: 'Unsupervised Learning (Clustering)', estimatedHours: 8 },
      { id: 'sklearn', title: 'Scikit-learn', estimatedHours: 8 },
      { id: 'model-eval', title: 'Model Evaluation & Tuning', estimatedHours: 6 },
      { id: 'ds-project', title: 'DS Project: Build a data-driven product', estimatedHours: 20 },
    ],
  },
];

// ─── FS + Data Analytics ──────────────────────────────────────────────────────

const fsDaPhases: Phase[] = [
  ...fsCorePhases,
  {
    phaseNumber: 7,
    title: 'Data Analytics',
    weekRange: 'Weeks 26–32',
    topics: [
      { id: 'sql-analytics', title: 'SQL for Analytics (Advanced Queries)', estimatedHours: 10 },
      { id: 'python-analysis', title: 'Python for Analysis (Pandas)', estimatedHours: 8 },
      { id: 'data-cleaning', title: 'Data Cleaning & Wrangling', estimatedHours: 8 },
      { id: 'tableau-powerbi', title: 'Tableau / Power BI Fundamentals', estimatedHours: 10 },
      { id: 'dashboard-design', title: 'Dashboard Design', estimatedHours: 6 },
      { id: 'ab-testing', title: 'A/B Testing & Experimentation', estimatedHours: 6 },
      { id: 'product-analytics', title: 'Product Analytics Concepts', estimatedHours: 6 },
      { id: 'analytics-project', title: 'Analytics Project: Build an analytics dashboard', estimatedHours: 20 },
    ],
  },
];

// ─── FS + DevOps ──────────────────────────────────────────────────────────────

const fsDevopsPhases: Phase[] = [
  ...fsCorePhases,
  {
    phaseNumber: 7,
    title: 'DevOps',
    weekRange: 'Weeks 26–32',
    topics: [
      { id: 'linux-shell', title: 'Linux & Shell Scripting', estimatedHours: 8 },
      { id: 'docker', title: 'Docker & Containerization', estimatedHours: 10 },
      { id: 'kubernetes', title: 'Kubernetes Basics', estimatedHours: 8 },
      { id: 'cicd', title: 'CI/CD Pipelines (GitHub Actions)', estimatedHours: 8 },
      { id: 'cloud-platforms', title: 'Cloud Platforms (AWS / GCP basics)', estimatedHours: 10 },
      { id: 'monitoring', title: 'Monitoring & Logging', estimatedHours: 6 },
      { id: 'iac', title: 'Infrastructure as Code (Terraform basics)', estimatedHours: 6 },
      { id: 'devops-project', title: 'DevOps Project: Fully automated deployment pipeline', estimatedHours: 20 },
    ],
  },
];

// ─── Export ───────────────────────────────────────────────────────────────────

export const TRACK_CONFIGS: Record<string, TrackConfig> = {
  'fs-core': {
    trackId: 'fs-core',
    trackName: 'FS Core',
    phases: fsCorePhases,
  },
  'fs-ai': {
    trackId: 'fs-ai',
    trackName: 'FS + AI',
    phases: fsAiPhases,
  },
  'fs-ds': {
    trackId: 'fs-ds',
    trackName: 'FS + Data Science',
    phases: fsDsPhases,
  },
  'fs-analytics': {
    trackId: 'fs-analytics',
    trackName: 'FS + Data Analytics',
    phases: fsDaPhases,
  },
  'fs-devops': {
    trackId: 'fs-devops',
    trackName: 'FS + DevOps',
    phases: fsDevopsPhases,
  },
};

export const TRACK_OPTIONS = [
  { id: 'fs-core', label: 'FS Core', tagline: 'The foundation every product dev needs' },
  { id: 'fs-ai', label: 'FS + AI', tagline: 'Build intelligent products with LLMs' },
  { id: 'fs-ds', label: 'FS + Data Science', tagline: 'Extract insights, build data products' },
  { id: 'fs-analytics', label: 'FS + Data Analytics', tagline: 'Make data-driven product decisions' },
  { id: 'fs-devops', label: 'FS + DevOps', tagline: 'Ship fast, ship reliably' },
];

export const PROJECT_IDEAS: Record<string, string[]> = {
  'fs-core': [
    'A personal finance tracker with bank statement CSV import',
    'A neighborhood event board with geolocation',
    'A recipe scaling app that adjusts ingredients by servings',
    'A habit tracker with streak visualization',
  ],
  'fs-ai': [
    'An AI-powered meeting notes summarizer',
    'A document Q&A tool using RAG',
    'A smart email draft assistant',
    'An AI code reviewer for GitHub PRs',
  ],
  'fs-ds': [
    'A movie recommendation engine',
    'A sentiment analysis dashboard for product reviews',
    'A predictive pricing tool for used electronics',
    'A health metrics anomaly detector',
  ],
  'fs-analytics': [
    'A YouTube channel analytics dashboard',
    'An e-commerce funnel visualizer',
    'A personal spending insights tool',
    'A Spotify listening pattern analyzer',
  ],
  'fs-devops': [
    'A self-hosted status page with uptime monitoring',
    'A zero-downtime deployment demo with blue/green switching',
    'A log aggregation dashboard',
    'An automated security scanning pipeline',
  ],
};
