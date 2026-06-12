import React from 'react'
import { motion } from 'framer-motion'

export default function PhotoSection() {
  const education = [
    {
      degree: 'Bachelor of Hons in Software Engineering',
      institution: 'CINEC Campus - Colombo International Nautical and Engineering College',
      year: '2022 - 2026 (Expected)',
      icon: '🎓',
      color: 'from-purple-500 to-pink-500'
    },
    {
      degree: 'GCE Advanced Level',
      institution: 'Anula Vidyalaya - Nugegoda',
      year: '2018 - 2020',
      icon: '🎯',
      color: 'from-blue-500 to-cyan-500'
    }
  ]

  return (
    <div className="relative z-10 w-full mx-auto px-4 sm:px-6 py-12 sm:py-20">
      {/* Decorative geometric shapes — desktop only */}
      <motion.div
        animate={{ rotate: [0, 360], scale: [1, 1.1, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-20 right-10 w-40 h-40 border-4 border-primary/20 rounded-6xl rotate-12 hidden xl:block"
      />
      <motion.div
        animate={{ rotate: [0, -360], y: [0, 20, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-20 left-10 w-32 h-32 bg-gradient-to-br from-accent/20 to-primary/20 rounded-full blur-2xl hidden xl:block"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center max-w-8xl mx-auto">

        {/* ── Photo Side ── */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative order-2 lg:order-1"
        >
          <div className="relative">
            {/* Glow */}
            <motion.div
              animate={{ rotate: [0, 5, 0], scale: [1, 1.05, 1] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -inset-4 bg-gradient-to-br from-primary via-accent to-purple-600 rounded-[3rem] opacity-20 blur-2xl"
            />

            {/* Corner accents */}
            <div className="absolute -top-4 -left-4 sm:-top-6 sm:-left-6 w-16 h-16 sm:w-24 sm:h-24 border-t-4 border-l-4 border-primary rounded-tl-3xl" />
            <div className="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 w-16 h-16 sm:w-24 sm:h-24 border-b-4 border-r-4 border-accent rounded-br-3xl" />

            {/* Photo container — capped width on mobile so it doesn't go edge-to-edge */}
            <motion.div
              whileHover={{ scale: 1.02, rotate: 1 }}
              className="relative mx-auto w-64 h-64 sm:w-80 sm:h-80 lg:w-full lg:h-auto lg:aspect-square rounded-[2.5rem] overflow-hidden border-4 border-white/20 shadow-2xl bg-gradient-to-br from-primary/30 via-accent/20 to-primary/30"
            >
              <img src="/me.png" alt="Siluni Silva" className="w-full h-full object-cover" />

              {/* Animated gradient overlay */}
              <motion.div
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-accent/20"
              />
            </motion.div>

            {/* Floating badges
                On mobile: smaller text + tighter padding; positioned relative to the
                capped photo container via percentage so they don't clip the viewport */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -top-3 left-1/2 -translate-x-1/2 sm:translate-x-0 sm:left-1/4 bg-gradient-to-r from-primary to-purple-600 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full shadow-lg border border-white/20 whitespace-nowrap"
            >
              <span className="text-white font-bold text-xs sm:text-sm">Software Developer</span>
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 3.5, repeat: Infinity }}
              className="absolute -bottom-3 left-1/2 -translate-x-1/2 sm:translate-x-0 sm:right-1/4 sm:left-auto bg-gradient-to-r from-accent to-blue-600 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full shadow-lg border border-white/20 whitespace-nowrap"
            >
              <span className="text-white font-bold text-xs sm:text-sm">Junior Web Developer</span>
            </motion.div>
          </div>
        </motion.div>

        {/* ── Content Side ── */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-6 order-1 lg:order-2"
        >
          {/* Header */}
          <div className="space-y-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block"
            >
              <div className="flex items-center gap-2 text-primary font-semibold mb-2">
                <div className="w-8 sm:w-12 h-[2px] bg-gradient-to-r from-primary to-accent" />
                <span className="text-sm sm:text-base">Portfolio Highlights</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-2">
                Building the
                <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent"> Future</span>
              </h2>
              <p className="text-gray-400 text-base sm:text-lg">
                Software developer &amp; Full-Stack engineer specializing in scalable solutions
              </p>
            </motion.div>
          </div>

          {/* Education Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-3"
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-[2px] bg-gradient-to-r from-accent to-primary" />
              <h3 className="text-white font-bold text-lg">Education</h3>
            </div>

            <div className="space-y-3">
              {education.map((edu, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + idx * 0.1 }}
                  whileHover={{ x: 5 }}
                  className="group relative"
                >
                  <div className={`absolute inset-0 bg-gradient-to-r ${edu.color} opacity-0 group-hover:opacity-20 blur-xl rounded-xl transition-opacity duration-300`} />

                  <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-xl p-3 sm:p-4 shadow-lg hover:shadow-xl transition-all duration-300">
                    <div className="flex items-start gap-3 sm:gap-4">
                      <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-br ${edu.color} flex items-center justify-center text-xl sm:text-2xl shadow-lg flex-shrink-0`}>
                        {edu.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-white font-bold text-xs sm:text-sm mb-1 line-clamp-2">
                          {edu.degree}
                        </div>
                        <div className="text-gray-400 text-xs mb-1">
                          {edu.institution}
                        </div>
                        <div className="text-accent text-xs font-semibold">
                          {edu.year}
                        </div>
                      </div>
                     
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap gap-3 sm:gap-4 pt-4"
          >
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#contact"
              className="px-5 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-primary to-purple-600 rounded-xl font-semibold text-white text-sm sm:text-base shadow-lg hover:shadow-primary/50 transition-shadow flex items-center gap-2"
            >
              <span>Get in Touch</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#projects"
              className="px-5 sm:px-6 py-2.5 sm:py-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl font-semibold text-white text-sm sm:text-base hover:bg-white/20 transition-all"
            >
              View Projects
            </motion.a>
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative connecting lines — desktop only */}
      <svg className="absolute inset-0 pointer-events-none hidden lg:block" style={{ width: '100%', height: '100%' }}>
        <defs>
          <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.3" />
          </linearGradient>
        </defs>
        <motion.path
          d="M 30% 50% Q 50% 30%, 70% 50%"
          stroke="url(#lineGrad)"
          strokeWidth="2"
          fill="none"
          strokeDasharray="5 5"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 0.4 }}
          viewport={{ once: true }}
          transition={{ duration: 2, delay: 0.5 }}
        />
      </svg>
    </div>
  )
}