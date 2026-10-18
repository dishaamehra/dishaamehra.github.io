/* ===================================================================
   SINGLE DATA FILE. Edit content here; the page layout never changes.
   - visible:false hides an item (or a whole section) everywhere.
   - Missing/empty values are simply left out of the page.
   - To add a project, copy one object in PROJECTS and edit it.
   =================================================================== */
window.SITE = {
  name: "Dishaa Mehra",
  intro: "Computer Science (AI) student at IGDTUW, graduating in 2028. Exploring AI/ML and software engineering through projects and internships, with interests in full-stack development and building practical applications.",
  photo: "assets/image_profile.jpeg",
  about: [
    "I am Dishaa, a third-year CS (AI) student at IGDTUW who likes understanding how things work by building them myself." ,
    "I've explored different areas, from AI/ML projects to backend and full-stack development, and I enjoy the process of taking an idea and figuring out how to make it work.",
    "I'm still exploring where I want to specialise, but I know I want to build solid software, understand the fundamentals behind it, and keep challenging myself with projects that teach me something new."
  ],
  card: [
    ["Name", "Dishaa Mehra"],
    ["Class", "Third-year B.Tech"],
    ["Major", "CS (Artificial Intelligence)"],
    ["School", "Indira Gandhi Delhi Technical University for Women"],
    ["Graduates", "2028"]
  ],
  links: {                      // leave a value null to omit that link
    github:   "https://github.com/dishaamehra",
    linkedin: "https://www.linkedin.com/in/dishaa-mehra-339082329/",             // add the profile URL when ready
    email:    "dishaamehra23@gmail.com",             // e.g. "you@example.com" (shown as a mailto link)
    phone:    "+91 93184 42092",             // e.g. "+91 98765 43210" (shown as a tap-to-call link)
    resume:   "https://drive.google.com/file/d/1wPMxL_c2XIAz3o_jUKYc1AucphfdBfhB/view?usp=sharing"              // e.g. "assets/resume.pdf" (copy the PDF into /assets first)
  },
  /* Order here = order on the page and in the nav. visible:false removes
     the section from both. Sections with no content hide automatically. */
  sections: [
    { id: "home",         label: "Home",         visible: true },
    { id: "projects",     label: "Projects",     visible: true, sub: "Select a project to read the details." },
    { id: "about",        label: "About",        visible: true },
    { id: "experience",   label: "Experience",   visible: true },
    { id: "education",    label: "Education",    visible: true },
    { id: "skills",       label: "Skills",       visible: true },
    { id: "coursework",   label: "Coursework",   visible: true },
    { id: "achievements", label: "Achievements", visible: true },
    { id: "certificates", label: "Certificates", visible: false },  // set true to enable
    { id: "resume",       label: "Résumé",       visible: true },
    { id: "contact",      label: "Contact",      visible: true }
  ]
};

