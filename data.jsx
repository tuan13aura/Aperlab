/* ============================================================
   APERLAB — content data (anteprime, servizi, metodo, progetti, faq)
   ============================================================ */

/* Tipologie di sito (generiche) — usate in Home e nella pagina Anteprime */
const PREVIEWS = [
  {
    id: "catalogo",
    kicker: "01",
    title: "Catalogo & Prodotti",
    desc: "Mostra prodotti, categorie, immagini e prezzi in modo chiaro, moderno e facilmente consultabile.",
    features: ["Prodotti", "Categorie", "Immagini", "Prezzi", "Mobile-first"],
    accent: "var(--pink)",
    img: "assets/anteprima-catalogo.png",
    fit: "cover",
  },
  {
    id: "prenotazioni",
    kicker: "02",
    title: "Prenotazioni & Richieste",
    desc: "Ricevi ordini, appuntamenti, prenotazioni e contatti attraverso un percorso semplice e immediato.",
    features: ["Ordini", "Appuntamenti", "Prenotazioni", "Form", "WhatsApp"],
    accent: "var(--pink-soft)",
    img: "assets/anteprima-prenotazioni.png",
    fit: "cover",
  },
  {
    id: "servizi",
    kicker: "03",
    title: "Servizi & Professionisti",
    desc: "Presenta servizi, listini, risultati, recensioni e portfolio con un'immagine più professionale.",
    features: ["Servizi", "Listini", "Recensioni", "Portfolio", "Risultati"],
    accent: "var(--pink-deep)",
    img: "assets/anteprima-servizi.png",
    fit: "cover",
  },
];

const SERVICES = [
  {
    id: "siti",
    name: "Siti web professionali",
    benefit: "Siti moderni, chiari e responsive, pensati per presentare l'attività in modo professionale e rendere semplice il contatto con il cliente.",
    include: ["Home", "Pagine servizi", "Gallery", "Contatti rapidi", "WhatsApp", "Maps", "Form", "Pubblicazione"],
    cta: "Richiedi informazioni", to: "/contatti",
  },
  {
    id: "cataloghi",
    name: "Cataloghi e menu digitali",
    benefit: "Prodotti, menu, prezzi e servizi consultabili in modo ordinato direttamente da smartphone.",
    include: ["Categorie", "Schede prodotto", "Foto", "Prezzi", "Filtri", "Richiesta WhatsApp"],
    cta: "Richiedi informazioni", to: "/contatti",
  },
  {
    id: "ordini",
    name: "Ordini e prenotazioni",
    benefit: "Il sito diventa uno strumento per ricevere ordini, prenotazioni, appuntamenti o richieste di preventivo.",
    include: ["Ordine rapido", "Prenotazione tavolo", "Appuntamenti", "Form", "WhatsApp"],
    cta: "Richiedi informazioni", to: "/contatti",
  },];

const METHOD = [
  { n: "01", t: "Esplori le anteprime", d: "Scopri alcune delle soluzioni che possiamo realizzare — cataloghi, prenotazioni, servizi e molto altro — e individua quella più vicina alle esigenze della tua attività." },
  { n: "02", t: "Ci racconti la tua attività", d: "Dopo aver visto le anteprime, ci scrivi per raccontare settore, obiettivi e cosa vorresti migliorare." },
  { n: "03", t: "Analizziamo obiettivi e possibilità", d: "Studiamo la presenza online attuale, i servizi da valorizzare e le azioni che il sito dovrebbe generare." },
  { n: "04", t: "Prepariamo una proposta su misura", d: "Definiamo struttura, funzionalità, stile, tempi e costi del progetto in modo chiaro." },
  { n: "05", t: "Progettiamo e sviluppiamo il sito", d: "Realizziamo il sito con attenzione a design, mobile, velocità, contenuti e facilità d'uso." },
  { n: "06", t: "Lo pubblichiamo online", d: "Seguiamo dominio, hosting, WhatsApp, Google Maps, email e configurazioni essenziali." },
];

const PROJECTS = [
  {
    sector: "Food Retail", name: "Bottega Verde",
    goal: "Trasformare un fruttivendolo di quartiere in un punto di riferimento riconoscibile anche online.",
    solution: "Catalogo digitale per categorie con foto ad alto impatto e ordine diretto su WhatsApp.",
    features: ["Catalogo", "Categorie", "Ordine WhatsApp", "Maps"],
    result: "Percorso di contatto immediato e immagine più curata e professionale.",
    to: "/contatti",
  },
  {
    sector: "Ristorazione", name: "Trattoria Lumière",
    goal: "Sostituire il menu cartaceo con uno strumento digitale che porti a prenotazioni e ordini.",
    solution: "Menu digitale diviso per categorie, piatti in evidenza e prenotazione tavolo integrata.",
    features: ["Menu digitale", "Prenotazione", "Gallery", "Recensioni"],
    result: "Prenotazioni e ordini gestiti dal sito, meno telefonate disordinate.",
    to: "/contatti",
  },
  {
    sector: "Beauty / Wellness", name: "Studio Aura",
    goal: "Dare a un centro estetico un'immagine elegante e un sistema semplice per gli appuntamenti.",
    solution: "Hero elegante, listino chiaro, gallery prima/dopo e richiesta appuntamento rapida.",
    features: ["Servizi", "Listino", "Appuntamenti", "Recensioni"],
    result: "Richieste di appuntamento più qualificate e percezione premium del brand.",
    to: "/contatti",
  },
  {
    sector: "Ospitalità", name: "Casa Riva",
    goal: "Valorizzare un piccolo B&B e semplificare le richieste di disponibilità.",
    solution: "Concept con camere, esperienza del territorio, gallery e richiesta diretta.",
    features: ["Camere", "Gallery", "Richiesta", "Maps"],
    result: "Concept preliminare pensato per aumentare le richieste dirette.",
    to: "/contatti", concept: true,
  },
];

const FAQ = [
  { q: "Le anteprime sono siti già pronti?", a: "No. Sono esempi dimostrativi pensati per mostrare possibili direzioni. Ogni sito finale viene personalizzato in base all'attività." },
  { q: "Posso richiedere un'anteprima per il mio settore?", a: "Sì. Dopo una breve analisi possiamo valutare una direzione adatta alla tua attività." },
  { q: "Sono obbligato ad acquistare il sito?", a: "No. Puoi contattarci per capire possibilità, costi e tempi senza impegno." },
  { q: "Quanto costa un sito?", a: "Dipende da struttura, funzionalità e livello di personalizzazione. Dopo una prima analisi prepariamo una proposta chiara." },
  { q: "Vi occupate anche della pubblicazione?", a: "Sì. Possiamo seguire dominio, hosting, email, WhatsApp, Google Maps e pubblicazione online." },
  { q: "Il sito sarà ottimizzato per smartphone?", a: "Sì. Ogni progetto viene sviluppato con attenzione alla navigazione da telefono." },
  { q: "Lavorate solo con attività locali?", a: "Il focus principale sono attività locali, negozi, ristoranti, professionisti e piccole imprese, ma si possono valutare anche progetti più ampi." },
];

Object.assign(window, { PREVIEWS, SERVICES, METHOD, PROJECTS, FAQ });
