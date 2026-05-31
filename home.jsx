/* ============================================================
   APERLAB — Home
   ============================================================ */

/* Shared preview card (reused on Anteprime page) */
function PreviewCard({ p, index }) {
  return (
    <Reveal className="card card--hover" delay={index * 70}
    style={{ padding: 0, overflow: "hidden", position: "relative", display: "flex", flexDirection: "column", justifyContent: "flex-end", aspectRatio: "5 / 6", color: "var(--cream)", backgroundColor: p.accent }}>
      {/* dynamic auto-scrolling website preview */}
      {p.img ?
      <div className="preview-window">
            <img className="preview-window__img" src={p.img} alt={p.title} loading="lazy" style={{ "--scroll-dur": `${9 + index * 2}s` }} />
          </div> :
      null}
      {/* scrim for legibility */}
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(12,13,28,.97) 0%, rgba(12,13,28,.9) 34%, rgba(12,13,28,.5) 58%, rgba(12,13,28,0) 82%)" }} />
      <div style={{ position: "relative", padding: "26px 24px 24px", display: "flex", flexDirection: "column", gap: 13 }}>
        <h3 className="h3" style={{ fontSize: 22, color: "var(--cream)", fontWeight: 700, letterSpacing: "-0.01em" }}>{p.title}</h3>
        <p style={{ fontSize: 15.5, lineHeight: 1.55, color: "rgba(255,248,251,.82)", fontWeight: 400 }}>{p.desc}</p>
        <div className="pill-list" style={{ paddingTop: 4 }}>
          {p.features.slice(0, 4).map((f) => <span key={f} className="pill" style={{ fontSize: 13, padding: "6px 12px", background: "rgba(255,255,255,.1)", border: "1px solid rgba(255,255,255,.55)", color: "#ffffff", fontWeight: 600 }}>{f}</span>)}
        </div>
        <Btn to="/contatti" variant="btn--ghost-light banner-cta" size="btn--sm" arrow style={{ marginTop: 6 }}>Richiedi informazioni</Btn>
      </div>
    </Reveal>);

}

/* Method steps whose titles type out strictly one after another */
function MethodSteps() {
  const steps = window.METHOD.slice(0, 6);
  const ref = useRef(null);
  const [active, setActive] = useState(-1);
  useEffect(() => {
    const el = ref.current;if (!el) return;
    const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {setActive(steps.length);return;}
    const inView = () => el.getBoundingClientRect().top < window.innerHeight * 0.82;
    const fire = () => setActive(0);
    let io, t, safety;
    if (inView()) {t = setTimeout(fire, 200);return () => clearTimeout(t);}
    io = new IntersectionObserver((es) => es.forEach((e) => {
      if (e.isIntersecting) {fire();io.disconnect();}
    }), { threshold: 0.2 });
    io.observe(el);
    safety = setTimeout(() => {if (inView()) fire();}, 3000);
    return () => {if (io) io.disconnect();clearTimeout(safety);};
  }, []);
  return (
    <div ref={ref} className="grid grid-3" style={{ gap: 18 }}>
      {steps.map((m, i) =>
      <Reveal key={m.n} delay={i * 50} style={{ padding: "24px 0", borderTop: "1px solid var(--ink-line)" }}>
          <div className="mono" style={{ color: "var(--pink)", fontSize: 14 }}>{m.n}</div>
          <div className="h3" style={{ color: "var(--cream)", marginTop: 10, fontSize: 22, lineHeight: 1.25, minHeight: "2.6em" }}>
            <Typewriter text={m.t} speed={30} startDelay={i === 0 ? 60 : 110}
          start={active >= i} onDone={() => setActive((a) => Math.max(a, i + 1))} />
          </div>
        </Reveal>
      )}
    </div>);

}

