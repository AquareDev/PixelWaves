/* =============================================================
   Pixel Waves — IT Consulting
   js/i18n.js  —  Translations (ES / EN)
   ============================================================= */

const translations = {
  es: {
    /* Navigation */
    "nav.services": "Servicios",
    "nav.about":    "Nosotros",
    "nav.contact":  "Contacto",
    "nav.cta":      "Solicitar cotización",

    /* Hero */
    "hero.tag":          "Consultoría de Tecnología",
    "hero.h1":           'Soluciones TI que <em>impulsan</em> tu negocio',
    "hero.p":            "Somos un equipo de profesionales especializados en tecnología. Desde soporte técnico hasta desarrollo de software e inteligencia artificial — todo en un solo lugar.",
    "hero.btn1":         "Ver servicios",
    "hero.btn2":         "Hablar con un experto",
    "hero.card1.label":  "Soporte técnico",
    "hero.card1.desc":   "Atención rápida para problemas del día a día o fallas complejas.",
    "hero.card2.label":  "Videovigilancia",
    "hero.card2.desc":   "Instalación y configuración de cámaras con acceso remoto.",
    "hero.card3.label":  "Automatización inteligente",
    "hero.card3.desc":   "Ahorra tiempo con bots personalizados y modelos de inteligencia artificial aplicados a tu negocio.",

    /* Services section */
    "services.label": "Lo que hacemos",
    "services.title": "Servicios pensados para cada necesidad",
    "services.sub":   "Desde el mantenimiento básico hasta proyectos de desarrollo complejos, contamos con el perfil técnico para acompañarte en cada etapa.",

    /* Filter pills */
    "filter.all":      "Todos",
    "filter.support":  "Soporte",
    "filter.security": "Seguridad",
    "filter.networks": "Redes",
    "filter.dev":      "Desarrollo",
    "filter.ai":       "IA & Automatización",

    /* Service cards */
    "svc.s1.name":  "Soporte Técnico Nivel 1 y 2",
    "svc.s1.desc":  "Atención a fallas del día a día: software que no abre, errores del sistema, configuraciones, impresoras y periféricos. Respuesta rápida presencial o remota.",
    "svc.s2.name":  "Diagnóstico y Reparación de Hardware",
    "svc.s2.desc":  "Identificamos el problema exacto en tu equipo: placa, fuente, memoria, almacenamiento. Sin diagnósticos ambiguos, con presupuesto claro.",
    "svc.s3.name":  "Armado y Configuración de PCs",
    "svc.s3.desc":  "Ensamblamos tu equipo a medida, desde estaciones de trabajo profesionales hasta builds gaming de alto rendimiento. Optimizados desde el primer arranque.",
    "svc.s4.name":  "Soporte en Herramientas de Productividad",
    "svc.s4.desc":  "Capacitación y soporte avanzado en Excel, Word, PowerPoint y Microsoft 365. Optimiza el flujo de trabajo de tu equipo desde hoy.",
    "svc.s5.name":  "Instalación de Sistemas de Videovigilancia",
    "svc.s5.desc":  "Diseñamos y montamos tu sistema CCTV o IP desde cero. Cobertura interior y exterior, con acceso remoto desde tu teléfono en tiempo real.",
    "svc.s6.name":  "Mantenimiento de Cámaras de Seguridad",
    "svc.s6.desc":  "Actualizamos firmware, ajustamos ángulos, revisamos grabaciones y optimizamos el almacenamiento. Tu sistema siempre funcionando al máximo.",
    "svc.s7.name":  "Instalación y Configuración de Redes",
    "svc.s7.desc":  "Cableado estructurado, routers, switches y puntos de acceso Wi-Fi para hogares, oficinas y negocios. Redes estables y bien planeadas.",
    "svc.s8.name":  "Acceso Remoto Seguro",
    "svc.s8.desc":  "Configuramos SSH y acceso seguro a tus servidores y sistemas internos. Gestiona tu infraestructura desde cualquier lugar con total seguridad.",
    "svc.s9.name":  "Desarrollo de Páginas Web",
    "svc.s9.desc":  "Sitios modernos, rápidos y optimizados para móvil. Desde landing pages hasta portales con funcionalidades avanzadas. Diseño profesional incluido.",
    "svc.s10.name": "Sistemas a Medida",
    "svc.s10.desc": "Aplicaciones de escritorio y web para tu negocio: punto de venta, control de inventario, catálogos digitales. Soluciones que se adaptan a ti, no al revés.",
    "svc.s11.name": "Integración con APIs",
    "svc.s11.desc": "Conectamos tu sistema con servicios externos: pasarelas de pago, WhatsApp Business, plataformas de envío, ERPs y más. Todo integrado sin fricciones.",
    "svc.s12.name": "Bots de Automatización",
    "svc.s12.desc": "Automatizamos tareas repetitivas: respuestas automáticas, reportes, notificaciones, captura de datos. Ahorra horas de trabajo desde el día uno.",
    "svc.s13.name": "Visión por Computadora con IA",
    "svc.s13.desc": "Desarrollamos modelos de redes convolucionales para reconocimiento de imágenes, conteo de objetos o control de calidad visual automatizado.",
    "svc.s14.name": "Análisis de Datos",
    "svc.s14.desc": "Transformamos tus datos en dashboards e informes accionables. Toma decisiones basadas en información real, no en suposiciones.",
    "svc.s15.name": "Assets y Modelado 3D",
    "svc.s15.desc": "Creamos modelos 3D para videojuegos, renders de producto, arquitectura o prototipado visual. Arte digital de alta calidad a tu medida.",

    /* About / Why us */
    "about.label":      "Por qué elegirnos",
    "about.title":      "Profesionales reales, soluciones reales",
    "about.sub":        "No somos un intermediario. Somos el equipo técnico que ejecuta cada proyecto de principio a fin.",
    "about.imgcaption": "Construyendo soluciones juntos",
    "about.r1.title":   "Equipo multidisciplinario",
    "about.r1.text":    "Cubrimos desde soporte básico hasta inteligencia artificial. Un solo proveedor para todas tus necesidades tecnológicas.",
    "about.r2.title":   "Atención directa y personalizada",
    "about.r2.text":    "Hablas siempre con quien realiza el trabajo. Sin call centers, sin intermediarios, sin respuestas genéricas.",
    "about.r3.title":   "Presupuestos claros",
    "about.r3.text":    "Cotizamos con transparencia. Sabrás exactamente qué incluye el servicio antes de aprobar cualquier trabajo.",
    "about.r4.title":   "Disponibilidad real",
    "about.r4.text":    "Atendemos de manera presencial y remota. Nos adaptamos a tus tiempos y urgencias con rapidez de respuesta.",

    /* Contact */
    "contact.label":          "Contacto",
    "contact.title":          "¿Listo para empezar?",
    "contact.sub":            "Cuéntanos tu proyecto o problema. Te respondemos en menos de 24 horas con una propuesta concreta.",
    "contact.email.label":    "Correo electrónico",
    "contact.location.label": "Ubicación",
    "contact.location.value": "Aguascalientes, México · Servicio local y remoto",

    /* Form */
    "form.title":       "Solicitar cotización",
    "form.sub":         "Sin compromisos. Te respondemos con claridad.",
    "form.name":        "Nombre",
    "form.company":     "Empresa (opcional)",
    "form.email":       "Correo electrónico",
    "form.service":     "Servicio de interés",
    "form.message":     "Cuéntanos más",
    "form.submit":      "Enviar solicitud",
    "form.sending":     "Enviando...",
    "form.other":       "Otro",
    "form.ph.name":     "Tu nombre",
    "form.ph.company":  "Nombre de tu empresa",
    "form.ph.service":  "Selecciona un servicio",
    "form.ph.message":  "Describe brevemente tu necesidad o problema...",
    "form.success":     "✅ ¡Mensaje enviado! Te contactamos en menos de 24 horas.",
    "form.error":       "❌ Ocurrió un error. Intenta escribirnos directo a contactopixelwaves@gmail.com",

    /* Footer */
    "footer.copy": "© 2025 Pixel Waves — Consultoría de TI. Aguascalientes, México."
  },

  en: {
    /* Navigation */
    "nav.services": "Services",
    "nav.about":    "About",
    "nav.contact":  "Contact",
    "nav.cta":      "Request a quote",

    /* Hero */
    "hero.tag":          "IT Consulting",
    "hero.h1":           'IT solutions that <em>power</em> your business',
    "hero.p":            "We are a team of technology professionals. From technical support to software development and artificial intelligence — all in one place.",
    "hero.btn1":         "View services",
    "hero.btn2":         "Talk to an expert",
    "hero.card1.label":  "Technical support",
    "hero.card1.desc":   "Fast response for everyday issues or complex failures.",
    "hero.card2.label":  "Video surveillance",
    "hero.card2.desc":   "Camera installation and configuration with remote access.",
    "hero.card3.label":  "Intelligent automation",
    "hero.card3.desc":   "Save time with custom bots and AI models applied to your business.",

    /* Services section */
    "services.label": "What we do",
    "services.title": "Services designed for every need",
    "services.sub":   "From basic maintenance to complex development projects, we have the technical expertise to guide you every step of the way.",

    /* Filter pills */
    "filter.all":      "All",
    "filter.support":  "Support",
    "filter.security": "Security",
    "filter.networks": "Networks",
    "filter.dev":      "Development",
    "filter.ai":       "AI & Automation",

    /* Service cards */
    "svc.s1.name":  "Technical Support Level 1 & 2",
    "svc.s1.desc":  "Day-to-day failure response: software that won't open, system errors, configurations, printers and peripherals. Fast on-site or remote response.",
    "svc.s2.name":  "Hardware Diagnosis & Repair",
    "svc.s2.desc":  "We pinpoint the exact problem in your device: motherboard, power supply, memory, storage. No vague diagnoses — clear pricing upfront.",
    "svc.s3.name":  "PC Assembly & Configuration",
    "svc.s3.desc":  "We build your computer to spec, from professional workstations to high-performance gaming rigs. Optimized from first boot.",
    "svc.s4.name":  "Productivity Tools Support",
    "svc.s4.desc":  "Advanced training and support in Excel, Word, PowerPoint and Microsoft 365. Optimize your team's workflow starting today.",
    "svc.s5.name":  "Video Surveillance System Installation",
    "svc.s5.desc":  "We design and set up your CCTV or IP system from scratch. Indoor and outdoor coverage, with real-time remote access from your phone.",
    "svc.s6.name":  "Security Camera Maintenance",
    "svc.s6.desc":  "We update firmware, adjust angles, review recordings and optimize storage. Your system always running at peak performance.",
    "svc.s7.name":  "Network Installation & Configuration",
    "svc.s7.desc":  "Structured cabling, routers, switches and Wi-Fi access points for homes, offices and businesses. Stable, well-planned networks.",
    "svc.s8.name":  "Secure Remote Access",
    "svc.s8.desc":  "We configure SSH and secure access to your servers and internal systems. Manage your infrastructure from anywhere, safely.",
    "svc.s9.name":  "Web Development",
    "svc.s9.desc":  "Modern, fast, mobile-optimized websites. From landing pages to advanced portals. Professional design included.",
    "svc.s10.name": "Custom Software Systems",
    "svc.s10.desc": "Desktop and web applications for your business: POS, inventory control, digital catalogs. Solutions that adapt to you, not the other way around.",
    "svc.s11.name": "API Integration",
    "svc.s11.desc": "We connect your system to external services: payment gateways, WhatsApp Business, shipping platforms, ERPs and more. Seamlessly integrated.",
    "svc.s12.name": "Automation Bots",
    "svc.s12.desc": "We automate repetitive tasks: automatic replies, reports, notifications, data capture. Save hours of work from day one.",
    "svc.s13.name": "Computer Vision with AI",
    "svc.s13.desc": "We develop convolutional network models for image recognition, object counting, or automated visual quality control.",
    "svc.s14.name": "Data Analysis",
    "svc.s14.desc": "We turn your data into actionable dashboards and reports. Make decisions based on real information, not guesswork.",
    "svc.s15.name": "3D Assets & Modeling",
    "svc.s15.desc": "We create 3D models for video games, product renders, architecture or visual prototyping. High-quality digital art on demand.",

    /* About / Why us */
    "about.label":      "Why choose us",
    "about.title":      "Real professionals, real solutions",
    "about.sub":        "We're not a middleman. We are the technical team that executes every project from start to finish.",
    "about.imgcaption": "Building solutions together",
    "about.r1.title":   "Multidisciplinary team",
    "about.r1.text":    "We cover everything from basic support to artificial intelligence. One provider for all your technology needs.",
    "about.r2.title":   "Direct, personalized attention",
    "about.r2.text":    "You always talk to the person doing the work. No call centers, no middlemen, no generic responses.",
    "about.r3.title":   "Transparent pricing",
    "about.r3.text":    "We quote with full transparency. You'll know exactly what the service includes before approving any work.",
    "about.r4.title":   "Real availability",
    "about.r4.text":    "We provide on-site and remote service. We adapt to your schedule and urgencies with fast response times.",

    /* Contact */
    "contact.label":          "Contact",
    "contact.title":          "Ready to get started?",
    "contact.sub":            "Tell us about your project or problem. We respond within 24 hours with a concrete proposal.",
    "contact.email.label":    "Email",
    "contact.location.label": "Location",
    "contact.location.value": "Aguascalientes, Mexico · Local & remote service",

    /* Form */
    "form.title":       "Request a quote",
    "form.sub":         "No commitment. We'll respond clearly.",
    "form.name":        "Name",
    "form.company":     "Company (optional)",
    "form.email":       "Email",
    "form.service":     "Service of interest",
    "form.message":     "Tell us more",
    "form.submit":      "Send request",
    "form.sending":     "Sending...",
    "form.other":       "Other",
    "form.ph.name":     "Your name",
    "form.ph.company":  "Your company name",
    "form.ph.service":  "Select a service",
    "form.ph.message":  "Briefly describe your need or problem...",
    "form.success":     "✅ Message sent! We'll be in touch within 24 hours.",
    "form.error":       "❌ Something went wrong. Please email us directly at contactopixelwaves@gmail.com",

    /* Footer */
    "footer.copy": "© 2025 Pixel Waves — IT Consulting. Aguascalientes, Mexico."
  }
};

let currentLang = 'es';

/** Apply all translations to the DOM */
function applyLang(lang) {
  const t = translations[lang];

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key] !== undefined) el.textContent = t[key];
  });

  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const key = el.getAttribute('data-i18n-html');
    if (t[key] !== undefined) el.innerHTML = t[key];
  });

  document.querySelectorAll('[data-i18n-ph]').forEach(el => {
    const key = el.getAttribute('data-i18n-ph');
    if (t[key] !== undefined) el.placeholder = t[key];
  });

  document.documentElement.lang = lang;
}

/** Toggle between ES ↔ EN */
function toggleLang() {
  currentLang = currentLang === 'es' ? 'en' : 'es';

  const flag  = document.getElementById('langFlag');
  const label = document.getElementById('langLabel');

  if (currentLang === 'en') {
    flag.textContent  = '🇲🇽';
    label.textContent = 'ES';
  } else {
    flag.textContent  = '🇺🇸';
    label.textContent = 'EN';
  }

  applyLang(currentLang);
}
