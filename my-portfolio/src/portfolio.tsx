import { useEffect, useMemo, useState } from "react";
import { Github, Linkedin, ExternalLink, Moon, Sun, MapPin } from "lucide-react";
import { motion } from "framer-motion";

// ✅ Single-file, drop-in React portfolio component
// - Tailwind for styling
// - Dark mode toggle
// - Edit the DATA object below

const BASE = import.meta.env.BASE_URL;
const asset = (p?: string) =>
  p ? (p.startsWith("http") ? p : `${BASE}${p.replace(/^\/+/, "")}`) : "";

const DATA = {
  name: "Kiersten Roth",
  headline: "Hi, I'm Kiersten",
  title: "Student | Engineer",
  location: "Los Angeles, CA",
  bio: `I'm a Software and Data Engineering Intern at Greenopia and I'm studying Data Science with concentrations in CS and Bioinformatics at UCLA! I have experience in startup consulting, computational biology research, data engineering, and full-stack development. I'm currently exploring the healthtech startup space and would love to discover more about the analytical marketing industry. I'm an aspiring Data Engineer and love meeting new people. Nice to meet you!`,
  aboutParagraph:
    `Outside of academics and work, I enjoy photography, journalling, marketing/creative directing and discovering new coffee spots. Currently, I'm exploring film photography and my favorite coffee spot is Stagger!`,
  email: "kierroth12@g.ucla.edu",
  socials: {
    github: "https://github.com/kierro1209",
    linkedin: "https://www.linkedin.com/in/kiersten-roth/",
    website: "https://github.com/kierro1209/personal",
  },
  // Education entries
  education: [
    {
      logo: asset("/logos/ucla.png"), // put logo image in public/logos
      school: "University of California, Los Angeles",
      degree: "B.S. Statistics & Data Science (Minors: Data Science Engineering, Bioinformatics)",
      time: "2024 – 2028 ",
      details: "GPA 3.85. Coursework: Linear Algebra, SQL, Data Structures and Algorithms, OOP (Java/C++/Python), R programming, Regression and Modelling Techniques",
    },
  ],
  // Experience entries
  experiences: [
    {
      logo: asset("/logos/AZ-logo.png"),
      title: "Incoming Data Engineering Intern",
      org: "AstraZeneca",
      time: "June 2026 – Present",
      details: "Working under the Manufacturing & IT teams.",
    },
    {
      logo: asset("/logos/greenopia.png"),
      title: "Data and Software Engineering Intern",
      org: "Greenopia",
      time: "June 2025 – Present",
      details: "Engineered internal customer management tools, enriched over 30k business's data for production, built backend architecture to automate data transfer for over 400 businesses into mobile app."},
    {
      logo: asset("/logos/bhc.png"),
      title: "Director of Technology // Project Manager",
      org: "Bruin Health Consulting",
      time: "June 2025 – Present",
      details: "Built MVP for consumer facing platform for Greenopia, built app for startup accelerator that was integrated into their current app suite, and building backend architecture solutions for Fortune 500 Pharmaceutical Companies.",
    },
    {
      logo: asset("/logos/dsu-logo.png"),
      title: "Data Analyst",
      org: "Data Science Union",
      time: "Mar 2025 – Present",
      details: "Built part of production pipeline for Michelin Connected Fleet's braking intelligence system, reducing individual reporting times by 20%.",
    },
    {
      logo: asset("/logos/VEST-Logo.PNG"),
      title: "President of VEST // Marketing Director",
      org: "VEST @ UCLA",
      time: "Jan 2025 – Present",
      details: "Lead UCLA's premier tech-focused entreprenuership club, securing sponsorships with YC-backed companies and maintaining VC relationships with major firms to help fund UCLA student founders.",
    },
    {
      logo: asset("/logos/bsa-logo.png"),
      title: "Machine Learning Researcher // Data Journalist",
      org: "Bruin Sports Analytics",
      time: "Oct 2024 – Jun 2025",
      details: "Developed XGBoost models on shot prediction using on court factors, published article analyzing F1 pit stop times, worked on NFL draft Prediction model.",
    },
    {
      logo: asset("/logos/uci_logo.png"),
      title: "Student Researcher",
      org: "COSMOS @ UCI",
      time: "July 2023",
      details: "Alzheimer’s research applying computational methods to test if low-cost methods are effective at determining brain degeneration in patients.",
    },
    {
      logo: asset("/logos/stanford logo.png"),
      title: "AI Institute Student",
      org: "Stanford Pre-Collegiate AI Insitute",
      time: "July 2022",
      details: "Studied AI techniques and mathematics under Stanford PhD students, completing undergrad level problem sets as a sophomore in high school.",
    },
  ],
  // Projects entries
  projects: [
    {
      title: "Greenopia Data Redesign & App",
      blurb:
        "Reorganized entire database of 300k+ businesses, led data engineering efforts, building web scraping pipelines to enrich 30k+ business's data, built frontend pages of web app, collaborated on data strategy with executive leadership.",
      tech: ["Firebase", "Sheets", "Pandas", "React"],
      links: { live: "https://app.greenopia.com/discover/", repo: "" },
      logo: asset("/logos/greenopia.png"), // small assoc logo bottom-right (optional)
    },
    {
      title: "Genetic Pathogencity Classifier",
      blurb:
        "Work in Progress Using open source genetic data to classify possible expression levels.",
      tech: ["Python", "RandomForest", "ClinVar", "React"],
      
      links: { live: "", repo: "https://github.com/kierro1209/genetic_variant_classifier" },
      logo: asset("/logos/dsu-logo.png"),
    },
    {
      title: "BR.AI.N Segmentation UI",
      blurb:
        "Medical imaging toolkit: U-Net inference with a React analytics dashboard for clinicians.",
      tech: ["PyTorch", "React", "FastAPI"],
      links: { live: "", repo: "https://github.com/kierro1209/br.ai.n" },
      logo: '',
    },
    {
      title: "Lookbk Content Automation App",
      blurb:
        "Create short-form videos using keywords and reactions. I designed the stitching feature.",
      tech: ["RunwayML", "MoviePy", "FastAPI"],
      links: { live: "", repo: "" },
      logo: asset("/logos/VEST-Logo.PNG"),
    },
    {
      title: "Michelin Connected Fleet Braking Intelligence System",
      blurb:
        "I built a portion of the pipeline responsible for dynamically calculating possible reductions in braking score thresholds before scores may be reported and used by drivers, fleet manageers, and maintenance crews.",
      tech: ["Python", "Pandas"],
      links: { live: "", repo: "" },
      logo: asset("/logos/MCF-logo.png"),
    },
    {
      title: "Polaris",
      blurb:
        "🏆 Winner of Best Social Impact Award. For LA Hacks 2026, my team and I built an agentic hospital paging system, integrating options for EHR & voice-dictated descriptions to be used as context for paging as well as a visual communication interface for hospital operators to view clinician locations within medical buildings.",
      tech: ["Fetch AI", "Python", "FastAPI", "Framer"],
      links: { live: "https://devpost.com/software/polaris-mh7rd8?_gl=1*1pbtemz*_gcl_au*MTUwMjc4NzMxMC4xNzc3MTkwNjMx*_ga*MTM0OTExNzU4OS4xNzc3MTkwNjMy*_ga_0YHJK3Y10M*czE3NzcyMzYyOTEkbzIkZzEkdDE3NzcyMzc3MTQkajQ3JGwwJGgw", repo: "" },
      logo: asset("/logos/lahacks-logo.png"),
    },
    {
      title: "Sex-Stratified Statin Toxicity Prediction: A Multi-Modal ML Approach to Incorporating Hormonal Covariates",
      blurb:
        "🏆 Winner of Best Software/Algorithm Award. For InTranscription's Biohackathon 2026, we built an ML architecture that quantifies risk for female patients who may require statin medication.",
      tech: ["SciKitLearn", "PharmGKB", "NHANES", "FAERS"],
      links: { live: "", repo: "https://github.com/kierro1209/statin_predictor" },
      logo: asset("/logos/inT-logo.png"),
    },
    {
      title: "Tokenizing Patient Medical History for Resource Allocation Optimization",
      blurb:
        "My team and I designed a token structure to capture patient medical history as a sequence, applying next-token generation and reinforcement learning to predict when, where, and what they'll need to optimize resource allocation at scale to help improve care for millions.",
      tech: ["Python", "PyTorch", "SB3"],
      links: { live: "", repo: "" },
      logo: asset("/logos/datafest-logo.png"),
    }

  ],
  // Articles / Publications entries
  articles: [
    {
      logo: asset("/logos/bsa-logo.png"),
      title: "Is it Already Over? Examining F1 Pit Stop Times and their Effect on Winning",
      blurb: "Exploratory + predictive analysis of race strategy and driver performance; published piece with visuals.",
      link: "https://www.bruinsportsanalytics.com/post/f1-pitstops-time",
    },
    {
      logo: asset("/logos/uci_logo.png"),
      title: "Alzheimer's Research — COSMOS @ UCI",
      blurb: "Applied ML and exploratory analysis to determine if cognitive pre-screen tests can effectively predict a patient's progression.",
      link: "https://drive.google.com/file/d/1uX8vIZFOtNuzLQLcfNfYrmrbNGHqJpdN/view?usp=sharing",
    },
  ],
  // Skills list
  skills: [
    "Python",
    "Pandas",
    "SQL",
    "FastAPI",
    "Supabase",
    "Firebase",
    "Docker",
    "Airflow",
    "React",
    "TypeScript",
    "Tailwind",
    "Figma",
    "ETL",
    "Pytorch",
    "Tensorflow/Keras",
    "R",
    "AWS RDS",
    "Microsoft Suite",
    "Hugging Face",
    "Model Development",
    "Predictive and Exploratory Analytics",
    "Java",
    "C++"
  ],
};

