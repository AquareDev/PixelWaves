/* =============================================================
   Pixel Waves — Gamer Division
   prearmados/js/prearmados.js
   Catálogo de PCs Prearmadas — lógica, datos y EmailJS
   ============================================================= */

/* =============================================================
   EMAILJS CONFIG
   ============================================================= */
const EMAILJS_SERVICE_ID  = 'service_jscpnwp';
const EMAILJS_TEMPLATE_ID = 'template_p0ixk7h';
const EMAILJS_PUBLIC_KEY  = 'v5tGCGDwUVwLMGb1D';

/* =============================================================
   CATÁLOGO DE PCS PREARMADAS
   ============================================================= */
const prebuilts = [
  {
    id:      'pb-entry-01',
    name:    'Phantom Entry X',
    tagline: 'Tu primera PC gamer, sin compromisos.',
    emoji:   '🖥️',
    tier:    'entry',
    use:     ['gaming'],
    specs: [
      { icon: '🔲', label: 'CPU',     val: 'AMD Ryzen 5 8600G (Gráficos integrados)' },
      { icon: '💾', label: 'RAM',     val: '16GB DDR5 5600MHz' },
      { icon: '💿', label: 'SSD',     val: '500GB NVMe PCIe 3.0' },
      { icon: '🔌', label: 'Mobo',    val: 'MSI Pro B650-P WiFi (AM5)' },
      { icon: '⚡', label: 'PSU',     val: '550W 80+ Gold' },
      { icon: '🗜', label: 'Case',    val: 'NZXT H510 Flow' },
      { icon: '❄️', label: 'Cooling', val: 'Cooler Master Hyper 212' },
    ],
    price: 11900,
    note:  'Sin GPU dedicada — ideal para eSports y gaming casual 1080p.',
  },
  {
    id:      'pb-entry-02',
    name:    'Nova Strike 3060',
    tagline: 'Gaming 1080p fluidísimo con RTX.',
    emoji:   '🚀',
    tier:    'entry',
    use:     ['gaming'],
    specs: [
      { icon: '🔲', label: 'CPU',  val: 'Intel Core i5-14400F' },
      { icon: '🖥',  label: 'GPU',  val: 'NVIDIA GeForce RTX 3060 12GB' },
      { icon: '💾', label: 'RAM',  val: '16GB DDR4 3600MHz (2×8GB)' },
      { icon: '💿', label: 'SSD',  val: '1TB NVMe PCIe 4.0' },
      { icon: '🔌', label: 'Mobo', val: 'MSI Pro B660-A DDR4 (LGA1700)' },
      { icon: '⚡', label: 'PSU',  val: '650W 80+ Gold' },
      { icon: '🗜', label: 'Case', val: 'Corsair 4000D Airflow' },
    ],
    price: 17800,
    note:  'Alto rendimiento en 1080p. 60–144 FPS garantizados en AAA actuales.',
  },
  {
    id:      'pb-mid-01',
    name:    'Vortex Mid 9060',
    tagline: 'El sweet spot entre precio y potencia.',
    emoji:   '🌀',
    tier:    'mid',
    use:     ['gaming', 'streaming'],
    specs: [
      { icon: '🔲', label: 'CPU',     val: 'AMD Ryzen 5 9600X' },
      { icon: '🖥',  label: 'GPU',     val: 'AMD Radeon RX 9060 XT 16GB' },
      { icon: '💾', label: 'RAM',     val: '32GB DDR5 6000MHz (2×16GB)' },
      { icon: '💿', label: 'SSD',     val: '1TB NVMe PCIe 4.0' },
      { icon: '🔌', label: 'Mobo',    val: 'MSI Pro B650-P WiFi (AM5)' },
      { icon: '⚡', label: 'PSU',     val: '750W 80+ Gold' },
      { icon: '🗜', label: 'Case',    val: 'Fractal Meshify 2 Compact' },
      { icon: '❄️', label: 'Cooling', val: 'Corsair H100i Elite 240mm AIO' },
    ],
    price: 25500,
    note:  '1440p ultra con +100 FPS. Listo para streaming simultáneo.',
  },
  {
    id:      'pb-mid-02',
    name:    'Apex Intel RTX 5060',
    tagline: 'Intel Core Ultra + NVIDIA RTX 5060 Ti.',
    emoji:   '⚡',
    tier:    'mid',
    use:     ['gaming'],
    specs: [
      { icon: '🔲', label: 'CPU',     val: 'Intel Core Ultra 5 250K' },
      { icon: '🖥',  label: 'GPU',     val: 'NVIDIA GeForce RTX 5060 Ti 16GB' },
      { icon: '💾', label: 'RAM',     val: '32GB DDR5 5600MHz (2×16GB)' },
      { icon: '💿', label: 'SSD',     val: '1TB NVMe PCIe 4.0 + 2TB HDD' },
      { icon: '🔌', label: 'Mobo',    val: 'ASUS ROG Strix Z690-F (LGA1851)' },
      { icon: '⚡', label: 'PSU',     val: '850W 80+ Gold' },
      { icon: '🗜', label: 'Case',    val: 'NZXT H7 Flow' },
      { icon: '❄️', label: 'Cooling', val: 'Corsair H150i Elite 360mm AIO' },
    ],
    price: 31200,
    note:  'Frame generation DLSS 4 incluido. Domina 1440p y toca 4K.',
  },
  {
    id:      'pb-high-01',
    name:    'Eclipse 7800X3D',
    tagline: 'El rey del gaming con 3D V-Cache.',
    emoji:   '🌑',
    tier:    'high',
    use:     ['gaming'],
    specs: [
      { icon: '🔲', label: 'CPU',     val: 'AMD Ryzen 7 9800X3D' },
      { icon: '🖥',  label: 'GPU',     val: 'NVIDIA GeForce RTX 5070 12GB' },
      { icon: '💾', label: 'RAM',     val: '32GB DDR5 6000MHz (2×16GB)' },
      { icon: '💿', label: 'SSD',     val: '2TB NVMe PCIe 4.0 Samsung 990 Pro' },
      { icon: '🔌', label: 'Mobo',    val: 'ASUS ROG Strix X670E-F (AM5)' },
      { icon: '⚡', label: 'PSU',     val: '850W 80+ Gold Modular' },
      { icon: '🗜', label: 'Case',    val: 'Lian Li PC-O11 Dynamic EVO' },
      { icon: '❄️', label: 'Cooling', val: 'Lian Li GALAHAD 360mm ARGB AIO' },
    ],
    price: 42800,
    note:  'Mejor CPU gaming del mundo para juegos con motor 3D. 4K 60+ FPS garantizados.',
  },
  {
    id:      'pb-high-02',
    name:    'Nebula Streaming Pro',
    tagline: 'Graba, transmite y juega sin sacrificios.',
    emoji:   '📡',
    tier:    'high',
    use:     ['gaming', 'streaming', 'workstation'],
    specs: [
      { icon: '🔲', label: 'CPU',     val: 'Intel Core Ultra 7 265K' },
      { icon: '🖥',  label: 'GPU',     val: 'NVIDIA GeForce RTX 5070 Ti 16GB' },
      { icon: '💾', label: 'RAM',     val: '64GB DDR5 5600MHz (4×16GB)' },
      { icon: '💿', label: 'SSD',     val: '2TB NVMe PCIe 4.0 + 4TB HDD Seagate' },
      { icon: '🔌', label: 'Mobo',    val: 'ASUS ROG Maximus Z790 Hero (LGA1851)' },
      { icon: '⚡', label: 'PSU',     val: '1000W 80+ Gold Modular' },
      { icon: '🗜', label: 'Case',    val: 'Phanteks Eclipse P600S Full-ATX' },
      { icon: '❄️', label: 'Cooling', val: 'EK-AIO 360 D-RGB Premium' },
    ],
    price: 59500,
    note:  'OBS, After Effects, DaVinci Resolve y gaming 4K Ultra sin sudar.',
  },
  {
    id:      'pb-ultra-01',
    name:    'Titan Ultra 9950X3D',
    tagline: 'Sin límites. Punto.',
    emoji:   '👑',
    tier:    'ultra',
    use:     ['gaming', 'workstation'],
    specs: [
      { icon: '🔲', label: 'CPU',     val: 'AMD Ryzen 9 9950X3D (16C/32T)' },
      { icon: '🖥',  label: 'GPU',     val: 'NVIDIA GeForce RTX 5080 16GB' },
      { icon: '💾', label: 'RAM',     val: '64GB DDR5 6000MHz G.Skill Trident Z5' },
      { icon: '💿', label: 'SSD',     val: '4TB NVMe PCIe 4.0 Samsung 990 Pro' },
      { icon: '🔌', label: 'Mobo',    val: 'Gigabyte AORUS X670E Master (AM5)' },
      { icon: '⚡', label: 'PSU',     val: '1200W 80+ Titanium Modular' },
      { icon: '🗜', label: 'Case',    val: 'Lian Li PC-O11 XL ROG Edition' },
      { icon: '❄️', label: 'Cooling', val: 'EK-AIO 360 D-RGB Premium Custom Loop' },
    ],
    price: 88000,
    note:  '4K 144 FPS en cualquier juego. Renderizado y modelado 3D profesional.',
  },
  {
    id:      'pb-wks-01',
    name:    'Studio Workstation WX',
    tagline: 'Para creadores que exigen más.',
    emoji:   '🎨',
    tier:    'high',
    use:     ['workstation'],
    specs: [
      { icon: '🔲', label: 'CPU',     val: 'Intel Core Ultra 9 285K' },
      { icon: '🖥',  label: 'GPU',     val: 'NVIDIA RTX A1000 8GB Professional' },
      { icon: '💾', label: 'RAM',     val: '64GB DDR5 5600MHz (4×16GB) ECC' },
      { icon: '💿', label: 'SSD',     val: '2TB NVMe PCIe 4.0 + 4TB HDD' },
      { icon: '🔌', label: 'Mobo',    val: 'ASUS ROG Maximus Z790 Hero (LGA1851)' },
      { icon: '⚡', label: 'PSU',     val: '1000W 80+ Gold Modular' },
      { icon: '🗜', label: 'Case',    val: 'Fractal Meshify 2 Compact' },
      { icon: '❄️', label: 'Cooling', val: 'Noctua NH-D15 Premium Air' },
    ],
    price: 52000,
    note:  'Optimizada para Premiere Pro, Blender, AutoCAD y arquitectura 3D.',
  },
];

