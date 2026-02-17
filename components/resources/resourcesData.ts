export type Difficulty = 'Beginner' | 'Intermediate' | 'Advanced';
export type ResourceType = 'YouTube' | 'Docs' | 'Course' | 'Udemy' | 'Channel';

export type Resource = {
  emoji: string;
  title: string;
  url: string;
  duration?: string;
  difficulty?: Difficulty;
  description: string;
  type: ResourceType;
};

export type TrackData = {
  label: string;
  description: string;
  resources: Resource[];
};

export const TABS: { id: string; label: string }[] = [
  { id: 'fs-core', label: 'FS Core' },
  { id: 'fs-ai', label: 'FS + AI' },
  { id: 'fs-ds', label: 'FS + Data Science' },
  { id: 'fs-analytics', label: 'FS + Data Analytics' },
  { id: 'fs-devops', label: 'FS + DevOps' },
];

export const resources: Record<string, TrackData> = {
  'fs-core': {
    label: 'Core Full-Stack Development',
    description: 'Comprehensive tutorials to master full-stack web development from the ground up.',
    resources: [
      {
        emoji: '📚',
        title: 'What is FullStack Development?',
        url: 'https://www.youtube.com/watch?si=aRRhxS5Li5_83DUW&v=7NaeDBTRY1k&feature=youtu.be',
        duration: '15 mins',
        difficulty: 'Beginner',
        description: 'A comprehensive introduction to full-stack development concepts and practices.',
        type: 'YouTube',
      },
      {
        emoji: '⚛️',
        title: 'MERN Stack Full Course',
        url: 'https://www.youtube.com/watch?si=6_5XdLheWig5r9aA&v=O3BUHwfHf84&feature=youtu.be',
        duration: '8 hours',
        difficulty: 'Intermediate',
        description: 'Learn to build full-stack applications using MongoDB, Express, React, and Node.js.',
        type: 'YouTube',
      },
      {
        emoji: '🅰️',
        title: 'MEAN Stack Complete Tutorial',
        url: 'https://www.youtube.com/watch?si=m55X-qcBOLyva08K&v=48SUuk8e55c&feature=youtu.be',
        duration: '6 hours',
        difficulty: 'Intermediate',
        description: 'Master the MEAN stack with this comprehensive tutorial series.',
        type: 'YouTube',
      },
      {
        emoji: '🏗️',
        title: 'Building Applications with MEAN Stack',
        url: 'https://www.youtube.com/watch?si=M7GprGyiFzp7VwoB&v=GcYxQ0A7tVM&feature=youtu.be',
        duration: '4 hours',
        difficulty: 'Advanced',
        description: 'Advanced techniques for building scalable applications with the MEAN stack.',
        type: 'YouTube',
      },
      {
        emoji: '📝',
        title: 'TypeScript Full Tutorial for Beginners',
        url: 'https://www.youtube.com/watch?si=UvJs1POLN2XS-Ufd&v=SpwzRDUQ1GI&feature=youtu.be',
        duration: '3 hours',
        difficulty: 'Beginner',
        description: 'Master TypeScript fundamentals and best practices.',
        type: 'YouTube',
      },
      {
        emoji: '🚀',
        title: 'Complete Next.js Tutorial',
        url: 'https://www.youtube.com/watch?si=RMcFSt9xOD8HfMpj&v=wm5gMKuwSYk&feature=youtu.be',
        duration: '4 hours',
        difficulty: 'Intermediate',
        description: 'Master Next.js, the React framework for production.',
        type: 'YouTube',
      },
      {
        emoji: '🐍',
        title: 'FARM Stack Full Course',
        url: 'https://www.youtube.com/watch?si=1HN8Rsimtz1bmsnW&v=PWG7NlUDVaA&feature=youtu.be',
        duration: '5 hours',
        difficulty: 'Intermediate',
        description: 'Learn to build applications with FastAPI, React, and MongoDB.',
        type: 'YouTube',
      },
      {
        emoji: '🐘',
        title: 'Building Apps with FastAPI and PostgreSQL',
        url: 'https://www.youtube.com/watch?si=zVuLFHTFX_yPiYTZ&v=398DuQbQJq0&feature=youtu.be',
        duration: '3 hours',
        difficulty: 'Intermediate',
        description: 'Learn to build robust applications using FastAPI with PostgreSQL.',
        type: 'YouTube',
      },
    ],
  },

  'fs-ai': {
    label: 'Full-Stack + AI Development',
    description: 'Master AI integration in full-stack applications.',
    resources: [
      {
        emoji: '🤖',
        title: 'LLMs Mastery: Complete Guide to Transformers & Generative AI',
        url: 'https://www.udemy.com/course/llms-mastery-complete-guide-to-transformers-generative-ai/?couponCode=KEEPLEARNING',
        duration: '10+ hours',
        difficulty: 'Advanced',
        description: 'Comprehensive course covering Large Language Models, Transformers architecture, and practical implementation.',
        type: 'Udemy',
      },
      {
        emoji: '🧠',
        title: 'Generative AI for Developers',
        url: 'https://www.youtube.com/watch?si=IfW3YA2iFxHFXdjS&v=F0GQ0l2NfHA&feature=youtu.be',
        duration: '1 hours',
        difficulty: 'Beginner',
        description: 'Learn how to integrate generative AI into your applications.',
        type: 'YouTube',
      },
      {
        emoji: '📚',
        title: 'RAG Fundamentals and Advanced Techniques',
        url: 'https://www.youtube.com/watch?si=Dx2uSybNHafoQgD7&v=ea2W8IogX80&feature=youtu.be',
        duration: '45 mins',
        difficulty: 'Intermediate',
        description: 'Master Retrieval-Augmented Generation for building advanced AI applications.',
        type: 'YouTube',
      },
    ],
  },

  'fs-ds': {
    label: 'Full-Stack + Data Science',
    description: 'Master data science and machine learning for full-stack applications.',
    resources: [
      {
        emoji: '🎓',
        title: 'Krish Naik',
        url: 'https://www.youtube.com/@krishnaik06',
        description: 'Hands-on machine learning tutorials with real-world applications.',
        type: 'Channel',
      },
      {
        emoji: '📊',
        title: 'StatQuest with Josh Starmer',
        url: 'https://www.youtube.com/c/joshstarmer',
        description: 'Best resource for understanding machine learning mathematics and statistics.',
        type: 'Channel',
      },
      {
        emoji: '🆓',
        title: 'freeCodeCamp.org',
        url: 'https://www.youtube.com/c/Freecodecamp',
        description: 'Complete 6+ hour courses on machine learning and data science.',
        type: 'Channel',
      },
      {
        emoji: '📚',
        title: 'Simplilearn',
        url: 'https://www.youtube.com/c/SimplilearnOfficial',
        description: 'Conceptual clarity and comprehensive courses on data science.',
        type: 'YouTube',
      },
      {
        emoji: '🔬',
        title: 'IBM Data Science Professional Certificate',
        url: 'https://www.coursera.org/professional-certificates/ibm-data-science',
        duration: '10 courses, 3 - 4 months',
        difficulty: 'Beginner',
        description: 'Comprehensive program covering data science fundamentals and tools.',
        type: 'Course',
      },
      {
        emoji: '🎯',
        title: 'Machine Learning Specialization by Andrew Ng',
        url: 'https://www.coursera.org/learn/machine-learning',
        duration: '11 weeks, 4 - 6 hours/week',
        difficulty: 'Intermediate',
        description: 'Create professional charts, heatmaps, and statistical plots with Matplotlib and Seaborn.',
        type: 'Course',
      },
    ],
  },

  'fs-analytics': {
    label: 'Full-Stack + Data Analytics',
    description: 'Master data analytics alongside full-stack development.',
    resources: [
      {
        emoji: '📊',
        title: 'Alex The Analyst',
        url: 'https://www.youtube.com/c/AlexTheAnalyst',
        description: 'Comprehensive tutorials on SQL, Python, Tableau, and data analysis techniques.',
        type: 'Channel',
      },
      {
        emoji: '📈',
        title: 'Luke Barousse',
        url: 'https://www.youtube.com/c/LukeBarousse',
        description: 'Practical data science and analytics tutorials with real-world applications.',
        type: 'Channel',
      },
      {
        emoji: '🎓',
        title: 'Google Data Analytics Professional Certificate',
        url: 'https://www.coursera.org/professional-certificates/google-data-analytics',
        duration: '6 months, 10 hours/week',
        difficulty: 'Beginner',
        description: 'Comprehensive program covering data analysis, visualization, and SQL.',
        type: 'Course',
      },
      {
        emoji: '🐍',
        title: 'Data Analysis with Python',
        url: '#',
        duration: '4 weeks, 4 - 5 hours/week',
        difficulty: 'Intermediate',
        description: 'Learn data analysis using Python, pandas, and data visualization libraries.',
        type: 'Course',
      },
    ],
  },

  'fs-devops': {
    label: 'Full-Stack + DevOps',
    description: 'Master DevOps practices alongside full-stack development.',
    resources: [
      {
        emoji: '🐳',
        title: 'Docker Tutorial for Beginners',
        url: 'https://www.youtube.com/watch?v=kTp5xUtcalw',
        duration: '3 hours',
        difficulty: 'Beginner',
        description: 'Learn Docker fundamentals and containerization.',
        type: 'YouTube',
      },
      {
        emoji: '🚀',
        title: 'Kubernetes Tutorial',
        url: 'https://www.youtube.com/watch?v=kTp5xUtcalw',
        duration: '2 hours',
        difficulty: 'Beginner',
        description: 'Master Kubernetes for container orchestration.',
        type: 'YouTube',
      },
      {
        emoji: '🔄',
        title: 'CI/CD Pipeline Tutorial',
        url: 'https://www.youtube.com/watch?si=gmUvoNUm5BV22LHM&v=YLtlz88zrLg&feature=youtu.be',
        duration: '45 mins',
        difficulty: 'Beginner',
        description: 'Learn to set up continuous integration and deployment.',
        type: 'YouTube',
      },
      {
        emoji: '☁️',
        title: 'AWS DevOps Tutorial',
        url: 'https://www.youtube.com/watch?si=RnkNSgbZdtAL4m0e&v=c3Cn4xYfxJY&feature=youtu.be',
        duration: '1 hour',
        difficulty: 'Beginner',
        description: 'Learn AWS services for DevOps implementation.',
        type: 'YouTube',
      },
      {
        emoji: '🛠️',
        title: 'DevOps Tools Overview',
        url: 'https://www.youtube.com/watch?v=Wvf0mBNGjXY',
        duration: '3 hours',
        difficulty: 'Intermediate',
        description: 'Comprehensive guide to essential DevOps tools.',
        type: 'YouTube',
      },
    ],
  },
};
