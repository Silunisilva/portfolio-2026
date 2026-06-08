import React, { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/* ─── Data ─────────────────────────────────────────────────── */
const projects = [
  {
    title: 'BookShop E-commerce Platform',
    description: 'BookShop – A secure , responsive , and dynamic book shopping app powered by OpenLibrary API . Features include JWT auth , real-time search , and smooth order processing .',
    tech: ['Javascript', 'React', 'Node.js', 'MongoDB', 'Express'],
    category: 'Full Stack',
    icon: '',
    accent: '#fb923c',
    glow: 'rgba(251,146,60,0.22)',
    metrics: [
      { label: 'Release Speed', value: '-80%', sub: 'faster releases' },
      { label: 'Cost Saved', value: '40%', sub: 'monthly spend' },
      { label: 'SLA', value: '99.9%', sub: 'SLA maintained' },
    ],
    github: 'https://github.com/Silunisilva/BookShop-Website.git', demo: 'https://github.com/Silunisilva/BookShop-Website.git ',
    year: '2024',
  },
  {
    title: 'Smart-Navigator',
    description: 'Smart Navigator is a web based tool for exploring the CINEC Campus. Easily find buildings and navigate the campus using an interactive map and a user-friendly interface.',
    tech: ['React', 'Leaflet', 'OpenStreetMap', 'Node.js', 'Express'],
    category: 'Mapping',
    icon: '',
    accent: '#22d3ee',
    glow: 'rgba(34,211,238,0.2)',
    metrics: [
      { label: 'Services', value: '15+', sub: 'independent pods' },
      { label: 'Uptime', value: '99.9%', sub: 'production SLA' },
      { label: 'Scale', value: '10×', sub: 'auto-scaling' },
    ],
    github: 'https://github.com/Silunisilva/Smart-Navigator.git', demo: 'https://github.com/Silunisilva/Smart-Navigator.git',
    year: '2024',
  },
  {
    title: 'Carelixa',
    description: 'Carelixa is a healthcare appointment booking system that connects parents having autism children with doctors . It features real-time availability, secure authentication, and a user friendly interface for seamless scheduling and supports child progress tracking and education support.',
    tech: ['GitHub Actions', 'Docker', 'React', 'Tailwind CSS', 'python', 'Node.js' ],
    category: 'DevOps',
    icon: '',
    accent: '#c084fc',
    glow: 'rgba(192,132,252,0.22)',
    metrics: [
      { label: 'Build Time', value: '5 min', sub: 'end-to-end' },
      { label: 'Success Rate', value: '98%', sub: 'over 6 months' },
      { label: 'Coverage', value: '94%', sub: 'test coverage' },
    ],
    github: 'https://github.com/Silunisilva/Carelixa.git', demo: 'https://github.com/Silunisilva/Carelixa.git',
    year: '2023',
  },
  {
    title: 'Coffee House — Modern Coffee Shop Website',
    description: ' A responsive front-end website that presents Coffee House’s brand, menu, reviews, locations and newsletter signup with polished visuals and smooth interactions. The site uses layered gradients, subtle parallax, animated cards, and staggered scroll reveals to create a premium, immersive browsing experience while remaining lightweight and fast.',
    tech: ['Vanilla JavaScript', 'Tailwind CSS', 'Framer Motion', 'GitHub', 'Bootstrap'],
    category: 'Data Eng.',
    icon: '',
    accent: '#4ade80',
    glow: 'rgba(74,222,128,0.2)',
    metrics: [
      { label: 'Events/Day', value: '5M+', sub: 'peak throughput' },
      { label: 'Latency', value: '<100ms', sub: 'p99 response' },
      { label: 'Cost/M', value: '$0.20', sub: 'per million events' },
    ],
    github: 'https://github.com/Silunisilva/coffee-shop-project.git', demo: 'https://github.com/Silunisilva/coffee-shop-project.git',
    year: '2023',
  },
  {
    title: 'PHP Login System',
    description: 'A modular PHP login system demonstrating secure user authentication with password hashing, server-side input validation, and session-based access control. Includes registration, login/logout flows, and a dynamic navbar that responds to user state.',
    tech: ['PHP', 'MySQL', 'Bootstrap', 'GitHub', 'Tailwind CSS'],
    category: 'Monitoring',
    icon: '',
    accent: '#f87171',
    glow: 'rgba(248,113,113,0.22)',
    metrics: [
      { label: 'Metrics', value: '1000+', sub: 'tracked signals' },
      { label: 'MTTD', value: '<2 min', sub: 'mean detection' },
      { label: 'Alerts', value: '300+', sub: 'smart rules' },
    ],
    github: 'https://github.com/Silunisilva/PHP-Login-System.git', demo: 'https://github.com/Silunisilva/PHP-Login-System.git',
    year: '2023',
  },
  {
    title: 'SMS Spam Classifier — a lightweight ML web app that detects spam in SMS messages.',
    description: 'A Python-based SMS spam detector using TF‑IDF text features and a Multinomial Naive Bayes model, exposed via a FastAPI endpoint with a minimal static frontend for quick demos.',
    tech: ['Python', 'FastAPI', 'scikit-learn', 'GitHub', 'Tailwind CSS'],
    category: 'Infrastructure',
    icon: '',
    accent: '#818cf8',
    glow: 'rgba(129,140,248,0.22)',
    metrics: [
      { label: 'Modules', value: '25+', sub: 'reusable units' },
      { label: 'Deployments', value: '500+', sub: 'production runs' },
      { label: 'Clouds', value: '3', sub: 'AWS · Azure · GCP' },
    ],
    github: 'https://github.com/Silunisilva/spam-detection-ml.git', demo: 'https://github.com/Silunisilva/spam-detection-ml.git',
    year: '2022',
  },
   {
    title: 'LinkedIn Login Automation Testing Project',
    description: 'Developed an automated testing project to validate the LinkedIn login functionality using Selenium WebDriver. The project automates key user actions such as launching the browser, navigating to the LinkedIn login page, entering credentials, verifying successful login behavior, and more',
    tech: ['Java', 'Selenium WebDriver', 'GitHub', 'HTML & CSS', 'Bootstrap', 'ChromeDriver', 'JUnit'],
    category: 'Infrastructure',
    icon: '',
    accent: '#818cf8',
    glow: 'rgba(129,140,248,0.22)',
    metrics: [
      { label: 'Modules', value: '25+', sub: 'reusable units' },
      { label: 'Deployments', value: '500+', sub: 'production runs' },
      { label: 'Clouds', value: '3', sub: 'AWS · Azure · GCP' },
    ],
    github: 'https://github.com/Silunisilva/selenium-automation-project.git', demo: 'https://github.com/Silunisilva/selenium-automation-project.git',
    year: '2022',
  },
   {
    title: 'Edu-Matrix-Pro',
    description: 'Contributed as a team member in the development of EduMatrix Pro, a mobile-based educational platform designed for freelancers and undergraduate students to share knowledge and earn through educational content. The application allows content creators to upload videos related to technology and learning topics.',
    tech: ['Flutter', 'Firebase', 'GitHub', 'Dart', 'Google Play Store'],
    category: 'Infrastructure',
    icon: '',
    accent: '#818cf8',
    glow: 'rgba(129,140,248,0.22)',
    metrics: [
      { label: 'Modules', value: '25+', sub: 'reusable units' },
      { label: 'Deployments', value: '500+', sub: 'production runs' },
      { label: 'Clouds', value: '3', sub: 'AWS · Azure · GCP' },
    ],
    github: 'https://github.com/Silunisilva/Edu-Matrix-Pro.git', demo: 'https://github.com/Silunisilva/Edu-Matrix-Pro.git',
    year: '2022',
  },
]

const N = projects.length

const GithubSVG = () => (
  <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
)

const ExternalSVG = () => (
  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/>
  </svg>
)

function ArcRing({ current, total, accent }: { current: number; total: number; accent: string }) {
  const r = 22
  const circ = 2 * Math.PI * r
  const dash = ((current + 1) / total) * circ
  return (
    <svg width="56" height="56" viewBox="0 0 56 56">
      <circle cx="28" cy="28" r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="2"/>
      <circle cx="28" cy="28" r={r} fill="none" stroke={accent} strokeWidth="2"
        strokeDasharray={`${dash} ${circ}`} strokeLinecap="round"
        strokeDashoffset={circ * 0.25}
        style={{ transition: 'stroke-dasharray 0.5s cubic-bezier(.16,1,.3,1), stroke 0.4s' }}
      />
      <text x="28" y="33" textAnchor="middle" fill="white" fontSize="11"
        fontFamily="'DM Mono',monospace" fontWeight="700"
      >{String(current + 1).padStart(2,'0')}</text>
    </svg>
  )
}

function SpineCard({ project, side, onClick }: { project: typeof projects[0]; side: 'left' | 'right'; onClick: () => void }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.05, x: side === 'left' ? 4 : -4 }}
      whileTap={{ scale: 0.97 }}
      className="flex flex-col items-center justify-center gap-3 rounded-2xl cursor-pointer w-full h-full"
      style={{
        background: 'rgba(255,255,255,0.025)',
        border: '1px solid rgba(255,255,255,0.06)',
        padding: '20px 10px',
        backdropFilter: 'blur(10px)',
        minHeight: 220,
      }}
    >
      <span style={{ fontSize: 26, filter: 'saturate(0.3) brightness(0.6)' }}>{project.icon}</span>
      <div style={{
        writingMode: 'vertical-rl',
        textOrientation: 'mixed',
        transform: side === 'left' ? 'rotate(180deg)' : 'none',
        fontSize: 9,
        fontFamily: "'DM Mono', monospace",
        letterSpacing: '0.1em',
        color: 'rgba(255,255,255,0.18)',
        maxHeight: 110,
        overflow: 'hidden',
        whiteSpace: 'nowrap',
      }}>
        {project.title}
      </div>
      <div className="w-1 h-1 rounded-full" style={{ background: project.accent, opacity: 0.35 }} />
    </motion.button>
  )
}