/* =============================================================
   STATE
   ============================================================= */
let activeCat  = 'all';
let activeUse  = 'all';
let orderingPc = null;

/* =============================================================
   HELPERS
   ============================================================= */
function formatPrice(p) {
  return `$${p.toLocaleString('es-MX')} MXN`;
}

function tierBadgeClass(tier) {
  const map = { entry: 'badge-entry', mid: 'badge-mid', high: 'badge-high', ultra: 'badge-ultra' };
  return map[tier] || 'badge-entry';
}

function tierLabel(tier) {
  const map = { entry: 'Entry', mid: 'Mid', high: 'High-End', ultra: 'Ultra' };
  return map[tier] || tier;
}

/* =============================================================
   RENDER
   ============================================================= */
function buildCardHTML(pc) {
  const specRows = pc.specs.map(s => `
    <div class="pc-spec-row">
      <span class="pc-spec-icon">${s.icon}</span>
      <span>
        <span class="pc-spec-label">${s.label}:&nbsp;</span>
        <span class="pc-spec-val">${s.val}</span>
      </span>
    </div>
  `).join('');

  const noteRow = pc.note
    ? `<div class="pc-spec-row pc-spec-note"><span class="pc-spec-icon">💡</span>${pc.note}</div>`
    : '';

  return `
    <div class="pc-card tier-${pc.tier} reveal">
      <span class="pc-tier-badge ${tierBadgeClass(pc.tier)}">${tierLabel(pc.tier)}</span>
      <div class="pc-img-wrap">${pc.emoji}</div>
      <div class="pc-body">
        <div>
          <div class="pc-name">${pc.name}</div>
          <div class="pc-tagline">${pc.tagline}</div>
        </div>
        <div class="pc-specs">
          ${specRows}
          ${noteRow}
        </div>
        <div class="pc-footer">
          <div>
            <div class="pc-price">${formatPrice(pc.price)}</div>
            <div class="pc-price-sub">* incluye ensamblado + configuración</div>
          </div>
          <button class="btn-order" onclick="openOrderModal('${pc.id}')">ORDENAR</button>
        </div>
      </div>
    </div>
  `;
}