function HeroVisual() {
  return (
    <div style={{ position: "relative" }}>
      <div className="mock" style={{ transform: "rotate(-1.2deg)" }}>
        <div className="mock__bar">
          <span className="mock__dot" /><span className="mock__dot" /><span className="mock__dot" />
          <span className="mock__url">la-tua-attività.it</span>
        </div>
        <div style={{ background: "var(--cream)" }}>
          <div style={{ background: "var(--pink)", padding: "26px 26px 30px" }}>
            <span className="tag tag--ink" style={{ fontSize: 10.5 }}>LA TUA ATTIVITÀ</span>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 27, lineHeight: 1.02, marginTop: 14, letterSpacing: "-.02em" }}>
              Fresco, pronto,<br />ogni giorno.
            </div>
            <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
              <span style={{ background: "var(--ink)", color: "var(--cream)", padding: "8px 14px", borderRadius: 999, fontSize: 12, fontWeight: 700 }}>Ordina ora</span>
              <span style={{ border: "1.5px solid rgba(15,16,33,.25)", padding: "8px 14px", borderRadius: 999, fontSize: 12, fontWeight: 700 }}>Il menu</span>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, padding: 18 }}>
            {["prodotto", "prodotto", "prodotto"].map((l, i) =>
            <Ph key={i} label={l} ratio="1 / 1" style={{ minHeight: 0, borderRadius: 12 }} />
            )}
          </div>
        </div>
      </div>
      {/* floating chip */}
      <div style={{ position: "absolute", bottom: -18, left: -16, background: "var(--ink)", color: "var(--cream)",
        padding: "13px 18px", borderRadius: 16, boxShadow: "var(--shadow-md)", display: "flex", alignItems: "center", gap: 11, transform: "rotate(-2deg)" }}>
        <span className="wa-dot" style={{ width: 9, height: 9, borderRadius: "50%", background: "var(--lime)", boxShadow: "0 0 0 4px rgba(182,255,77,.22)" }} />
        <span style={{ fontSize: 13.5, fontWeight: 700 }}>Nuovo contatto WhatsApp</span>
      </div>
      <div style={{ position: "absolute", top: 28, right: -22, background: "var(--lime)", color: "var(--ink)",
        padding: "10px 16px", borderRadius: 14, fontWeight: 800, fontSize: 13.5, transform: "rotate(3deg)", boxShadow: "var(--shadow-sm)" }}>
        100% mobile-ready
      </div>
    </div>);

}

/* 3D floating cubes for the hero — mouse parallax + scroll drift, brand colors */
function Hero3D() {
  const rootRef = useRef(null);
  const fieldRef = useRef(null);
  useEffect(() => {
    const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const root = rootRef.current,field = fieldRef.current;
    if (!root || !field) return;
    let raf = null,tx = 0,ty = 0,cx = 0,cy = 0;
    const onMove = (e) => {
      const r = root.getBoundingClientRect();
      tx = (e.clientX - r.left) / r.width - 0.5;
      ty = (e.clientY - r.top) / r.height - 0.5;
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const tick = () => {
      raf = null;
      cx += (tx - cx) * 0.08;
      cy += (ty - cy) * 0.08;
      field.style.setProperty("--px", cx.toFixed(4));
      field.style.setProperty("--py", cy.toFixed(4));
      if (Math.abs(tx - cx) > 0.001 || Math.abs(ty - cy) > 0.001) raf = requestAnimationFrame(tick);
    };
    let sraf = null;
    const onScroll = () => {
      if (sraf) return;
      sraf = requestAnimationFrame(() => {
        sraf = null;
        const y = window.pageYOffset || 0;
        const fade = 1 - Math.min(y / 560, 1);
        root.style.opacity = fade.toFixed(3);
        root.style.transform = `translateY(${(y * 0.16).toFixed(1)}px)`;
      });
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
      if (sraf) cancelAnimationFrame(sraf);
    };
  }, []);
  const cubes = [
  { v: "pink", l: "58%", t: "16%", s: 116, rx: "-18deg", ry: "34deg", dur: "11s", delay: "0s" },
  { v: "ink", l: "78%", t: "30%", s: 84, rx: "-24deg", ry: "26deg", dur: "13s", delay: "-3s" },
  { v: "cream", l: "70%", t: "60%", s: 70, rx: "-16deg", ry: "40deg", dur: "9.5s", delay: "-1.5s" },
  { v: "pink", l: "88%", t: "66%", s: 56, rx: "-22deg", ry: "30deg", dur: "12s", delay: "-5s" },
  { v: "lime", l: "52%", t: "70%", s: 46, rx: "-20deg", ry: "36deg", dur: "10.5s", delay: "-2s" },
  { v: "cream", l: "92%", t: "20%", s: 44, rx: "-18deg", ry: "28deg", dur: "14s", delay: "-6s" }];

  return (
    <div ref={rootRef} className="hero3d" aria-hidden="true">
      <div ref={fieldRef} className="hero3d__field">
        {cubes.map((c, i) =>
        <div key={i} className={"cube cube--" + c.v}
        style={{ left: c.l, top: c.t, "--s": c.s + "px", "--rx": c.rx, "--ry": c.ry, "--dur": c.dur, animationDelay: c.delay }}>
            <span className="cube__face cube__face--front" />
            <span className="cube__face cube__face--back" />
            <span className="cube__face cube__face--right" />
            <span className="cube__face cube__face--left" />
            <span className="cube__face cube__face--top" />
            <span className="cube__face cube__face--bottom" />
          </div>
        )}
      </div>
    </div>);

}

/* Slides its content in from a side, settling in place, when scrolled into view */
function SlideIn({ children, from = "right", className = "", style }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;if (!el) return;
    const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {setShown(true);return;}
    const inView = () => el.getBoundingClientRect().top < window.innerHeight * 0.85;
    const fire = () => setShown(true);
    let io, safety, t;
    if (inView()) {t = setTimeout(fire, 120);return () => clearTimeout(t);}
    io = new IntersectionObserver((es) => es.forEach((e) => {
      if (e.isIntersecting) {fire();io.disconnect();}
    }), { threshold: 0.2 });
    io.observe(el);
    safety = setTimeout(() => {if (inView()) fire();}, 3000);
    return () => {if (io) io.disconnect();clearTimeout(safety);};
  }, []);
  return (
    <div ref={ref} className={`slide-in slide-in--${from}${shown ? " is-in" : ""} ${className}`} style={style}>
      {children}
    </div>);

}

