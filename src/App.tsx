import React, { useEffect, useRef, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Section from './components/Section'
import Footer from './components/Footer'
import LoadingScreen from './components/LoadingScreen'
import sections from './data/sections'

export default function App(){
  const [index, setIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const isAnimating = useRef(false)
  const touchStartY = useRef(0)
  const containerRef = useRef<HTMLElement | null>(null)

  const clamp = (v: number) => Math.max(0, Math.min(v, sections.length))

  const allSections = [
    { id: 'home', content: <Hero /> },
    ...sections.map(s => ({
      id: s.id,
      content: (
        <Section id={s.id} title={s.title} subtitle={s.subtitle}>
          <div className="prose prose-invert max-w-9xl text-lg">
            {s.content}
          </div>
        </Section>
      )
    }))
  ]

  // Hide loading screen after initial load
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2500)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const container = document.querySelector('main.app-scroll') as HTMLElement | null
    containerRef.current = container
    if (!container) return

    const onWheel = (e: WheelEvent) => {
      if (isAnimating.current) return
      if (Math.abs(e.deltaY) < 10) return
      e.preventDefault()
      isAnimating.current = true
      setIndex(i => {
        const next = e.deltaY > 0 ? i + 1 : i - 1
        return clamp(next)
      })
      setTimeout(() => { isAnimating.current = false }, 700)
    }

    const onKey = (e: KeyboardEvent) => {
      if (isAnimating.current) return
      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault()
        isAnimating.current = true
        setIndex(i => clamp(i + 1))
        setTimeout(() => { isAnimating.current = false }, 700)
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault()
        isAnimating.current = true
        setIndex(i => clamp(i - 1))
        setTimeout(() => { isAnimating.current = false }, 700)
      }
    }

    const onTouchStart = (e: TouchEvent) => { touchStartY.current = e.touches[0].clientY }
    const onTouchEnd = (e: TouchEvent) => {
      if (isAnimating.current) return
      const touchEndY = (e.changedTouches && e.changedTouches[0] && e.changedTouches[0].clientY) || 0
      const diff = touchStartY.current - touchEndY
      if (Math.abs(diff) < 40) return
      isAnimating.current = true
      setIndex(i => clamp(diff > 0 ? i + 1 : i - 1))
      setTimeout(() => { isAnimating.current = false }, 700)
    }

    window.addEventListener('keydown', onKey)
    container.addEventListener('wheel', onWheel, { passive: false })
    container.addEventListener('touchstart', onTouchStart, { passive: true })
    container.addEventListener('touchend', onTouchEnd)

    const onNavigate = (e: Event) => {
      const id = (e as CustomEvent).detail as string | undefined
      if (!id) return
      const idx = allSections.findIndex(s => s.id === id)
      if (idx >= 0) {
        isAnimating.current = true
        setIndex(() => idx)
        setTimeout(() => { isAnimating.current = false }, 700)
      }
    }
    window.addEventListener('navigate-section', onNavigate as EventListener)

    return () => {
      window.removeEventListener('keydown', onKey)
      container.removeEventListener('wheel', onWheel)
      container.removeEventListener('touchstart', onTouchStart)
      container.removeEventListener('touchend', onTouchEnd)
      window.removeEventListener('navigate-section', onNavigate as EventListener)
    }
  }, [sections])

  return (
    <div className="min-h-screen bg-bg text-white font-sans">
      <LoadingScreen isVisible={isLoading} />
      <Navbar />
      <main className="app-scroll">
        {allSections.map((s, i) => (
          <section 
            key={s.id} 
            id={s.id} 
            className={`slide ${i === index ? 'active' : ''}`}
            aria-hidden={i === index ? 'false' : 'true'}
            style={{
              transform: i < index ? 'translateY(-100vh)' : i === index ? 'translateY(0)' : 'translateY(100vh)',
              zIndex: i === index ? 10 : 0
            }}
          >
            {s.content}
          </section>
        ))}
      </main>
      <Footer />
    </div>
  )
}
