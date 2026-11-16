import { useEffect, useMemo, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { me, projects, smallerWork, experience, leadership, awards, certificates, skills } from './data.js'

gsap.registerPlugin(ScrollTrigger)

const Arrow = ({ dir = 'ne', size = 18 }) => {
  const d = dir === 'down' ? 'M12 4v15m0 0-6-6m6 6 6-6' : dir === 'download' ? 'M12 3v12m0 0-5-5m5 5 5-5M4 20h16' : 'M7 17 17 7m0 0H8m9 0v9'
  return (
    <svg className="ico" width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d={d} stroke="currentColor" strokeWidth="1.8" strokeLinecap="square" />
    </svg>
  )
}

const Ring = ({ className = '' }) => (
  <svg className={`ring ${className}`} viewBox="0 0 120 70" aria-hidden="true">
    <ellipse cx="60" cy="35" rx="50" ry="24" transform="rotate(-14 60 35)" fill="none" stroke="currentColor" strokeWidth="13" />
  </svg>
)

const Spark = () => (
  <svg className="spark" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 1v22M1 12h22M4.2 4.2l15.6 15.6M19.8 4.2 4.2 19.8" stroke="currentColor" strokeWidth="1.4" />
  </svg>
)

const isExternal = (href) => href.startsWith('http')
const L = ({ href, children, className = '' }) => (
  <a href={href} className={className} {...(isExternal(href) || href.endsWith('.html') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
    {children}
  </a>
)

function useMotion() {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let lenis
    if (!reduce) {
      lenis = new Lenis({ lerp: 0.09, smoothWheel: true })
      lenis.on('scroll', ScrollTrigger.update)
      gsap.ticker.add((t) => lenis.raf(t * 1000))
      gsap.ticker.lagSmoothing(0)
      document.querySelectorAll('a[href^="#"]').forEach((a) =>
        a.addEventListener('click', (e) => {
          const id = a.getAttribute('href')
          if (id.length > 1) { e.preventDefault(); lenis.scrollTo(id, { offset: -80, duration: 1.4 }) }
        })
      )
    }
    const ctx = gsap.context(() => {
      if (reduce) return
      const ease = 'expo.out'
      // The one authored moment: the hero headline rises out of its own line boxes.
      gsap.from('.hero .hero-line > span', { yPercent: 105, duration: 1.4, ease, stagger: 0.12, delay: 0.15 })
      gsap.from('.sticker', { rotate: 18, y: 60, opacity: 0, duration: 1.6, ease, delay: 0.5 })
      gsap.from('.hero-foot > *', { y: 24, opacity: 0, duration: 1.1, ease, stagger: 0.08, delay: 0.7 })

      // Layers: sticker drifts against the headline on scroll.
      gsap.to('.sticker', { yPercent: -45, rotate: 2, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } })
      gsap.to('.hero-title', { yPercent: 18, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } })

      // Section headings rise from below a mask.
      gsap.utils.toArray('.work-head').forEach((el) => {
        gsap.from(el, { y: 60, opacity: 0, duration: 1.2, ease, scrollTrigger: { trigger: el, start: 'top 90%', once: true } })
      })
      gsap.from('.chip', { y: 20, opacity: 0, duration: 0.9, ease, stagger: 0.06, scrollTrigger: { trigger: '.chips', start: 'top 92%', once: true } })
      // Experience: rule draws across, rows slide in one after another.
      gsap.from('.xp-list', { '--rule': 0, duration: 1.4, ease, scrollTrigger: { trigger: '.xp-list', start: 'top 85%', once: true } })
      ScrollTrigger.batch('.xp-row', {
        start: 'top 90%', once: true,
        onEnter: (rows) => gsap.fromTo(rows, { x: -60, opacity: 0 }, { x: 0, opacity: 1, duration: 1.1, ease, stagger: 0.1, clearProps: 'transform' }),
      })
      gsap.set('.xp-row', { opacity: 0 })
      gsap.from('.certs', { y: 50, opacity: 0, duration: 1.1, ease, scrollTrigger: { trigger: '.certs', start: 'top 92%', once: true } })

      // Project frames: image moves slower than its frame.
      gsap.utils.toArray('.work-media img').forEach((img) => {
        gsap.fromTo(img, { yPercent: -8 }, { yPercent: 8, ease: 'none', scrollTrigger: { trigger: img.parentElement, start: 'top bottom', end: 'bottom top', scrub: true } })
      })
      gsap.utils.toArray('.work-card').forEach((card) => {
        gsap.from(card.querySelector('.work-media'), { clipPath: 'inset(18% 8% 18% 8%)', duration: 1.4, ease, scrollTrigger: { trigger: card, start: 'top 85%' } })
      })

      // Blue section opens like a shutter.
      gsap.fromTo('.about', { clipPath: 'inset(6% 4% 6% 4%)' }, { clipPath: 'inset(0% 0% 0% 0%)', ease: 'none', scrollTrigger: { trigger: '.about', start: 'top 95%', end: 'top 35%', scrub: true } })

      gsap.utils.toArray('.reveal').forEach((el) => {
        gsap.from(el, { y: 36, opacity: 0, duration: 1.1, ease, scrollTrigger: { trigger: el, start: 'top 88%' } })
      })
      gsap.from('.contact-title .hero-line > span', { yPercent: 105, duration: 1.3, ease, stagger: 0.1, scrollTrigger: { trigger: '.contact-title', start: 'top 90%', once: true } })
    })
    // Fonts change line heights after first layout; recompute trigger positions.
    const refresh = () => ScrollTrigger.refresh()
    document.fonts?.ready.then(refresh)
    window.addEventListener('load', refresh)
    return () => { window.removeEventListener('load', refresh); ctx.revert(); lenis?.destroy() }
  }, [])
}

