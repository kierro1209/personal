import { type ReactNode, useMemo } from "react";
import { ArrowUpRight, Github } from "lucide-react";
import { motion } from "framer-motion";

const BASE = import.meta.env.BASE_URL;
const asset = (p?: string) =>
  p ? (p.startsWith("http") ? p : `${BASE}${p.replace(/^\/+/, "")}`) : "";

const DATA = {
  name: "Kiersten Roth",
  headline: "Hi, I'm Kiersten",
  title: "Student, engineer, and community builder",
  location: "Los Angeles, CA",
  summary:
    "I work across data, product, and community — from supply chain analytics and health tech to founder ecosystems and operator events at UCLA.",
  about: [
    "I'm currently a Data Science Intern at AstraZeneca supporting supply chain teams focused on personalized care for rare disease and cancer patients.",
    "I also run VEST at UCLA, where I organize founder-focused programming, partner with startups and VCs, and help connect exceptional student builders to opportunities.",
    "Outside of work and school, I enjoy photography, journaling, marketing, creative direction, and finding new coffee spots around LA.",
  ],
  email: "kierroth12@g.ucla.edu",
  socials: {
    github: "https://github.com/kierro1209",
    linkedin: "https://www.linkedin.com/in/kiersten-roth/",
    website: "https://github.com/kierro1209/personal",
    x: "https://x.com/kierrroth",
  },
  education: {
    logo: asset("/logos/ucla.png"),
    school: "University of California, Los Angeles",
    degree: "B.S. Statistics & Data Science",
    minors: "Minors in Data Science Engineering and Bioinformatics",
    time: "2024 – 2028",
    details:
      "GPA 3.85. Coursework spans linear algebra, SQL, data structures and algorithms, OOP, regression, machine learning, computational genomics, theoretical statistics, and experimental design.",
  },
  toolkit: [
    "Python",
    "Pandas",
    "SQL",
    "FastAPI",
    "React",
    "TypeScript",
    "Firebase",
    "Docker",
    "Airflow",
    "PyTorch",
    "Tailwind",
    "Figma",
  ],
  experiences: [
    {
      logo: asset("/logos/AZ-logo.png"),
      title: "Data Science Intern",
      org: "AstraZeneca",
      time: "June 2026 – Present",
      details:
        "Analyzing supply chain routing, performance, distribution, and network data within Cell Therapy Technical Operations to support more reliable patient care.",
    },
    {
      logo: asset("/logos/greenopia.png"),
      title: "Founding Data and Software Engineering Intern",
      org: "Greenopia",
      time: "June 2025 – Present",
      details:
        "Built internal tooling, enriched 50k+ business records, automated data transfer for 400+ businesses, and created API infrastructure across onboarding and production flows.",
    },
    {
      logo: asset("/logos/VEST-Logo.PNG"),
      title: "President of VEST // Marketing Director",
      org: "VEST @ UCLA",
      time: "Jan 2025 – Present",
      details:
        "Lead UCLA's tech entrepreneurship community, shape founder programming, secure partnerships, and grow the club's audience and brand across the SoCal startup ecosystem.",
    },
    {
      logo: asset("/logos/dsu-logo.png"),
      title: "Data Analyst",
      org: "Data Science Union",
      time: "Mar 2025 – Present",
      details:
        "Built part of the production pipeline for Michelin Connected Fleet's braking intelligence system, reducing reporting time by 20%.",
    },
    {
      logo: asset("/logos/bhc.png"),
      title: "Director of Technology // Project Manager",
      org: "Bruin Health Consulting",
      time: "June 2025 – Present",
      details:
        "Built MVPs and backend architecture for startup and enterprise healthcare-facing products, including work for Greenopia and pharma teams.",
    },
    {
      logo: asset("/logos/bsa-logo.png"),
      title: "Machine Learning Researcher // Data Journalist",
      org: "Bruin Sports Analytics",
      time: "Oct 2024 – Jun 2025",
      details:
        "Developed sports analytics models, published an F1 analysis article, and explored predictive modeling across basketball and NFL projects.",
    },
    {
      logo: asset("/logos/uci_logo.png"),
      title: "Student Researcher",
      org: "COSMOS @ UCI",
      time: "July 2023",
      details:
        "Applied computational methods to Alzheimer’s research to test low-cost approaches for identifying brain degeneration.",
    },
    {
      logo: asset("/logos/stanford logo.png"),
      title: "AI Institute Student",
      org: "Stanford Pre-Collegiate AI Institute",
      time: "July 2022",
      details:
        "Studied AI techniques and core mathematics under Stanford PhD students while completing undergraduate-level problem sets in high school.",
    },
  ],
  projects: [
    {
      title: "Greenopia Data Redesign & App",
      blurb:
        "Reorganized a 300k+ business database, led data engineering work, built enrichment pipelines, and contributed frontend pages for the consumer app.",
      tech: ["Firebase", "Sheets", "Pandas", "React"],
      links: { live: "https://app.greenopia.com/discover/", repo: "" },
      logo: asset("/logos/greenopia.png"),
    },
    {
      title: "Genetic Pathogenicity Classifier",
      blurb: "A work-in-progress classifier using open genetic datasets to estimate possible expression outcomes.",
      tech: ["Python", "RandomForest", "ClinVar", "React"],
      links: { live: "", repo: "https://github.com/kierro1209/genetic_variant_classifier" },
      logo: asset("/logos/dsu-logo.png"),
    },
    {
      title: "BR.AI.N Segmentation UI",
      blurb: "Medical imaging toolkit pairing U-Net inference with a React analytics dashboard for clinicians.",
      tech: ["PyTorch", "React", "FastAPI"],
      links: { live: "", repo: "https://github.com/kierro1209/br.ai.n" },
      logo: "",
    },
    {
      title: "Lookbk Content Automation App",
      blurb: "A short-form video creation workflow built around keywords and reactions, with a stitching feature I designed.",
      tech: ["RunwayML", "MoviePy", "FastAPI"],
      links: { live: "", repo: "" },
      logo: asset("/logos/VEST-Logo.PNG"),
    },
    {
      title: "Michelin Connected Fleet Braking Intelligence System",
      blurb:
        "Part of the pipeline responsible for dynamically calculating reductions in braking score thresholds before scores are surfaced to drivers and fleet teams.",
      tech: ["Python", "Pandas"],
      links: { live: "", repo: "" },
      logo: asset("/logos/MCF-logo.png"),
    },
    {
      title: "Polaris",
      blurb:
        "Best Social Impact Award winner at LA Hacks 2026 — an agentic hospital paging system with EHR context, voice-dictated notes, and clinician location visibility.",
      tech: ["Fetch AI", "Python", "FastAPI", "Framer"],
      links: {
        live: "https://devpost.com/software/polaris-mh7rd8?_gl=1*1pbtemz*_gcl_au*MTUwMjc4NzMxMC4xNzc3MTkwNjMx*_ga*MTM0OTExNzU4OS4xNzc3MTkwNjMy*_ga_0YHJK3Y10M*czE3NzcyMzYyOTEkbzIkZzEkdDE3NzcyMzc3MTQkajQ3JGwwJGgw",
        repo: "",
      },
      logo: asset("/logos/lahacks-logo.png"),
    },
    {
      title: "Statin Toxicity Prediction",
      blurb:
        "Best Software/Algorithm Award winner for a multimodal ML workflow that estimates statin risk with hormonal covariates in view.",
      tech: ["SciKitLearn", "PharmGKB", "NHANES", "FAERS"],
      links: { live: "", repo: "https://github.com/kierro1209/statin_predictor" },
      logo: asset("/logos/inT-logo.png"),
    },
    {
      title: "Tokenizing Patient Medical History",
      blurb:
        "Designed a token structure for patient history and paired it with next-token generation and RL ideas to improve care-resource forecasting.",
      tech: ["Python", "PyTorch", "SB3"],
      links: { live: "", repo: "" },
      logo: asset("/logos/datafest-logo.png"),
    },
    {
      title: "Daily Newspaper Agent System",
      blurb: "A personalized daily news workflow that collects updates from the topics, papers, and articles I care about most.",
      tech: ["Python", "GitHub Actions", "Gemini Flash 2.5"],
      links: {
        live: "https://x.com/kierrroth/status/2079599506119880718?s=20",
        repo: "https://github.com/kierro1209/sunday_news",
      },
      logo: "",
    },
    {
      title: "LA Transit Monitoring System",
      blurb: "An ongoing systems and inference project to better predict when my bus will actually show up before class.",
      tech: ["FastAPI", "GTFS"],
      links: { live: "", repo: "" },
      logo: "",
    },
  ],
  events: [
    {
      title: "VEST Founder Fireside: From Campus to Seed",
      time: "Mock event · October 2026",
      details:
        "An evening conversation with two UCLA alumni founders on finding early customers, choosing a cofounder, and raising a first institutional round.",
    },
    {
      title: "SoCal Student Builder Demo Night",
      time: "Mock event · November 2026",
      details:
        "A fast-paced showcase for student teams to demo products to peers, operators, and early-stage investors, followed by open feedback and founder matching.",
    },
    {
      title: "Zero-to-One Product Sprint",
      time: "Mock event · January 2027",
      details:
        "A hands-on build session pairing technical students with designers to turn one sharply defined problem into a testable prototype in a single afternoon.",
    },
  ],
  currently: [
    {
      label: "Learning",
      text: "Going deeper on systems and inference through the LA Transit Monitoring System.",
    },
    {
      label: "Reading",
      text: "News, Substack posts, and research papers — enough to justify building my own daily newspaper agent workflow.",
    },
    {
      label: "Exploring",
      text: "Film photography, creative direction, and better ways to tell technical stories visually.",
    },
    {
      label: "Offline",
      text: "Trying new coffee spots in LA. Current favorite: Re:Coffee.",
    },
  ],
};

