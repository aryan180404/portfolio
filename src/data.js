// Everything on the page comes from here. Edit freely.
// Facts are taken from the resume + HUL enrollment form. Nothing invented.

export const me = {
  name: 'Aryan Agarwal',
  fullName: 'Aryan Nilesh Agarwal',
  photo: './aryan.jpg',
  college: 'CoEP Technological University, Pune',
  degree: 'B.Tech, Instrumentation & Control',
  year: '2027',
  minor: 'Minor in Economics',
  emailPrimary: 'aryan180404@gmail.com',
  emailCollege: 'agarwalan23.instru@coeptech.ac.in',
  phone: '+91 99670 70224',
  phoneHref: 'tel:+919967070224',
  linkedin: 'https://www.linkedin.com/in/aryan180404',
  github: 'https://github.com/aryan180404',
  languages: 'English, Hindi, Marathi',
}

export const projects = [
  {
    id: 'kelvin',
    name: 'Kelvin Forward',
    logo: './logos/kelvin-forward-mark.svg',
    kind: 'Founder',
    year: '2026 — now',
    shot: './shots/kelvin.jpg',
    oneLiner: 'Tells a boiler operator the steam temperature one to ten minutes before it moves.',
    detail:
      'My startup, grown out of my B.Tech project. Machine learning on the sensors a plant already has, built for the small and mid-sized manufacturers who can’t afford big process-control suites. 14 models benchmarked on 17,000+ unseen readings; the hybrids cut 1, 5 and 10-minute error by 75%, 59% and 37% against persistence. Presented to a panel of six professors; now in customer validation with two industrial clients.',
    tags: ['Python', 'XGBoost', 'LightGBM', 'Next.js'],
    links: [
      { label: 'Live site', href: 'https://kelvin-forward.vercel.app' },
      { label: 'Pitch deck', href: './decks/kelvin-forward-deck.html' },
      { label: 'Code map', href: './maps/kelvin-forward.html' },
    ],
  },
  {
    id: 'voc',
    name: 'Voice of Customer Copilot',
    kind: 'Product',
    year: 'Jul 2026',
    shot: './shots/voc.jpg',
    oneLiner: 'Turns thousands of messy reviews, tickets and posts into the five problems a PM should fix first.',
    detail:
      'An LLM copilot that cleans and unifies app reviews, support tickets and surveys, then clusters and sentiment-scores 1,000+ entries to rank pain points and the top five churn drivers. The model labels; code counts; every insight links back to real reviews. Cut analysis to about 10 minutes on free-tier Gemini.',
    tags: ['Python', 'Gemini', 'Streamlit', 'Product'],
    links: [
      { label: 'Live app', href: 'https://aryansvoc.streamlit.app' },
      { label: 'Deck', href: './decks/voc-copilot-deck.html' },
      { label: 'Code map', href: './maps/voc-copilot.html' },
    ],
  },
  {
    id: 'movie',
    name: 'Movie Recommender',
    kind: 'Machine learning',
    year: 'Side project',
    shot: './shots/movie.jpg',
    oneLiner: 'Name a film you love and get five more that share its genres, cast, crew and DNA.',
    detail:
      'Content-based recommendations over the TMDB 5000 dataset. Bag-of-Words vectorisation turns metadata into a feature matrix; nearest neighbours with cosine similarity pick the five closest films. Runs fully static on GitHub Pages.',
    tags: ['NLP', 'scikit-learn', 'Pandas'],
    links: [
      { label: 'Live demo', href: 'https://aryan180404.github.io/Movie-recommender' },
      { label: 'GitHub', href: 'https://github.com/aryan180404/Movie-recommender' },
      { label: 'Code map', href: './maps/movie-recommender.html' },
    ],
  },
  {
    id: 'medsetu',
    name: 'Medsetu',
    kind: 'Hardware',
    year: '2025 — 26',
    shot: './shots/medsetu.jpg',
    oneLiner: 'An Arduino ECG that streams a clean heartbeat to the browser in real time.',
    detail:
      'An ECG prototype with careful grounding for high-fidelity ADC readings, EMF/EMI mitigation, a Python script streaming live data over the web, and a frontend for doctors and patients. Tested with 8–10 users.',
    tags: ['Arduino', 'Python', 'Electronics', 'Web'],
    links: [
      { label: 'Live dashboard', href: 'https://medsetuecg.vercel.app/dashboard.html' },
      { label: 'GitHub', href: 'https://github.com/aryan180404/MEDSETU' },
      { label: 'Code map', href: './maps/medsetu.html' },
    ],
  },
  {
    id: 'boiler',
    name: 'Boiler Outlet Forecaster',
    kind: 'Machine learning',
    year: 'B.Tech project',
    shot: './shots/boiler.jpg',
    oneLiner: 'Where Kelvin Forward started: a plant diagram that predicts its own steam.',
    detail:
      'The B.Tech project behind the startup. Forecasts boiler outlet steam temperature 1, 5 and 10 minutes ahead from 35 sensor readings of a coal-fired boiler, comparing persistence, linear regression, random forest, XGBoost and LightGBM.',
    tags: ['Forecasting', 'Python', 'JavaScript'],
    links: [{ label: 'GitHub', href: 'https://github.com/aryan180404/Boiler_ese' }],
  },
]