const NAV = [['work', 'Work'], ['experience', 'Experience'], ['about', 'About']]

function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [active, setActive] = useState('')
  useEffect(() => {
    let last = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 24)
      setHidden(y > 480 && y > last + 4 ? true : y < last - 4 ? false : (h) => h)
      last = y
    }
    // Highlight the section currently in view.
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' }
    )
    ;['top', ...NAV.map(([id]) => id), 'contact'].forEach((id) => { const el = document.getElementById(id); if (el) io.observe(el) })
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => { window.removeEventListener('scroll', onScroll); io.disconnect() }
  }, [])
  return (
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''} ${hidden ? 'is-hidden' : ''}`}>
      <div className="bar wrap">
        <a href="#top" className="brand" aria-label="Aryan Agarwal, back to top">
          <Ring />
          <span>aryan agarwal</span><sup>&deg;K</sup>
        </a>
        <nav aria-label="Primary">
          {NAV.map(([id, label]) => (
            <a key={id} href={`#${id}`} className={`nav-link ${active === id ? 'is-active' : ''}`} aria-current={active === id ? 'true' : undefined}>
              {label}{id === 'work' && <sup>({String(projects.length).padStart(2, '0')})</sup>}
            </a>
          ))}
          <a href={me.resume} download="Aryan-Agarwal-Resume.pdf" className="nav-link nav-resume">R&eacute;sum&eacute; <Arrow dir="download" size={16} /></a>
          <a href="#contact" className={`btn-outline ${active === 'contact' ? 'is-active' : ''}`}>Let&rsquo;s talk <Arrow /></a>
        </nav>
      </div>
    </header>
  )
}

function Hero() {
  return (
    <section className="hero wrap" id="top">
      <h1 className="hero-title" aria-label="Builds models. Wins arguments.">
        <span className="hero-line"><span>Builds models.</span></span>
        <span className="hero-line"><span>Wins arguments.</span></span>
      </h1>
      <figure className="sticker">
        <img src={me.photo} alt="Aryan Agarwal on a beach at dusk, in a white shirt" width="800" height="800" />
        <figcaption>
          <span>Good data</span>
          <Ring />
          <span>Better questions</span>
        </figcaption>
      </figure>
      <div className="hero-foot">
        <p className="lede">
          Hi, I&rsquo;m Aryan, an Instrumentation &amp; Control Engineering student at {me.college.split(',')[0]} (class of {me.year}).
          I run a small industrial-AI startup and build tools that turn messy data into decisions.
        </p>
        <div className="hero-ctas">
          <a href="#work" className="link-under">See the work <Arrow /></a>
          <a href={me.resume} download="Aryan-Agarwal-Resume.pdf" className="btn-solid">Download r&eacute;sum&eacute; <Arrow dir="download" /></a>
        </div>
        <a href="#work" className="scroll-cue"><span>Scroll to explore</span><i><Arrow dir="down" size={22} /></i></a>
      </div>
    </section>
  )
}

const FILTERS = ['All work', 'Founder', 'Product', 'Machine learning', 'Hardware']

