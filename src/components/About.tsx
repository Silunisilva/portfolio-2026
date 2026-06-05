import React, { useState } from 'react'
import { motion } from 'framer-motion'

// ── Brand colors ──────────────────────────────────────────
const PRIMARY   = '#8F34EA'   // purple
const SECONDARY = '#209BD9'   // blue

const roles = [
  { label: 'Junior Web Developer', icon: '💻', color: SECONDARY },
  { label: 'QA Engineer',          icon: '🔍', color: PRIMARY },
  { label: 'Virtual Intern',       icon: '🌐', color: '#a78bfa' },
  { label: 'Cloud Enthusiast',     icon: '☁️', color: '#7dd3fc' },
]

const techStack = [
  { name: 'HTML / CSS',        group: 'web'   },
  { name: 'JavaScript',        group: 'web'   },
  { name: 'React',             group: 'web'   },
  { name: 'Node.js',           group: 'web'   },
  { name: 'Tailwind CSS',      group: 'web'   },
  { name: 'Selenium',          group: 'qa'    },
  { name: 'Cypress',           group: 'qa'    },
  { name: 'Postman',           group: 'qa'    },
  { name: 'JIRA',              group: 'qa'    },
  { name: 'AWS (Learning)',    group: 'cloud' },
  { name: 'Docker (Learning)', group: 'cloud' },
  { name: 'Git / GitHub',      group: 'tools' },
]

// Inline styles per group using brand colors
const groupStyles = {
  web:   { border: `1px solid ${SECONDARY}55`, color: SECONDARY, background: `${SECONDARY}15` },
  qa:    { border: `1px solid ${PRIMARY}55`,   color: PRIMARY,   background: `${PRIMARY}15`   },
  cloud: { border: '1px solid #7dd3fc55',      color: '#7dd3fc', background: '#7dd3fc12'      },
  tools: { border: '1px solid #a78bfa55',      color: '#a78bfa', background: '#a78bfa12'      },
}

const timeline = [
  {
    phase:  'Now',
    title:  'Junior Web Developer',
    detail: 'Building & shipping real websites. Involved in virtual intern hiring tasks.',
    icon:   '💼',
    accent: SECONDARY,
  },
  {
    phase:  'Also Now',
    title:  'QA of Web Applications',
    detail: 'Testing, bug hunting, writing test cases, ensuring product quality.',
    icon:   '🔍',
    accent: PRIMARY,
  },
  {
    phase:  'Studying',
    title:  'Final Year Undergraduate',
    detail: 'Computer Science / IT degree — wrapping up the academic chapter.',
    icon:   '🎓',
    accent: '#a78bfa',
  },
  {
    phase:  'Next',
    title:  'Cloud & DevOps',
    detail: 'Actively learning AWS, Docker, CI/CD — building toward the next frontier.',
    icon:   '☁️',
    accent: '#7dd3fc',
  },
]

function RolePill({ role, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, y: 12 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay }}
      whileHover={{ y: -3, scale: 1.04 }}
      className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl border bg-white/[0.04] backdrop-blur-sm cursor-default select-none transition-all duration-300"
      style={{
        borderColor: `${role.color}40`,
        boxShadow: `0 0 18px ${role.color}18`,
      }}
    >
      <span className="text-lg">{role.icon}</span>
      <span className="text-sm font-medium tracking-wide" style={{ color: role.color }}>
        {role.label}
      </span>
    </motion.div>
  )
}

function TimelineCard({ item, idx, total }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: idx * 0.1 }}
      className="relative group flex gap-4 items-start"
    >
      {/* Icon + connector */}
      <div className="flex flex-col items-center pt-1 shrink-0">
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-sm border border-white/10 bg-white/[0.05] group-hover:scale-110 transition-transform duration-300 z-10"
          style={{ boxShadow: `0 0 10px ${item.accent}40` }}
        >
          {item.icon}
        </div>
        {idx < total - 1 && (
          <div
          className="w-px flex-1 mt-2 min-h-[20px]"
          style={{ background: `linear-gradient(to bottom, ${item.accent}30, transparent)` }}
        />
        )}
      </div>

      {/* Card */}
      <div
        className="mb-3 flex-1 rounded-2xl px-4 py-3 backdrop-blur-sm transition-all duration-300 border"
        style={{
          borderColor: 'rgba(255,255,255,0.08)',
          background: 'rgba(255,255,255,0.03)',
          boxShadow: `0 2px 24px ${item.accent}0a`,
        }}
        onMouseEnter={e => (e.currentTarget.style.borderColor = `${item.accent}35`)}
        onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)')}
      >
        <span
          className="text-[11px] font-mono tracking-widest uppercase"
          style={{ color: item.accent }}
        >
          {item.phase}
        </span>
        <h4 className="text-white font-semibold text-sm mb-1 mt-0.5">{item.title}</h4>
        <p className="text-gray-500 text-xs leading-relaxed">{item.detail}</p>
      </div>
    </motion.div>
  )
}

