/* ============================================================
   APERLAB — shared components & shell
   Exposes building blocks + Nav/Footer/router helpers on window
   ============================================================ */
const { useState, useEffect, useRef, useCallback } = React;

/* ---- WhatsApp pre-filled link ---- */
const WA_NUMBER = "393921240877"; // +39 392 124 0877
const waLink = (msg) =>
`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg || "Ciao Aperlab, ho visto le vostre anteprime e vorrei capire come potrebbe essere sviluppato il sito della mia attività.")}`;

/* ---- routing (hash based) ---- */
function useRoute() {
  const [route, setRoute] = useState(() => window.location.hash.replace(/^#/, "") || "/");
  useEffect(() => {
    const on = () => setRoute(window.location.hash.replace(/^#/, "") || "/");
    window.addEventListener("hashchange", on);
    return () => window.removeEventListener("hashchange", on);
  }, []);
  return route;
}
function nav(to) {
  window.location.hash = to;
  window.scrollTo({ top: 0, behavior: "auto" });
}
function Link({ to, className, children, onClick, ...rest }) {
  return (
    <a href={"#" + to} className={className}
    onClick={(e) => {e.preventDefault();onClick && onClick();nav(to);}} {...rest} style={{ fontFamily: "Manrope", opacity: "1", borderColor: "rgb(0, 0, 0)" }}>
      {children}
    </a>);

}

/* ---- arrow glyph ---- */
const Arrow = ({ size = 16 }) =>
<svg className="arrow" width={size} height={size} viewBox="0 0 16 16" fill="none">
    <path d="M2 8h11M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>;


/* ---- buttons ---- */
function Btn({ children, variant = "", size = "", to, href, onClick, arrow, wa, ...rest }) {
  const cls = `btn ${variant} ${size}`.trim();
  const inner =
  <>
      {children}
      {arrow && <Arrow />}
    </>;

  if (to) return <Link to={to} className={cls} {...rest}>{inner}</Link>;
  if (href) return <a href={href} target="_blank" rel="noopener" className={cls} {...rest}>{inner}</a>;
  return <button className={cls} onClick={onClick} {...rest}>{inner}</button>;
}

/* ---- WhatsApp primary button ---- */
const WaIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style={{ flex: "0 0 auto" }}><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>;

function WaBtn({ children = "Scrivici su WhatsApp", msg, light, size = "btn--lg" }) {
  return (
    <a href={waLink(msg)} target="_blank" rel="noopener"
    className={`btn btn--wa ${size}`}
    style={{ display: "inline-flex", alignItems: "center", gap: 12, height: "56px" }}>
      <WaIcon /><span>{children}</span>
    </a>);

}

/* ---- placeholder media ---- */
function Ph({ label, variant = "", style, className = "", ratio }) {
  const v = variant ? `ph--${variant}` : "";
  return (
    <div className={`ph ${v} ${className}`} style={{ ...(ratio ? { aspectRatio: ratio } : {}), ...style }}>
      <span className="ph__tag mono">{label}</span>
    </div>);

}

/* ---- eyebrow ---- */
const Eyebrow = ({ children }) => <span className="eyebrow">{children}</span>;

/* ---- reveal on scroll ---- */
function Reveal({ children, className = "", as: Tag = "div", delay = 0, ...rest }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let done = false;
    // instant, transition-independent show (capture/headless safe)
    const showNow = () => {el.style.opacity = "1";el.style.transform = "none";el.style.transition = "none";done = true;};
    // animated show for scroll-in items
    const showAnim = () => {if (!done) {done = true;el.classList.add("in");}};
    const inView = () => el.getBoundingClientRect().top < window.innerHeight * 0.9;
    if (inView()) {showNow();return;}
    const io = new IntersectionObserver((ents) => {
      ents.forEach((e) => {if (e.isIntersecting) {setTimeout(showAnim, delay);io.disconnect();}});
    }, { threshold: 0.1, rootMargin: "0px 0px -40px 0px" });
    io.observe(el);
    const t = setTimeout(showNow, 1600 + delay); // safety if observer never fires
    return () => {io.disconnect();clearTimeout(t);};
  }, [delay]);
  return <Tag ref={ref} className={`reveal ${className}`} {...rest}>{children}</Tag>;
}

/* ---- brand mark (Aperlab "aperture" symbol) ---- */
function LogoMark({ size = 30, color = "var(--ink)", className = "" }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 100 100" fill="none"
    aria-hidden="true" style={{ display: "block", flex: "0 0 auto" }}>
      {/* broken outer ring */}
      <circle cx="50" cy="50" r="45" fill="none" stroke={color} strokeWidth="6"
      strokeLinecap="round" strokeDasharray="120 26" transform="rotate(-26 50 50)" />
      {/* inner wedge disc (aperture mouth opening right) */}
      <path d="M50 50 L82 33 A36 36 0 1 1 82 67 Z" fill={color} />
    </svg>);

}

function Brand({ onNavigate, variant }) {
  const src = variant === "light" ? "assets/logo-pink.png" : "assets/logo-ink.png";
  return (
    <Link to="/" className="brand" onClick={onNavigate} aria-label="Aperlab — home">
      <img src={src} alt="Aperlab — Più visibilità. Più valore." className="brand__img" />
    </Link>);

}

/* ---- main navigation ---- */
const NAV_ITEMS = [
{ to: "/anteprime", label: "Anteprime" },
{ to: "/servizi", label: "Servizi" },
{ to: "/metodo", label: "Metodo" },
{ to: "/faq", label: "FAQ" }];


function Nav() {
  const route = useRoute();
  const [open, setOpen] = useState(false);
  const isActive = (to) => route === to || to !== "/" && route.startsWith(to);
  useEffect(() => {setOpen(false);}, [route]);
  return (
    <nav className="nav">
      <div className="nav__inner">
        <Brand />
        <div className="nav__links">
          {NAV_ITEMS.map((i) =>
          <Link key={i.to} to={i.to} className={`nav__link ${isActive(i.to) ? "is-active" : ""}`}>{i.label}</Link>
          )}
        </div>
        <div className="nav__cta">
          <Btn to="/contatti" variant="btn--ghost" size="btn--sm">Contattaci</Btn>
          <Btn to="/anteprime" size="btn--sm" arrow>Scopri cos'è un'anteprima</Btn>
          <button className="nav__burger" onClick={() => setOpen((o) => !o)} aria-label="Menu">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d={open ? "M4 4l12 12M16 4L4 16" : "M3 6h14M3 10h14M3 14h14"} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>
          </button>
        </div>
      </div>
      {open &&
      <div className="mobile-menu">
          {NAV_ITEMS.map((i) =>
        <Link key={i.to} to={i.to} className={`nav__link ${isActive(i.to) ? "is-active" : ""}`}>{i.label}</Link>
        )}
          <Link to="/contatti" className="nav__link">Contatti</Link>
        </div>
      }
    </nav>);

}

/* ---- footer ---- */
function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer__grid">
          <div className="footer__col">
            <div className="brand" style={{ marginBottom: 22 }}>
              <img src="assets/logo-pink.png" alt="Aperlab — Più visibilità. Più valore." style={{ height: 48, width: "auto", display: "block" }} />
            </div>
            <p style={{ color: "rgba(255,248,251,.7)", maxWidth: "34ch", marginBottom: 22 }}>
              Progettiamo siti web, cataloghi digitali e soluzioni interattive per attività locali che vogliono
              presentarsi meglio e ricevere più contatti.
            </p>
          </div>
          <div className="footer__col" style={{ textAlign: "left", paddingTop: 18 }}>
            <h4>Sito</h4>
            <Link to="/">Home</Link>
            <Link to="/anteprime">Anteprime</Link>
            <Link to="/servizi">Servizi</Link>
            <Link to="/metodo">Metodo</Link>
          </div>
          <div className="footer__col" style={{ paddingTop: 18 }}>
            <h4>Contatto</h4>
            <Link to="/contatti">Contatti</Link>
            <Link to="/faq">FAQ</Link>
            <Link to="/privacy">Privacy & Cookie</Link>
          </div>
        </div>
        <div className="footer__bottom">
          <span>© {new Date().getFullYear()} Aperlab — Studio digitale</span>
          <span className="mono">Più visibilità. Più valore.</span>
        </div>
      </div>
    </footer>);

}

