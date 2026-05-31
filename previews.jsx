/* ============================================================
   APERLAB — Anteprime (vetrina settori)
   ============================================================ */
function PreviewsPage() {
  return (
    <div className="page-enter">
      <section className="hero" style={{ background: "url('assets/anteprime-hero-bg.png') center / cover no-repeat", position: "relative" }}>
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "rgba(255,206,228,.45)" }}></div>
        <div className="wrap" style={{ maxWidth: 920, position: "relative", zIndex: 2 }}>
          <Reveal><Eyebrow>Anteprime</Eyebrow></Reveal>
          <Reveal as="h1" className="display" style={{ marginTop: 20, textShadow: "0 1px 18px rgba(255,255,255,.7)" }}>
            Scopri cosa possiamo creare per attività come la tua.
          </Reveal>
          <Reveal as="p" className="lead" style={{ marginTop: 22, color: "var(--ink)", opacity: 1, fontSize: "19px", maxWidth: "min(100%, 620px)", textShadow: "0 1px 12px rgba(255,255,255,.6)" }}>
            Le anteprime mostrano possibili direzioni visive e funzionali per siti web pensati per attività
            locali, negozi, ristoranti, professionisti e servizi. L'anteprima non è un modello standard, ma un primo studio pensato per aiutarti a comprendere il potenziale del progetto prima di prendere una decisione.
          </Reveal>
        </div>
      </section>

      {/* ---------- Come funziona l'anteprima gratuita ---------- */}
      <section className="section bg-cream">
        <div className="wrap" style={{ display: "grid", gridTemplateColumns: ".85fr 1.15fr", gap: "clamp(36px,5vw,72px)", alignItems: "start" }}>
          {/* editorial intro */}
          <div className="sticky-reset" style={{ position: "sticky", top: 96 }}>
            <Reveal><Eyebrow>Anteprima gratuita</Eyebrow></Reveal>
            <Reveal as="h2" className="h1" style={{ marginTop: 18 }}>
              Come funziona, passo per passo.
            </Reveal>
            <Reveal as="p" className="lead" style={{ marginTop: 22 }}>
              Per permetterti di valutare il progetto in modo concreto fin dall'inizio, Aperlab mette a disposizione un{" "}
              <mark style={{ background: "var(--lime)", color: "var(--ink)", padding: "0 .22em", borderRadius: 6 }}>servizio gratuito di anteprima</mark> del tuo sito.
            </Reveal>
          </div>

          {/* phases */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            {[
              ["01", "Analisi della tua attività",
                "Prima di sviluppare l'anteprima, svolgiamo una prima analisi della tua attività: osserviamo il settore in cui operi, i servizi o prodotti che offri, il modo in cui ti presenti online, il tipo di clienti a cui ti rivolgi e gli obiettivi che vorresti raggiungere attraverso il sito."],
              ["02", "Prima proposta visiva",
                "Da questa analisi nasce una prima proposta visiva pensata intorno alla tua attività: una direzione iniziale che mostra come potrebbe essere organizzato il sito, quali sezioni potrebbero valorizzare meglio prodotti o servizi e quali strumenti potrebbero rendere più semplice il contatto con i tuoi clienti."],
              ["03", "Confronto e modifiche",
                "Dopo averla consultata, potremo confrontarci insieme per eventuali modifiche, sistemazioni e preferenze: testi, immagini, colori, sezioni, funzionalità e stile generale potranno essere adattati in base alle reali esigenze della tua attività."],
              ["04", "Realizzazione e pubblicazione",
                "Una volta definita la direzione finale, passeremo alla realizzazione completa del sito e alla successiva pubblicazione online."],
            ].map(([n, t, d], i) => (
              <Reveal key={n} delay={i * 60}
                style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "clamp(18px,3vw,40px)", padding: "clamp(24px,3vw,34px) 0", borderTop: i === 0 ? "none" : "1px solid rgba(15,16,33,.12)" }}>
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "clamp(28px,3.4vw,42px)", lineHeight: 1, color: "var(--pink-deep)", letterSpacing: "-.03em" }}>{n}</div>
                <div>
                  <h3 className="h3" style={{ fontSize: "clamp(20px,2.2vw,26px)" }}>{t}</h3>
                  <p className="muted" style={{ marginTop: 10 }}>{d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        eyebrow="Non vedi il tuo settore?"
        title="Possiamo studiare una direzione su misura per te."
        text="Raccontaci la tua attività: dopo una breve analisi valutiamo l'anteprima più adatta ai tuoi obiettivi."
        primaryTo="/contatti"
        primaryLabel="Richiedi un'anteprima ora"
      />
    </div>
  );
}
Object.assign(window, { PreviewsPage });
