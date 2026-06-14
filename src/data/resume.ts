export const profile = {
  name: 'Pratham Mandavkar',
  title: 'Full Stack Developer',
  tagline: 'React.js · Next.js · React Native · Node.js · TypeScript · AWS',
  location: 'Mumbai, India',
  phone: '+91 88303 33610',
  email: 'prathammandavkar932@gmail.com',
  linkedin: 'https://www.linkedin.com/in/prathammandavkar',
  github: 'https://github.com/prathammandavkar',
  summary:
    'Full Stack Developer with 2.6+ years of experience building scalable, user-focused web and mobile applications for fast-paced fintech startups. Skilled in React.js, Next.js, React Native, Expo, and TypeScript, with backend experience in Node.js, Express.js, and message-queue systems (RabbitMQ, Redis). Hands-on experience managing AWS cloud infrastructure (EC2, S3, SES, CloudWatch, Security Groups) for reliable, scalable application deployment. Proven track record delivering complex fintech workflows including KYC/CKYC verification, e-signature processing, and loan aggregation across web, iOS, and Android platforms.',
}

export type SkillGroup = { label: string; items: string[] }

export const skills: SkillGroup[] = [
  { label: 'Languages', items: ['TypeScript', 'JavaScript (ES6+)', 'SQL'] },
  {
    label: 'Frontend',
    items: [
      'React.js', 'Next.js', 'React Native', 'Expo', 'Redux', 'Redux Toolkit',
      'RTK Query', 'Redux Persist', 'Tailwind CSS', 'NativeWind', 'Material-UI',
      'Ant Design', 'Chakra UI',
    ],
  },
  { label: 'Backend', items: ['Node.js', 'Express.js', 'REST APIs', 'RabbitMQ', 'Redis'] },
  { label: 'Databases', items: ['MongoDB', 'PostgreSQL', 'SQL', 'Supabase'] },
  {
    label: 'Cloud & DevOps',
    items: ['AWS EC2', 'AWS S3', 'AWS SES', 'CloudWatch', 'Security Groups', 'Firebase', 'Vercel', 'Netlify', 'PM2', 'Git'],
  },
  {
    label: 'Mobile & SDKs',
    items: ['Firebase FCM', 'Firebase Crashlytics', 'Firebase Analytics', 'Facebook SDK', 'App Store', 'Google Play Console'],
  },
]

export type Experience = {
  role: string
  company: string
  period: string
  location: string
  points: string[]
}

export const experience: Experience[] = [
  {
    role: 'Frontend Developer',
    company: 'SwitchMyLoan',
    period: 'May 2025 – Present',
    location: 'Mumbai, India',
    points: [
      'Built and maintained a cross-platform fintech loan-aggregator mobile app using React Native, Expo, and TypeScript — serving iOS, Android, and Web users.',
      'Developed secure authentication flows including OTP, MPIN, and biometric login, with SSL pinning, root/jailbreak detection, and secure token storage.',
      'Architected scalable state management using Redux Toolkit, RTK Query, and Redux Persist with offline caching support.',
      'Designed a backend pipeline for high-volume Excel-based lead processing using RabbitMQ and Redis, with rate limiting and batch processing; built a reusable producer-consumer framework to standardize vendor integrations.',
      'Managed AWS infrastructure: EC2 configuration/access, S3 for lead-data storage, SES for transactional emails, CloudWatch monitoring, and security group rules.',
      'Configured PM2 process management (auto-restart, memory limits) to maintain uptime.',
      'Built complex fintech workflows including KYC/CKYC verification, e-signature document signing, and mutual fund loan processing.',
      'Integrated Firebase Crashlytics & FCM; set up dual analytics (Firebase + Facebook SDK) tracking 100+ events across critical journeys.',
      'Built and deployed high-performance Next.js websites for Rapid Money and Cready, including a custom CMS.',
    ],
  },
  {
    role: 'React.js Developer',
    company: 'WDI',
    period: 'Jul 2024 – Feb 2025',
    location: 'Mumbai, India',
    points: [
      "Designed and launched the company's main landing page and additional high-conversion landing pages with responsive, cross-browser design.",
      'Built multiple web applications in React.js, integrating Chakra UI for accessible, cohesive interfaces.',
      'Managed application state using Context API and Redux Toolkit for smooth data flow.',
      'Identified and resolved bugs to improve reliability and reduce downtime.',
    ],
  },
  {
    role: 'React.js Developer',
    company: 'Agarwal Packers and Movers',
    period: 'Nov 2023 – Jun 2024',
    location: 'Mumbai, India',
    points: [
      'Designed and developed dashboards and portals for transportation management.',
      'Integrated Leaflet.js for real-time map interactions, improving operational efficiency.',
      'Delivered website redesign concepts that were selected and shipped to production.',
      'Managed the full deployment cycle, ensuring smooth delivery and performance.',
    ],
  },
]