window.PROJECTS = [
  { name: "SkinScanAI", visible: true, featured: true, type: "own",
    repo: "https://github.com/dishaamehra/SkinScanAI", demo: null,
    description: "Built a multiclass skin-lesion classification system using dermoscopic images, exploring ResNet50, EfficientNetB0 and InceptionV3 with transfer learning and ensemble learning. Used Grad-CAM to interpret model predictions.",
    stack: ["Python", "PyTorch", "CNNs", "Transfer learning", "Ensemble learning", "Grad-CAM"],
    note: "Experimental and educational project. It is not a clinically validated diagnostic tool." },

  { name: "IntelliJect", visible: true, featured: true, type: "fork",
    forkOf: { name: "IntelliJect/IntelliJect_project1", url: "https://github.com/IntelliJect/IntelliJect_project1" },
    repo: "https://github.com/dishaamehra/IntelliJect_project1", demo: null,
    description: "Developed a RAG-based educational retrieval system that retrieves relevant previous-year questions from academic PDFs using FAISS, OpenAI embeddings and MMR reranking.",
    stack: ["Python", "Streamlit", "FAISS", "OpenAI embeddings", "LangChain", "PDF processing"] },

  { name: "AAINA", visible: true, featured: false, type: "own",
    repo: "https://github.com/dishaamehra/AAINA", demo: null,
    description: "An AI-powered decision-support platform concept that helps people check whether a plan is realistic before they start. In early development, with the project foundation in place.",
    stack: ["React", "TypeScript", "Tailwind CSS", "Firebase", "Gemini"] },

  { name: "Focusnest-ai", visible: true, featured: false, type: "own",
    repo: "https://github.com/dishaamehra/Focusnest-ai", demo: null,
    description: "An AI-assisted study planner concept with a daily and weekly task planner, a Pomodoro timer with study-session tracking, and AI-generated reflections and weekly reports.",
    stack: ["React", "TypeScript", "Vite", "Express", "Tailwind CSS", "Gemini API"] },

  { name: "AWS Leaderboard", visible: true, featured: false, type: "own",
    repo: "https://github.com/dishaamehra/leaderboard_aws", demo: null,
    description: "Built a leaderboard interface for displaying team rankings and comparing standings. Standings are maintained in a spreadsheet and converted to JSON with a Python script, so updates are manual rather than real-time.",
    stack: ["HTML", "CSS", "JavaScript", "Python", "Excel"] }
  // Not listed on purpose: Remedium work stays under Experience only.
];

window.EXPERIENCE = [
  { visible: true, role: "Software Development Intern", org: "Remedium Enterprises Pvt. Ltd.", period: "June to July 2026",
    summary: "Contributed to an internal inventory and order management system using React, Supabase and PostgreSQL. Worked on database-backed application workflows, inventory monitoring, purchase recommendations and Docker-based development." },
  { visible: true, role: "Research Intern", org: "Anveshan Foundation, IGDTUW", period: "June to July 2025",
    summary: "Completed a six-week internship in Computer Vision and Deep Learning, working on medical image classification pipelines using transfer learning, data augmentation, class balancing and hyperparameter tuning." }
];

window.EDUCATION = [
  { visible: true, school: "Indira Gandhi Delhi Technical University for Women (IGDTUW)",
    degree: "B.Tech in Computer Science (Artificial Intelligence)", period: "2024 to 2028", cgpa: "9.13/10" }
];

window.SKILLS = [
  {
    group: "Languages",
    items: ["C++", "Java", "Python", "SQL", "JavaScript"]
  },
  {
    group: "ML / DL",
    items: ["Machine Learning", "Deep Learning", "PyTorch", "Computer Vision"]
  },
  {
    group: "GenAI",
    items: ["RAG", "LangChain", "LLMs"]
  },
  {
    group: "Web / Backend",
    items: ["React", "REST APIs", "Supabase", "PostgreSQL"]
  },
  {
    group: "Tools",
    items: ["Git", "Docker"]
  }
];

/* Only items with show:true appear. The rest are suggestions: confirm,
   then switch show to true. */
window.COURSEWORK = [
  { name: "Machine Learning",                show: true },
  { name: "Data Structures and Algorithms",  show: true },
  { name: "Database Management Systems",     show: true },
  { name: "Object-Oriented Programming",     show: true },
  { name: "Operating Systems",               show: true },
  { name: "Computer Networks",               show: true },
  { name: "Deep Learning",                   show: false }
];

window.ACHIEVEMENTS = [  // certificate: optional URL
  { visible: true, title: "Hackground India 2K25", result: "Winner among 3,000+ participants, for IntelliJect.", certificate: null },
  { visible: true, title: "Ace The Panel, Innerve 2026", result: "First place.", certificate: null },
  { visible: true, title: "CodeX 2.0 Hackathon", result: "Top finalist among 700+ teams.", certificate: null }
];

window.CERTIFICATES = [  // hidden until sections.certificates.visible is true
  // { visible: true, title: "Course or credential name", issuer: "Issuer", year: "2026", url: "https://..." }
];