export default function Portfolio() {
  const year = useMemo(() => new Date().getFullYear(), []);

  return (
    <div className="min-h-screen overflow-x-hidden bg-black font-mono text-[#c8c8c8] selection:bg-[#d8d8d8] selection:text-black">
      <style>{`
        @font-face {
          font-family: 'OffBit';
          src: url('${BASE}/fonts/OffBit-Bold.ttf') format('truetype');
          font-display: swap;
        }
        html { scroll-behavior: smooth; background: #000; }
        body { margin: 0; }
        .star-field {
          background-image:
            radial-gradient(circle at 15% 20%, rgba(255,255,255,.24) 0 1px, transparent 1.5px),
            radial-gradient(circle at 78% 12%, rgba(255,255,255,.18) 0 1px, transparent 1.5px),
            radial-gradient(circle at 62% 74%, rgba(255,255,255,.1) 0 1px, transparent 1.5px);
          background-size: 211px 211px, 307px 307px, 137px 137px;
        }
        .scanlines { background: repeating-linear-gradient(0deg, transparent 0 3px, rgba(255,255,255,.009) 3px 4px); }
        .display { font-family: 'OffBit', ui-monospace, monospace; }
        .ascii-card { box-shadow: inset 0 0 0 1px rgba(255,255,255,.025); }
        .project-scroll { scrollbar-color: #555 #090909; scrollbar-width: thin; }
      `}</style>

      <div className="star-field pointer-events-none fixed inset-0 opacity-20" aria-hidden="true" />
      <div className="scanlines pointer-events-none fixed inset-0" aria-hidden="true" />

      <header className="sticky top-0 z-40 border-b border-[#2b2b2b] bg-black/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-5 px-4 py-3 text-[11px] uppercase tracking-[0.18em] sm:px-6">
          <a href="#top" className="text-[#e0e0e0]">KIERSTEN ROTH</a>
          <nav className="hidden gap-5 text-[#888888] md:flex">
            {[["about", "01"], ["experiences", "02"], ["projects", "03"], ["events", "04"], ["currently", "05"]].map(([id, number]) => (
              <a key={id} href={`#${id}`} className="transition hover:text-white">[{number}] {id}</a>
            ))}
          </nav>
          <a href={`mailto:${DATA.email}`} className="border border-[#555] px-3 py-1.5 text-[#d8d8d8] transition hover:border-white hover:text-white">EMAIL ↗</a>
        </div>
      </header>

      <main id="top" className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <section className="grid min-h-[72vh] items-center gap-12 py-20 lg:grid-cols-[1fr_340px]">
          <div>
            <p className="text-xs uppercase tracking-[.2em] text-[#888]">Portfolio · Los Angeles, CA</p>
            <h1 className="display mt-5 text-6xl uppercase leading-[.9] text-[#ededed] sm:text-8xl">Kiersten Roth</h1>
            <p className="mt-5 text-sm uppercase tracking-[.2em] text-[#bbb]">{DATA.title}</p>
            <p className="mt-8 max-w-2xl text-base leading-8 text-[#aaa]">{DATA.summary}</p>
            <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-xs uppercase tracking-[0.16em]">
              <TextLink href={DATA.socials.github}>github ↗</TextLink>
              <TextLink href={DATA.socials.linkedin}>linkedin ↗</TextLink>
              <TextLink href={`mailto:${DATA.email}`}>email ↗</TextLink>
            </div>
          </div>
          <pre className="hidden border-l border-[#333] pl-10 text-[11px] leading-[1.2] text-[#666] lg:block" aria-hidden="true">{`         .        *
    *       _..._
        .-'     '-.
  .    /   .---.   \\
      |   /     \\   |
       \\  \\_____/  /
    *   '-._____.-'   .
            |
       -----+-----
      [  online  ]`}</pre>
        </section>
        <Section id="about" number="01" title="About" description="Background, education, and the tools I use.">
          <div className="grid gap-px border border-[#333333] bg-[#333333] lg:grid-cols-[1.2fr_.8fr]">
            <div className="bg-[#050505] p-6 sm:p-8">
              <AsciiLabel>INTRODUCTION</AsciiLabel>
              <div className="mt-6 space-y-5 leading-7 text-[#aaaaaa]">{DATA.about.map((paragraph, index) => <p key={paragraph}><span className="mr-3 text-[#666666]">{String(index + 1).padStart(2, "0")}:</span>{paragraph}</p>)}</div>
              <AsciiLabel className="mt-9">TOOLKIT</AsciiLabel>
              <div className="mt-4 flex flex-wrap gap-2">{DATA.toolkit.map((item) => <Tag key={item}>{item}</Tag>)}</div>
            </div>
            <div className="bg-[#050505] p-6 sm:p-8">
              <AsciiLabel>EDUCATION</AsciiLabel>
              <p className="display mt-6 text-2xl uppercase text-[#e5e5e5]">{DATA.education.school}</p>
              <p className="mt-2 text-xs tracking-[.15em] text-[#ffcb6b]">{DATA.education.time}</p>
              <p className="mt-7 text-[#cccccc]">{DATA.education.degree}</p>
              <p className="mt-2 text-sm text-[#888888]">{DATA.education.minors}</p>
              <p className="mt-6 text-sm leading-7 text-[#aaaaaa]">{DATA.education.details}</p>
            </div>
          </div>
        </Section>

        <Section id="experiences" number="02" title="Experience" description="Roles across data, health, startups, research, and community.">
          <div className="border-t border-[#333333]">{DATA.experiences.map((experience, index) => (
            <article key={`${experience.title}-${experience.org}`} className="grid gap-4 border-b border-[#333333] py-6 transition hover:bg-[#0a0a0a] md:grid-cols-[52px_1fr_180px] md:px-4">
              <span className="text-xs text-[#666666]">[{String(index + 1).padStart(2, "0")}]</span>
              <div><h3 className="display text-xl uppercase text-[#e5e5e5]">{experience.title}</h3><p className="mt-1 text-sm text-[#cccccc]">{experience.org}</p><p className="mt-4 max-w-3xl text-sm leading-7 text-[#aaaaaa]">{experience.details}</p></div>
              <p className="text-xs uppercase tracking-[.12em] text-[#888888] md:text-right">{experience.time}</p>
            </article>
          ))}</div>
        </Section>

        <Section id="projects" number="03" title="Projects" description="Selected technical and product work. Scroll sideways to browse.">
          <div className="project-scroll flex snap-x gap-3 overflow-x-auto pb-5">{DATA.projects.map((project, index) => <ProjectCard key={project.title} project={project} index={index} />)}</div>
        </Section>

        <Section id="events" number="04" title="Events" description="Founder and builder programming I organize. These entries are mock examples.">
          <div className="grid gap-4 md:grid-cols-3">{DATA.events.map((event, index) => (
            <article key={event.title} className="ascii-card border border-[#333] bg-[#050505] p-6"><p className="text-xs text-[#888]">EVENT_{String(index + 1).padStart(2, "0")} · {event.time}</p><h3 className="display mt-5 text-xl uppercase text-[#e5e5e5]">{event.title}</h3><p className="mt-4 text-sm leading-7 text-[#aaa]">{event.details}</p></article>
          ))}</div>
        </Section>

        <Section id="currently" number="05" title="Currently" description="A few things that have my attention right now.">
          <div className="grid gap-px border border-[#333333] bg-[#333333] sm:grid-cols-2">{DATA.currently.map((item) => (
            <div key={item.label} className="bg-[#050505] p-6"><p className="text-xs uppercase tracking-[.2em] text-[#cccccc]">● {item.label}</p><p className="mt-4 text-sm leading-7 text-[#aaaaaa]">{item.text}</p></div>
          ))}</div>
        </Section>
      </main>

      <footer className="relative mt-20 border-t border-[#333333]">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-8 text-[10px] uppercase tracking-[.18em] text-[#888888] sm:flex-row sm:justify-between sm:px-6">
          <span>© {year} {DATA.name}</span>
          <a href={`${BASE}gradient-descent.html`} className="transition hover:text-[#cccccc]">[gradient descent]</a>
        </div>
      </footer>
    </div>
  );
}

function Section({ id, number, title, description, children }: { id: string; number: string; title: string; description: string; children: ReactNode }) {
  return <section id={id} className="scroll-mt-20 py-14 sm:py-20"><div className="mb-8 grid gap-3 border-b border-[#333] pb-5 md:grid-cols-[70px_1fr_auto] md:items-end"><span className="text-xs text-[#888]">[{number}]</span><h2 className="display text-3xl uppercase text-[#e5e5e5] sm:text-5xl">{title}</h2><p className="max-w-md text-xs leading-5 text-[#888] md:text-right">{description}</p></div>{children}</section>;
}

function AsciiLabel({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <p className={`text-xs uppercase tracking-[.2em] text-[#aaa] ${className}`}>[ {children} ]</p>;
}

function Tag({ children }: { children: ReactNode }) {
  return <span className="border border-[#444] px-2.5 py-1 text-[11px] uppercase tracking-[.1em] text-[#aaa]">{children}</span>;
}

function TextLink({ href, children }: { href: string; children: ReactNode }) {
  const external = href.startsWith("http");
  return <a href={href} target={external ? "_blank" : undefined} rel={external ? "noreferrer" : undefined} className="border-b border-[#555] pb-1 text-[#ccc] transition hover:border-white hover:text-white">{children}</a>;
}

function ProjectCard({ project, index }: { project: { title: string; blurb: string; tech: string[]; links: { live?: string; repo?: string }; logo?: string }; index: number }) {
  return (
    <motion.article initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} className="group ascii-card flex min-h-64 w-[82vw] max-w-[340px] shrink-0 snap-start flex-col border border-[#333] bg-[#050505] p-5 transition hover:border-[#777] sm:w-[340px]">
      <div className="flex items-center justify-between text-[10px] tracking-[.16em] text-[#888888]"><span>PROJECT_{String(index + 1).padStart(2, "0")}</span><span>{project.tech.length} tools</span></div>
      <h3 className="display mt-6 text-xl uppercase leading-none text-[#e5e5e5] group-hover:text-white">{project.title}</h3>
      <p className="mt-4 flex-1 text-sm leading-6 text-[#aaa]">{project.blurb}</p>
      <div className="mt-6 flex flex-wrap gap-2">{project.tech.map((tech) => <Tag key={tech}>{tech}</Tag>)}</div>
      {(project.links.live || project.links.repo) && <div className="mt-5 flex gap-5 text-xs uppercase tracking-[.12em]">{project.links.live && <a href={project.links.live} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-[#bbb] hover:text-white">view <ArrowUpRight className="size-3" /></a>}{project.links.repo && <a href={project.links.repo} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-[#bbb] hover:text-white"><Github className="size-3" /> source</a>}</div>}
    </motion.article>
  );
}
