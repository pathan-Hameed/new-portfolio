export const services = [
  {
    slug: "whatsapp-automation",
    title: "WhatsApp Automation Systems",
    tagline:
      "Automated messaging, reminders, and workflows for customer engagement",
    description:
      "For gym owners, restaurants, small businesses who want automated reminders, broadcast messages, chatbots — built on Meta WhatsApp Business API using Node.js. Never miss a customer touchpoint again.",
    category: "Automation",
    deliverables: [
      "WhatsApp API integration and setup",
      "Automated reminder systems (payment, appointments)",
      "Broadcast messaging for bulk notifications",
      "Custom chatbot flows for customer service",
      "Message scheduling and automation",
      "Analytics and reporting dashboard",
      "24/7 support and maintenance",
    ],
    processSteps: [
      {
        number: 1,
        title: "Requirement Analysis",
        description:
          "Understand your business workflow, customer touchpoints, and automation needs",
      },
      {
        number: 2,
        title: "WhatsApp API Setup",
        description:
          "Register with Meta, configure business account, and integrate API with your backend",
      },
      {
        number: 3,
        title: "Automation Design & Build",
        description:
          "Create message templates, flows, and automation logic in Node.js",
      },
      {
        number: 4,
        title: "Testing & Deployment",
        description:
          "Full testing with real data, optimization, and live deployment",
      },
    ],
    startingPrice: "₹8,000",
    relatedProjects: ["whatsapp-reminder-system"],
  },
  {
    slug: "rest-api-development",
    title: "REST API Development",
    tagline: "Clean, documented REST APIs built with Express.js",
    description:
      "Scalable backend services built with Node.js and Express for web apps, mobile apps, or third-party integrations. Includes authentication, rate limiting, error handling, and complete API documentation.",
    category: "Backend",
    deliverables: [
      "Custom REST API design and development",
      "JWT authentication & authorization",
      "Rate limiting and security best practices",
      "Complete API documentation (Swagger/OpenAPI)",
      "Database design and optimization",
      "Error handling and validation",
      "Deployment and monitoring setup",
    ],
    processSteps: [
      {
        number: 1,
        title: "Requirements Gathering",
        description:
          "Define API endpoints, data models, and authentication strategy",
      },
      {
        number: 2,
        title: "Architecture Design",
        description: "Plan scalability, security, and database schema",
      },
      {
        number: 3,
        title: "API Development",
        description:
          "Build endpoints with Node.js/Express following best practices",
      },
      {
        number: 4,
        title: "Testing & Documentation",
        description: "Comprehensive testing and detailed API documentation",
      },
    ],
    startingPrice: "₹10,000",
    relatedProjects: ["admin-dashboard", "portfolio-website"],
  },
  {
    slug: "admin-panel-dashboards",
    title: "Admin Panel & Dashboards",
    tagline: "Custom dashboards for business control and analytics",
    description:
      "Custom dashboards built in React for managing data, users, orders, members — with charts, tables, filters, and role-based access. Control your business from a single interface.",
    category: "Frontend",
    deliverables: [
      "Responsive admin interface design",
      "Dashboard with charts and analytics",
      "Data tables with sorting and filtering",
      "User management system",
      "Role-based access control (RBAC)",
      "Real-time data updates",
      "Export functionality (CSV, PDF)",
    ],
    processSteps: [
      {
        number: 1,
        title: "Define Requirements",
        description:
          "Identify key metrics, user roles, and dashboard features needed",
      },
      {
        number: 2,
        title: "Design UI/UX",
        description:
          "Create intuitive interface with clear information hierarchy",
      },
      {
        number: 3,
        title: "Frontend Development",
        description: "Build responsive React dashboard with state management",
      },
      {
        number: 4,
        title: "Integration & Refinement",
        description:
          "Connect with APIs, test thoroughly, and optimize performance",
      },
    ],
    startingPrice: "₹12,000",
    relatedProjects: ["admin-dashboard"],
  },
  {
    slug: "full-stack-web-applications",
    title: "Full-Stack Web Applications",
    tagline: "Complete web applications from database to frontend",
    description:
      "Complete web applications from database design to frontend — Node.js backend, React frontend, MongoDB storage. Everything integrated, tested, and ready for production.",
    category: "Full-stack",
    deliverables: [
      "Full-stack application architecture",
      "Backend API with Node.js/Express",
      "React frontend with modern patterns",
      "MongoDB database design",
      "User authentication system",
      "Payment integration (optional)",
      "Deployment to production",
    ],
    processSteps: [
      {
        number: 1,
        title: "Project Planning",
        description: "Define scope, features, timeline, and technology stack",
      },
      {
        number: 2,
        title: "Backend Development",
        description: "Build API with database schema and business logic",
      },
      {
        number: 3,
        title: "Frontend Development",
        description: "Create responsive React UI connected to backend",
      },
      {
        number: 4,
        title: "Testing & Deployment",
        description: "Quality assurance and launch to production environment",
      },
    ],
    startingPrice: "₹25,000",
    relatedProjects: ["gym-website", "admin-dashboard"],
  },
  {
    slug: "gym-management-systems",
    title: "Gym Management Systems",
    tagline: "Complete system for gym owners to manage members and operations",
    description:
      "A complete system combining website, WhatsApp reminders, member management, and online client workout delivery — built specifically for gym owners in tier-2 cities. Increase member retention and reduce manual work.",
    category: "Health",
    deliverables: [
      "Gym website with programs and pricing",
      "Member management database",
      "Payment tracking and reminders",
      "WhatsApp automation integration",
      "Online workout delivery system",
      "Attendance tracking",
      "Admin dashboard for gym owners",
    ],
    processSteps: [
      {
        number: 1,
        title: "Consultation",
        description:
          "Understand gym operations, member challenges, and growth goals",
      },
      {
        number: 2,
        title: "System Design",
        description: "Plan website, member dashboard, and automation flows",
      },
      {
        number: 3,
        title: "Development",
        description: "Build all components - website, dashboard, automations",
      },
      {
        number: 4,
        title: "Training & Launch",
        description: "Train staff and deploy complete system",
      },
    ],
    startingPrice: "₹18,000",
    relatedProjects: ["gym-website", "whatsapp-reminder-system"],
  },
  {
    slug: "freelance-consulting",
    title: "Freelance Consulting",
    tagline: "Strategy and technical consulting for small businesses",
    description:
      "Strategy and technical consulting for small businesses who need guidance on what to build, how to build it, and realistic cost estimates before committing budget. Make informed decisions with expert advice.",
    category: "Consulting",
    deliverables: [
      "Business needs assessment",
      "Technology recommendations",
      "Detailed project proposal",
      "Cost estimation and timeline",
      "Team structure recommendations",
      "Implementation roadmap",
      "Ongoing advisory support",
    ],
    processSteps: [
      {
        number: 1,
        title: "Business Discovery",
        description: "Understand your business model, goals, and constraints",
      },
      {
        number: 2,
        title: "Technical Assessment",
        description:
          "Analyze your existing systems and identify improvement areas",
      },
      {
        number: 3,
        title: "Strategy Development",
        description: "Create comprehensive roadmap with recommendations",
      },
      {
        number: 4,
        title: "Consulting Support",
        description: "Ongoing guidance as you implement the strategy",
      },
    ],
    startingPrice: "₹6,000",
    relatedProjects: [],
  },
];

export const getServiceBySlug = (slug) => {
  return services.find((service) => service.slug === slug);
};
