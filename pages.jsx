/* ============================================================
   APERLAB — Servizi · Metodo · Progetti
   ============================================================ */

function ServicesPage() {
  return (
    <div className="page-enter">
      <section className="hero bg-cream">
        <div className="wrap" style={{ maxWidth: 920 }}>
          <Reveal><Eyebrow>Servizi</Eyebrow></Reveal>
          <Reveal as="h1" className="display" style={{ marginTop: 20 }}>
            Siti web e soluzioni digitali pensate per generare contatti.
          </Reveal>
          <Reveal as="p" className="lead" style={{ marginTop: 22 }}>
            Ogni attività ha esigenze diverse. Aperlab progetta siti e strumenti digitali costruiti intorno
            agli obiettivi reali del cliente.
          </Reveal>
          <Reveal className="btn-row" style={{ marginTop: 30 }}>
            <Btn to="/anteprime" arrow>Scopri cos'è un'anteprima</Btn>
          </Reveal>
        </div>
      </section>

      <section className="section bg-paper">
        <div className="wrap" style={{ display: "grid", gap: 0 }}>
          {window.SERVICES.map((s, i) => (
            <Reveal key={s.id} delay={i * 40}
              style={{ display: "grid", gridTemplateColumns: "auto 1.1fr 1fr auto", gap: 32, alignItems: "start",
                padding: "40px 0", borderTop: "1px solid rgba(15,16,33,.12)" }}
              className="svc-row">
              <div className="mono muted" style={{ fontSize: 15 }}>0{i + 1}</div>
              <div>
                <h2 className="h3" style={{ fontSize: "clamp(22px,2.6vw,30px)" }}>{s.name}</h2>
                <p className="muted" style={{ marginTop: 12 }}>{s.benefit}</p>
              </div>
              <div className="pill-list" style={{ alignContent: "start" }}>
                {s.include.map((x) => <span key={x} className="pill" style={{ fontSize: 13 }}>{x}</span>)}
              </div>
              <Btn to={s.to} variant="btn--ghost" size="btn--sm" arrow>{s.cta}</Btn>
            </Reveal>
          ))}
        </div>
      </section>

      <CtaBand
        eyebrow="Vuoi vedere un esempio reale?"
        title="Immagina il potenziale della tua attività."
        text="Le anteprime mostrano cosa potremmo costruire. Scegli la tipologia più vicina alla tua attività e capisci la direzione più adatta."
        primaryTo="/anteprime"
      />
    </div>
  );
}

function MethodPage() {
  return (
    <div className="page-enter">
      <section className="hero bg-ink">
        <div className="wrap" style={{ maxWidth: 920 }}>
          <Reveal><Eyebrow>Il metodo</Eyebrow></Reveal>
          <Reveal as="h1" className="display" style={{ marginTop: 20, color: "var(--cream)" }}>
            Prima vedi il potenziale, poi costruiamo il progetto.
          </Reveal>
          <Reveal as="p" className="lead" style={{ marginTop: 22 }}>
            Il nostro metodo rende il percorso chiaro: mostriamo esempi concreti, analizziamo l'attività
            e sviluppiamo una soluzione digitale su misura.
          </Reveal>
          <Reveal className="btn-row" style={{ marginTop: 30 }}>
            <Btn to="/anteprime" variant="btn--light" arrow>Scopri cos'è un'anteprima</Btn>
          </Reveal>
        </div>
      </section>

      <section className="section bg-cream">
        <div className="wrap">
          {window.METHOD.map((m, i) => (
            <Reveal key={m.n} delay={i * 40}
              style={{ display: "grid", gridTemplateColumns: "120px 1fr", gap: "clamp(20px,4vw,56px)", alignItems: "start",
                padding: "clamp(28px,3.5vw,44px) 0", borderTop: i === 0 ? "none" : "1px solid rgba(15,16,33,.12)" }}>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "clamp(40px,6vw,72px)", lineHeight: 1, color: "var(--pink-deep)", letterSpacing: "-.04em" }}>{m.n}</div>
              <div>
                <h2 className="h2" style={{ fontSize: "clamp(24px,3vw,38px)" }}>{m.t}</h2>
                <p className="lead" style={{ marginTop: 14, color: "var(--gray)" }}>{m.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <CtaBand
        eyebrow="Pronti a partire?"
        title="Iniziamo dall'anteprima più adatta a te."
        text="Scopri cosa possiamo realizzare, raccontaci la tua attività e prepareremo una proposta su misura."
        primaryTo="/anteprime"
      />
    </div>
  );
}

Object.assign(window, { ServicesPage, MethodPage });