function renderGrid() {
  const grid = document.getElementById('pcsGrid');

  const filtered = prebuilts.filter(pc => {
    const catOk = activeCat === 'all' || pc.tier === activeCat;
    const useOk = activeUse === 'all' || pc.use.includes(activeUse);
    return catOk && useOk;
  });

  if (filtered.length === 0) {
    grid.innerHTML = `<div class="no-results">Sin equipos para este filtro. Prueba otra combinación.</div>`;
    return;
  }

  grid.innerHTML = filtered.map(buildCardHTML).join('');

  /* Re-observe new cards for scroll reveal */
  grid.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));
}

/* =============================================================
   FILTERS
   ============================================================= */
function initFilters() {
  document.getElementById('fCat').addEventListener('click', e => {
    const pill = e.target.closest('[data-cat]');
    if (!pill) return;
    activeCat = pill.dataset.cat;
    document.querySelectorAll('#fCat .filter-pill')
      .forEach(p => p.classList.toggle('active', p.dataset.cat === activeCat));
    renderGrid();
  });

  document.getElementById('fUse').addEventListener('click', e => {
    const pill = e.target.closest('[data-use]');
    if (!pill) return;
    activeUse = pill.dataset.use;
    document.querySelectorAll('#fUse .filter-pill')
      .forEach(p => p.classList.toggle('active', p.dataset.use === activeUse));
    renderGrid();
  });
}

