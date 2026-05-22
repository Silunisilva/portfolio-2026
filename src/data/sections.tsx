import React from 'react'
import About from '../components/About'
import PhotoSection from '../components/PhotoSection'
import VideoShowcase from '../components/VideoShowcase'
import Projects from '../components/Projects'
import Skills from '../components/Skills'
import Contact from '../components/Contact'

type SectionItem = {
  id: string
  title: string
  subtitle?: string
  content: React.ReactNode
}

const sections: SectionItem[] = [
  {
    id: 'photo',
    title: '',
    content: <PhotoSection />
  },
  {
    id: 'about',
    title: 'About',
    subtitle: 'Who I am',
    content: <About />
  },
  {
    id: 'videos',
    title: 'Videos',
    subtitle: 'See it in action',
    content: <VideoShowcase />
  },
  {
    id: 'projects',
    title: 'Projects',
    subtitle: 'Selected work',
    content: <Projects />
  },
  {
    id: 'skills',
    title: 'Skills',
    subtitle: 'Tools & Technologies',
    content: <Skills />
  },
  {
    id: 'contact',
    title: 'Contact',
    subtitle: "Let's connect",
    content: <Contact />
  }
]

export default sections
