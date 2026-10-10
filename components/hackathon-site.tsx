'use client'

import { useState } from 'react'
import {
  ArrowDownRight,
  ArrowUpRight,
  Award,
  Blocks,
  Check,
  ChevronDown,
  CircleArrowOutUpRight,
  Code2,
  ExternalLink,
  Menu,
  Network,
  Rocket,
  Sparkles,
  Trophy,
  Users,
  X,
} from 'lucide-react'

const navItems = [
  ['About', '#about'],
  ['Prizes', '#prizes'],
  ['Benefits', '#benefits'],
  ['Winners', '#winners'],
  ['Timeline', '#timeline'],
  ['FAQ', '#faq'],
]

const benefits = [
  { icon: Code2, number: '01', title: 'Build real projects', text: 'Turn a bold idea into something tangible, useful, and ready to show the world.' },
  { icon: Award, number: '02', title: 'Earn recognition', text: 'Compete for the confirmed cash prizes and get noticed for thoughtful, ambitious work.' },
  { icon: Sparkles, number: '03', title: 'Get certified', text: 'Eligible participants can receive an online participation certificate after the event.' },
  { icon: Network, number: '04', title: 'Share your momentum', text: 'Your project and achievements may be promoted through LinkedIn by the organizers.' },
  { icon: Users, number: '05', title: 'Learn together', text: 'Collaborate, experiment, and sharpen your problem-solving skills with peers.' },
  { icon: Trophy, number: '06', title: 'Meet the winners', text: 'Explore verified winner stories as they become available and find your next spark.' },
]

const timeline = [
  ['01', 'Registration opens', 'Date to be announced'],
  ['02', 'Registration closes', 'Date to be announced'],
  ['03', 'Build & submit', 'Dates to be announced'],
  ['04', 'Evaluation', 'Dates to be announced'],
  ['05', 'Results announced', 'Date to be announced'],
]

const faqs = [
  ['Who can participate?', 'Eligibility details will be announced by the organizer. Please check back for the official criteria.'],
  ['Can I participate individually?', 'Individual participation rules are not yet confirmed. This section will be updated with the official policy.'],
  ['What is the team size?', 'Team-size rules will be announced by the organizer.'],
  ['What are the deadlines?', 'Registration and submission dates are to be announced. No deadlines are being assumed here.'],
  ['How will projects be evaluated?', 'Evaluation criteria and judging process will be shared by the organizer before submissions open.'],
  ['Who receives a certificate?', 'Online participation certificates are available to every eligible participant, subject to the organizer’s eligibility requirements.'],
  ['Will projects be promoted on LinkedIn?', 'The organizer may promote participant achievements and projects through LinkedIn. Promotion is not guaranteed for every participant.'],
]

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="section-label"><span className="section-dot" />{children}</p>
}

function Logo() {
  return <a href="#top" className="logo" aria-label="Hacklab home"><span className="logo-mark"><span /></span><span>HACKLAB<span className="logo-suffix">/01</span></span></a>
}