/* =============================================================
   ORDER MODAL
   ============================================================= */
function openOrderModal(pcId) {
  orderingPc = prebuilts.find(p => p.id === pcId);
  if (!orderingPc) return;

  document.getElementById('mPcName').textContent  = orderingPc.name;
  document.getElementById('mPcPrice').textContent = formatPrice(orderingPc.price);

  /* Reset form */
  document.getElementById('o-name').value          = '';
  document.getElementById('o-email').value         = '';
  document.getElementById('o-phone').value         = '';
  document.getElementById('o-notes').value         = '';
  document.getElementById('o-delivery').selectedIndex = 0;
  document.getElementById('orderStatus').textContent  = '';
  document.getElementById('orderStatus').className    = 'order-status';
  document.getElementById('sendOrderBtn').disabled    = false;
  document.getElementById('sendOrderBtn').textContent = 'ENVIAR ORDEN';

  document.getElementById('orderModal').classList.add('visible');
  document.body.style.overflow = 'hidden';
}

function closeOrderModal() {
  document.getElementById('orderModal').classList.remove('visible');
  document.body.style.overflow = '';
  orderingPc = null;
}

async function sendOrder() {
  if (!orderingPc) return;

  const btn      = document.getElementById('sendOrderBtn');
  const statusEl = document.getElementById('orderStatus');
  const name     = document.getElementById('o-name').value.trim();
  const email    = document.getElementById('o-email').value.trim();
  const phone    = document.getElementById('o-phone').value.trim();
  const delivery = document.getElementById('o-delivery').value;
  const notes    = document.getElementById('o-notes').value.trim();

  if (!name || !email) {
    statusEl.textContent = '⚠️ Por favor ingresa tu nombre y correo.';
    statusEl.className   = 'order-status error';
    return;
  }

  const specsList = orderingPc.specs
    .map(s => `${s.label.padEnd(8)}: ${s.val}`)
    .join('\n');

  const buildList = [
    '=== PC PREARMADA ORDENADA ===',
    orderingPc.name,
    '',
    specsList,
    '',
    `Precio: ${formatPrice(orderingPc.price)}`,
    `Entrega: ${delivery || 'No especificada'}`,
  ].join('\n');

  btn.disabled    = true;
  btn.textContent = 'ENVIANDO...';

  try {
    await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
      client_name: name,
      reply_to:    email,
      phone:       phone || '—',
      build_list:  buildList,
      total:       formatPrice(orderingPc.price),
      budget:      'PC Prearmada',
      notes:       notes || 'Sin notas adicionales',
    });

    statusEl.textContent = '✅ ¡Orden enviada! Te contactamos en menos de 24 horas para coordinar el pago y entrega.';
    statusEl.className   = 'order-status success';
    btn.textContent      = '¡ENVIADO!';

  } catch (err) {
    console.error(err);
    statusEl.textContent = '❌ Error al enviar. Escríbenos a contactopixelwaves@gmail.com';
    statusEl.className   = 'order-status error';
    btn.disabled         = false;
    btn.textContent      = 'ENVIAR ORDEN';
  }
}

/* =============================================================
   SCROLL REVEAL
   ============================================================= */
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      revealObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.06 });

/* =============================================================
   NAV SCROLL
   ============================================================= */
window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 40);
});

/* =============================================================
   INIT
   ============================================================= */
document.addEventListener('DOMContentLoaded', () => {
  emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });

  /* Observe static reveal elements (hero, filter bar) */
  document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

  initFilters();
  renderGrid();
});
