import { useEffect, useMemo, useState } from "react";
import { Github, Linkedin, Mail, ExternalLink, Moon, Sun, MapPin, FileText } from "lucide-react";
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
  title: "Portfolio",
  location: "Los Angeles, CA",
  bio: `UCLA Statistics & Data Science. I have experience in startup consulting, biostatistics research, and full-stack development. I'm passionate about the health, tech, and startup space!`,
  aboutParagraph:
    `Outside of academics and work, I enjoy photography, journalling, working out, and discovering new coffee spots. Currently, I'm exploring film photography and my favorite cofee spots are Stagger, Five07, and Tadaima!`,
  resumeUrl: "https://drive.google.com/file/d/10Z0h1gGIpBGuHCw0XNdRyRusIijsstrB/view?usp=sharing", // replace with your resume link
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
      details: "GPA 3.84. Coursework: Linear ALgebra, SQL, Data Structures and Algorithms, OOP (Java/C++/Python), R programming, Regression and Modelling Techniques",
    },
  ],
  // Experience entries
  experiences: [
    {
      logo: asset("/logos/greenopia.png"),
      title: "Data Engineer and Software Engineer",
      org: "Greenopia",
      time: "June 2025 – Present",
      details: "Led data engineering effots, building web scraper to enrich 110k+ business's data for outreach sourcing. Designed, developed, and troubleshooted font-end for web app.",
    },
    {
      logo: asset("/logos/bhc.png"),
      title: "Technical Consultant",
      org: "Bruin Health Consulting",
      time: "June 2025 – Present",
      details: "Customer sourcing, CRM filters, data enrichment, web development",
    },
    {
      logo: asset("/logos/dsu-logo.png"),
      title: "Data Analyst",
      org: "Data Science Union",
      time: "Mar 2025 – Present",
      details: "Completed curriculum for Python and ML concepts. Currently working on my capstone project, Daylist+!",
    },
    {
      logo: asset("/logos/VEST-Logo.PNG"),
      title: "Head of Marketing and Membership // Software Engineer",
      org: "VEST @ UCLA",
      time: "Jan 2025 – Present",
      details: "Lead social media strategy, recruitment campaigns each quarter, work with design team, plan internal events. As a software engineer, I help develop web apps for my startup GoWeave. I also do a little marketing for GoWeave as well.",
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
        "Reorganized entire database of 300k+ businesses, led data engineering effors, building web scraping pipelines to enrich 30k+ business's data, built frontend pages of web app, collaborated on data strategy with executive leadership.",
      tech: ["Firebase", "Sheets", "Pandas", "React"],
      links: { live: "", repo: "" },
      logo: asset("/logos/greenopia.png"), // small assoc logo bottom-right (optional)
    },
    {
      title: "Daylist+ Recommender",
      blurb:
        "Coming Nov 2025! Playlist recommender that mixes user tastes with weather/context signals and embeddings.",
      tech: ["Python", "XGBoost", "Spotify API", "Redis"],
      links: { live: "", repo: "https://github.com/kierro1209/weather_daylist" },
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
    if (dark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
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
      <h2 className="mt-2 font-display text-xl text-slate-400">
        {DATA.title}
      </h2>
      <p className="mt-4 max-w-2xl text-slate-300">
        {DATA.bio}
      </p>

      {/* link row */}
      <div className="mt-6 flex items-center gap-3 flex-wrap">
        <a
          href={DATA.resumeUrl}
          className="inline-flex items-center gap-2 rounded-xl bg-red-700 px-4 py-2 text-white text-sm font-medium shadow-sm hover:bg-red-600"
        >
          <FileText className="size-4" /> Resume
        </a>
        <a
          href={`mailto:${DATA.email}`}
          className="inline-flex items-center gap-2 rounded-xl border border-slate-600 px-4 py-2 text-sm font-medium hover:bg-slate-800"
        >
          <Mail className="size-4" /> Email
        </a>
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
      <div className="mt-3 flex items-center gap-2 text-sm text-slate-400">
        <MapPin className="size-4" />
        {DATA.location}
      </div>
    </div>

    {/* RIGHT: photo */}
    <div className="relative md:justify-self-end w-full max-w-[360px]">
      <div className="aspect-[4/5] overflow-hidden rounded-3xl shadow-lg ring-1 ring-slate-700/50">
        <img
          src= {asset("/IMG_0249.jpg")} // replace with your actual file
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
              <LongCard key={a.title} logo={a.logo} title={a.title} body={a.blurb} link = {a.link} rightTag="Publication" />
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
            <a href={`mailto:${DATA.email}`} className="inline-flex items-center gap-2 rounded-xl bg-red-800 px-4 py-2 text-white shadow-sm hover:opacity-90"><Mail className="size-4" /> Email me</a>
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
