/**
 * Careers page copy and application choices.
 * The page renders this data; individual openings are not listed here.
 */

export const careerCategories = [
  {
    title: "AI & Automation",
    roles:
      "AI engineers, automation specialists, AI agent developers, workflow automation experts.",
    tags: "Engineering · Product · Innovation",
  },
  {
    title: "Creative & Digital Marketing",
    roles:
      "Content strategists, graphic designers, video editors, performance marketers, SEO specialists.",
    tags: "Creative · Content · Growth",
  },
  {
    title: "Sales & Business Development",
    roles:
      "Business development executives, sales professionals, lead generation specialists, client relationship managers.",
    tags: "Revenue · Partnerships · Client Success",
  },
  {
    title: "Technology & Product",
    roles:
      "Web developers, UI/UX designers, software testers, project managers, product specialists.",
    tags: "Development · Design · Delivery",
  },
] as const;

export const careerLocations = ["Dubai, UAE", "Bengaluru, India", "Remote / Flexible"] as const;

export const careerPage = {
  hero: {
    kicker: "Careers at BrandSparkX",
    title: "Build What's Next. Grow Beyond Limits.",
    intro:
      "Join the people shaping the future of AI, automation, technology, and digital growth. At BrandSparkX, we turn bold ideas into intelligent solutions that help businesses move forward.",
    places: "Dubai · Bengaluru · Opportunities across teams",
  },
  chapter: {
    title: "Your next chapter starts here.",
    text: "We're looking for curious minds, creative thinkers, problem-solvers, and ambitious people who want to do meaningful work. Whether you build technology, create campaigns, automate workflows, or drive business growth, there's room to make an impact.",
  },
  opportunities: {
    title: "Find your place at BrandSparkX",
    note: "Suggested hiring categories. Publish individual openings when the roles are approved.",
  },
  culture: {
    title: "Think boldly. Build intelligently. Grow together.",
    intro:
      "At BrandSparkX, we believe the future belongs to people who are willing to learn, adapt, and build. We value ownership over excuses, curiosity over assumptions, collaboration over silos, and measurable impact over activity alone.",
    values: [
      {
        title: "Stay curious",
        text: "Keep learning and experimenting with emerging technologies.",
      },
      {
        title: "Take ownership",
        text: "Bring solutions, not just problems.",
      },
      {
        title: "Move with purpose",
        text: "Focus on work that creates genuine value.",
      },
      {
        title: "Grow together",
        text: "Share knowledge, respect different perspectives, and celebrate collective progress.",
      },
    ],
  },
  process: {
    title: "How our hiring process works",
    steps: [
      {
        title: "Apply online",
        text: "Share your details, resume or portfolio, and the role you're interested in.",
      },
      {
        title: "Initial conversation",
        text: "We learn about your experience, strengths, interests, and career goals.",
      },
      {
        title: "Skills assessment",
        text: "Depending on the role, complete a practical task or technical discussion.",
      },
      {
        title: "Meet the team",
        text: "Discuss the role, expectations, ways of working, and mutual fit.",
      },
      {
        title: "Welcome to BrandSparkX",
        text: "Successful candidates receive an offer with the role, compensation, and employment terms.",
      },
    ],
  },
  apply: {
    title: "Let's build something meaningful.",
    intro:
      "Have the skills, curiosity, and drive to make a difference? Tell us about yourself. If there isn't a suitable opening today, you can still express interest in future opportunities.",
  },
  closing: {
    title: "Your talent. Our ambition. The future we build together.",
    text: "Don't see the right role? We're always interested in connecting with people who bring fresh ideas, strong skills, and a builder's mindset.",
  },
} as const;
