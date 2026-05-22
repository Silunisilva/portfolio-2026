import React, { useEffect, useRef, useState } from 'react'

type Props = {
  id: string
  title: string
  subtitle?: string
  children?: React.ReactNode
}

export default function Section({ id, title, subtitle, children }: Props){
  const ref = useRef<HTMLElement | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setVisible(true)
          // do not unobserve immediately so animation can remain; keep observing if you want repeated
        }
      })
    }, { threshold: 0.12 })

    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section id={id} ref={ref} className={`snap-section flex items-center reveal ${visible ? 'reveal--visible' : ''}`}>
      <div className="max-w-8xl lg:max-w-8xl mx-auto px-6 py-20 w-full">
        <div className="transition-wrapper">
          <div>
            {children}
          </div>
        </div>
      </div>
    </section>
  )
}
