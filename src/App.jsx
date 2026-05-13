import { useEffect, useState, useRef, useCallback } from 'react'

const BOOKSY_URL = 'https://booksy.com/pl-pl/154943_kamvvi-injects_medycyna-estetyczna_3_warszawa'

const NAV_LINKS = [
  { label: 'O mnie', href: '#o-mnie' },
  { label: 'Oferta', href: '#oferta' },
  { label: 'Efekty', href: '#efekty' },
  { label: 'Opinie', href: '#opinie' },
  { label: 'Jak pracuję', href: '#jak-pracuje' },
  { label: 'Kontakt', href: '#kontakt' },
]

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const threshold = window.innerHeight * 0.85
      setScrolled(window.scrollY > threshold)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      id="navbar"
      className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}
    >
      <div className="navbar__inner">
        {/* LEFT — Logo (hidden on hero, revealed after scroll) */}
        <div className="navbar__zone navbar__zone--left">
          <a href="#hero" className="navbar__logo" aria-label="KAMVVI INJECTS — strona główna">
            <img
              src="/logo.png"
              alt="KAMVVI INJECTS"
              className="navbar__logo-img"
            />
          </a>
        </div>

        {/* CENTER — Nav links, always viewport-centered */}
        <div className="navbar__zone navbar__zone--center">
          <ul className="navbar__links">
            {NAV_LINKS.map(({ label, href }) => (
              <li key={href}>
                <a href={href} className="navbar__link">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* RIGHT — CTA + mobile toggle */}
        <div className="navbar__zone navbar__zone--right">
          <a
            href={BOOKSY_URL}
            className="navbar__cta"
            target="_blank"
            rel="noopener noreferrer"
          >
            Umów wizytę
          </a>

          <button
            className="navbar__mobile-toggle"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
            aria-expanded={mobileOpen}
          >
            <span className={`navbar__burger ${mobileOpen ? 'navbar__burger--open' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="navbar__mobile-menu">
          <ul className="navbar__mobile-links">
            {NAV_LINKS.map(({ label, href }) => (
              <li key={href}>
                <a
                  href={href}
                  className="navbar__mobile-link"
                  onClick={() => setMobileOpen(false)}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href={BOOKSY_URL}
            className="navbar__mobile-cta"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileOpen(false)}
          >
            Umów wizytę
          </a>
        </div>
      )}
    </nav>
  )
}

function Hero() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 200)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section id="hero" className="hero">
      {/* Background video */}
      <video
        className="hero__video"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
      >
        <source src="/hero-video.mp4" type="video/mp4" />
      </video>

      {/* Soft overlay for readability */}
      <div className="hero__overlay" aria-hidden="true" />

      {/* Centered brand composition */}
      <div className={`hero__brand ${visible ? 'hero__brand--visible' : ''}`}>
        <img
          src="/logo.png"
          alt="KAMVVI INJECTS"
          className="hero__brand-logo"
        />
        <span className="hero__brand-sub">medycyna estetyczna</span>
      </div>

      {/* Subtle scroll cue */}
      <div className={`hero__scroll-cue ${visible ? 'hero__scroll-cue--visible' : ''}`} aria-hidden="true">
        <svg width="20" height="32" viewBox="0 0 20 32" fill="none">
          <rect x="1" y="1" width="18" height="30" rx="9" stroke="currentColor" strokeWidth="1.2" />
          <circle className="hero__scroll-dot" cx="10" cy="10" r="2" fill="currentColor" />
        </svg>
      </div>
    </section>
  )
}

/* ── Shared IntersectionObserver hook ── */

function useInView(options = {}) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true) },
      { threshold: 0.15, ...options }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return [ref, inView]
}

/* ── O mnie ── */

function AboutSection() {
  const [ref, inView] = useInView()

  return (
    <section id="o-mnie" className="about" ref={ref}>
      <div className={`about__inner ${inView ? 'about__inner--visible' : ''}`}>
        {/* Text column */}
        <div className="about__text">
          <h2 className="about__headline">
            Naturalnie <span className="about__highlight">podkreślone</span><br />
            piękno
          </h2>

          <div className="about__body">
            <p>
              Za KAMVVI INJECTS stoję ja - Kamila Wierzchowska
            </p>
            <p>
              W swojej pracy stawiam na precyzję, wyczucie i przemyślane podejście.
            </p>
            <p>
              Wierzę, że najlepsze efekty dają konsekwencja, regularność i zabiegi dopasowane do realnych potrzeb skóry i twarzy.
            </p>
            <p>
              Najważniejszy jest dla mnie efekt, który podkreśla urodę, zachowuje naturalność i daje większą pewność siebie.
            </p>
          </div>
        </div>

        {/* Image column */}
        <div className="about__image-col">
          <div className="about__portrait">
            <img
              src="/hero.png"
              alt="Kamila Wierzchowska — specjalistka medycyny estetycznej"
              className="about__image"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── Oferta ── */

const OFFER_CARDS = [
  {
    title: 'Usta i rysy twarzy',
    description: 'Poprawa objętości, kształtu i proporcji twarzy.',
    examples: 'Przykładowe zabiegi: modelowanie ust, żuchwy, brody, policzków, podbródka, wolumetria twarzy, wypełnianie doliny łez, nici PDO.',
  },
  {
    title: 'Jakość skóry',
    description: 'Nawilżenie, wygładzenie, poprawa napięcia i kondycji skóry oraz redukcja zmarszczek.',
    examples: 'Przykładowe zabiegi: mezoterapia igłowa, stymulatory tkankowe, hydrofacial, kwasy, botoks, radiofrekwencja mikroigłowa.',
  },
  {
    title: 'Modelowanie wybranych obszarów ciała',
    description: 'Redukcja miejscowej tkanki tłuszczowej, poprawa konturu i wyglądu skóry.',
    examples: 'Przykładowe zabiegi: lipoliza iniekcyjna, radiofrekwencja mikroigłowa, zabiegi na blizny i rozstępy.',
  },
  {
    title: 'Skóra głowy i włosy',
    description: 'Wsparcie osłabionych włosów, ograniczenie wypadania i poprawa kondycji skóry głowy.',
    examples: 'Przykładowe zabiegi: mezoterapia skóry głowy.',
  },
]

function OfferSection() {
  const [ref, inView] = useInView()

  return (
    <section id="oferta" className="offer" ref={ref}>
      <div className="offer__bg" aria-hidden="true" />
      <div className={`offer__inner ${inView ? 'offer__inner--visible' : ''}`}>
        <div className="offer__header">
          <h2 className="offer__title">Oferta</h2>
        </div>

        <div className="offer__grid">
          {OFFER_CARDS.map((card, i) => (
            <article className="offer-card" key={i}>
              <h3 className="offer-card__title">{card.title}</h3>
              <p className="offer-card__desc">{card.description}</p>
              <p className="offer-card__examples">{card.examples}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── Efekty — Carousel ── */

const EFFECT_IMAGES = [
  { src: '/effects/effect-01.jpg', alt: 'Efekt zabiegu 1' },
  { src: '/effects/effect-02.jpg', alt: 'Efekt zabiegu 2' },
  { src: '/effects/effect-03.jpg', alt: 'Efekt zabiegu 3' },
  { src: '/effects/effect-04.jpg', alt: 'Efekt zabiegu 4' },
  { src: '/effects/effect-05.jpg', alt: 'Efekt zabiegu 5' },
]

function EffectsSection() {
  const [sectionRef, inView] = useInView()
  const [current, setCurrent] = useState(0)
  const [lightbox, setLightbox] = useState(null)
  const [perView, setPerView] = useState(3)
  const trackRef = useRef(null)
  const dragRef = useRef({ startX: 0, dragging: false })
  const total = EFFECT_IMAGES.length

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth
      if (w <= 600) setPerView(1)
      else if (w <= 900) setPerView(2)
      else setPerView(3)
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  const maxSlide = Math.max(0, total - perView)

  useEffect(() => {
    setCurrent(prev => Math.min(prev, maxSlide))
  }, [perView, maxSlide])

  // Infinite loop navigation
  const goPrev = () => setCurrent(prev => (prev <= 0 ? maxSlide : prev - 1))
  const goNext = () => setCurrent(prev => (prev >= maxSlide ? 0 : prev + 1))

  const onPointerDown = (e) => {
    dragRef.current = { startX: e.clientX, dragging: true }
  }
  const onPointerUp = (e) => {
    if (!dragRef.current.dragging) return
    const diff = e.clientX - dragRef.current.startX
    if (Math.abs(diff) > 40) {
      if (diff < 0) goNext()
      else goPrev()
    }
    dragRef.current.dragging = false
  }

  const onTouchStart = (e) => {
    dragRef.current = { startX: e.touches[0].clientX, dragging: true }
  }
  const onTouchEnd = (e) => {
    if (!dragRef.current.dragging) return
    const diff = e.changedTouches[0].clientX - dragRef.current.startX
    if (Math.abs(diff) > 40) {
      if (diff < 0) goNext()
      else goPrev()
    }
    dragRef.current.dragging = false
  }

  const closeLightbox = useCallback(() => setLightbox(null), [])

  useEffect(() => {
    if (lightbox === null) return
    const onKey = (e) => {
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowLeft') setLightbox(prev => (prev - 1 + total) % total)
      if (e.key === 'ArrowRight') setLightbox(prev => (prev + 1) % total)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [lightbox, closeLightbox, total])

  useEffect(() => {
    if (lightbox !== null) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [lightbox])

  const translateX = -(current * (100 / perView))

  return (
    <>
      <section id="efekty" className="effects" ref={sectionRef}>
        <div className={`effects__inner ${inView ? 'effects__inner--visible' : ''}`}>
          <div className="effects__header">
            <h2 className="effects__title">Zobacz efekty mojej pracy</h2>
            <div className="effects__nav">
              <button
                className="effects__arrow effects__arrow--prev"
                onClick={goPrev}
                aria-label="Poprzedni"
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <polyline points="12 3 6 9 12 15" />
                </svg>
              </button>
              <button
                className="effects__arrow effects__arrow--next"
                onClick={goNext}
                aria-label="Następny"
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <polyline points="6 3 12 9 6 15" />
                </svg>
              </button>
            </div>
          </div>

          <div
            className="effects__viewport"
            onPointerDown={onPointerDown}
            onPointerUp={onPointerUp}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            <div
              className="effects__track"
              ref={trackRef}
              style={{ transform: `translateX(${translateX}%)` }}
            >
              {EFFECT_IMAGES.map((img, i) => (
                <button
                  className="effects__card"
                  key={i}
                  style={{ width: `${100 / perView}%` }}
                  onClick={() => setLightbox(i)}
                  aria-label={`Powiększ: ${img.alt}`}
                >
                  <div className="effects__card-inner">
                    <img
                      src={img.src}
                      alt={img.alt}
                      className="effects__image"
                      loading="lazy"
                      draggable="false"
                    />
                    <span className="effects__hover-label">Zobacz efekt</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="effects__dots">
            {EFFECT_IMAGES.map((_, i) => {
              const isActive = i >= current && i < current + perView
              return (
                <button
                  key={i}
                  className={`effects__dot ${isActive ? 'effects__dot--active' : ''}`}
                  onClick={() => setCurrent(Math.min(i, maxSlide))}
                  aria-label={`Przejdź do zdjęcia ${i + 1}`}
                />
              )
            })}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox !== null && (
        <div className="lightbox" onClick={closeLightbox}>
          <div className="lightbox__content" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox__close" onClick={closeLightbox} aria-label="Zamknij">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <line x1="4" y1="4" x2="20" y2="20" />
                <line x1="20" y1="4" x2="4" y2="20" />
              </svg>
            </button>
            <button className="lightbox__nav lightbox__nav--prev" onClick={() => setLightbox(prev => (prev - 1 + EFFECT_IMAGES.length) % EFFECT_IMAGES.length)} aria-label="Poprzedni">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
                <polyline points="13 4 7 10 13 16" />
              </svg>
            </button>
            <img
              src={EFFECT_IMAGES[lightbox].src}
              alt={EFFECT_IMAGES[lightbox].alt}
              className="lightbox__image"
            />
            <button className="lightbox__nav lightbox__nav--next" onClick={() => setLightbox(prev => (prev + 1) % EFFECT_IMAGES.length)} aria-label="Następny">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
                <polyline points="7 4 13 10 7 16" />
              </svg>
            </button>
            <span className="lightbox__counter">{lightbox + 1} / {EFFECT_IMAGES.length}</span>
          </div>
        </div>
      )}
    </>
  )
}

/* ── Opinie — Testimonial Carousel ── */

const TESTIMONIALS = [
  {
    name: 'Oliwka',
    text: 'Kamila wszystko dokładnie tłumaczy i dba o komfort klienta.',
  },
  {
    name: 'Mateusz',
    text: 'Indywidualne podejście do klienta, pełen profesjonalizm i bardzo przyjemna atmosfera.',
  },
  {
    name: 'Marzena',
    text: 'Efekt jest bardzo naturalny, a cały zabieg przebiegł komfortowo i bezpiecznie.',
  },
  {
    name: 'Zuzanna',
    text: 'Kamila po kolei tłumaczy wszystkie etapy zabiegu.',
  },
  {
    name: 'Paulina',
    text: 'Na wizycie czułam się zaopiekowana, a efekt końcowy jest przepiękny.',
  },
]

function TestimonialsSection() {
  const [sectionRef, inView] = useInView()
  const [current, setCurrent] = useState(0)
  const dragRef = useRef({ startX: 0, dragging: false })
  const autoplayRef = useRef(null)
  const pausedRef = useRef(false)
  const total = TESTIMONIALS.length

  const goTo = useCallback((index) => {
    setCurrent(((index % total) + total) % total)
  }, [total])

  const goPrev = useCallback(() => goTo(current - 1), [current, goTo])
  const goNext = useCallback(() => goTo(current + 1), [current, goTo])

  // Autoplay — 8s, calm pace, pauses on hover/focus
  const startAutoplay = useCallback(() => {
    clearInterval(autoplayRef.current)
    autoplayRef.current = setInterval(() => {
      if (!pausedRef.current) {
        setCurrent(prev => (prev + 1) % total)
      }
    }, 8000)
  }, [total])

  useEffect(() => {
    startAutoplay()
    return () => clearInterval(autoplayRef.current)
  }, [startAutoplay])

  const pauseAutoplay = () => { pausedRef.current = true }
  const resumeAutoplay = () => { pausedRef.current = false }

  const handlePrev = () => { goPrev(); startAutoplay() }
  const handleNext = () => { goNext(); startAutoplay() }
  const handleDot = (i) => { goTo(i); startAutoplay() }

  const onTouchStart = (e) => {
    dragRef.current = { startX: e.touches[0].clientX, dragging: true }
  }
  const onTouchEnd = (e) => {
    if (!dragRef.current.dragging) return
    const diff = e.changedTouches[0].clientX - dragRef.current.startX
    if (Math.abs(diff) > 50) {
      if (diff < 0) handleNext()
      else handlePrev()
    }
    dragRef.current.dragging = false
  }

  const onPointerDown = (e) => {
    dragRef.current = { startX: e.clientX, dragging: true }
  }
  const onPointerUp = (e) => {
    if (!dragRef.current.dragging) return
    const diff = e.clientX - dragRef.current.startX
    if (Math.abs(diff) > 50) {
      if (diff < 0) handleNext()
      else handlePrev()
    }
    dragRef.current.dragging = false
  }

  return (
    <section id="opinie" className="testimonials" ref={sectionRef}>
      {/* Textured background overlay */}
      <div className="testimonials__bg" aria-hidden="true" />
      <div className={`testimonials__inner ${inView ? 'testimonials__inner--visible' : ''}`}>
        <div className="testimonials__header">
          <h2 className="testimonials__title">Co mówią o mnie klienci</h2>
        </div>

        <div
          className="testimonials__carousel"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          onMouseEnter={pauseAutoplay}
          onMouseLeave={resumeAutoplay}
          onFocus={pauseAutoplay}
          onBlur={resumeAutoplay}
        >
          <button className="testimonials__arrow testimonials__arrow--prev" onClick={handlePrev} aria-label="Poprzednia opinia">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5">
              <polyline points="12 3 6 9 12 15" />
            </svg>
          </button>

          <div className="testimonials__viewport">
            {TESTIMONIALS.map((t, i) => (
              <article
                className={`testimonial-card ${i === current ? 'testimonial-card--active' : ''}`}
                key={i}
                aria-hidden={i !== current}
              >
                <div className="testimonial-card__quote" aria-hidden="true">&ldquo;</div>
                <p className="testimonial-card__text">{t.text}</p>
                <span className="testimonial-card__name">{t.name}</span>
              </article>
            ))}
          </div>

          <button className="testimonials__arrow testimonials__arrow--next" onClick={handleNext} aria-label="Następna opinia">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5">
              <polyline points="6 3 12 9 6 15" />
            </svg>
          </button>
        </div>

        <div className="testimonials__footer">
          <span className="testimonials__counter">
            {String(current + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </span>
          <div className="testimonials__dots">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                className={`testimonials__dot ${i === current ? 'testimonials__dot--active' : ''}`}
                onClick={() => handleDot(i)}
                aria-label={`Opinia ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── Jak pracuję — Editorial Process Timeline ── */

const PROCESS_STEPS = [
  {
    number: '01',
    title: 'Rozmowa o Twoich potrzebach',
    text: 'Na początku przeprowadzam dokładny wywiad, analizuję Twoje nawyki pielęgnacyjne oraz oceniam stan i strukturę skóry, problemy i potrzeby.',
  },
  {
    number: '02',
    title: 'Dobór zabiegu',
    text: 'Omawiam możliwe rozwiązania i dobieram spójny plan zabiegowy dopasowany do Twoich potrzeb i oczekiwanego efektu.',
  },
  {
    number: '03',
    title: 'Przebieg zabiegu',
    text: 'Podczas wizyty wyjaśniam kolejne etapy, odpowiadam na pytania i dbam o Twój komfort.',
  },
  {
    number: '04',
    title: 'Zalecenia po zabiegu',
    text: 'Po zabiegu wiesz, jak dbać o skórę, na co zwrócić uwagę i jak postępować w kolejnych dniach.',
  },
]

function ProcessSection() {
  const [ref, inView] = useInView()

  return (
    <section id="jak-pracuje" className="process" ref={ref}>
      <div className={`process__inner ${inView ? 'process__inner--visible' : ''}`}>
        <div className="process__layout">
          {/* Left column: heading + timeline */}
          <div className="process__left">
            <h2 className="process__title">Jak wygląda współpraca</h2>

            <div className="process__timeline">
              {PROCESS_STEPS.map((step, i) => (
                <div className="process__step" key={i}>
                  <div className="process__step-marker" aria-hidden="true">
                    <span className="process__step-dot" />
                    {i < PROCESS_STEPS.length - 1 && <span className="process__step-line" />}
                  </div>
                  <div className="process__step-content">
                    <span className="process__step-number">{step.number}</span>
                    <h3 className="process__step-title">{step.title}</h3>
                    <p className="process__step-text">{step.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right column: editorial image */}
          <div className="process__right">
            <div className="process__image-frame">
              <img
                src="/work-process.jpeg"
                alt="Przebieg współpracy — KAMVVI INJECTS"
                className="process__image"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── FAQ — Accordion ── */

const FAQ_ITEMS = [
  {
    question: 'Od czego zacząć, jeśli nie wiem, jaki zabieg wybrać?',
    answer: 'Najlepiej od darmowej konsultacji. Nie musisz wiedzieć, jaki zabieg będzie najlepszy — wspólnie ocenimy potrzeby skóry i omówimy dostępne możliwości. Konsultacja nie zobowiązuje do wykonania zabiegu.',
  },
  {
    question: 'Czy konsultacja ma sens, jeśli mam już pielęgnację albo byłam wcześniej gdzie indziej?',
    answer: 'Tak, bo każda twarz i każda skóra potrzebuje oceny tu i teraz. To, że coś było robione wcześniej, nie znaczy, że obecnie to najlepszy kierunek.',
  },
  {
    question: 'Czy dostanę konkretny plan?',
    answer: 'Tak - po konsultacji wiesz, co robimy, czego się spodziewać i jak wygląda dalsze postępowanie.',
  },
  {
    question: 'Czy muszę od razu decydować się na serię zabiegów?',
    answer: 'Nie - to zależy od problemu, celu i rodzaju zabiegu. Czasem wystarczy jedna wizyta, czasem lepiej działać etapami.',
  },
  {
    question: 'Co jeśli boję się bólu albo sztucznego efektu?',
    answer: 'To częsta obawa, dlatego przed zabiegiem wszystko dokładnie wyjaśniam i dobieram rozwiązania tak, żeby efekt był dopasowany do Ciebie i Twojej urody.',
  },
  {
    question: 'Ile trzeba czekać na efekty?',
    answer: 'To zależy od zabiegu. Niektóre efekty są widoczne od razu, inne pojawiają się stopniowo. Zawsze omawiam to przed zabiegiem, żebyś wiedziała czego się spodziewać.',
  },
]

function FAQSection() {
  const [ref, inView] = useInView()
  const [openIndex, setOpenIndex] = useState(null)

  const toggle = (i) => {
    setOpenIndex(prev => prev === i ? null : i)
  }

  return (
    <section id="faq" className="faq" ref={ref}>
      <div className={`faq__inner ${inView ? 'faq__inner--visible' : ''}`}>
        <div className="faq__left">
          <h2 className="faq__title">Najczęstsze pytania przed wizytą</h2>
          <p className="faq__intro">Jeśli nie wiesz, od czego zacząć, zacznij od konsultacji. Poniżej znajdziesz odpowiedzi na najczęstsze pytania.</p>
        </div>

        <div className="faq__right">
          {FAQ_ITEMS.map((item, i) => (
            <div className={`faq__item ${openIndex === i ? 'faq__item--open' : ''}`} key={i}>
              <button className="faq__question" onClick={() => toggle(i)} aria-expanded={openIndex === i}>
                <span>{item.question}</span>
                <svg className="faq__icon" width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <line x1="9" y1="3" x2="9" y2="15" className="faq__icon-v" />
                  <line x1="3" y1="9" x2="15" y2="9" />
                </svg>
              </button>
              <div className="faq__answer">
                <p>{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── Kontakt — Dark closing panel ── */

function ContactSection() {
  const [ref, inView] = useInView()

  return (
    <section id="kontakt" className="contact" ref={ref}>
      <div className={`contact__inner ${inView ? 'contact__inner--visible' : ''}`}>
        {/* Left column: details + CTA */}
        <div className="contact__details">
          <h2 className="contact__title">Kontakt</h2>
          <p className="contact__intro">Masz pytania albo chcesz umówić wizytę? Skorzystaj z wybranego kontaktu.</p>

          <div className="contact__info">
            <p className="contact__name">KAMVVI INJECTS Kamila Wierzchowska</p>
            <p className="contact__address">Banderii 4 U8/2<br />01-164 Warszawa</p>
            <a className="contact__phone" href="tel:+48517892529">517-892-529</a>
          </div>

          <a
            href={BOOKSY_URL}
            className="contact__cta"
            target="_blank"
            rel="noopener noreferrer"
          >
            Umów wizytę w Booksy
          </a>

          <div className="contact__icons">
            <a href="https://maps.app.goo.gl/PvnCeTfpe99F7CqaA?g_st=ic" className="contact__icon-link" target="_blank" rel="noopener noreferrer" aria-label="Google Maps">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                <circle cx="12" cy="9" r="2.5" />
              </svg>
            </a>
            <a href="https://www.instagram.com/kamvvi_injects/" className="contact__icon-link" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="5" />
                <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none" />
              </svg>
            </a>
            <a href="FACEBOOK_URL" className="contact__icon-link" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>
            <a href="mailto:kamvvi.injects@gmail.com" className="contact__icon-link" aria-label="E-mail">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <polyline points="22,4 12,13 2,4" />
              </svg>
            </a>
            <a href="tel:+48517892529" className="contact__icon-link" aria-label="Telefon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Right column: map */}
        <div className="contact__map-col">
          <a
            href="https://maps.app.goo.gl/PvnCeTfpe99F7CqaA?g_st=ic"
            className="contact__map-link"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Otwórz w Google Maps"
          >
            <iframe
              className="contact__map-iframe"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2442.5!2d20.8983!3d52.2471!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x471ecb0e37fb95b1%3A0x2e5c4be50f6f6b8a!2sBanderii%204%2C%2001-164%20Warszawa!5e0!3m2!1spl!2spl!4v1"
              width="100%"
              height="100%"
              style={{ border: 0, pointerEvents: 'none' }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Lokalizacja KAMVVI INJECTS"
            />
            <div className="contact__map-overlay">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                <circle cx="12" cy="9" r="2.5" />
              </svg>
              <span>Otwórz w Google Maps</span>
            </div>
          </a>
          <p className="contact__map-label">Banderii 4, Warszawa</p>
        </div>
      </div>

      <div className="contact__footer">
        <span>KAMVVI INJECTS © 2026</span>
      </div>
    </section>
  )
}

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <main>
        <Hero />
        <AboutSection />
        <OfferSection />
        <EffectsSection />
        <TestimonialsSection />
        <ProcessSection />
        <FAQSection />
        <ContactSection />
      </main>
    </div>
  )
}

export default App