export default function HackathonSite() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  return (
    <main id="top" className="site-shell">
      <header className="site-header">
        <Logo />
        <nav className="desktop-nav" aria-label="Primary navigation">
          {navItems.map(([label, href]) => <a key={href} href={href}>{label}</a>)}
        </nav>
        <a className="header-cta" href="#register">Register now <ArrowUpRight aria-hidden="true" /></a>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen}>
          {menuOpen ? <X /> : <Menu />}
        </button>
      </header>
      {menuOpen && <nav className="mobile-nav" aria-label="Mobile navigation">{navItems.map(([label, href]) => <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</a>)}<a href="#register" className="mobile-register" onClick={() => setMenuOpen(false)}>Register now <ArrowUpRight /></a></nav>}

      <section className="hero section-wrap" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow"><span className="live-dot" />The open call for builders</p>
          <h1 id="hero-title">Make something<br /><em>worth talking about.</em></h1>
          <p className="hero-description">A focused hackathon for curious minds who turn big questions into practical, powerful projects.</p>
          <div className="hero-actions"><a href="#register" className="button button-primary">Register now <ArrowUpRight /></a><a href="#about" className="text-link">Explore the hackathon <ArrowDownRight /></a></div>
          <div className="hero-note"><span>01</span><span className="note-line" /><span>Bring your best idea.</span></div>
        </div>
        <div className="hero-art" aria-hidden="true"><div className="art-orbit orbit-one" /><div className="art-orbit orbit-two" /><div className="art-core"><span>BUILD</span><span>WHAT&apos;S</span><span>NEXT</span></div><div className="art-label label-top">CREATIVE<br />COMPUTING</div><div className="art-label label-bottom">001 / 2026</div><div className="art-cross cross-a" /><div className="art-cross cross-b" /></div>
      </section>

      <section className="prize-strip"><div className="section-wrap prize-inner"><div className="prize-intro"><p className="eyebrow">The reason to show up</p><h2>Good ideas<br /><em>deserve a stage.</em></h2></div><div className="prize-card prize-first"><span className="prize-kicker">First prize</span><strong>₹10,000</strong><span className="prize-caption">Cash prize</span><Trophy /></div><div className="prize-card prize-second"><span className="prize-kicker">Second prize</span><strong>₹5,000</strong><span className="prize-caption">Cash prize</span><Award /></div></div></section>

      <section id="about" className="section-wrap about-section"><div className="about-heading"><SectionLabel>01 / About the hackathon</SectionLabel><h2>Ideas are cheap.<br /><span>Making is everything.</span></h2></div><div className="about-body"><p className="lead">Hacklab is a space to move from “what if?” to “here it is.” Bring a question, a rough sketch, or a half-formed thought. Build it into something people can experience.</p><p className="muted-copy">Whether you are a student, developer, designer, or simply someone who likes solving hard problems, this is your invitation to make practical, creative work with a team or on your own.</p><div className="mini-stats"><div><strong>02</strong><span>cash prizes</span></div><div><strong>01</strong><span>shared stage</span></div><div><strong>∞</strong><span>ways to build</span></div></div></div></section>

      <section id="benefits" className="section-wrap benefits-section"><div className="section-topline"><SectionLabel>02 / Why participate</SectionLabel><span className="topline-note">Take the useful route.</span></div><div className="benefits-grid">{benefits.map(({ icon: Icon, number, title, text }) => <article className="benefit-card" key={number}><span className="card-number">{number}</span><Icon className="benefit-icon" /><h3>{title}</h3><p>{text}</p><ArrowUpRight className="card-arrow" /></article>)}</div></section>

      <section id="winners" className="section-wrap winners-section"><div className="winners-intro"><SectionLabel>03 / Past winners</SectionLabel><h2>Your project<br /><em>could be next.</em></h2><p>We&apos;ll use this space to celebrate verified winner stories, projects, and achievements as they become available.</p><a href="#register" className="text-link">Make your mark <ArrowUpRight /></a></div><div className="empty-winner"><div className="empty-grid" /><div className="empty-icon"><Blocks /></div><span className="empty-tag">STORIES LOADING</span><h3>Verified projects<br />coming soon.</h3><p>Winner names, demos, profiles, and project links will be added here after the organizer confirms them.</p></div></section>

      <section id="timeline" className="timeline-section"><div className="section-wrap"><SectionLabel>04 / Timeline</SectionLabel><div className="timeline-heading"><h2>From first thought<br /><em>to final reveal.</em></h2><p>Official dates will be announced by the organizer. No assumptions, just a clear path to follow.</p></div><div className="timeline-list">{timeline.map(([number, title, date], index) => <div className={`timeline-item ${index === 0 ? 'active' : ''}`} key={number}><span className="timeline-number">{number}</span><div className="timeline-dot" /><div className="timeline-content"><h3>{title}</h3><p>{date}</p></div><CircleArrowOutUpRight /></div>)}</div></div></section>

      <section id="register" className="register-section"><div className="section-wrap register-inner"><div><SectionLabel>05 / Your turn</SectionLabel><h2>Ready to make<br /><em>something real?</em></h2><p>Registration details and the official form are not available yet. Save this page and check back when the organizer opens the call.</p></div><div className="register-card"><div className="register-card-top"><Rocket /><span>REGISTRATION / PENDING</span></div><h3>Registration opens<br />soon.</h3><p>The official registration URL will be added here once it is confirmed.</p><button className="button button-disabled" disabled>Registration link coming soon</button><span className="privacy-note">No spam. Just the details you need to build.</span></div></div></section>

      <section id="prizes" className="certificate-band"><div className="section-wrap certificate-inner"><div className="certificate-icon"><Check /></div><div><SectionLabel>Participation certificate</SectionLabel><h2>Show up. Build hard.<br /><em>Leave with proof.</em></h2></div><p>Online participation certificates are available to every eligible participant, subject to the organizer&apos;s eligibility requirements.</p></div></section>

      <section id="faq" className="section-wrap faq-section"><div className="faq-title"><SectionLabel>06 / FAQ</SectionLabel><h2>Questions,<br /><em>answered honestly.</em></h2></div><div className="faq-list">{faqs.map(([question, answer], index) => <div className={`faq-item ${openFaq === index ? 'open' : ''}`} key={question}><button onClick={() => setOpenFaq(openFaq === index ? null : index)} aria-expanded={openFaq === index}><span>{question}</span><ChevronDown /></button>{openFaq === index && <p>{answer}</p>}</div>)}</div></section>

      <footer className="site-footer"><div className="section-wrap footer-top"><Logo /><div className="footer-message"><span>Make good things.</span><span>Put them out there.</span></div><div className="footer-links"><a href="#about">About</a><a href="#prizes">Prizes</a><a href="#faq">FAQ</a><a href="#register">Register</a></div></div><div className="section-wrap footer-bottom"><span>© 2026 Hacklab / Event details to be announced</span><span className="footer-status"><span className="live-dot" />Built for the curious</span><a href="https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Fexample.com" target="_blank" rel="noreferrer">Share on LinkedIn <ExternalLink /></a></div></footer>
    </main>
  )
}
