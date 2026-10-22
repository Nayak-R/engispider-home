/**
 * Services and the technology stack.
 *
 * The stack below is the one actually used across the Engispider codebases
 * (Java 17 / Spring Boot 3.3 / MySQL 8 / React / Flutter / Vite). The previous
 * homepage advertised Node.js, MongoDB, PostgreSQL, AWS and GraphQL — none of
 * which appear in the products it was advertising. A buyer's technical
 * evaluator checks this, and so does an AI engine summarising capabilities.
 */

export type Service = {
  slug: string;
  title: string;
  /** Benefit-led one-liner for cards. */
  tagline: string;
  description: string;
  deliverables: string[];
};

export const SERVICES: Service[] = [
  {
    slug: 'custom-software',
    title: 'Custom software development',
    tagline: 'Systems built around your process, not the other way round.',
    description:
      'End-to-end development of business systems — requirements through architecture, build, deployment and support. The same stack and engineering conventions behind our own products.',
    deliverables: [
      'Requirements analysis and system architecture',
      'Backend services on Java and Spring Boot',
      'Web front ends on React and TypeScript',
      'Database design and migration on MySQL',
      'Deployment, documentation and handover',
    ],
  },
  {
    slug: 'saas-development',
    title: 'SaaS & multi-tenant platforms',
    tagline: 'One deployment, many customers, no data crossing tenants.',
    description:
      'Multi-tenant product development with per-tenant configuration, quotas and isolation enforced server-side — the architecture behind Engispider Site Manager and our Engispider Comms.',
    deliverables: [
      'Multi-tenant data model and tenant scoping',
      'Subscription, quota and usage metering',
      'Role-based access control and JWT authentication',
      'Admin and tenant-facing dashboards',
      'Per-tenant configuration and white-labelling',
    ],
  },
  {
    slug: 'web-applications',
    title: 'Web application development',
    tagline: 'Fast, accessible interfaces for software people use all day.',
    description:
      'Web applications designed for operators — the people entering orders, approving fees and checking stock — where speed and clarity matter more than decoration.',
    deliverables: [
      'React and TypeScript single-page applications',
      'Next.js sites with server rendering and static export',
      'Design systems and component libraries',
      'Accessibility and performance work',
      'Progressive web apps',
    ],
  },
  {
    slug: 'mobile-apps',
    title: 'Mobile app development',
    tagline: 'One Flutter codebase, Android and iOS.',
    description:
      'Cross-platform mobile applications on Flutter, including offline-capable operational apps and kiosk builds.',
    deliverables: [
      'Flutter apps for Android and iOS',
      'Offline-first data sync',
      'Device integrations — printers, scanners, biometric readers',
      'Play Store and App Store release management',
    ],
  },
  {
    slug: 'integrations',
    title: 'Integrations',
    tagline: 'Payments, WhatsApp and SMS, wired in properly.',
    description:
      'Third-party integration work: payment gateways with reconciliation, WhatsApp Business messaging, SMS gateways, accounting systems and biometric devices.',
    deliverables: [
      'Payment gateway integration with automatic reconciliation',
      'WhatsApp Business API messaging',
      'SMS gateway and transactional email',
      'Biometric attendance device integration',
      'REST API design, documentation and versioning',
    ],
  },
  {
    slug: 'cloud-devops',
    title: 'Cloud & DevOps',
    tagline: 'Deploys that are boring, on purpose.',
    description:
      'Containerised deployment, CI/CD pipelines, monitoring and database operations on Google Cloud Platform and VPS infrastructure.',
    deliverables: [
      'Docker containerisation and Kubernetes orchestration',
      'CI/CD pipelines and release automation',
      'Google Cloud Platform and VPS deployment',
      'Database backup, restore and disaster recovery',
      'Monitoring, logging and alerting',
    ],
  },
];

/**
 * Grouped so the homepage can show structure rather than a flat word cloud.
 */
export const TECH_STACK = [
  {
    group: 'Backend',
    items: ['Java 17', 'Spring Boot', 'Spring Security', 'Microservices', 'Kafka', 'REST APIs'],
  },
  {
    group: 'Frontend',
    items: ['React', 'TypeScript', 'Next.js', 'Vite', 'Tailwind CSS'],
  },
  {
    group: 'Mobile',
    items: ['Flutter', 'Dart'],
  },
  {
    group: 'Data',
    items: ['MySQL', 'Flyway', 'Redis'],
  },
  {
    group: 'Infrastructure',
    items: ['Docker', 'Kubernetes', 'Google Cloud Platform', 'CI/CD', 'Nginx'],
  },
] as const;

/**
 * How we work. Five stages, each with a concrete output — a process section
 * that names deliverables is useful; one that says "we plan, we build, we
 * support" is not.
 */
export const PROCESS = [
  {
    step: '01',
    title: 'Discovery',
    description: 'We map your current process, the people in it and what actually breaks.',
    output: 'Scope document and a fixed-price estimate',
  },
  {
    step: '02',
    title: 'Design & architecture',
    description: 'Screens, data model and system design, reviewed with you before any code.',
    output: 'Clickable designs and a technical architecture',
  },
  {
    step: '03',
    title: 'Build',
    description: 'Phase-by-phase delivery — each phase is database, backend and front end, finished and demoable.',
    output: 'Working software at the end of every phase',
  },
  {
    step: '04',
    title: 'Deploy & train',
    description: 'Production deployment, data migration from your existing system, and training your team on it.',
    output: 'Live system and a trained team',
  },
  {
    step: '05',
    title: 'Support',
    description: 'Ongoing maintenance, updates and enhancements under a support agreement.',
    output: 'Agreed response times and a named contact',
  },
] as const;