export default function Portfolio() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
  document.documentElement.classList.toggle('dark', dark);
  localStorage.setItem('theme', dark ? 'dark' : 'light');
}, [dark]);


  const year = useMemo(() => new Date().getFullYear(), []);

  return (

    <div className="min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      {/* Custom font face: put your .ttf or .woff2 in /public/fonts and update path/name */}
      <style>{`
        @font-face {
          font-family: 'OffBit';
          src: url('${BASE}/fonts/OffBit-Bold.ttf') format('truetype');
          font-weight: 100 900;
          font-style: normal;
          font-display: swap;
        }
        :root {
          --font-display: 'OffBit', 'Poppins', system-ui, sans-serif;
          --font-body: 'Inter', system-ui, sans-serif;
        }
        .font-display { font-family: var(--font-display); }
        .font-body { font-family: var(--font-body); }
      `}</style>

      {/* Header */}
      <header className="sticky top-0 z-30 backdrop-blur supports-[backdrop-filter]:bg-white/70 dark:supports-[backdrop-filter]:bg-slate-950/60 border-b border-slate-200/60 dark:border-slate-800">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <span className="font-display text-lg font-semibold tracking-tight">{DATA.name}</span>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#about">About</a>
            <a href="#projects">Projects</a>
            <a href="#articles">Articles</a>
            <a href="#skills">Skills</a>
            <a href="#contact">Contact</a>
          </nav>
          <div className="flex items-center gap-3">
            <button onClick={() => setDark((d) => !d)}>{dark ? <Sun /> : <Moon />}</button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4">
        {/* Hero */}
        <section className="py-14 md:py-20">
          <div className="grid gap-10 md:grid-cols-[1.4fr_1fr] items-center">
            {/* LEFT: text + bio + links */}
            <div>
              <h1 className="font-display text-5xl md:text-6xl font-bold">
                {DATA.headline}
              </h1>
              <h2 className="mt-2 font-display text-xl text-slate-600 dark:text-slate-400">
                {DATA.title}
              </h2>
              <p className="mt-4 max-w-2xl text-slate-700 dark:text-slate-300">
                {DATA.bio}
              </p>

              {/* link row */}
              <div className="mt-6 flex items-center gap-3 flex-wrap">
                <a
                  href={DATA.socials.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-sm"
                >
                  <Github className="size-4" /> GitHub
                </a>
                <a
                  href={DATA.socials.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-sm"
                >
                  <Linkedin className="size-4" /> LinkedIn
                </a>
              </div>

              {/* location BELOW the links */}
              <div className="mt-3 flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                <MapPin className="size-4" />
                {DATA.location}
              </div>
            </div>

            {/* RIGHT: photo */}
            <div className="relative md:justify-self-end w-full max-w-[360px]">
              <div className="aspect-[4/5] overflow-hidden rounded-3xl shadow-lg ring-1 ring-slate-700/50">
                <img
                  src={asset("/IMG_0249.jpg")}
                  alt="Kiersten Roth"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* About (paragraph + long cards for education & experience) */}
        <section id="about" className="py-10 md:py-14">
          <h2 className="font-display text-2xl md:text-3xl font-semibold tracking-tight">About</h2>
          <p className="mt-3 max-w-3xl text-slate-700 dark:text-slate-300 font-body">{DATA.aboutParagraph}</p>

          <div className="mt-6 rounded-3xl border border-slate-200 p-5 dark:border-slate-800">
            <h3 className="font-display text-xl font-semibold">Education</h3>
            <div className="mt-3 flex flex-col gap-3">
              {DATA.education.map((e) => (
                <LongCard key={e.school} logo={e.logo} title={e.school} subtitle={e.degree} rightTag={e.time} body={e.details} />
              ))}
            </div>

            <h3 className="mt-6 font-display text-xl font-semibold">Experience</h3>
            <div className="mt-3 flex flex-col gap-3">
              {DATA.experiences.map((x) => (
                <LongCard key={x.title + x.org} logo={x.logo} title={`${x.title} — ${x.org}`} rightTag={x.time} body={x.details} />
              ))}
            </div>
          </div>
        </section>

        {/* Projects */}
        <section id="projects" className="py-10 md:py-14">
          <SectionHeader title="Projects" />
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {DATA.projects.map((p) => (
              <ProjectCard key={p.title} project={p} />
            ))}
          </div>
        </section>

        {/* Articles */}
        <section id="articles" className="py-10 md:py-14">
          <SectionHeader title="Articles & Publications" />
          <div className="mt-6 flex flex-col gap-4">
            {DATA.articles.map((a) => (
              <LongCard key={a.title} logo={a.logo} title={a.title} body={a.blurb} link={a.link} rightTag="Publication" />
            ))}
          </div>
        </section>

        {/* Skills */}
        <section id="skills" className="py-10 md:py-14">
          <SectionHeader title="Skills" />
          <div className="mt-6 flex flex-wrap gap-2">
            {DATA.skills.map((s) => (
              <span key={s} className="rounded-full border border-slate-200 dark:border-slate-800 px-3 py-1 text-sm bg-slate-100 dark:bg-slate-900">{s}</span>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="py-10 md:py-16">
          <SectionHeader title="Get in touch" />
          <div className="mt-6 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
            <a href={DATA.socials.linkedin} className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-900"><Linkedin className="size-4" /> Connect on LinkedIn</a>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 dark:border-slate-800">
        <div className="mx-auto max-w-6xl px-4 py-6 text-sm text-slate-500 dark:text-slate-400">© {year} {DATA.name}. Built with React & Tailwind.</div>
      </footer>
    </div>
  );
}

function SectionHeader({ title }: { title: string }) {
  return (
    <h2 className="font-display text-2xl md:text-3xl font-semibold tracking-tight">{title}</h2>
  );
}

function LongCard({ logo, title, subtitle, rightTag, body, link }: { logo?: string; title: string; subtitle?: string; rightTag?: string; body?: string, link?:string }) {
  return (
    <div className="relative flex gap-4 items-start rounded-2xl border border-slate-200 p-4 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
      {/* Logo */}
      <div className="h-14 w-14 rounded-xl overflow-hidden grid place-items-center bg-slate-100 dark:bg-slate-800 shrink-0">
        {logo ? (
          <img src={logo} alt="logo" className="h-full w-full object-contain" />
        ) : (
          <div className="text-xs text-slate-500">Logo</div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="font-medium">{title}</div>
            {subtitle && (
              <div className="text-sm text-slate-500 dark:text-slate-400">
                {subtitle}
              </div>
            )}
          </div>
          {rightTag && (
            <span className="text-xs rounded-full border border-slate-200 px-2 py-0.5 dark:border-slate-700">
              {rightTag}
            </span>
          )}
        </div>

        {body && (
          <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">
            {body}
          </p>
        )}

        {/* Optional link */}
        {link && (
          <div className="mt-2">
            <a
              href={link}
              target="_blank"
              rel="noreferrer"
              className="text-sm underline text-red-700 dark:text-red-400 hover:opacity-80"
            >
              Read more →
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

function ProjectCard({ project }: { project: { title: string; blurb: string; tech: string[]; links: { live?: string; repo?: string }; logo?: string } }) {
  return (
    <motion.article initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.4 }} className="group relative rounded-3xl border border-slate-200 bg-white p-5 shadow-sm ring-1 ring-transparent hover:ring-red-200 dark:border-slate-800 dark:bg-slate-900 dark:hover:ring-red-900/40">
      <h3 className="mt-4 font-display text-lg font-semibold">{project.title}</h3>
      <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{project.blurb}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {project.tech.map((t) => (
          <span key={t} className="rounded-full bg-slate-100 px-2.5 py-1 text-xs dark:bg-slate-800">{t}</span>
        ))}
      </div>
      <div className="mt-4 flex items-center gap-3 text-sm">
        {project.links.live && (
          <a href={project.links.live} className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-2.5 py-1.5 hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800"><ExternalLink className="size-4" /> Live</a>
        )}
        {project.links.repo && (
          <a href={project.links.repo} className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-2.5 py-1.5 hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800"><Github className="size-4" /> Code</a>
        )}
      </div>
      {project.logo && <img src={project.logo} alt="logo" className="absolute bottom-3 right-3 h-7 w-7 object-contain opacity-80 rounded" />}
    </motion.article>
  );
}