function ActiveCard({ project }: { project: typeof projects[0] }) {
  const { accent, glow } = project
  return (
    <motion.div
      key={project.title}
      initial={{ opacity: 0, scale: 0.97, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: -6 }}
      transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full rounded-3xl overflow-hidden"
      style={{
        background: 'linear-gradient(145deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.025) 100%)',
        border: `1px solid ${accent}40`,
        boxShadow: `0 0 0 1px ${accent}15, 0 28px 70px ${glow}, 0 8px 32px rgba(0,0,0,0.55)`,
        backdropFilter: 'blur(20px)',
      }}
    >
      <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full pointer-events-none"
        style={{ background: `radial-gradient(circle, ${accent}22 0%, transparent 70%)` }}
      />

      <div className="grid grid-cols-1 lg:grid-cols-5">

        {/* LEFT — visual panel */}
        <div
          className="lg:col-span-2 relative flex flex-col justify-between p-4 overflow-hidden"
          style={{
            background: `linear-gradient(150deg, ${accent}18 0%, ${accent}07 60%, transparent 100%)`,
            borderRight: `1px solid ${accent}1a`,
            minHeight: 0,
          }}
        >
          <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
            style={{
              backgroundImage: `repeating-linear-gradient(45deg, ${accent} 0, ${accent} 1px, transparent 0, transparent 50%)`,
              backgroundSize: '22px 22px',
            }}
          />
          <div className="absolute inset-0 opacity-[0.045] pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(circle, white 1px, transparent 0)',
              backgroundSize: '30px 30px',
            }}
          />

          {/* top row */}
          <div className="relative z-10 flex items-center justify-between">
            <span className="px-3 py-1 rounded-full text-[11px] font-mono font-semibold tracking-wider uppercase"
              style={{ background: `${accent}20`, border: `1px solid ${accent}40`, color: accent }}>
              {project.category}
            </span>
            <span className="font-mono text-xs" style={{ color: `${accent}70` }}>{project.year}</span>
          </div>

          {/* icon */}
          <div className="relative z-10 flex items-center justify-center py-1">
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              style={{ fontSize: 48, filter: `drop-shadow(0 0 26px ${accent}99)` }}
            >
              {project.icon}
            </motion.div>
          </div>

          {/* metrics */}
          <div className="relative z-10 space-y-1">
            {project.metrics.map((m: typeof project.metrics[0]) => (
              <div key={m.label}
                className="flex items-center justify-between px-2.5 py-1 rounded-lg text-[8px]"
                style={{ background: `${accent}0e`, border: `1px solid ${accent}1e` }}
              >
                <div>
                  <div className="text-[9px] font-mono uppercase tracking-widest" style={{ color: `${accent}75` }}>
                    {m.label}
                  </div>
                  <div className="text-[9px]" style={{ color: 'rgba(255,255,255,0.3)' }}>{m.sub}</div>
                </div>
                <div className="text-xl font-extrabold tabular-nums"
                  style={{ fontFamily: "'DM Mono', monospace", color: accent }}>
                  {m.value}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — content panel */}
        <div className="lg:col-span-3 flex flex-col justify-between p-4 gap-3">
          <div>
            <div className="font-mono text-[9px] uppercase tracking-[0.28em] mb-1" style={{ color: `${accent}60` }}>
              ✦ featured project
            </div>
            <h3 className="text-lg font-extrabold leading-tight mb-1 text-white"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              {project.title}
            </h3>
            <p className="text-xs leading-tight line-clamp-2" style={{ color: '#9090b0' }}>
              {project.description}
            </p>
          </div>

          <div>
            <div className="font-mono text-[8px] uppercase tracking-wider mb-1.5" style={{ color: '#35355a' }}>
              Stack
            </div>
            <div className="flex flex-wrap gap-1.5">
              {project.tech.map((t: string) => (
                <span key={t}
                  className="px-2 py-0.5 rounded text-[9px] font-mono font-medium"
                  style={{ background: `${accent}10`, border: `1px solid ${accent}2e`, color: accent }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div style={{ borderTop: '1px solid rgba(255,255,255,0.02)' }} />

          <div className="flex items-center gap-1.5 flex-wrap">
            <motion.a href={project.demo} target="_blank" whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs text-white"
              style={{ background: `linear-gradient(135deg, ${accent}d0, ${accent}88)` }}
            >
               <GithubSVG /> Source
            </motion.a>
            
          </div>
        </div>
      </div>
    </motion.div>
  )
}

/* ─── Main export ─────────────────────────────────────────── */
export default function Projects() {
  const [active, setActive] = useState(0)
  const [autoplay, setAutoplay] = useState(true)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const prev = useCallback(() => setActive((a) => (a - 1 + N) % N), [])
  const next = useCallback(() => setActive((a) => (a + 1) % N), [])

  useEffect(() => {
    if (!autoplay) return
    const id = setInterval(next, 6000)
    return () => clearInterval(id)
  }, [autoplay, next])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (isMobile) {
        if (e.key === 'ArrowLeft') { setAutoplay(false); prev() }
        if (e.key === 'ArrowRight') { setAutoplay(false); next() }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [prev, next, isMobile])

  const current = projects[active]
  const leftIdx = (active - 1 + N) % N
  const rightIdx = (active + 1) % N

  return (
    <section
      id="projects"
      className="relative w-full overflow-hidden py-8 md:py-3"
      style={{ background: '#0a0a0f' }}
      onMouseEnter={() => !isMobile && setAutoplay(false)}
      onMouseLeave={() => !isMobile && setAutoplay(true)}
    >
      {/* ambient bg glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 55% 45% at 50% 65%, ${current.glow} 0%, transparent 70%)`,
          transition: 'background 0.7s ease',
        }}
      />

      <div className="relative z-10 max-w-9xl mx-auto px-4 md:px-6">

        {/* header */}
        <div className="flex items-end justify-between mb-8 md:mb-12 flex-wrap gap-4 md:gap-6">
          <div>
            <div className="font-mono text-[13px] md:text-[15px] tracking-[0.35em] uppercase mb-3 font-weight-900" style={{ color: '#96969e' }}>
              ✦ selected work
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              Projects &amp;{' '}
              <span style={{
                background: `linear-gradient(135deg, ${current.accent}, #7de8d0)`,
                borderRadius: '10px',
                padding: '4px 12px',
                transition: 'background 0.5s',
              }}>Deployments</span>
            </h2>
          </div>
          {!isMobile && <ArcRing current={active} total={N} accent={current.accent} />}
        </div>

        {/* 3-col: spine | card | spine - Hidden on mobile */}
        <div className="hidden lg:grid gap-3 items-stretch"
          style={{ gridTemplateColumns: '68px 1fr 68px' }}>
          <SpineCard project={projects[leftIdx]} side="left"
            onClick={() => { setAutoplay(false); setActive(leftIdx) }} />
          <AnimatePresence mode="wait">
            <ActiveCard key={active} project={current} />
          </AnimatePresence>
          <SpineCard project={projects[rightIdx]} side="right"
            onClick={() => { setAutoplay(false); setActive(rightIdx) }} />
        </div>

        {/* Mobile: Full-width card only */}
        {isMobile && (
          <div className="mb-6">
            <AnimatePresence mode="wait">
              <ActiveCard key={active} project={current} />
            </AnimatePresence>
          </div>
        )}

        {/* controls */}
        <div className="flex items-center justify-center gap-3 md:gap-5 mt-6 md:mt-10 flex-wrap">
          <motion.button whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.93 }}
            onClick={() => { setAutoplay(false); prev() }} aria-label="Previous"
            className="w-10 h-10 md:w-11 md:h-11 rounded-full flex items-center justify-center"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.45)' }}
          >
            <svg width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <path d="M15 19l-7-7 7-7"/>
            </svg>
          </motion.button>

          <div className="flex items-center gap-1.5 md:gap-2 flex-wrap justify-center max-w-xs">
            {projects.map((p, i) => (
              <button key={i} onClick={() => { setAutoplay(false); setActive(i) }}
                aria-label={`Project ${i + 1}`}
                style={{
                  height: 5, borderRadius: 3, border: 'none', cursor: 'pointer', padding: 0,
                  width: i === active ? 24 : 5,
                  background: i === active ? p.accent : 'rgba(255,255,255,0.12)',
                  transition: 'all 0.35s cubic-bezier(.16,1,.3,1)',
                  boxShadow: i === active ? `0 0 8px ${p.accent}70` : 'none',
                }}
              />
            ))}
          </div>

          <motion.button whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.93 }}
            onClick={() => { setAutoplay(false); next() }} aria-label="Next"
            className="w-10 h-10 md:w-11 md:h-11 rounded-full flex items-center justify-center"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.45)' }}
          >
            <svg width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <path d="M9 5l7 7-7 7"/>
            </svg>
          </motion.button>
        </div>

        {/* progress bar */}
        <div className="mt-4 md:mt-6 flex items-center gap-4">
          <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.05)' }}>
            <motion.div
              className="h-full rounded-full"
              animate={{ width: `${((active + 1) / N) * 100}%`, background: current.accent }}
              transition={{ duration: 0.5, ease: [0.16,1,0.3,1] }}
            />
          </div>
          <span className="font-mono text-[10px] flex-shrink-0" style={{ color: '#28285a' }}>
            {String(active + 1).padStart(2,'0')} / {String(N).padStart(2,'0')}
          </span>
        </div>

        {/* keyboard hint - Hidden on mobile */}
        {!isMobile && (
          <div className="flex items-center justify-center gap-2 mt-4">
            {['←','→'].map(k => (
              <span key={k} className="px-2 py-0.5 rounded font-mono text-[10px]"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', color: '#24244a' }}>
                {k}
              </span>
            ))}
            <span className="text-[10px] font-mono" style={{ color: '#24244a' }}>to navigate</span>
          </div>
        )}
      </div>
    </section>
  )
}