/* ---- floating CTA: glass "Richiedi un'anteprima" (light/dark aware) ---- */
function WaFloat() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;if (!el) return;
    let raf = null;
    const detect = () => {
      raf = null;
      const r = el.getBoundingClientRect();
      const x = Math.round(r.left + r.width / 2);
      const y = Math.round(r.top + r.height / 2);
      // temporarily hide self so elementFromPoint sees what's beneath
      const prev = el.style.pointerEvents;
      el.style.pointerEvents = "none";
      el.style.visibility = "hidden";
      const under = document.elementFromPoint(x, y);
      el.style.visibility = "";
      el.style.pointerEvents = prev;
      if (!under) return;
      // walk up to find a meaningful background color
      let node = under,bg = null;
      while (node && node !== document.documentElement) {
        const c = getComputedStyle(node).backgroundColor;
        const m = c.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/i);
        if (m) {
          const a = m[4] === undefined ? 1 : parseFloat(m[4]);
          if (a > 0.1) {bg = [+m[1], +m[2], +m[3]];break;}
        }
        node = node.parentElement;
      }
      if (!bg) return;
      // perceived luminance
      const [r1, g1, b1] = bg.map((v) => {
        v /= 255;
        return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
      });
      const L = 0.2126 * r1 + 0.7152 * g1 + 0.0722 * b1;
      el.classList.toggle("cta-float--on-dark", L < 0.4);
    };
    const onScroll = () => {if (raf) return;raf = requestAnimationFrame(detect);};
    detect();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", detect);
    const interval = setInterval(detect, 600); // catch route changes
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", detect);
      clearInterval(interval);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
  return (
    <a ref={ref} className="cta-float" href="#/contatti" onClick={(e) => {e.preventDefault();nav("/contatti");}}>
      <span className="lbl">Richiedi un'anteprima</span>
      <Arrow size={16} />
    </a>);

}

