import { useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { Moon, Sun } from "lucide-react";

// ✅ Single-file, drop-in React portfolio component
// - Tailwind for styling
// - Dark mode toggle
// - Edit the DATA object below

const BASE = import.meta.env.BASE_URL;
const asset = (p?: string) =>
  p ? (p.startsWith("http") ? p : `${BASE}${p.replace(/^\/+/, "")}`) : "";
type HostedEvent = {
  id: string; // short unique key; COMMUNITY_PHOTOS refers to events by this id
  title: string;
  date: string;
  location: string;
  role: string;
  description: string;
  collaborators?: string[];
  link?: string;
};

const DATA = {
  name: "Kiersten Roth",
  headline: "Hi, I'm Kiersten",
  title: "ML/Agentic Memory Research, Data Engineering, and Community Building",
  location: "Los Angeles, CA",
  bio: `I'm currently a Data Science Intern at AstraZeneca supporting the Supply Chain teams in optimizing personalized patient care for rare disease & cancer patients. I also run VEST, a tech entrepreneurship/founder community at UCLA where I organize large scale events for the socal founder community and partner with VCs and startups to meet our exceptional talent. Great to meet you!`,
  aboutParagraph:
    `Outside of academics and work, I enjoy photography, journaling, marketing/creative directing and discovering new coffee spots. Currently, I'm exploring film photography and my favorite coffee spot is Re:Coffee!`,
  email: "kierroth12@g.ucla.edu",
  socials: {
    github: "https://github.com/kierro1209",
    linkedin: "https://www.linkedin.com/in/kiersten-roth/",
    website: "https://github.com/kierro1209/personal",
    X: "https://x.com/kierrroth"
  },
  // Education entries
  education: [
    {
      logo: asset("/logos/ucla.png"), // put logo image in public/logos
      school: "University of California, Los Angeles",
      degree: "B.S. Statistics & Data Science (Minors: Data Science Engineering, Bioinformatics)",
      time: "2024 – 2028 ",
      details: "GPA 3.85. Coursework: Linear Algebra, SQL, Data Structures and Algorithms, OOP (Java/C++/Python), R programming, Regression and Modelling Techniques, ML Methods, Computational Genomics, Theoretical Statistics, Experimental Design",
    },
  ],
  // Experience entries
  experiences: [
    {
      logo: asset("/logos/AZ-logo.png"),
      title: "Data Engineering Intern",
      org: "AstraZeneca",
      time: "June 2026 – Present",
      details: "Working under the Cell Thereapy Technical Operations division to analyze supply chain routing, performance, distribution, and network data to support efficient and effective patient care.",
    },
    {
      logo: asset("/logos/greenopia.png"),
      title: "Founding Engineering Intern",
      org: "Greenopia",
      time: "June 2025 – June 2026",
      details: "Engineered internal customer management tools, enriched over 50k business's data for production, built backend architecture to automate data transfer for over 400 businesses into mobile app. I also built out an API layer to unify our data ingestion pipeline from business onboarding to production view in our mobile app."},
    {
      logo: asset("/logos/VEST-Logo.PNG"),
      title: "President of VEST // Marketing Director",
      org: "VEST @ UCLA",
      time: "Jan 2025 – Present",
      details: "Lead UCLA's premier tech-focused entreprenuership club, securing sponsorships with YC-backed companies and maintaining VC relationships with major firms to help fund UCLA student founders. I plan events in partnership with other companies, VCs, and entrepreneurship orgs as well as direct recruitment, internal programming, and leadership. As marketing director, I grew our views to over 117k+ and collaborated with our design team to create a brand kit. Prev Patnerships: Cognition, Manus (acquired by Meta), Codex, KP Fellows, EF, Upfront, a16z, Notable Captial, ZFellows, Happenstance AI, Julius AI, BCV",
    },
    {
      logo: asset("/logos/dsu-logo.png"),
      title: "Data Analyst Consultant",
      org: "Data Science Union",
      time: "Mar 2025 – Present",
      details: "Built part of production pipeline for Michelin Connected Fleet's braking intelligence system, reducing individual reporting times by 20%. Leading Benchmarking research project to evaluate Jev on context engineering tasks.",
    },
    {
      logo: asset("/logos/bhc.png"),
      title: "Director of Technology // Project Manager",
      org: "Bruin Health Consulting",
      time: "June 2025 – June 2026",
      details: "Built MVP for consumer facing platform for Greenopia, built app for startup accelerator that was integrated into their current app suite, and building backend architecture solutions for Fortune 500 Pharmaceutical Companies.",
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
      title: "Genetic Pathogencity Classifier",
      blurb:
        "Used 7M+ classified genetic variants for pathogenic gene expressions and trained a XGBoost model to classify a new gene's pathogenicity risk.",
      tech: ["Python", "RandomForest", "ClinVar", "React"],
      
      links: { live: "", repo: "https://github.com/kierro1209/genetic_variant_classifier" },
      logo: asset("/logos/dsu-logo.png"),
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
    },
    {
      title: "Agentic Memory Gating and Harness",
      blurb:
        "Currently working on a custom harness to manage memory using research-backed relevance gating methods (Causal Memory Intervention).",
      tech: [ "Python", "Pydantic"],
      links: { live: "", repo: "" },
      logo: ''
    }
  ],
  // Events organized or hosted.
  // Add entries using this shape:
  // {
  //   title: "Event name",
  //   date: "Month YYYY",
  //   location: "Venue or city",
  //   role: "Organizer, host, moderator, etc.",
  //   description: "What the event was, who it served, and your contribution.",
  //   collaborators: ["Optional partner", "Optional sponsor"],
  //   link: "https://optional-event-or-recap-link.com",
  // },
  events: [
    {
       id: "builders-lounge",
       title: "The Builder's Lounge - LA Tech Week",
       date: "October 2026",
       location: "West LA",
       role: "Organizer & host",
       description: "Planning a matcha Jazz Bar for students, VCs, and startups to chat in a more relaxed setting with product demos and a keynote speaker",
       collaborators: ["Rainfall Ventures", "Pareto Ventures", "Nexus SoCal", "USC Troy Labs", "Caltech Zero to One", "UCLA ACM", "Bruin AI", "Bruin Ventures", "Sundays in LA", "Ascend Consulting", "a16z"],
       link: "",
   },
    {
       id: "socal-networking-night",
       title: "SoCal Networking Night",
       date: "May 2026",
       location: "West LA",
       role: "Organizer & host",
       description: "Gathered a curated group of 60 LA college students for a night of curated networking through Happenstance's custom platform built to find existing connections between people made for the event.",
       collaborators: ["Happenstance", "Nexus", "Sundays in LA"],
       link: "https://x.com/kierrroth/status/2084675730135523374?s=20",
   },
   {
       id: "vest-julius-sf",
       title: "VEST X Julius AI San Francisco",
       date: "July 2026",
       location: "San Francisco",
       role: "Organizer & host",
       description: "Brought together VEST members interning in SF, 10 UCLA startup alumni, and Julius AI founding team together for a night of coversation with catering and a matcha bar",
       collaborators: ["Julius AI"],
       link: "https://x.com/kierrroth/status/2081081510225117635?s=20",
   },
   {
       id: "vest-cognition-dinner",
       title: "VEST X Cognition Dinner",
       date: "March 2026",
       location: "Los Angeles",
       role: "Organizer & host",
       description: "Organized dinner with Cognition FDEs and VEST Members to chat as a part of our ongoing dinner series.",
       collaborators: ["Cognition"],
       link: "",
   },
   {
       id: "vest-collab-currency-dinner",
       title: "VEST X Collab Currency Dinner",
       date: "October 2026",
       location: "Los Angeles",
       role: "Organizer & host",
       description: "Organized dinner with Collab + Currency C-Suite and VEST Members to chat as a part of our ongoing dinner series as well as set up office hours for members to meet with them 1-1.",
       collaborators: ["Entrepreneurs First"],
       link: "",
   }
  ] as HostedEvent[],
};

// ─────────────────────────────────────────────────────────────────────────────
// COMMUNITY PHOTOS — classify each photo here.
// Set `event` to the `id` of an event in DATA.events above. Valid ids:
//   "builders-lounge"          The Builder's Lounge - LA Tech Week
//   "socal-networking-night"   SoCal Networking Night
//   "vest-julius-sf"           VEST X Julius AI San Francisco
//   "vest-cognition-dinner"    VEST X Cognition Dinner
//   "vest-ef-dinner"           VEST X Entrepreneurs First Dinner
// Leave `event` as "" if it isn't classified yet. The order here is the order on the page.
// To add a new event, add it to DATA.events with a new `id`, then use that id here.
// ─────────────────────────────────────────────────────────────────────────────
const COMMUNITY_PHOTOS: { src: string; event: string }[] = [
  { src: "/community/20260220-142220-7683a5.jpg", event: "vest-cognition-dinner" },
  { src: "/community/img-3795.jpg", event: "socal-networking-night" },
  { src: "/community/img-3801.jpg", event: "socal-networking-night" },
  { src: "/community/img-5840.jpg", event: "vest-julius-sf" },
  { src: "/community/img-5843.jpg", event: "vest-julius-sf" },
  { src: "/community/img-5853.jpg", event: "vest-julius-sf" },
  { src: "/community/img-5857.jpg", event: "vest-julius-sf" },
  { src: "/community/img-5863.jpg", event: "vest-julius-sf" },
  { src: "/community/img-5865.jpg", event: "vest-julius-sf" },
  { src: "/community/img-7741.jpg", event: "builders-lounge" },
  { src: "/community/img-7742.jpg", event: "builders-lounge" },
  { src: "/community/img-7743.jpg", event: "builders-lounge" },
  { src: "/community/img-7744.jpg", event: "builders-lounge" },
  { src: "/community/img-7748.jpg", event: "builders-lounge" },
  { src: "/community/img-7768.jpg", event: "builders-lounge" },
  { src: "/community/img-7833.jpg", event: "vest-collab-currency" },
];

const AGENTIC_MEMORY_TITLE = "Agentic Memory Gating and Tone Matching";
const AGENTIC_MEMORY_ID = "agentic-memory";

export default function Portfolio() {
  const [dark, setDark] = useState(() => document.documentElement.classList.contains("dark"));
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  const year = useMemo(() => new Date().getFullYear(), []);

  // Tiny hash router: About is the landing page ("#/" or empty), "#/projects" and "#/community"
  // are the other pages. Any other hash (e.g. "#agentic-memory") is an in-page anchor on Projects.
  const [hash, setHash] = useState(() => window.location.hash);
  useEffect(() => {
    const onHashChange = () => setHash(window.location.hash);
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);
  const isAnchor = hash.length > 1 && !hash.startsWith("#/");
  const page: "about" | "projects" | "community" =
    hash === "#/community"
      ? "community"
      : hash === "#/projects" || isAnchor
      ? "projects"
      : "about";
  useEffect(() => {
    if (page === "projects" && isAnchor) {
      document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.scrollTo(0, 0);
    }
  }, [hash, page, isAnchor]);

  const currently = [
    { label: "Stats + DS @ UCLA" },
    { label: "Data Eng @ AstraZeneca" },
    { label: "Director @ VEST at UCLA", href: "https://www.vestucla.com/", external: true },
    { label: "Working on Agent Memory Research", href: `#${AGENTIC_MEMORY_ID}` },
  ];

  const currentOrgs = ["AstraZeneca", "Data Science Union", "VEST @ UCLA"];
  const currentExperiences = DATA.experiences.filter((x) => currentOrgs.includes(x.org));
  const previousExperiences = DATA.experiences.filter((x) => !currentOrgs.includes(x.org));

  const connect = [
    { label: "Email", href: `mailto:${DATA.email}` },
    { label: "LinkedIn", href: DATA.socials.linkedin },
    { label: "X/Twitter", href: DATA.socials.X },
    { label: "GitHub", href: DATA.socials.github },
  ];

  return (
    <div className="min-h-screen bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100 font-display antialiased">
      <style>{`
        :root {
          --font-display: 'Times New Roman', Times, 'Liberation Serif', serif;
          --font-body: 'Inter', system-ui, -apple-system, 'Segoe UI', sans-serif;
          --font-mono: ui-monospace, 'SF Mono', 'Cascadia Mono', Consolas, monospace;
        }
        .font-display { font-family: var(--font-display); }
        @font-face {
          font-family: 'Morrison';
          src: url('${BASE}fonts/Morrison-Regular.otf') format('opentype');
          font-weight: 400;
          font-style: normal;
          font-display: swap;
        }
        /* Name: Morrison */
        .font-heading { font-family: 'Morrison', 'Times New Roman', Times, serif; font-weight: 400; letter-spacing: 0.01em; }
        /* Page / section headers: Times New Roman regular weight */
        .font-header { font-family: 'Times New Roman', Times, 'Liberation Serif', serif; font-weight: 400; }
        .font-body { font-family: var(--font-body); }
        .font-mono-ui { font-family: var(--font-mono); }
      `}</style>

      <button
        onClick={() => setDark((d) => !d)}
        aria-label="Toggle dark mode"
        className="fixed right-5 top-5 z-20 text-white mix-blend-difference"
      >
        {dark ? <Sun className="size-5" /> : <Moon className="size-5" />}
      </button>

      {/* Sidebar */}
      <aside className="px-6 pt-14 lg:fixed lg:left-0 lg:top-0 lg:h-screen lg:w-72 lg:overflow-y-auto lg:border-r lg:border-neutral-200 lg:pt-8 dark:lg:border-neutral-800">
        <a href="#/" className="font-heading block text-4xl leading-tight">{DATA.name}</a>
        <Rule />

        <ul className="font-display mt-5 space-y-1.5 text-base">
          {[
            { label: "About", href: "#/", key: "about" },
            { label: "Projects", href: "#/projects", key: "projects" },
            { label: "Community", href: "#/community", key: "community" },
          ].map((n) => (
            <li key={n.key}>
              <a
                href={n.href}
                className={page === n.key ? "text-neutral-900 dark:text-white" : "text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"}
              >
                <span className="mr-2 text-neutral-900 dark:text-white">&#9733;</span>
                {n.label}
              </a>
            </li>
          ))}
        </ul>

        <SidebarDivider />

        <div className="font-header text-2xl text-neutral-900 dark:text-white">Currently...</div>
        <ul className="font-display mt-2 space-y-1.5 text-base">
          {currently.map((c) => (
            <li key={c.label} className="text-neutral-500 dark:text-neutral-400">
              <span className="mr-2 text-neutral-900 dark:text-white">&#9733;</span>
              {c.href ? (
                <a href={c.href} {...(c.external ? { target: "_blank", rel: "noreferrer" } : {})} className="underline underline-offset-4 decoration-neutral-300 hover:text-neutral-900 hover:decoration-current dark:decoration-neutral-600 dark:hover:text-white">
                  {c.label}
                </a>
              ) : (
                c.label
              )}
            </li>
          ))}
        </ul>

        <SidebarDivider />

        <div className="font-header text-2xl text-neutral-900 dark:text-white">Connect</div>
        <ul className="font-display mt-2 space-y-1.5 text-base">
          {connect.map((c) => (
            <li key={c.label}>
              <a
                href={c.href}
                target={c.href.startsWith("mailto:") ? undefined : "_blank"}
                rel="noreferrer"
                className="text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
              >
                {c.label}
              </a>
            </li>
          ))}
        </ul>
      </aside>

      <main
        className={
          page === "community"
            ? "lg:ml-72"
            : page === "about"
            ? "px-6 py-14 lg:ml-72 lg:px-16 lg:py-20"
            : "mx-auto max-w-2xl px-6 py-14 lg:ml-72 lg:max-w-3xl lg:px-16 lg:py-20"
        }
      >
        {page === "about" && (
          <>
        {/* Intro */}
        <header>
          <h1 className="font-header text-5xl md:text-6xl">About</h1>
          <Rule />
          {/* Full width of the page: photo hugs the right edge, text column grows to follow */}
          <div className="mt-6 grid items-start gap-8 md:grid-cols-[minmax(0,1fr)_18rem] lg:gap-16">
            <div className="max-w-3xl">
              <p className="text-neutral-500 dark:text-neutral-400">{DATA.title} &middot; {DATA.location}</p>
              <p className="mt-4 leading-7 text-neutral-500 dark:text-neutral-400">{DATA.bio}</p>
              <p className="mt-4 leading-7 text-neutral-500 dark:text-neutral-400">{DATA.aboutParagraph}</p>
            </div>
            <img src={asset("/about.jpg")} alt="Kiersten Roth" className="block h-auto w-full max-w-[18rem] md:max-w-none" />
          </div>
        </header>

        <div className="max-w-3xl">
        {/* Experience */}
        <Section title="Experience">
          {[
            { label: "Currently", items: currentExperiences },
            { label: "Previously", items: previousExperiences },
          ].map((group, i) => (
            <div key={group.label} className={i > 0 ? "mt-12" : ""}>
              <h3 className="font-header text-3xl text-neutral-900 dark:text-white">{group.label}</h3>
              <div className="mt-6 space-y-6">
                {group.items.map((x) => (
                  <Entry key={x.title + x.org} title={`${x.title}, ${x.org}`} meta={x.time} body={x.details} />
                ))}
              </div>
            </div>
          ))}
        </Section>

        {/* Education */}
        <Section title="Education">
          <div className="space-y-6">
            {DATA.education.map((e) => (
              <Entry key={e.school} title={e.school} meta={`${e.degree} \u00b7 ${e.time.trim()}`} body={e.details} />
            ))}
          </div>
        </Section>
        </div>
          </>
        )}

        {page === "projects" && (
          <>
        {/* Projects */}
        <Section title="Projects" first>
          <div className="space-y-6">
            {DATA.projects.map((p) => (
              <Entry
                key={p.title}
                id={p.title === AGENTIC_MEMORY_TITLE ? AGENTIC_MEMORY_ID : undefined}
                title={p.title}
                body={p.blurb}
                meta={p.tech.join(", ")}
                links={[
                  p.links.live ? { label: "Live", href: p.links.live } : null,
                  p.links.repo ? { label: "Code", href: p.links.repo } : null,
                ]}
              />
            ))}
          </div>
        </Section>
          </>
        )}

        {page === "community" && (
          <>
        {/* Community: header + intro, then full-bleed poster wall */}
        <header className="mx-auto max-w-2xl px-6 pb-12 pt-14 lg:max-w-3xl lg:px-16 lg:pt-20 lg:mr-auto lg:ml-0">
          <h1 className="font-header text-5xl md:text-6xl">Community</h1>
          <Rule />
          <p className="mt-6 leading-7 text-neutral-500 dark:text-neutral-400">
            Outside of my technical aspirations, I love the tech community and all the great friendships its brought me. I enjoy creating spaces for people to connect over tech in a relaxed and welcoming way, hence why I created the Builder's Lounge series &amp; VEST's Dinner series. Always looking for cool people to meet and events to help out with!
          </p>
        </header>
        {/* Masonry: photos keep their own aspect ratio and stack edge to edge in columns */}
        <div className="columns-2 gap-0 sm:columns-4">
          {COMMUNITY_PHOTOS.map((photo) => (
            <EventTile
              key={photo.src}
              src={asset(photo.src)}
              event={DATA.events.find((ev) => ev.id === photo.event)}
            />
          ))}
        </div>
          </>
        )}

        {page !== "community" && (
          <footer className="mt-20 text-sm text-neutral-400 dark:text-neutral-500">
            &copy; {year} {DATA.name}
          </footer>
        )}
      </main>
    </div>
  );
}

// Photo tile at its natural aspect ratio (edge to edge); hovering (or keyboard-focusing) reveals which event it was for.
function EventTile({ src, event, className = "" }: { src: string; event?: HostedEvent; className?: string }) {
  const content = (
    <>
      <img src={src} alt={event?.title ?? "Community event photo"} className="block h-auto w-full" />
      <div className="absolute inset-0 flex flex-col justify-end bg-black/75 p-4 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
        <div className="translate-y-3 transition-transform duration-300 group-hover:translate-y-0 group-focus-visible:translate-y-0">
          <div className="text-base leading-snug">{event?.title ?? "Event not classified yet"}</div>
          {event && (
            <>
              <div className="mt-1 text-xs uppercase tracking-wide text-neutral-300">
                {event.date} &middot; {event.location}
              </div>
              <p className="mt-2 line-clamp-6 text-xs leading-snug text-neutral-200">{event.description}</p>
            </>
          )}
        </div>
      </div>
    </>
  );
  const cls = `group relative block break-inside-avoid overflow-hidden outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 dark:focus-visible:ring-white ${className}`;
  return event?.link ? (
    <a href={event.link} target="_blank" rel="noreferrer" className={cls}>{content}</a>
  ) : (
    <div tabIndex={0} className={cls}>{content}</div>
  );
}

function SidebarDivider() {
  return <div className="my-4 h-px w-full bg-neutral-200 dark:bg-neutral-800" />;
}

function Rule() {
  return <div className="mt-5 h-px w-12 bg-neutral-900 dark:bg-neutral-100" />;
}

function Section({ title, children, first }: { title: string; children: ReactNode; first?: boolean }) {
  return (
    <section className={first ? "" : "mt-16"}>
      <h2 className="font-header text-5xl md:text-6xl">{title}</h2>
      <Rule />
      <div className="mt-8">{children}</div>
    </section>
  );
}

function Entry({
  id,
  title,
  meta,
  body,
  links,
}: {
  id?: string;
  title: string;
  meta?: string;
  body?: string;
  links?: ({ label: string; href: string } | null)[];
}) {
  const visible = (links ?? []).filter((l): l is { label: string; href: string } => !!l);
  return (
    <div id={id} className="scroll-mt-8">
      <div className="text-neutral-900 dark:text-white">{title}</div>
      {meta && <div className="mt-0.5 text-sm text-neutral-400 dark:text-neutral-500">{meta}</div>}
      {body && <p className="mt-1 text-sm leading-6 text-neutral-500 dark:text-neutral-400">{body}</p>}
      {visible.length > 0 && (
        <div className="mt-1.5 flex gap-4 text-sm">
          {visible.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target="_blank"
              rel="noreferrer"
              className="text-neutral-900 underline underline-offset-4 decoration-neutral-300 hover:decoration-current dark:text-white dark:decoration-neutral-600"
            >
              {l.label} &#8599;
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
