import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const items = [
  { id: 'home', label: 'Home', icon: '🏠', color: 'from-purple-500 to-pink-500' },
  { id: 'about', label: 'About', icon: '👤', color: 'from-blue-500 to-cyan-500' },
  { id: 'projects', label: 'Projects', icon: '💼', color: 'from-orange-500 to-yellow-500' },
  { id: 'skills', label: 'Skills', icon: '⚡', color: 'from-green-500 to-emerald-500' },
  { id: 'contact', label: 'Contact', icon: '✉️', color: 'from-pink-500 to-red-500' },
]

export default function Navbar(){
  const [active, setActive] = useState('home')
  const [isOpen, setIsOpen] = useState(false)
  const [rotation, setRotation] = useState(0)

  useEffect(()=>{
    const obs = new IntersectionObserver((entries)=>{
      entries.forEach(e=>{
        if(e.isIntersecting){
          setActive(e.target.id)
        }
      })
    }, { threshold: 0.5 })

    items.forEach(it => {
      const el = document.getElementById(it.id)
      if(el) obs.observe(el)
    })

    return ()=> obs.disconnect()
  }, [])

  // Auto-rotate effect
  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prev => prev + 1)
    }, 50)
    return () => clearInterval(interval)
  }, [])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    setActive(id)
    setIsOpen(false)
    window.dispatchEvent(new CustomEvent('navigate-section', { detail: id }))
  }

  const radius = 120
  const angleStep = 360 / items.length

  return (
    <>
      {/* Floating Corner Navigation */}
      <motion.nav
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, type: "spring" }}
        className="fixed top-20 right-12 z-50"
      >
        {/* Rotating Outer Ring */}
        <motion.div
          animate={{ rotate: rotation }}
          className="absolute inset-0 pointer-events-none"
          style={{ width: '100px', height: '100px', left: '-25px', top: '-25px' }}
        >
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="url(#gradient1)"
              strokeWidth="1"
              strokeDasharray="4 4"
              opacity="0.4"
            />
            <defs>
              <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#7c3aed" />
                <stop offset="50%" stopColor="#06b6d4" />
                <stop offset="100%" stopColor="#7c3aed" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>

        {/* Menu Items - Radial Layout */}
        <AnimatePresence>
          {isOpen && items.map((item, index) => {
            // Spread items between 45-135 degrees (downward arc)
            const arcSpan = 180 // degrees
            const startAngle = 90 // degrees
            const angleInDegrees = startAngle + (index / (items.length - 1)) * arcSpan
            const angle = angleInDegrees * (Math.PI / 180)
            const x = Math.cos(angle) * radius
            const y = Math.sin(angle) * radius
            const isActive = active === item.id

            return (
              <motion.a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleNavClick(e, item.id)}
                initial={{ scale: 0, x: 0, y: 0, opacity: 0 }}
                animate={{ 
                  scale: 1, 
                  x, 
                  y, 
                  opacity: 1,
                  rotate: isOpen ? 360 : 0
                }}
                exit={{ scale: 0, x: 0, y: 0, opacity: 0 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 260, 
                  damping: 20,
                  delay: index * 0.05 
                }}
                whileHover={{ scale: 1.3, rotate: 360 }}
                className="group absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              >
                {/* Glow effect */}
                <div className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-0 group-hover:opacity-60 blur-xl rounded-full transition-opacity duration-300`} />
                
                {/* Icon container */}
                <div className={`relative w-14 h-14 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center text-2xl shadow-xl border-2 ${
                  isActive ? 'border-white scale-110' : 'border-white/20'
                } transition-all`}>
                  {item.icon}
                  
                  {/* Active pulse */}
                  {isActive && (
                    <motion.div
                      animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute inset-0 rounded-full border-2 border-white"
                    />
                  )}
                </div>

                {/* Label tooltip */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileHover={{ opacity: 1, scale: 1 }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                  style={{
                    marginLeft: x > 0 ? '45px' : '-45px',
                    marginTop: y > 0 ? '10px' : '-10px'
                  }}
                >
                  <div className="bg-gray-900/95 backdrop-blur-xl border border-white/20 rounded-lg px-3 py-1.5 whitespace-nowrap">
                    <span className="text-white text-xs font-semibold">{item.label}</span>
                  </div>
                </motion.div>
              </motion.a>
            )
          })}
        </AnimatePresence>

        {/* Center Toggle Button */}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="relative w-16 h-16 rounded-full bg-gradient-to-br from-gray-900 to-gray-950 border-2 border-white/20 shadow-2xl flex items-center justify-center group overflow-hidden z-10"
        >
          {/* Animated gradient background */}
          <motion.div
            animate={{
              background: [
                'linear-gradient(45deg, #7c3aed, #06b6d4)',
                'linear-gradient(90deg, #06b6d4, #7c3aed)',
                'linear-gradient(135deg, #7c3aed, #06b6d4)',
              ]
            }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity"
          />

          {/* Icon */}
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="relative z-10"
          >
            {isOpen ? (
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </motion.div>

          {/* Rotating border ring */}
          <motion.div
            animate={{ rotate: -rotation * 2 }}
            className="absolute inset-0 rounded-full border-2 border-dashed border-primary/30"
          />

          {/* Pulse effect */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0, 0.3]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute inset-0 rounded-full bg-gradient-to-br from-primary to-accent"
          />
        </motion.button>

        {/* Active indicator badge */}
        <AnimatePresence>
          {!isOpen && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="absolute -top-2 -right-2 z-20"
            >
              <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${items.find(it => it.id === active)?.color} flex items-center justify-center text-sm border-2 border-white shadow-lg`}>
                {items.find(it => it.id === active)?.icon}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Connection lines (when open) */}
        <AnimatePresence>
          {isOpen && (
            <svg className="absolute inset-0 pointer-events-none" style={{ width: '250px', height: '250px', left: '-85px', top: '-85px' }}>
              {items.map((_, index) => {
                const arcSpan = 90
                const startAngle = 45
                const angleInDegrees = startAngle + (index / (items.length - 1)) * arcSpan
                const angle = angleInDegrees * (Math.PI / 180)
                const x = Math.cos(angle) * radius + 125
                const y = Math.sin(angle) * radius + 125

                return (
                  <motion.line
                    key={index}
                    x1="125"
                    y1="125"
                    x2={x}
                    y2={y}
                    stroke="url(#lineGradient)"
                    strokeWidth="1"
                    strokeDasharray="3 3"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.3 }}
                    exit={{ pathLength: 0, opacity: 0 }}
                    transition={{ delay: index * 0.05 }}
                  />
                )
              })}
              <defs>
                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.5" />
                </linearGradient>
              </defs>
            </svg>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  )
}