function Work() {
  const [filter, setFilter] = useState('All work')
  const list = useMemo(() => (filter === 'All work' ? projects : projects.filter((p) => p.kind === filter)), [filter])
  useEffect(() => { ScrollTrigger.refresh() }, [filter])
  return (
    <section className="work wrap" id="work">
      <div className="work-head">
        <h2 className="display-md">Selected work <sup>({String(projects.length).padStart(2, '0')})</sup></h2>
        <p className="side-note">Different problems. Same habit: measure first, then argue.</p>
      </div>
      <div className="chips" role="group" aria-label="Filter projects">
        {FILTERS.map((f) => {
          const n = f === 'All work' ? projects.length : projects.filter((p) => p.kind === f).length
          return (
            <button key={f} className={`chip ${filter === f ? 'on' : ''}`} aria-pressed={filter === f} onClick={() => setFilter(f)}>
              {f} <small>{String(n).padStart(2, '0')}</small>
            </button>
          )
        })}
      </div>
      <div className="work-grid">
        {list.map((p) => (
          <article key={p.id} className="work-card">
            <L href={p.links[0].href} className="work-media">
              <img src={p.shot} alt={`Screenshot of ${p.name}`} loading="lazy" />
              <span className="media-arrow"><Arrow size={22} /></span>
              <span className="media-tag">{p.kind}</span>
            </L>
            <div className="work-body">
              <div className="work-title">
                <h3>{p.logo && <img className="title-logo" src={p.logo} alt="" />}{p.name}</h3>
                <span className="year">{p.year}</span>
              </div>
              <p className="one-liner">{p.oneLiner}</p>
              <p className="detail">{p.detail}</p>
              <ul className="tags">{p.tags.map((t) => <li key={t}>{t}</li>)}</ul>
              <div className="work-links">
                {p.links.map((l) => <L key={l.label} href={l.href} className="link-under small">{l.label} <Arrow size={15} /></L>)}
              </div>
            </div>
          </article>
        ))}
      </div>
      <div className="smaller reveal">
        <h3>Also on the workbench</h3>
        <ul>
          {smallerWork.map((s) => (
            <li key={s.name}><L href={s.href}><strong>{s.name}</strong><span>{s.what}</span><Arrow /></L></li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function About() {
  return (
    <section className="about" id="about">
      <div className="wrap about-inner">
        <h2 className="display-md about-title">
          Good engineering<br />is good business.<br />
          <span className="soft">And a well&#8209;timed<br />rebuttal.</span>
        </h2>
        <div className="about-copy">
          <p>
            I&rsquo;m an Instrumentation &amp; Control engineer at {me.college}, graduating in {me.year}, with a {me.minor.toLowerCase()} on the side.
            I like problems where a sensor, a spreadsheet and a stubborn stakeholder all show up in the same meeting.
          </p>
          <p>
            That&rsquo;s why I started Kelvin Forward, consulted for Tata Capital&rsquo;s finance teams at EY, automated workflows at Tech Mahindra,
            and spent a year convening the college debate society. Engineering tells me what&rsquo;s true. Debate taught me how to make people care.
          </p>
          <a href="#contact" className="link-under light">Work with me <Arrow /></a>
        </div>
        <ul className="about-row">
          <li>Data &amp; machine learning</li>
          <li>Product thinking</li>
          <li>Consulting</li>
          <li>Public speaking</li>
        </ul>
        <div className="skills" aria-label="Skills">
          {skills.map((s) => <span key={s}>{s}</span>)}
        </div>
      </div>
    </section>
  )
}

function Experience() {
  return (
    <section className="experience wrap" id="experience">
      <div className="work-head">
        <h2 className="display-md">Where I&rsquo;ve <span className="blue">worked.</span></h2>
        <p className="side-note">Four internships, one startup.</p>
      </div>
      <ol className="xp-list">
        <li className="xp-row founder">
          <div className="xp-logo"><img src="./logos/kelvin-forward-mark.svg" alt="Kelvin Forward logo" /></div>
          <div className="xp-main"><h3>Kelvin Forward</h3><p className="xp-role">Founder</p></div>
          <p className="xp-what">Industrial ML for MSMEs: a 1&ndash;10 minute head start on boiler steam temperature, built on the plant&rsquo;s existing sensors. In customer validation with two prospective clients.</p>
          <p className="xp-when">Jul 2026 &mdash; now</p>
        </li>
        {experience.map((x) => (
          <li key={x.org + x.role} className="xp-row">
            <div className="xp-logo"><img src={x.logo} alt={`${x.org.split(' ·')[0]} logo`} /></div>
            <div className="xp-main"><h3>{x.org}</h3><p className="xp-role">{x.role}</p></div>
            <p className="xp-what">{x.what}</p>
            <p className="xp-when">{x.when}</p>
          </li>
        ))}
      </ol>
    </section>
  )
}

function Extras() {
  return (
    <section className="extras wrap">
      <div className="extras-col reveal">
        <h2 className="display-sm">Off the timetable</h2>
        <ul className="plain-list">
          {leadership.map((l) => (
            <li key={l.title}><h3>{l.title}</h3><p className="muted">{l.when}</p><p>{l.what}</p></li>
          ))}
        </ul>
      </div>
      <div className="extras-col reveal">
        <h2 className="display-sm">Trophy shelf</h2>
        <ul className="award-list">
          {awards.map((a) => (
            <li key={a.what}><strong>{a.what}</strong><span>{a.where}</span><time>{a.when}</time></li>
          ))}
        </ul>
        <h2 className="display-sm cert-head">Certificates</h2>
        <div className="certs">
          {certificates.map((c) => {
            const inner = (
              <>
                <img className="cert-logo" src={c.logo} alt={`${c.issuer.split(' ·')[0]} logo`} />
                <strong>{c.name}</strong>
                <span>{c.issuer}</span>
                <time>{c.when}</time>
                {c.verifyUrl && <em>Verify <Arrow size={14} /></em>}
              </>
            )
            return c.verifyUrl
              ? <L key={c.name} href={c.verifyUrl} className="cert">{inner}</L>
              : <div key={c.name} className="cert">{inner}</div>
          })}
        </div>
      </div>
    </section>
  )
}

function ContactForm() {
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const onSubmit = async (e) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form))
    if (data._gotcha) return
    if (!me.formEndpoint) {
      const body = `${data.message}\n\n— ${data.name} (${data.email})`
      window.location.href = `mailto:${me.emailPrimary}?subject=${encodeURIComponent(`Portfolio: hello from ${data.name}`)}&body=${encodeURIComponent(body)}`
      return
    }
    setStatus('sending')
    try {
      const res = await fetch(me.formEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ name: data.name, email: data.email, message: data.message, _subject: `Portfolio: message from ${data.name}`, _replyto: data.email, source: 'Portfolio site' }),
      })
      if (!res.ok) throw new Error(String(res.status))
      setStatus('sent'); form.reset()
    } catch { setStatus('error') }
  }
  return (
    <form className="contact-form" onSubmit={onSubmit}>
      <div className="field-row">
        <label><span>Your name</span><input name="name" required autoComplete="name" /></label>
        <label><span>Your email</span><input name="email" type="email" required autoComplete="email" /></label>
      </div>
      <label><span>Message</span><textarea name="message" rows="4" required /></label>
      <input type="checkbox" name="_gotcha" className="hp" tabIndex="-1" autoComplete="off" aria-hidden="true" />
      <div className="form-foot">
        <button type="submit" className="btn-outline" disabled={status === 'sending'}>
          {status === 'sending' ? 'Sending…' : 'Send message'} <Arrow />
        </button>
        <p className={`form-status ${status}`} role="status">
          {status === 'sent' && 'Thanks, it\u2019s in my inbox. I\u2019ll reply soon.'}
          {status === 'error' && <>That didn&rsquo;t go through. Email me directly at <a href={`mailto:${me.emailPrimary}`}>{me.emailPrimary}</a>.</>}
        </p>
      </div>
    </form>
  )
}

