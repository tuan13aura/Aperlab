/* ============================================================
   APERLAB — Contatti · FAQ · Privacy · Cookie
   ============================================================ */

function ContactForm() {
  const empty = { nome: "", attivita: "", settore: "", citta: "", telefono: "", email: "",
    anteprima: "", messaggio: "" };
  const [f, setF] = useState(empty);
  const [sent, setSent] = useState(false);
  const [errs, setErrs] = useState({});
  const set = (k) => (e) => setF((s) => ({ ...s, [k]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    const er = {};
    if (!f.nome.trim()) er.nome = 1;
    if (!f.attivita.trim()) er.attivita = 1;
    if (!f.telefono.trim() && !f.email.trim()) { er.telefono = 1; er.email = 1; }
    setErrs(er);
    if (Object.keys(er).length) return;
    const subject = `Richiesta anteprima · ${f.attivita || f.nome}`;
    const body =
      `Nome: ${f.nome}\n` +
      `Attività: ${f.attivita}\n` +
      `Settore: ${f.settore || "—"}\n` +
      `Città: ${f.citta || "—"}\n` +
      `Telefono / WhatsApp: ${f.telefono || "—"}\n` +
      `Email: ${f.email || "—"}\n` +
      `Anteprima d'interesse: ${f.anteprima || "—"}\n\n` +
      `Messaggio:\n${f.messaggio || "—"}`;
    window.location.href = `mailto:aperlabx@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  const waMsg = `Ciao Aperlab! Sono ${f.nome || "..."}${f.attivita ? ` di ${f.attivita}` : ""}.\n` +
    `Settore: ${f.settore || "—"} · Città: ${f.citta || "—"}\n` +
    `Anteprima d'interesse: ${f.anteprima || "—"}\n` +
    `${f.messaggio ? "Note: " + f.messaggio : ""}`;

  if (sent) {
    return (
      <div className="card" style={{ textAlign: "center", padding: "48px 32px" }}>
        <div style={{ width: 60, height: 60, borderRadius: "50%", background: "var(--lime)", display: "grid", placeItems: "center", margin: "0 auto 20px" }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="#0F1021" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>
        <h3 className="h2" style={{ fontSize: 30 }}>Email pronta, {f.nome.split(" ")[0] || ""}!</h3>
        <p className="lead" style={{ marginInline: "auto", marginTop: 14 }}>
          Si è aperto il tuo client email con il riepilogo già compilato. Controlla e premi "Invia" — ti ricontattiamo a breve.
        </p>
        <div className="btn-row" style={{ justifyContent: "center", marginTop: 26 }}>
          <WaBtn msg={waMsg}>Invia il riepilogo su WhatsApp</WaBtn>
          <Btn variant="btn--ghost" onClick={() => { setF(empty); setSent(false); }}>Nuova richiesta</Btn>
        </div>
      </div>
    );
  }

  const sectors = ["Food / Gastronomia", "Ristorazione", "Beauty / Wellness", "Ospitalità", "Fitness", "Professionista / Artigiano", "Altro"];
  const previews = ["Catalogo & Prodotti", "Prenotazioni & Richieste", "Servizi & Professionisti", "Non so ancora"];

  return (
    <form className="card" onSubmit={submit} style={{ padding: "clamp(24px,3vw,36px)", width: "100%", display: "flex", flexDirection: "column" }} noValidate>
      <div className="form-grid">
        <div className="field">
          <label>Nome *</label>
          <input value={f.nome} onChange={set("nome")} placeholder="Il tuo nome" style={errs.nome ? { borderColor: "var(--pink-deep)" } : {}} />
        </div>
        <div className="field">
          <label>Nome attività *</label>
          <input value={f.attivita} onChange={set("attivita")} placeholder="Es. Bottega Verde" style={errs.attivita ? { borderColor: "var(--pink-deep)" } : {}} />
        </div>
        <div className="field">
          <label>Settore</label>
          <select value={f.settore} onChange={set("settore")}>
            <option value="">Seleziona…</option>
            {sectors.map((s) => <option key={s}>{s}</option>)}
          </select>
        </div>
        <div className="field">
          <label>Città</label>
          <input value={f.citta} onChange={set("citta")} placeholder="Es. Milano" />
        </div>
        <div className="field">
          <label>Telefono / WhatsApp</label>
          <input value={f.telefono} onChange={set("telefono")} placeholder="+39 …" style={errs.telefono ? { borderColor: "var(--pink-deep)" } : {}} />
        </div>
        <div className="field">
          <label>Email</label>
          <input type="email" value={f.email} onChange={set("email")} placeholder="nome@email.it" style={errs.email ? { borderColor: "var(--pink-deep)" } : {}} />
        </div>
        <div className="field">
          <label>Quale anteprima ti interessa?</label>
          <select value={f.anteprima} onChange={set("anteprima")}>
            <option value="">Seleziona…</option>
            {previews.map((s) => <option key={s}>{s}</option>)}
          </select>
        </div>
        <div className="field field--full">
          <label>Messaggio libero</label>
          <textarea value={f.messaggio} onChange={set("messaggio")} placeholder="Raccontaci la tua attività e cosa hai in mente." />
        </div>
      </div>
      {Object.keys(errs).length > 0 && (
        <p style={{ color: "var(--pink-deep)", fontSize: 14, marginTop: 16, fontWeight: 600 }}>
          Compila almeno nome, attività e un contatto (telefono o email).
        </p>
      )}
      <div className="btn-row" style={{ marginTop: 24, marginTop: "auto", paddingTop: 24 }}>
        <Btn arrow>Invia richiesta via email</Btn>
        <span className="muted" style={{ fontSize: 13.5 }}>Si aprirà la tua app email con il messaggio precompilato.</span>
      </div>
    </form>
  );
}

function ContactPage() {
  return (
    <div className="page-enter">
      <section className="hero bg-cream section--tight">
        <div className="wrap" style={{ maxWidth: 920 }}>
          <Reveal><Eyebrow>Contatti</Eyebrow></Reveal>
          <Reveal as="h1" className="display" style={{ marginTop: 20 }}>Hai visto un'anteprima che ti interessa?</Reveal>
          <Reveal as="p" className="lead" style={{ marginTop: 22 }}>
            Raccontaci la tua attività e ti aiuteremo a capire quale soluzione digitale può valorizzarla nel modo più efficace.
          </Reveal>
        </div>
      </section>

      <section className="section bg-paper" style={{ paddingTop: "clamp(40px,5vw,72px)" }}>
        <div className="wrap" style={{ display: "grid", gridTemplateColumns: ".82fr 1.18fr", gap: 48, alignItems: "start" }}>
          <Reveal>
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              <div className="card" style={{ background: "var(--paper)", border: "1px solid rgba(15,16,33,.08)" }}>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="#25D366" aria-hidden="true" style={{ flex: "0 0 auto" }}>
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  <span className="mono" style={{ fontSize: 12, letterSpacing: ".12em", textTransform: "uppercase", color: "var(--gray)", fontWeight: 700 }}>Contattaci via WhatsApp</span>
                </div>
                <h2 className="h3" style={{ marginTop: 14 }}>Il modo più semplice: WhatsApp</h2>
                <p className="lead" style={{ marginTop: 12 }}>
                  Raccontaci la tua attività e indicaci quale soluzione o servizio ha catturato il tuo interesse. Ti risponderemo con i prossimi passi.
                </p>
                <div style={{ marginTop: 22 }}>
                  <WaBtn>Scrivici su WhatsApp</WaBtn>
                </div>
              </div>

              <div className="card" style={{ background: "var(--paper)", border: "1px solid rgba(15,16,33,.08)" }}>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
                  <svg width="22" height="22" viewBox="0 0 48 48" aria-hidden="true" style={{ flex: "0 0 auto" }}>
                    <path fill="#4285F4" d="M44 11.5v25a3.5 3.5 0 0 1-3.5 3.5H37V18.4L24 28.2 11 18.4V40H7.5A3.5 3.5 0 0 1 4 36.5v-25C4 9.6 5.6 8 7.5 8h1.2L24 19.6 39.3 8h1.2c1.9 0 3.5 1.6 3.5 3.5z"/>
                    <path fill="#34A853" d="M11 40V18.4L24 28.2v11.8z"/>
                    <path fill="#FBBC05" d="M37 40V18.4L24 28.2v11.8z"/>
                    <path fill="#EA4335" d="M11 18.4L4 13v-1.5C4 9.6 5.6 8 7.5 8h1.2L24 19.6 39.3 8h1.2c1.9 0 3.5 1.6 3.5 3.5V13l-7 5.4L24 28.2z"/>
                  </svg>
                  <span className="mono" style={{ fontSize: 12, letterSpacing: ".12em", textTransform: "uppercase", color: "var(--gray)", fontWeight: 700 }}>Contattaci via email</span>
                </div>
                <h2 className="h3" style={{ marginTop: 14 }}>Scrivici direttamente da Gmail</h2>
                <p className="lead" style={{ marginTop: 12 }}>
                  Preferisci la mail? Puoi inviarci una richiesta in pochi secondi, già con il nostro indirizzo preimpostato.
                </p>
                <div style={{ marginTop: 18, padding: "12px 16px", borderRadius: 12, background: "var(--pink-soft)", border: "1px solid rgba(15,16,33,.08)", fontFamily: "var(--font-display)", fontSize: 15, fontWeight: 600, letterSpacing: ".01em", wordBreak: "break-all" }}>
                  aperlabx@gmail.com
                </div>
                <div style={{ marginTop: 22 }}>
                  <a
                    href="https://mail.google.com/mail/?view=cm&fs=1&to=aperlabx@gmail.com&su=Richiesta%20informazioni%20Aperlab&body=Ciao%20Aperlab%2C%20ho%20visto%20il%20vostro%20sito%20e%20vorrei%20capire%20come%20potrebbe%20essere%20sviluppato%20il%20sito%20della%20mia%20attività."
                    target="_blank"
                    rel="noopener"
                    className="btn btn--lg"
                    style={{ display: "inline-flex", alignItems: "center", gap: 12 }}>
                    <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true" style={{ flex: "0 0 auto" }}>
                      <path fill="#4285F4" d="M44 11.5v25a3.5 3.5 0 0 1-3.5 3.5H37V18.4L24 28.2 11 18.4V40H7.5A3.5 3.5 0 0 1 4 36.5v-25C4 9.6 5.6 8 7.5 8h1.2L24 19.6 39.3 8h1.2c1.9 0 3.5 1.6 3.5 3.5z"/>
                      <path fill="#34A853" d="M11 40V18.4L24 28.2v11.8z"/>
                      <path fill="#FBBC05" d="M37 40V18.4L24 28.2v11.8z"/>
                      <path fill="#EA4335" d="M11 18.4L4 13v-1.5C4 9.6 5.6 8 7.5 8h1.2L24 19.6 39.3 8h1.2c1.9 0 3.5 1.6 3.5 3.5V13l-7 5.4L24 28.2z"/>
                    </svg>
                    <span>Apri Gmail</span>
                    <Arrow />
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
          <Reveal delay={100} style={{ display: "flex", flexDirection: "column", height: "100%" }}>
            <div style={{ marginBottom: 18 }}>
              <Eyebrow>Oppure compila il form</Eyebrow>
            </div>
            <div style={{ flex: 1, display: "flex" }}>
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

/* ---------------- FAQ ---------------- */
function FaqItem({ q, a, open, onToggle }) {
  return (
    <div className={`faq-item ${open ? "open" : ""}`}>
      <button className="faq-q" onClick={onToggle} aria-expanded={open}>
        {q}
        <svg className="chev" width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M11 5v12M5 11h12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
      </button>
      <div className="faq-a"><p>{a}</p></div>
    </div>
  );
}

function FaqPage() {
  const [open, setOpen] = useState(0);
  return (
    <div className="page-enter">
      <section className="hero bg-pink section--tight">
        <div className="wrap" style={{ maxWidth: 920 }}>
          <Reveal><Eyebrow>FAQ</Eyebrow></Reveal>
          <Reveal as="h1" className="display" style={{ marginTop: 20 }}>Domande frequenti.</Reveal>
          <Reveal as="p" className="lead" style={{ marginTop: 20, color: "var(--ink)", opacity: .82 }}>
            Tutto quello che serve sapere prima di contattarci. Se hai altri dubbi, scrivici pure su WhatsApp.
          </Reveal>
        </div>
      </section>

      <section className="section bg-paper">
        <div className="wrap-tight">
          {window.FAQ.map((item, i) => (
            <FaqItem key={i} q={item.q} a={item.a} open={open === i} onToggle={() => setOpen(open === i ? -1 : i)} />
          ))}
        </div>
      </section>

      <CtaBand
        eyebrow="Ancora dubbi?"
        title="Scrivici e raccontaci la tua attività."
        text="Prima vedi il potenziale, poi decidi se approfondire. Nessun impegno."
        primaryTo="/anteprime"
      />
    </div>
  );
}

/* ---------------- Legal (semplici) ---------------- */
function LegalPage({ kind }) {
  const title = "Privacy Policy";
  const intro = "Questa pagina descrive come Aperlab tratta i dati personali degli utenti che visitano il sito o scelgono di contattarci tramite email o WhatsApp.";
  const blocks = [
    ["Dati trattati", "Il sito non contiene form di contatto, registrazioni o sistemi di pagamento. Raccogliamo solo i dati che l'utente decide di comunicarci volontariamente tramite email o WhatsApp, come nome, attività, recapiti e messaggio. Durante la navigazione possono essere trattati dati tecnici necessari al funzionamento e alla sicurezza del sito."],
    ["Finalità", "I dati vengono utilizzati esclusivamente per rispondere alle richieste, fornire informazioni sui servizi di Aperlab e preparare eventuali anteprime, preventivi o proposte commerciali."],
    ["Cookie e tracciamento", "Il sito non utilizza Google Analytics, Meta Pixel, strumenti pubblicitari o sistemi di profilazione. Possono essere utilizzati solo strumenti tecnici necessari al funzionamento, alla sicurezza e alla corretta visualizzazione del sito."],
    ["Conservazione", "I dati ricevuti tramite email o WhatsApp sono conservati per il tempo necessario a gestire la richiesta e gli eventuali rapporti successivi."],
    ["Diritti", "Puoi richiedere in qualsiasi momento accesso, modifica o cancellazione dei tuoi dati scrivendoci all'indirizzo: aperlabx@gmail.com"],
  ];
  return (
    <div className="page-enter">
      <section className="section bg-cream">
        <div className="wrap-tight">
          <Eyebrow>Documento legale</Eyebrow>
          <h1 className="h1" style={{ marginTop: 16, marginBottom: 18 }}>{title}</h1>
          <p className="lead">{intro}</p>
          <div style={{ marginTop: 32 }}>
            {blocks.map(([h, t], i) => (
              <div key={h} style={{ padding: "26px 0", borderTop: "1px solid rgba(15,16,33,.12)" }}>
                <h2 className="h3" style={{ fontSize: 22 }}>{h}</h2>
                <p className="muted" style={{ marginTop: 10, maxWidth: "70ch" }}>{t}</p>
              </div>
            ))}
          </div>
          <p className="note" style={{ marginTop: 28 }}>
            Aperlab è un progetto digitale indipendente, attualmente non costituito in forma societaria. Questa informativa potrà essere aggiornata in caso di introduzione di nuovi servizi o strumenti di tracciamento.
          </p>
        </div>
      </section>
    </div>
  );
}

Object.assign(window, { ContactPage, FaqPage, LegalPage });