export type Project = {
  name: string
  blurb: string
  stack: string[]
  points: string[]
  icon: string
  accent: string
  /** logo image served from /public (overrides the emoji icon) */
  image?: string
  /** true = contain the logo on white (for wide/transparent logos) */
  imageContain?: boolean
  /** external links to live site / app store / etc. */
  links?: { label: string; href: string }[]
}

export const projects: Project[] = [
  {
    name: 'Cready',
    blurb: 'Cross-Platform Loan Aggregator',
    icon: '💳',
    image: '/cready.png',
    accent: '#5e5ce6',
    links: [
      { label: 'Website', href: 'https://www.cready.in/' },
      { label: 'Play Store', href: 'https://play.google.com/store/apps/details?id=com.creddy.app' },
    ],
    stack: ['React Native', 'Expo Router', 'NativeWind', 'Redux', 'TypeScript', 'Next.js', 'PostgreSQL'],
    points: [
      'Built scalable iOS, Android, and Web journeys for onboarding, authentication, loan aggregation, and mutual fund services.',
      'Engineered end-to-end loan workflows: CKYC/KYC verification, lending-partner integration, portfolio aggregation, and loan-against-securities.',
      'Developed the Cready web platform in Next.js + Tailwind with on-page SEO, JSON-LD structured data, and reusable UI components.',
    ],
  },
  {
    name: 'Rapid Money',
    blurb: 'Fintech Web Platform & CMS',
    icon: '⚡',
    image: '/Rapidmoney.png',
    imageContain: true,
    accent: '#7bc043',
    links: [{ label: 'Website', href: 'https://www.rapidmoney.in/' }],
    stack: ['Next.js', 'Node.js', 'Express', 'MongoDB', 'Ant Design'],
    points: [
      'Built a responsive fintech web platform with dynamic CMS-driven pages, blog content, EMI calculator, and loan landing pages.',
      'Implemented SEO metadata and structured data across pages.',
      'Developed a full-stack admin system with auth, role-based access control, approval workflows, activity logs, and media uploads.',
    ],
  },
  {
    name: 'Pi-SuperMoney',
    blurb: 'Finance Dashboard (Freelance)',
    icon: '📊',
    image: '/pi.png',
    imageContain: true,
    accent: '#1c1c1e',
    stack: ['React.js', 'Material-UI'],
    points: [
      'Developed a responsive finance dashboard with Context API state management.',
      'Integrated financial data visualizations.',
    ],
  },
  {
    name: 'WDI',
    blurb: 'Landing Pages & React Web Apps',
    icon: '🌐',
    image: '/wdipl.png',
    imageContain: true,
    accent: '#d6175f',
    links: [{ label: 'Website', href: 'https://www.wdipl.com/' }],
    stack: ['React.js', 'Chakra UI', 'Redux Toolkit', 'Context API'],
    points: [
      "Designed and launched the company's main landing page and additional high-conversion landing pages with responsive, cross-browser design.",
      'Built multiple web applications in React.js with accessible, cohesive Chakra UI interfaces.',
      'Managed application state with Context API and Redux Toolkit, and resolved bugs to improve reliability.',
    ],
  },
  {
    name: 'QuickFly',
    blurb: 'Shipment Tracking Platform (Freelance)',
    icon: '📦',
    accent: '#ff9f0a',
    links: [{ label: 'Track Shipment', href: 'https://www.quickfly.ae/track-your-shipment' }],
    stack: ['Next.js', 'Tailwind CSS', 'Supabase'],
    points: [
      'Built a full-stack shipment-tracking website with a real-time tracking system.',
      'Designed an interactive UI with secure user authentication.',
    ],
  },
]

export const education = {
  degree: 'Bachelor of Commerce (B.Com)',
  school: 'Mumbai University, Mumbai',
  period: 'July 2022 – April 2023',
}