/* ---- generic CTA band ---- */
function CtaBand({ eyebrow, title, text, primaryTo, primaryLabel = "Scopri cos'è un'anteprima", waMsg }) {
  return (
    <section className="section bg-ink">
      <div className="wrap-tight" style={{ textAlign: "center" }}>
        {eyebrow && <Reveal><Eyebrow>{eyebrow}</Eyebrow></Reveal>}
        <Reveal as="h2" className="h1" style={{ marginTop: 18, marginBottom: 18, fontSize: "clamp(32px,4vw,48px)" }}>{title}</Reveal>
        {text && <Reveal as="p" className="lead" style={{ marginInline: "auto", marginBottom: 30, fontSize: "clamp(18px,2vw,22px)" }}>{text}</Reveal>}
        <Reveal className="btn-row" style={{ justifyContent: "center" }}>
          {primaryTo && <Btn to={primaryTo} variant="btn--light" arrow>{primaryLabel}</Btn>}
          <Btn to="/contatti" variant="btn--light" arrow>Contattaci</Btn>
        </Reveal>
      </div>
    </section>);

}

/* ---- section header ---- */
function SectionHead({ eyebrow, title, text, align = "left", titleClass = "h2", typeTitle = false }) {
  return (
    <div style={{ textAlign: align, maxWidth: align === "center" ? 720 : "none", marginInline: align === "center" ? "auto" : 0, marginBottom: 48 }}>
      {eyebrow && <Reveal><Eyebrow>{eyebrow}</Eyebrow></Reveal>}
      {typeTitle ?
      <h2 className={titleClass} style={{ marginTop: 16 }}><Typewriter text={title} /></h2> :
      <Reveal as="h2" className={titleClass} style={{ marginTop: 16 }}>{title}</Reveal>}
      {text && <Reveal as="p" className="lead" style={{ marginTop: 18, marginInline: align === "center" ? "auto" : 0 }}>{text}</Reveal>}
    </div>);

}

/* ---- typewriter: composes text as if typed live, on scroll-in ---- */
function Typewriter({ text, speed = 82, startDelay = 220, className = "", style, start, onDone }) {
  const controlled = start !== undefined;
  const ref = useRef(null);
  const [n, setN] = useState(0);
  const [started, setStarted] = useState(false);
  const doneRef = useRef(false);
  // uncontrolled: begin when scrolled into view
  useEffect(() => {
    if (controlled) return;
    const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {setN(text.length);return;}
    const el = ref.current;if (!el) return;
    const begin = () => setStarted(true);
    const inView = () => el.getBoundingClientRect().top < window.innerHeight * 0.85;
    let io;
    if (inView()) {const t = setTimeout(begin, startDelay);return () => clearTimeout(t);}
    io = new IntersectionObserver((ents) => {
      ents.forEach((e) => {if (e.isIntersecting) {setTimeout(begin, startDelay);io.disconnect();}});
    }, { threshold: 0.4 });
    io.observe(el);
    const safety = setTimeout(() => {if (inView()) begin();}, 3000); // capture/headless safety, only if visible
    return () => {if (io) io.disconnect();clearTimeout(safety);};
  }, [text, startDelay, controlled]);
  // controlled: begin when parent flips `start` to true
  useEffect(() => {
    if (!controlled || !start || started) return;
    const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {setN(text.length);setStarted(true);return;}
    const t = setTimeout(() => setStarted(true), startDelay);
    return () => clearTimeout(t);
  }, [controlled, start, started, startDelay, text]);
  // typing tick
  useEffect(() => {
    if (!started || n >= text.length) return;
    const id = setTimeout(() => setN((c) => c + 1), speed);
    return () => clearTimeout(id);
  }, [started, n, text, speed]);
  // fire onDone once the word is fully typed
  useEffect(() => {
    if (started && n >= text.length && !doneRef.current) {
      doneRef.current = true;
      if (onDone) onDone();
    }
  }, [started, n, text, onDone]);
  const done = n >= text.length;
  return (
    <span ref={ref} className={className} style={style}>
      <span>{text.slice(0, n)}</span>
      {!done && <span className="type-caret"></span>}
      <span style={{ visibility: "hidden" }} aria-hidden="true">{text.slice(n)}</span>
    </span>);

}

Object.assign(window, {
  useState, useEffect, useRef, useCallback,
  waLink, useRoute, nav, Link, Arrow, Btn, WaBtn, Ph, Eyebrow, Reveal,
  Brand, LogoMark, Nav, Footer, WaFloat, CtaBand, SectionHead, Typewriter
});