function Contact() {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try { await navigator.clipboard.writeText(me.emailPrimary); setCopied(true); setTimeout(() => setCopied(false), 1800) } catch { /* clipboard blocked */ }
  }
  return (
    <section className="contact wrap" id="contact">
      <h2 className="contact-title" aria-label="Let's talk.">
        <span className="hero-line"><span>Let&rsquo;s</span></span>
        <span className="hero-line"><span className="blue">talk.</span></span>
      </h2>
      <div className="contact-grid">
        <div>
          <p className="lede">Internships, full-time roles, a pilot for Kelvin Forward, or a debate motion you feel strongly about. My inbox is open.</p>
          <ContactForm />
        </div>
        <ul className="contact-list">
          <li>
            <span className="muted">Email</span>
            <a href={`mailto:${me.emailPrimary}`}>{me.emailPrimary}</a>
            <button className="copy" onClick={copy} aria-live="polite">{copied ? 'Copied' : 'Copy'}</button>
          </li>
          <li><span className="muted">College</span><a href={`mailto:${me.emailCollege}`}>{me.emailCollege}</a></li>
          <li><span className="muted">R&eacute;sum&eacute;</span><a href={me.resume} download="Aryan-Agarwal-Resume.pdf">Download PDF <Arrow dir="download" size={15} /></a></li>
          <li><span className="muted">Phone</span><a href={me.phoneHref}>{me.phone}</a></li>
          <li><span className="muted">LinkedIn</span><L href={me.linkedin}>in/aryan180404 <Arrow size={15} /></L></li>
          <li><span className="muted">GitHub</span><L href={me.github}>aryan180404 <Arrow size={15} /></L></li>
        </ul>
      </div>
      <footer className="site-footer">
        <p>&copy; 2026 {me.fullName}</p>
        <p>{me.degree} &middot; {me.college} &middot; {me.year}</p>
        <a href="#top">Back to top <Arrow size={15} /></a>
      </footer>
    </section>
  )
}

export default function App() {
  const root = useRef(null)
  useMotion()
  return (
    <div ref={root}>
      <a className="skip" href="#work">Skip to work</a>
      <Header />
      <main>
        <Hero />
        <Work />
        <About />
        <Experience />
        <Extras />
        <Contact />
      </main>
    </div>
  )
}
