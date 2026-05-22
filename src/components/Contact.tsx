import React, { useState } from 'react'

/* ── Brand tokens ─────────────────────────────────────── */
const PURPLE = '#8F34EA'
const BLUE   = '#209BD9'

const contactLinks = [
  {
    label: 'Email',
    value: 'silunisilva2@gmail.com',
    href: 'mailto:silunisilva2@gmail.com',
    icon: (
      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    value: 'silunisilva',
    href: 'https://www.linkedin.com/in/silunisilva',
    icon: (
      <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: 'GitHub',
    value: 'silunisilva',
    href: 'https://github.com/Silunisilva',
    icon: (
      <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
      </svg>
    ),
  },
]

const availability = [
  { label: 'Based in',       value: 'Colombo, Sri Lanka'    },
  { label: 'Status',         value: 'Final year student'    },
  { label: 'Currently',      value: 'Junior web developer'  },
  { label: 'Open to',        value: 'Full-time & freelance' },
  { label: 'Replies within', value: '24 hours'              },
]

interface FormData {
  name: string
  email: string
  message: string
}

type SubmitState = 'idle' | 'sending' | 'sent'

export default function Contact() {
  const [formData, setFormData]       = useState<FormData>({ name: '', email: '', message: '' })
  const [submitState, setSubmitState] = useState<SubmitState>('idle')
  const [focused, setFocused]         = useState<string | null>(null)
  const [hovered, setHovered]         = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (submitState !== 'idle') return
    setSubmitState('sending')
    await new Promise((r) => setTimeout(r, 1200))
    setSubmitState('sent')
  }

  /* input style factory */
  const inputStyle = (field: string): React.CSSProperties => ({
    width: '100%',
    background: 'rgba(255,255,255,0.05)',
    border: `1px solid ${focused === field ? PURPLE : 'rgba(255,255,255,0.12)'}`,
    borderRadius: '10px',
    padding: '11px 14px',
    fontSize: '14px',
    color: '#fff',
    outline: 'none',
    transition: 'border-color 0.2s, box-shadow 0.2s',
    boxShadow: focused === field ? `0 0 0 3px rgba(143,52,234,0.15)` : 'none',
    fontFamily: 'inherit',
    resize: 'none',
    caretColor: PURPLE,
  })

  /* card lifts slightly on hover */
  const cardStyle: React.CSSProperties = {
    display: 'grid',
    borderRadius: '20px',
    overflow: 'hidden',
    perspective: '1200px',
    transform: hovered ? 'rotateX(0deg) translateY(-6px)' : 'rotateX(2deg)',
    transformOrigin: 'center bottom',
    transition: 'transform 0.4s ease, box-shadow 0.4s ease',
    boxShadow: hovered
      ? `0 0 0 1px ${PURPLE}88,
         0 0 0 2px ${BLUE}44,
         0 2px 0 3px ${PURPLE}33,
         0 4px 0 5px ${BLUE}22,
         0 6px 0 6px rgba(0,0,0,0.5),
         0 30px 80px ${PURPLE}40,
         0 30px 100px ${BLUE}28,
         0 60px 140px rgba(0,0,0,0.7)`
      : `0 0 0 1px ${PURPLE}55,
         0 0 0 2px ${BLUE}28,
         0 2px 0 3px ${PURPLE}22,
         0 4px 0 5px ${BLUE}14,
         0 6px 0 6px rgba(0,0,0,0.45),
         0 20px 60px ${PURPLE}28,
         0 20px 80px ${BLUE}18,
         0 40px 120px rgba(0,0,0,0.6)`,
  }

  return (
    <section className="contact-section">
      {/* ambient blobs */}
      <div style={{
        position: 'absolute', top: '-100px', left: '-150px',
        width: '600px', height: '600px', borderRadius: '50%',
        background: `radial-gradient(circle, ${PURPLE}30 0%, transparent 70%)`,
        filter: 'blur(70px)', pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '-120px', right: '-100px',
        width: '560px', height: '560px', borderRadius: '50%',
        background: `radial-gradient(circle, ${BLUE}25 0%, transparent 70%)`,
        filter: 'blur(70px)', pointerEvents: 'none',
      }} />

      {/* content */}
      <div style={{ position: 'relative', maxWidth: '100%', margin: '0 auto', padding: '0 0.5rem' }}>

        {/* Eyebrow */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem' }}>
          <span style={{
            width: '8px', height: '8px', borderRadius: '50%',
            background: '#4ade80', flexShrink: 0,
            boxShadow: '0 0 10px #4ade8099',
          }} />
          <span style={{ fontSize: '11px', fontFamily: 'monospace', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)' }}>
            Open to opportunities
          </span>
        </div>

        {/* Heading */}
        <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 3.6rem)', fontWeight: 700, color: '#fff', letterSpacing: '-0.025em', lineHeight: 1.06, marginBottom: '0.75rem' }}>
          Let's{' '}
          <span style={{
            background: `linear-gradient(90deg, ${PURPLE}, ${BLUE})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            work together
          </span>
        </h2>
        <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, maxWidth: '520px', marginBottom: '2rem' }}>
          Final year student and junior web developer based in Sri Lanka.
          Looking for the right next step. If you've got something interesting, let's talk.
        </p>

        {/* 3-D Card */}
        <div style={{ perspective: '1400px' }}>
          <div
            style={cardStyle}
            className="contact-card"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            {/* ── LEFT: Form ── */}
            <div className="card-pane left" style={{
              background: `linear-gradient(145deg, #111126 0%, #0d0d20 100%)`,
              borderRight: `1px solid ${PURPLE}33`,
            }}>
              {submitState === 'sent' ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '0rem 0' }}>
                  <div style={{
                    width: '48px', height: '48px', borderRadius: '50%',
                    background: 'rgba(74,222,128,0.1)', border: '1px solid rgba(74,222,128,0.3)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 0 24px rgba(74,222,128,0.2)',
                  }}>
                    <svg width="22" height="22" fill="none" stroke="#4ade80" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <p style={{ color: '#fff', fontWeight: 600, fontSize: '20px', marginBottom: '8px' }}>Message sent</p>
                    <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '14px', lineHeight: 1.6 }}>I'll get back to you within 24 hours.</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="form-grid" style={{ marginBottom: '20px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '11px', fontFamily: 'monospace', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginBottom: '7px' }}>
                        Name
                      </label>
                      <input
                        type="text" name="name" required
                        value={formData.name} onChange={handleChange}
                        onFocus={() => setFocused('name')} onBlur={() => setFocused(null)}
                        placeholder="Your name"
                        style={inputStyle('name')}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '11px', fontFamily: 'monospace', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginBottom: '7px' }}>
                        Email
                      </label>
                      <input
                        type="email" name="email" required
                        value={formData.email} onChange={handleChange}
                        onFocus={() => setFocused('email')} onBlur={() => setFocused(null)}
                        placeholder="you@email.com"
                        style={inputStyle('email')}
                      />
                    </div>
                  </div>

                  <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', fontSize: '11px', fontFamily: 'monospace', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginBottom: '7px' }}>
                      Message
                    </label>
                    <textarea
                      name="message" required rows={5}
                      value={formData.message} onChange={handleChange}
                      onFocus={() => setFocused('message')} onBlur={() => setFocused(null)}
                      placeholder="Tell me about the role, project, or just say hi…"
                      style={inputStyle('message')}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitState === 'sending'}
                    style={{
                      width: '100%',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                      padding: '13px 20px',
                      borderRadius: '12px', border: 'none',
                      cursor: submitState === 'sending' ? 'not-allowed' : 'pointer',
                      fontSize: '14px', fontWeight: 600, color: '#fff',
                      background: `linear-gradient(90deg, ${PURPLE}, ${BLUE})`,
                      boxShadow: `0 4px 24px ${PURPLE}55, 0 2px 10px ${BLUE}44`,
                      opacity: submitState === 'sending' ? 0.7 : 1,
                      transition: 'opacity 0.2s, transform 0.15s',
                      marginTop: '4px',
                    }}
                  >
                    {submitState === 'sending' ? (
                      <>
                        <svg width="16" height="16" fill="none" viewBox="0 0 24 24"
                          style={{ animation: 'spin 0.8s linear infinite' }}>
                          <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.25)" strokeWidth="3" />
                          <path d="M4 12a8 8 0 018-8" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
                        </svg>
                        Sending…
                      </>
                    ) : (
                      <>
                        Send message
                        <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                      </>
                    )}
                  </button>

                  <p style={{ marginTop: '14px', fontSize: '11px', color: 'rgba(255,255,255,0.25)', fontFamily: 'monospace', textAlign: 'center' }}>
                    Or email me directly at siluni.silva@example.com
                  </p>
                </form>
              )}
            </div>

            {/* ── RIGHT: Links + Availability ── */}
            <div className="card-pane right" style={{
              background: `linear-gradient(145deg, #0d0d1e 0%, #0a0a18 100%)`,
              display: 'flex', flexDirection: 'column',
            }}>
              <div>
                {contactLinks.map((link, i) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    style={{
                      display: 'flex', alignItems: 'center', gap: '14px',
                      padding: '16px 0',
                      borderBottom: i < contactLinks.length - 1 ? '1px solid rgba(255,255,255,0.07)' : 'none',
                      textDecoration: 'none',
                      transition: 'opacity 0.15s',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.7')}
                    onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
                  >
                    <div style={{
                      width: '42px', height: '42px', borderRadius: '11px',
                      border: `1px solid ${PURPLE}44`,
                      background: `${PURPLE}10`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: 'rgba(255,255,255,0.65)', flexShrink: 0,
                    }}>
                      {link.icon}
                    </div>
                    <div style={{ minWidth: 0 }}>
                      <p style={{ fontSize: '11px', fontFamily: 'monospace', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.38)', marginBottom: '3px' }}>
                        {link.label}
                      </p>
                      <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.8)', fontFamily: 'monospace', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {link.value}
                      </p>
                    </div>
                    <svg
                      style={{ marginLeft: 'auto', flexShrink: 0, color: 'rgba(255,255,255,0.22)' }}
                      width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 17L17 7M17 7H7M17 7v10" />
                    </svg>
                  </a>
                ))}
              </div>

              {/* Availability */}
              <div style={{ marginTop: 'auto', paddingTop: '2rem' }}>
                <div style={{
                  height: '1px',
                  background: `linear-gradient(90deg, ${PURPLE}66, ${BLUE}66)`,
                  marginBottom: '1.25rem', borderRadius: '1px',
                }} />
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {availability.map((item) => (
                    <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                      <span style={{ fontSize: '11px', fontFamily: 'monospace', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.32)' }}>
                        {item.label}
                      </span>
                      <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.75)', fontFamily: 'monospace' }}>
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }

        .contact-section {
          position: relative;
          width: 100vw;
          margin-left: calc(-50vw + 50%);
          padding: 4rem 1rem;
          background: #07070f;
          overflow: hidden;
        }

        @media (min-width: 768px) {
          .contact-section { padding: 5rem 2rem; }
        }

        .contact-card {
          grid-template-columns: 1fr 1fr;
          width: min(1100px, 100%);
          margin: 0 auto;
        }

        .card-pane.left, .card-pane.right {
          padding: 2.8rem;
        }

        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        @media (max-width: 768px) {
          /* Stack the card panes and hide the right pane on mobile; keep desktop unchanged */
          .contact-card { grid-template-columns: 1fr; gap: 0.75rem; margin-bottom: 2rem; }
          .card-pane.left { padding: 1.25rem; border-right: none !important; }
          .card-pane.right { display: none !important; }
          .form-grid { grid-template-columns: 1fr; }
          .contact-section { padding: 1.25rem 1rem; }

          /* Smaller heading and body on mobile */
          .contact-section h2 { font-size: clamp(1.6rem, 5vw, 2rem); line-height: 1.08; margin-bottom: 0.75rem; }
          .contact-section p { font-size: 13px; margin-bottom: 1.25rem; }
        }
      `}</style>
    </section>
  )
}