/* Benefit card with a pink border that draws itself when scrolled into view */
function BenefitCard({ b, i }) {
  const ref = useRef(null);
  const [dims, setDims] = useState({ w: 0, h: 0 });
  const [shown, setShown] = useState(false);
  const [drawn, setDrawn] = useState(false);
  useEffect(() => {
    const el = ref.current;if (!el) return;
    const measure = () => setDims({ w: el.offsetWidth, h: el.offsetHeight });
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const inView = () => el.getBoundingClientRect().top < window.innerHeight * 0.88;
    const fire = () => {setShown(true);setDrawn(true);};
    let io, t, safety;
    if (reduce) {fire();} else
    if (inView()) {t = setTimeout(fire, 140 + i * 90);} else
    {
      io = new IntersectionObserver((es) => es.forEach((e) => {
        if (e.isIntersecting) {setTimeout(fire, i * 90);io.disconnect();}
      }), { threshold: 0.2 });
      io.observe(el);
      safety = setTimeout(() => {if (inView()) fire();}, 2400);
    }
    return () => {ro.disconnect();if (io) io.disconnect();clearTimeout(t);clearTimeout(safety);};
  }, [i]);
  const inset = 1.25,r = 28;
  const w = Math.max(dims.w, 1),h = Math.max(dims.h, 1);
  return (
    <div ref={ref} className={"reveal card card--hover benefit-card" + (shown ? " in" : "")} style={{ position: "relative" }}>
      <svg className="benefit-border" width={w} height={h} viewBox={`0 0 ${w} ${h}`} fill="none" aria-hidden="true" focusable="false">
        <rect x={inset} y={inset} width={Math.max(w - inset * 2, 1)} height={Math.max(h - inset * 2, 1)}
        rx={r} ry={r} pathLength="1"
        style={{ fill: "none", stroke: "var(--pink-deep)", strokeWidth: 2, strokeLinejoin: "round",
          strokeDasharray: 1, strokeDashoffset: drawn ? 0 : 1,
          transition: "stroke-dashoffset 1.15s cubic-bezier(.6,0,.25,1)" }} />
      </svg>
      <div className="kicker-num">{String(i + 1).padStart(2, "0")}</div>
      <h3 className="h3" style={{ marginTop: 14, marginBottom: 10, fontSize: 23 }}>{b.t}</h3>
      <p className="muted">{b.d}</p>
    </div>);

}

