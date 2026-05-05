export const projects = [
  {
    id: "gym-website",
    slug: "gym-website",
    number: "01",
    title: "GUTS POWER GYM",
    category: "Frontend Development",
    status: "Completed",
    description:
      "Gym website built with responsive HTML, CSS and modern interactive design.",
    challenge:
      "Gym owner needed a modern premium website to present to clients and establish digital credibility in Mahabubnagar",
    solution:
      "Built a 2-page dark theme website with hero, programs, pricing, testimonials, gallery, and WhatsApp integration",
    result: "Delivered in 3 days, gym owner approved without revisions",
    tech: ["HTML5", "CSS3", "JavaScript", "Responsive Design"],
    timeline: "3 days",
    type: "Freelance",
    client: "Guts Power Gym",
    images: [
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1400&h=788&q=85",
      "https://images.unsplash.com/photo-1517836357463-d25ddfcbf042?w=1400&h=788&q=85",
      "https://images.unsplash.com/photo-1552072092-74c88ac59ec5?w=1400&h=788&q=85",
    ],
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    id: "whatsapp-reminder-system",
    slug: "whatsapp-reminder-system",
    number: "02",
    title: "WhatsApp Reminder System",
    category: "Backend / Automation",
    status: "Completed",
    description:
      "Automated payment reminders using WhatsApp API, Node.js and MongoDB.",
    challenge:
      "Gym owner manually reminded 150 members every month — taking hours and missing many members",
    solution:
      "Built automated system with payment reminders 3 days before due date, daily workout delivery for online clients, one-click broadcast for offers",
    result:
      "Eliminated all manual reminder work, system runs 24/7 without owner involvement",
    tech: ["Node.js", "Express", "MongoDB", "Meta WhatsApp API"],
    timeline: "10 days",
    type: "Freelance",
    client: "Guts Power Gym",
    images: [
      "https://images.unsplash.com/photo-1576618148422-0ba4f7c3c460?w=1400&h=788&q=85",
      "https://images.unsplash.com/photo-1611532736579-6b16e2b50449?w=1400&h=788&q=85",
      "https://images.unsplash.com/photo-1516321318423-f06f70504c11?w=1400&h=788&q=85",
    ],
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    id: "admin-dashboard",
    slug: "admin-dashboard",
    number: "03",
    title: "Admin Dashboard",
    category: "Full-Stack",
    status: "Completed",
    description:
      "Dashboard for member management, analytics and backend control.",
    challenge:
      "Needed a clean interface to manage gym members, payment status, and online client routines in one place",
    solution:
      "Built a mobile-first dashboard with color-coded payment status, member management, and broadcast controls",
    result: "Complete operational visibility from a single phone screen",
    tech: ["React", "Node.js", "MongoDB", "Tailwind CSS"],
    timeline: "14 days",
    type: "Freelance",
    client: "Guts Power Gym",
    images: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1400&h=788&q=85",
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1400&h=788&q=85",
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1400&h=788&q=85",
    ],
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    id: "portfolio-website",
    slug: "portfolio-website",
    number: "04",
    title: "PORTFOLIO WEBSITE",
    category: "Frontend / Motion Design",
    status: "Live",
    description:
      "Premium dark design portfolio with custom cursor, 3D animations, and smooth scrolling.",
    challenge:
      "Build a portfolio that stands out from generic templates and demonstrates technical depth",
    solution:
      "Premium dark design with custom cursor, 3D cube, horizontal scroll, smooth Lenis scrolling, and GSAP scroll animations throughout",
    result:
      "You are looking at it — a portfolio that converts visitors to clients",
    tech: ["React", "Tailwind CSS", "GSAP", "Framer Motion", "Lenis"],
    timeline: "Ongoing",
    type: "Personal Project",
    client: "Self",
    images: [
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1400&h=788&q=85",
      "https://images.unsplash.com/photo-1517694712556-74f1d95c5b1d?w=1400&h=788&q=85",
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1400&h=788&q=85",
    ],
    liveUrl: "#",
    githubUrl: "#",
  },
];

export const getProjectById = (id) => {
  return projects.find((project) => project.id === id);
};

export const getProjectBySlug = (slug) => {
  return projects.find((project) => project.slug === slug);
};