export default function About() {
  const [activeGroup, setActiveGroup] = useState(null)

  const groups = [
    { key: 'web',   label: 'Web Dev' },
    { key: 'qa',    label: 'QA'      },
    { key: 'cloud', label: 'Cloud'   },
    { key: 'tools', label: 'Tools'   },
  ]

  const filtered = activeGroup
    ? techStack.filter((t) => t.group === activeGroup)
    : techStack

  return (
    <div className="relative z-10 w-full mx-auto px-6 font-sans">

      {/* Ambient blobs — brand colors */}
      <div
        className="pointer-events-none absolute -top-40 -right-40 w-[280px] h-[280px] sm:w-[380px] sm:h-[380px] lg:w-[420px] lg:h-[420px] rounded-full blur-[100px] sm:blur-[120px] lg:blur-[140px]"
        style={{ background: `${PRIMARY}18` }}
      />
      <div
        className="pointer-events-none absolute -bottom-40 -left-40 w-[280px] h-[280px] sm:w-[380px] sm:h-[380px] lg:w-[420px] lg:h-[420px] rounded-full blur-[100px] sm:blur-[120px] lg:blur-[140px]"
        style={{ background: `${SECONDARY}14` }}
      />

      <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 lg:gap-10">

        {/* ══ LEFT COLUMN ══════════════════════════════════ */}
        <div className="hidden lg:flex lg:col-span-7 flex-col gap-6">

          {/* Intro card */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="group relative rounded-3xl border border-white/[0.09] bg-gradient-to-br from-white/[0.06] to-white/[0.01] backdrop-blur-md p-5 sm:p-6 lg:p-10 overflow-hidden"
          >
            {/* Hover glow */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
              style={{ background: `linear-gradient(135deg, ${PRIMARY}08, ${SECONDARY}08)` }}
            />

            {/* Avatar + label */}
            <div className="flex items-center gap-4 mb-6">
              <div
                className="relative w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-lg"
                style={{ background: `linear-gradient(135deg, ${PRIMARY}, ${SECONDARY})` }}
              >
                👋
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-green-400 border-2 border-black animate-pulse" />
              </div>
              <div>
                <span className="font-mono text-xs text-gray-600 tracking-widest">// about_me.js</span>
                <h2 className="text-white text-lg font-bold mt-0.5">Hello, World!</h2>
              </div>
            </div>

            {/* Body copy */}
            <div className="space-y-4 leading-relaxed">
              <p className="text-xl lg:text-2xl font-light text-gray-200">
                I'm a{' '}
                <span
                  className="font-bold"
                  style={{
                    backgroundImage: `linear-gradient(90deg, ${PRIMARY}, ${SECONDARY})`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  final year undergraduate
                </span>{' '}
                turning curiosity into real, shipped products.
              </p>

              <p className="text-sm lg:text-base text-gray-400">
                By day I'm a{' '}
                <span className="font-semibold" style={{ color: SECONDARY }}>
                  Junior Web Developer
                </span>{' '}
                — designing and building websites that work. I also wear the{' '}
                <span className="font-semibold" style={{ color: PRIMARY }}>
                  QA hat
                </span>
                , hunting bugs, writing test cases, and keeping quality tight. Outside of that, I'm part of{' '}
                <span className="text-violet-400 font-semibold">virtual intern hiring tasks</span>{' '}
                and always pushing to learn something new.
              </p>

              <p className="text-sm lg:text-base text-gray-400">
                My next frontier?{' '}
                <span className="text-sky-300 font-semibold">Cloud & DevOps</span> — I'm actively exploring
                AWS, Docker, AI and CI/CD pipelines because I believe the future of great software lives in the
                cloud.
              </p>
            </div>

            {/* Role pills */}
            <div className="flex flex-wrap gap-2.5 mt-7">
              {roles.map((r, i) => (
                <RolePill key={r.label} role={r} delay={0.1 + i * 0.08} />
              ))}
            </div>
          </motion.div>

          {/* Tech Stack */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.15 }}
            className="rounded-3xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm p-3 sm:p-4 lg:p-6"
          >
            <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
              <div className="flex items-center gap-3">
                <span className="text-xl">🛠️</span>
                <h3 className="text-white font-bold">Tech Stack</h3>
              </div>

              {/* Filter tabs */}
              <div className="flex gap-1.5 flex-wrap">
                <button
                  onClick={() => setActiveGroup(null)}
                  className="px-3 py-1 rounded-full text-xs font-medium border transition-all duration-200"
                  style={
                    activeGroup === null
                      ? { background: `${PRIMARY}25`, borderColor: `${PRIMARY}60`, color: '#fff' }
                      : { background: 'transparent', borderColor: 'rgba(255,255,255,0.1)', color: '#6b7280' }
                  }
                >
                  All
                </button>
                {groups.map((g) => (
                  <button
                    key={g.key}
                    onClick={() => setActiveGroup(activeGroup === g.key ? null : g.key)}
                    className="px-3 py-1 rounded-full text-xs font-medium border transition-all duration-200"
                    style={
                      activeGroup === g.key
                        ? { background: `${SECONDARY}25`, borderColor: `${SECONDARY}60`, color: '#fff' }
                        : { background: 'transparent', borderColor: 'rgba(255,255,255,0.1)', color: '#6b7280' }
                    }
                  >
                    {g.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {filtered.map((tech, idx) => (
                <motion.span
                  key={tech.name}
                  layout
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.85 }}
                  transition={{ duration: 0.25, delay: idx * 0.03 }}
                  whileHover={{ y: -2, scale: 1.06 }}
                  className="px-3 py-1.5 rounded-xl text-xs font-medium cursor-default select-none transition-all duration-200"
                  style={groupStyles[tech.group]}
                >
                  {tech.name}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* ── Mindset card — bottom of left column ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="rounded-2xl border backdrop-blur-sm p-6"
            style={{
              background: `linear-gradient(135deg, ${PRIMARY}0a, ${SECONDARY}0a)`,
              borderColor: `${PRIMARY}25`,
            }}
          >
            <span
              className="font-mono text-[10px] tracking-widest uppercase"
              style={{ color: PRIMARY }}
            >
              // mindset
            </span>
            <p className="mt-3 text-sm text-gray-400 leading-relaxed italic">
              "I learn by{' '}
              <span className="not-italic font-semibold" style={{ color: SECONDARY }}>
                building things
              </span>
              , break them to understand them, then ship something{' '}
              <span className="not-italic font-semibold" style={{ color: PRIMARY }}>
                better
              </span>
              ."
            </p>
            <div className="mt-4 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs text-gray-500">Open to opportunities</span>
            </div>
          </motion.div>

        </div>

        {/* ══ RIGHT COLUMN ═════════════════════════════════ */}
        <div className="lg:col-span-5 space-y-6">

          {/* Timeline */}
          <motion.div
            initial={{ opacity: 0, x: 28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="rounded-3xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm p-4 sm:p-6 lg:p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="text-xl">📍</span>
              <div>
                <h3 className="text-white font-bold">Where I'm At</h3>
                <div
                  className="h-0.5 w-10 rounded-full mt-1"
                  style={{ background: `linear-gradient(90deg, ${PRIMARY}, transparent)` }}
                />
              </div>
            </div>
            <div>
              {timeline.map((item, idx) => (
                <TimelineCard key={item.title} item={item} idx={idx} total={timeline.length} />
              ))}
            </div>
          </motion.div>

          {/* Snapshot stats */}
          <style>{`.hide-scrollbar::-webkit-scrollbar{display:none}.hide-scrollbar{-ms-overflow-style:none;scrollbar-width:none}`}</style>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="flex gap-2 sm:grid sm:grid-cols-3 sm:gap-3 overflow-x-auto pb-1 hide-scrollbar"
          >
            {[
              { label: 'Websites Built', value: '15+', accent: SECONDARY },
              { label: 'Apps Tested',    value: '5+',  accent: PRIMARY   },
              { label: 'Year of Study',  value: '4th', accent: '#a78bfa' },
            ].map((s) => (
                <div
                key={s.label}
                className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-2 sm:p-3 text-center backdrop-blur-sm hover:border-white/20 transition-colors duration-300 min-w-[110px] flex-shrink-0"
                style={{ boxShadow: `0 2px 14px ${s.accent}0c` }}
              >
                <div className="text-2xl font-bold mb-1" style={{ color: s.accent }}>
                  {s.value}
                </div>
                <div className="text-[10px] text-gray-500 leading-tight">{s.label}</div>
              </div>
            ))}
          </motion.div>

        </div>
      </div>
    </div>
  )
}