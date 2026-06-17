import React from 'react'
import { motion } from 'framer-motion'

export default function Hero(){
  return (
    <section aria-label="Hero" className="w-full px-8 xl:px-16 2xl:px-24 py-12 relative min-h-[92vh] flex items-center overflow-hidden">
      {/* Animated floating cloud shapes - multiple clouds for depth */}
      <motion.div className="absolute -top-20 -left-20 w-96 h-96 rounded-full opacity-20 blur-3xl pointer-events-none" style={{ background: 'radial-gradient(circle, #7c3aed 0%, transparent 70%)' }} animate={{ y: [0, 30, 0], x: [0, 15, 0] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }} />
      <motion.div className="absolute top-1/4 right-0 w-80 h-80 rounded-full opacity-15 blur-3xl pointer-events-none" style={{ background: 'radial-gradient(circle, #06b6d4 0%, transparent 70%)' }} animate={{ y: [0, -40, 0], x: [0, -20, 0] }} transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }} />
      <motion.div className="absolute -bottom-32 left-1/3 w-96 h-96 rounded-full opacity-10 blur-3xl pointer-events-none" style={{ background: 'radial-gradient(circle, #06b6d4 0%, transparent 70%)' }} animate={{ y: [0, 40, 0], x: [0, 20, 0] }} transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 2 }} />
      
      {/* Cloud SVG elements for extra visual richness */}
      <svg className="pointer-events-none absolute top-20 right-1/4 w-48 h-32 opacity-30" viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <defs>
          <linearGradient id="cloudGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7c3aed" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
        </defs>
        <path fill="url(#cloudGrad1)" d="M 20 60 Q 20 40 40 40 Q 50 20 70 20 Q 90 20 100 40 Q 120 40 120 60 Z" opacity="0.7"/>
      </svg>
      
      <svg className="pointer-events-none absolute bottom-40 left-10 w-64 h-40 opacity-25 animate-drift" viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <defs>
          <linearGradient id="cloudGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#a78bfa" />
          </linearGradient>
        </defs>
        <path fill="url(#cloudGrad2)" d="M 10 70 Q 10 50 30 50 Q 40 30 60 30 Q 90 30 110 50 Q 130 50 140 70 Z" opacity="0.6"/>
      </svg>

      <div className="relative z-10 w-full mx-auto" style={{ fontFamily: "'DM Sans', sans-serif" }}>
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;700&display=swap" rel="stylesheet" />
        {/* Terminal-style header with cloud theme */}
        <motion.div initial={{ y: -18, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/3 border border-white/8 rounded-lg backdrop-blur-sm">
            <span className="text-accent font-mono text-sm">☁️ ~/cloud</span>
            <span className="text-gray-500">❯</span>
            <span className="text-primary font-mono text-sm animate-pulse">software developer.sh</span>
          </div>
        </motion.div>

        {/* Enhanced grid layout */}
        <div className="grid grid-cols-12 gap-6 md:gap-12 items-start">
          {/* Left: Orbital container with luxury design */}
          <div className="col-span-12 lg:col-span-6 relative">
            {/* Orbital background frame */}
            <div className="absolute inset-0 -m-12 pointer-events-none">
              {/* Outer ring - slowly rotating */}
              <motion.div
                className="absolute inset-0 rounded-full border border-primary/20"
                style={{
                  width: '120%',
                  height: '120%',
                  left: '-10%',
                  top: '-10%',
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              />
              
              {/* Middle ring - counter-rotating */}
              <motion.div
                className="absolute inset-0 rounded-full border border-accent/15"
                style={{
                  width: '110%',
                  height: '110%',
                  left: '-5%',
                  top: '-5%',
                }}
                animate={{ rotate: -360 }}
                transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
              />

              {/* Inner ring - slowest rotation */}
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-primary/30"
                style={{
                  width: '105%',
                  height: '105%',
                  left: '-2.5%',
                  top: '-2.5%',
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
              />

              {/* Orbital nodes - decorative elements */}
              {[0, 90, 180, 270].map((angle) => (
                <motion.div
                  key={angle}
                  className="absolute w-2 h-2 rounded-full bg-gradient-to-r from-primary to-accent"
                  style={{
                    width: '18px',
                    height: '18px',
                    left: 'calc(50% - 4px)',
                    top: '-5%',
                    originX: '0%',
                    originY: 'calc(55% + 4px)',
                  }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                />
              ))}

              {/* Glow auras on rings */}
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  width: '120%',
                  height: '120%',
                  left: '-10%',
                  top: '-10%',
                  background: 'radial-gradient(circle, rgba(124, 58, 237, 0.1), transparent)',
                  filter: 'blur(20px)',
                }}
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            </div>

            {/* Main content card */}
            <motion.div initial={{ x: -24, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.08 }} className="relative z-10 bg-gradient-to-br from-white/4 to-white/[0.02]  p-8 backdrop-blur-sm overflow-hidden group">
              {/* Floating cloud decoration inside card */}
              <motion.div className="absolute -right-20 -top-12 w-48 h-48 rounded-full bg-gradient-to-br from-primary/20 to-accent/10 blur-2xl opacity-60" animate={{ y: [0, 15, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }} />
              <motion.div className="absolute -bottom-10 -left-20 w-40 h-40 rounded-full bg-gradient-to-tr from-accent/15 to-primary/10 blur-2xl opacity-40" animate={{ y: [0, -20, 0] }} transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }} />

            <div className="font-mono text-xs text-gray-500 mb-3">{'// ☁️ Cloud-native systems & modern UIs'}</div>

            <h1 style={{ fontFamily: "'Bebas Neue', sans-serif" }} className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl 2xl:text-8xl font-extrabold mb-4 leading-tight">
              <span className="text-white">Hi, I'm </span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-primary animate-gradient bg-[length:200%_auto]">Siluni</span>
              <span className="text-white"> ☁️</span>
              <br className="hidden md:block" />
              <span className="text-gray-300 font-medium text-sm sm:text-base md:text-xl lg:text-2xl">Final Year BSc (Hons) Software Engineering • Junior Web Developer</span>
            </h1>
            <p className="text-gray-400 text-sm sm:text-base md:text-lg lg:text-xl mb-6 leading-relaxed max-w-lg">
              I'm a Final-Year BSc (Hons) Software Engineering student and a junior web developer building user centered web apps. I'm currently exploring AI, DevOps, and cloud development, and open to internships and collaborative projects.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <motion.a 
                href="#projects" 
                whileHover={{ scale: 1.05, y: -4 }} 
                whileTap={{ scale: 0.95 }} 
                className="px-6 py-3 bg-gradient-to-r from-primary to-accent rounded-lg text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <span className="flex items-center gap-2">
                  View Projects 
                  <motion.span animate={{ x: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
                    {'\u2192'}
                  </motion.span>
                </span>
              </motion.a>
              <motion.a 
                href="#contact" 
                whileHover={{ scale: 1.05 }} 
                whileTap={{ scale: 0.95 }} 
                className="px-6 py-3 border border-white/20 rounded-lg text-gray-200 hover:bg-white/5 transition-all backdrop-blur-sm font-semibold"
              >
                Contact Us
              </motion.a>
            </div>
            </motion.div>
          </div>

          {/* Right column: Full animated avatar display with actual image */}
          <div className="hidden lg:flex col-span-12 lg:col-span-6 relative z-10 h-full items-center justify-center">
            {/* Large animated avatar background */}
            <div className="relative w-full h-[600px] flex items-center justify-center">
              {/* Multiple orbital rings background */}
              <motion.div
                className="absolute inset-0 rounded-full border border-primary/20"
                style={{
                  width: '110%',
                  height: '110%',
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
              />
              
              <motion.div
                className="absolute inset-0 rounded-full border border-accent/15"
                style={{
                  width: '95%',
                  height: '95%',
                }}
                animate={{ rotate: -360 }}
                transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
              />

              {/* Glow aura */}
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  width: '180%',
                  height: '180%',
                  background: 'radial-gradient(circle, rgba(124, 58, 237, 0.2), rgba(6, 182, 212, 0.1), transparent)',
                  filter: 'blur(40px)',
                }}
                animate={{
                  opacity: [0.4, 0.8, 0.4],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />

              {/* Main image container */}
              <motion.div
                className="relative w-100 h-100 rounded-3xl overflow-hidden"
                
               
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                {/* Actual Image */}
                <img 
                  src="/hero.png" // Replace with your actual image path
                  alt="Siluni - Developer"
                  className="w-full h-full object-cover"
                  style={{
                    objectPosition: 'center 30%', // Adjust this to focus on face if needed
                  }}
                />
                
                {/* Gradient overlay for better text contrast if needed */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
              </motion.div>

              {/* Floating particle orbs around avatar */}
              {[0, 1, 2, 3, 4, 5].map((i) => {
                const angle = (i * 60) * (Math.PI / 180)
                const radius = 200
                const x = Math.cos(angle) * radius
                const y = Math.sin(angle) * radius
                
                return (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 rounded-full"
                    style={{
                      background: i % 2 === 0 ? '#7c3aed' : '#06b6d4',
                      left: `calc(50% + ${x}px)`,
                      top: `calc(50% + ${y}px)`,
                    }}
                    animate={{
                      y: [0, -15, 0],
                      x: [0, Math.sin(i) * 5, 0],
                      opacity: [0.3, 1, 0.3],
                    }}
                    transition={{
                      duration: 3 + i * 0.3,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  />
                )
              })}

              {/* Info badges around avatar */}
              <motion.div
                className="absolute bottom-12 -left-4 px-4 py-2 rounded-lg bg-white/10 border border-white/20 backdrop-blur-sm"
                animate={{
                  x: [0, -5, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <span className="text-xs font-semibold text-primary">SOFTWARE DEVELOPER</span>
              </motion.div>

              <motion.div
                className="absolute bottom-12 -right-4 px-4 py-2 rounded-lg bg-white/10 border border-white/20 backdrop-blur-sm"
                animate={{
                  x: [0, 5, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 0.5,
                }}
              >
                <span className="text-xs font-semibold text-accent">React & TS</span>
              </motion.div>

              {/* Tech badges at bottom */}
              <motion.div
                className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                {['AWS', 'K8s', 'Docker'].map((tech, i) => (
                  <motion.span
                    key={tech}
                    className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-[11px] font-bold text-white backdrop-blur-sm"
                    animate={{
                      y: [0, -4, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: i * 0.2,
                    }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .typing{animation:typing 3.4s steps(28,end) 1, blinkCaret .75s step-end infinite}
        @keyframes typing{from{width:0} to{width:100%}}
        @keyframes blinkCaret{50%{border-color:transparent}}
        .typing{display:inline-block; white-space:pre; overflow:hidden; border-right:2px solid rgba(255,255,255,0.15);}
        .caret{animation:blink .8s steps(1) infinite}
        @keyframes blink{50%{opacity:0}}
        @keyframes drift {
          0% { transform: translateX(0px) translateY(0px); }
          50% { transform: translateX(30px) translateY(-20px); }
          100% { transform: translateX(0px) translateY(0px); }
        }
        .animate-drill { animation: drift 6s ease-in-out infinite; }
      `}</style>
    </section>
  )
}