function HomePage() {
  const previews = window.PREVIEWS.slice(0, 3);
  const benefits = [
  { t: "Più fiducia", d: "Un sito curato aumenta la percezione di professionalità." },
  { t: "Più contatti", d: "WhatsApp, form e pulsanti rapidi rendono semplice essere contattati." },
  { t: "Servizi più chiari", d: "Prodotti, menu, prezzi e servizi presentati in modo ordinato." },
  { t: "Più richieste", d: "Il sito guida verso prenotazioni, ordini o preventivi." },
  { t: "Immagine più forte", d: "Design, testi e struttura aiutano l'attività a distinguersi." }];

  const homeServices = [
  "Siti web professionali", "Cataloghi e menu digitali", "Ordini e prenotazioni"];


  return (
    <div className="page-enter">
      {/* ---------- HERO ---------- */}
      <section className="hero" style={{
        backgroundColor: "var(--cream)",
        position: "relative",
        overflow: "hidden"
      }}>
        {/* blurred background image */}
        <div aria-hidden="true" style={{
          position: "absolute", inset: 0,
          backgroundImage: "url('assets/hero-bg.jpeg')",
          backgroundSize: "cover",
          backgroundPosition: "center center",
          transform: "none",
          zIndex: 0
        }} />
        {/* readability scrims */}
        <div aria-hidden="true" className="hero-scrim" style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(90deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 248, 251, .1) 100%)",
          zIndex: 1
        }} />
        <div className="wrap" style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr)", alignItems: "center", position: "relative", zIndex: 2 }}>
          <div style={{ maxWidth: 640 }}>
            <Reveal><Eyebrow>Studio digitale per attività locali</Eyebrow></Reveal>
            <Reveal as="h1" className="display" style={{ marginTop: 22, fontSize: "clamp(40px, 7.2vw, 85px)" }}>
              Scopri come potrebbe diventare il sito della tua <span style={{ display: "inline-block", background: "var(--lime)", padding: "0 .15em", borderRadius: 6, fontSize: "0.92em", transform: "rotate(1.5deg)", transformOrigin: "50% 70%" }}>attività</span>.
            </Reveal>
            <Reveal as="p" className="lead hero-lead" style={{ marginTop: 24 }}>
              Aperlab progetta siti web, cataloghi digitali e soluzioni online per attività locali
              che vogliono presentarsi meglio, ricevere più contatti e valorizzare i propri servizi.
            </Reveal>
            <Reveal className="btn-row" style={{ marginTop: 32 }}>
              <Btn to="/anteprime" variant="btn--lg" arrow>Scopri cos'è un'anteprima</Btn>
              <Btn to="/contatti" variant="btn--lg" style={{ background: "var(--pink)", color: "var(--ink)", border: "1px solid rgba(15,16,33,.18)" }}>Parla con noi</Btn>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- ANTEPRIME (subito) ---------- */}
      <section className="section" style={{
        backgroundColor: "var(--cream)"
      }}>
        <div className="wrap" style={{ maxWidth: 1340 }}>
          <SectionHead
            eyebrow="Anteprime · tipologie di sito"
            title="Tre tipologie, infinite possibilità."
            typeTitle
            text="Non template standard: direzioni concrete divise per tipologia che mostrano cosa potremmo costruire per la tua attività." />
          
          <div className="grid previews-grid">
            {previews.map((p, i) => <PreviewCard key={p.id} p={p} index={i} />)}
          </div>
          <Reveal className="btn-row" style={{ justifyContent: "center", marginTop: 44 }}>
            <Btn to="/anteprime" variant="btn--ghost" arrow>Scopri cos'è un'anteprima</Btn>
          </Reveal>
        </div>
      </section>

      {/* ---------- PROBLEMA ---------- */}
      <section className="section" style={{ backgroundColor: "rgb(221, 225, 232)"

      }}>
        <div className="wrap" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56, alignItems: "center" }}>
          <div>
            <Reveal><Eyebrow>Il problema</Eyebrow></Reveal>
            <Reveal as="h2" className="h1" style={{ marginTop: 18 }}>La prima impressione nasce online.</Reveal>
          </div>
          <div>
            <Reveal as="p" className="lead" style={{ color: "var(--ink)", opacity: .82 }}>
              Prima di chiamare, prenotare o entrare in un'attività, molte persone cercano informazioni online.
              Guardano il sito, le foto, i servizi, i prezzi, la posizione e la facilità di contatto.
              Una presenza digitale poco curata può far perdere fiducia ancora prima del primo incontro.
            </Reveal>
            <SlideIn from="right" style={{ marginTop: 26 }}>
              <Btn to="/anteprime" arrow>Scopri cos'è un'anteprima</Btn>
            </SlideIn>
          </div>
        </div>
      </section>

      {/* ---------- SOLUZIONE ---------- */}
      <section className="section" style={{
        backgroundColor: "var(--cream)",
        backgroundImage: "linear-gradient(180deg, rgba(255,248,251,.6) 0%, rgba(255,248,251,.35) 40%, rgba(255,248,251,.5) 75%, var(--paper) 100%), url('assets/soluzione-bg.png')",
        backgroundSize: "auto, cover",
        backgroundPosition: "center, center",
        backgroundRepeat: "no-repeat, no-repeat"
      }}>
        <div className="wrap-tight" style={{ textAlign: "center" }}>
          <Reveal><Eyebrow>La soluzione Aperlab</Eyebrow></Reveal>
          <Reveal as="h2" className="h1" style={{ marginTop: 18 }}>
            Non creiamo semplici siti. Costruiamo <span style={{ background: "var(--lime)", padding: "0 .15em", borderRadius: 6 }}>strumenti digitali</span>.
          </Reveal>
          <Reveal as="p" className="lead" style={{ marginTop: 22, marginInline: "auto" }}>
            Ogni sito viene progettato con un obiettivo concreto: presentare meglio l'attività, semplificare il
            contatto con i clienti, mostrare prodotti e servizi in modo chiaro e trasformare la presenza online
            in uno strumento utile ogni giorno.
          </Reveal>
        </div>
      </section>

      {/* ---------- BENEFICI ---------- */}
      <section className="section section--tight" style={{
        backgroundColor: "var(--paper)",
        backgroundImage: "linear-gradient(180deg, var(--paper) 0%, var(--paper) 65%, rgba(255,248,251,.6) 88%, var(--cream) 100%)"
      }}>
        <div className="wrap">
          <SectionHead eyebrow="Benefici concreti" title="Cosa cambia, davvero." />
          <div className="grid grid-3">
            {benefits.map((b, i) => <BenefitCard key={b.t} b={b} i={i} />)}
            <Reveal className="card" delay={300} style={{ background: "var(--ink)", color: "var(--cream)", display: "flex", flexDirection: "column", justifyContent: "center", gap: 18 }}>
              <h3 className="h3" style={{ color: "var(--cream)" }}>Pensato per ricevere più contatti.</h3>
              <Btn to="/anteprime" variant="btn--light" size="btn--sm" arrow style={{ alignSelf: "flex-start" }}>Scopri cos'è un'anteprima</Btn>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- SERVIZI in home ---------- */}
      <section className="section bg-cream">
        <div className="wrap">
          <div style={{ display: "grid", gridTemplateColumns: ".8fr 1.2fr", gap: 48, alignItems: "start" }}>
            <SectionHead eyebrow="Cosa facciamo" title="Servizi principali." titleClass="h1" />
            <div className="grid" style={{ gap: 0 }}>
              {homeServices.map((s, i) =>
              <Reveal key={s} delay={i * 50}>
                  <Link to="/servizi" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20, padding: "24px 4px", borderTop: "1px solid rgba(15,16,33,.12)" }}>
                    <span style={{ display: "flex", alignItems: "baseline", gap: 18 }}>
                      <span className="mono muted" style={{ fontSize: 14 }}>0{i + 1}</span>
                      <span className="h3" style={{ fontSize: "clamp(20px,2.4vw,28px)" }}>{s}</span>
                    </span>
                    <Arrow size={20} />
                  </Link>
                </Reveal>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ---------- METODO breve ---------- */}
      <section className="section bg-ink">
        <div className="wrap">
          <SectionHead eyebrow="Il metodo" title="Dal primo esempio alla pubblicazione online." />
          <MethodSteps />
          <Reveal style={{ marginTop: 40 }}>
            <Btn to="/metodo" variant="btn--light" arrow>Scopri il metodo completo</Btn>
          </Reveal>
        </div>
      </section>

      {/* ---------- CTA FINALE ---------- */}
      <CtaBand
        eyebrow="Inizia da qui"
        title="Vuoi un'anteprima pensata per la tua attività?"
        text="Dopo una breve analisi iniziale, possiamo mostrarti una direzione visiva personalizzata per capire come potrebbe presentarsi online la tua attività."
        primaryTo="/contatti"
        primaryLabel="Richiedi informazioni" />
      
    </div>);

}

Object.assign(window, { HomePage, PreviewCard });