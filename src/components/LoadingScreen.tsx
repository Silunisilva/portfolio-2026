import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface LoadingScreenProps {
  isVisible: boolean
}

export default function LoadingScreen({ isVisible }: LoadingScreenProps) {
  const [dots, setDots] = useState('')

  useEffect(() => {
    if (!isVisible) return

    const interval = setInterval(() => {
      setDots(prev => (prev.length < 3 ? prev + '.' : ''))
    }, 600)

    return () => clearInterval(interval)
  }, [isVisible])

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
      className={`fixed inset-0 z-50 flex items-center justify-center ${
        isVisible ? 'pointer-events-auto' : 'pointer-events-none'
      }`}
      style={{
        background: 'linear-gradient(135deg, #010101 0%, #000000 50%, #09090a 100%)',
      }}
    >
      {/* Ambient background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply opacity-20 blur-3xl"
          animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply opacity-20 blur-3xl"
          animate={{ x: [0, -50, 0], y: [0, -30, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* Main content */}
      <motion.div
        className="relative z-10 flex flex-col items-center justify-center space-y-8"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.8 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        {/* Logo container */}
        <motion.div
          className="relative"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          <motion.img
            src="/logo.png"
            alt="Siluni Silva"
            className="h-52 w-auto drop-shadow-2xl"
            animate={{ 
              filter: [
                'drop-shadow(0 0 0px rgba(59, 130, 246, 0))',
                'drop-shadow(0 0 20px rgba(59, 130, 246, 0.6))',
                'drop-shadow(0 0 0px rgba(59, 130, 246, 0))',
              ]
            }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>

        {/* Luxury accent line */}
        <motion.div
          className="h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isVisible ? 1 : 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          style={{ width: '450px' }}
        />

        {/* Loading text with dots animation */}
        <div className="text-center space-y-4">
          <motion.h2
            className="text-2xl font-light tracking-widest text-white"
            initial={{ opacity: 0, letterSpacing: '0.05em' }}
            animate={{ opacity: isVisible ? 1 : 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            LOADING
            <span className="ml-2 w-8 inline-block text-left">{dots}</span>
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            className="text-sm font-light text-blue-300 tracking-widest"
            initial={{ opacity: 0 }}
            animate={{ opacity: isVisible ? 0.7 : 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            Preparing Your Experience
          </motion.p>
        </div>

        {/* Animated progress bar */}
        <motion.div
          className="mt-8 w-48 h-1 bg-gray-800 rounded-full overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: isVisible ? 1 : 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500"
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
              repeatDelay: 0.5,
            }}
          />
        </motion.div>

        {/* Decorative corners */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute top-8 left-8 w-16 h-16 border-t-2 border-l-2 border-blue-500 rounded-tl-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: isVisible ? 0.5 : 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          />
          <motion.div
            className="absolute top-8 right-8 w-16 h-16 border-t-2 border-r-2 border-purple-500 rounded-tr-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: isVisible ? 0.5 : 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          />
          <motion.div
            className="absolute bottom-8 left-8 w-16 h-16 border-b-2 border-l-2 border-purple-500 rounded-bl-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: isVisible ? 0.5 : 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          />
          <motion.div
            className="absolute bottom-8 right-8 w-16 h-16 border-b-2 border-r-2 border-blue-500 rounded-br-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: isVisible ? 0.5 : 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          />
        </div>
      </motion.div>
    </motion.div>
  )
}