export const smallerWork = [
  { name: 'Layoffs data cleaning', what: 'SQL pipeline: de-duplication and standardisation of a global layoffs dataset.', href: 'https://github.com/aryan180404/Data_Cleaning' },
  { name: 'Sales dashboard', what: 'Tableau dashboard over orders, customers, products and locations.', href: 'https://github.com/aryan180404/Dashboard' },
]

export const experience = [
  {
    org: 'EY (Ernst & Young)',
    logo: './logos/ey.svg',
    role: 'Technical Consultant',
    when: 'May — Jul 2026',
    what: 'Gathered requirements from finance teams across five business units of Tata Capital, wrote business requirement documents and tested the Tagetik planning platform. The gaps I found saved 30+ hours a week.',
  },
  {
    org: 'Tech Mahindra',
    logo: './logos/techm.png',
    role: 'Python Intern',
    when: 'May — Jul 2025',
    what: 'Wrote Python scripts automating customer registration across four core services for Rogers Communications, Canada, taking manual data entry off a ten-person operations team.',
  },
  {
    org: 'ISRO',
    logo: './logos/isro.svg',
    role: 'Research Intern',
    when: 'Jun — Aug 2025',
    what: 'Indian Space Lab programme taught by ISRO, DRDO and NASA faculty. Supported a disaster-response drone project with CAD modelling, weight distribution and structural feasibility planning.',
  },
  {
    org: 'Tech Mahindra Foundation',
    logo: './logos/techm-foundation.png',
    role: 'Team Lead Intern',
    when: 'Apr — May 2024',
    what: 'Led three volunteers across education and welfare drives that reached 100+ children.',
  },
]

export const leadership = [
  {
    title: 'Convenor, COEP English Debate Society',
    when: 'Apr 2025 — Apr 2026',
    what: 'Ran the flagship debate competition with a 30+ person team. Raised ₹2 lakh: revenue up 100%, profit up 200%, outside participation up 200%.',
  },
  { title: 'Member, COEP Octane Racing', when: 'Formula Student', what: 'Electrical systems of the race car, mainly the Battery Management System.' },
  { title: 'Media Head, COEP ICESA', when: 'Instrumentation society', what: 'Headed publication and documentation of the society’s events.' },
]

export const awards = [
  { what: 'Symbiosis MUN ’26, Rank 3', where: 'Symbiosis School of Economics, Pune', when: 'Jan 2026' },
  { what: 'CEO Challenge, Runner-up', where: 'PSF, COEP', when: 'Jan 2026' },
  { what: 'Court Clashers, Finalist', where: 'PSF, COEP', when: 'Jan 2026' },
  { what: 'Novice Runner-up', where: 'GLC National Debate Championship, Mumbai', when: 'Mar 2025' },
]

// Add a verifyUrl to make a certificate clickable.
export const certificates = [
  { name: 'Product Management', issuer: 'IBM · Coursera', when: 'June 2026', logo: './logos/ibm.png', verifyUrl: '' },
  { name: 'Google Data Analytics', issuer: 'Google · Coursera', when: 'June 2026', logo: './logos/google.png', verifyUrl: '' },
]

export const skills = ['Python', 'SQL', 'Machine learning', 'Pandas', 'NumPy', 'scikit-learn', 'Tableau', 'Data cleaning', 'Jupyter', 'MS Office', 'Stakeholder management', 'Client communication', 'Project management']
