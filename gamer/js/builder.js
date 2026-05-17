/* =============================================================
   Pixel Waves — Gamer Division
   gamer/js/builder.js
   PC Builder logic + EmailJS form handling
   ============================================================= */

/* ─── EmailJS config (same credentials as main site) ────────── */
const EMAILJS_SERVICE_ID  = 'service_jscpnwp';   // ← same as contact.js
const EMAILJS_TEMPLATE_ID = 'template_p0ixk7h'; // ← create a second template
const EMAILJS_PUBLIC_KEY  = 'v5tGCGDwUVwLMGb1D';   // ← same public key

/*
  EMAILJS TEMPLATE for gamer builds — suggested body:
  ────────────────────────────────────────────────────
  Subject: 🎮 Nueva solicitud de PC Gamer — {{client_name}}

  Cliente : {{client_name}}
  Correo  : {{reply_to}}
  Teléfono: {{phone}}

  === COMPONENTES SELECCIONADOS ===
  {{build_list}}

  Total estimado: {{total}}
  Presupuesto:    {{budget}}
  Notas:          {{notes}}
  ────────────────────────────────────────────────────
*/

/* =============================================================
   COMPONENT CATALOG
   ============================================================= */
const catalog = {
  cpu: {
    label: 'CPU',
    icon: '🔲',
    items: [
      /* AMD Ryzen */
      { id: 'r5-5600',   brand:'AMD', name:'Ryzen 5 5600',   spec:'6C/12T · 3.5–4.4GHz · AM4', tier:'budget', price:2100 },
      { id: 'r5-5600x',  brand:'AMD', name:'Ryzen 5 5600X',  spec:'6C/12T · 3.7–4.6GHz · AM4', tier:'budget', price:2400 },
      { id: 'r7-5700x',  brand:'AMD', name:'Ryzen 7 5700X',  spec:'8C/16T · 3.4–4.6GHz · AM4', tier:'mid',    price:2900 },
      { id: 'r7-5800x3d',brand:'AMD', name:'Ryzen 7 5800X3D',spec:'8C/16T · 3D V-Cache · AM4',  tier:'high',   price:4200 },
      { id: 'r7-7700x',  brand:'AMD', name:'Ryzen 7 7700X',  spec:'8C/16T · 4.5–5.4GHz · AM5', tier:'high',   price:4800 },
      { id: 'r9-7900x',  brand:'AMD', name:'Ryzen 9 7900X',  spec:'12C/24T · 4.7–5.6GHz · AM5',tier:'ultra',  price:7200 },
      { id: 'r9-7950x3d',brand:'AMD', name:'Ryzen 9 7950X3D',spec:'16C/32T · 3D V-Cache · AM5', tier:'ultra',  price:10500 },
      /* Intel Core */
      { id: 'i5-12400f', brand:'Intel', name:'Core i5-12400F', spec:'6C/12T · 2.5–4.4GHz · LGA1700', tier:'budget', price:2200 },
      { id: 'i5-13600k', brand:'Intel', name:'Core i5-13600K', spec:'14C/20T · 3.5–5.1GHz · LGA1700',tier:'mid',    price:3600 },
      { id: 'i7-13700k', brand:'Intel', name:'Core i7-13700K', spec:'16C/24T · 3.4–5.4GHz · LGA1700',tier:'high',   price:5500 },
      { id: 'i9-13900k', brand:'Intel', name:'Core i9-13900K', spec:'24C/32T · 3.0–5.8GHz · LGA1700',tier:'ultra',  price:9200 },
      { id: 'i9-14900k', brand:'Intel', name:'Core i9-14900K', spec:'24C/32T · 3.2–6.0GHz · LGA1700',tier:'ultra',  price:10800 },
    ]
  },

  gpu: {
    label: 'GPU',
    icon: '🖥',
    items: [
      /* NVIDIA */
      { id: 'rtx3060',   brand:'NVIDIA', name:'GeForce RTX 3060',    spec:'12GB GDDR6 · 1080p–1440p',    tier:'budget', price:4800 },
      { id: 'rtx3060ti', brand:'NVIDIA', name:'GeForce RTX 3060 Ti', spec:'8GB GDDR6X · 1440p',          tier:'mid',    price:5800 },
      { id: 'rtx4060',   brand:'NVIDIA', name:'GeForce RTX 4060',    spec:'8GB GDDR6 · DLSS 3 · 1440p',  tier:'mid',    price:6200 },
      { id: 'rtx4060ti', brand:'NVIDIA', name:'GeForce RTX 4060 Ti', spec:'16GB GDDR6 · DLSS 3 · 1440p', tier:'high',   price:8400 },
      { id: 'rtx4070',   brand:'NVIDIA', name:'GeForce RTX 4070',    spec:'12GB GDDR6X · DLSS 3 · 2K',   tier:'high',   price:11200 },
      { id: 'rtx4070s',  brand:'NVIDIA', name:'RTX 4070 Super',      spec:'12GB GDDR6X · DLSS 3 · 2K',   tier:'high',   price:12800 },
      { id: 'rtx4080',   brand:'NVIDIA', name:'GeForce RTX 4080',    spec:'16GB GDDR6X · DLSS 3 · 4K',   tier:'ultra',  price:19500 },
      { id: 'rtx4090',   brand:'NVIDIA', name:'GeForce RTX 4090',    spec:'24GB GDDR6X · DLSS 3 · 4K',   tier:'ultra',  price:32000 },
      /* AMD Radeon */
      { id: 'rx7600',    brand:'AMD', name:'Radeon RX 7600',   spec:'8GB GDDR6 · 1080p–1440p',  tier:'budget', price:4200 },
      { id: 'rx7700xt',  brand:'AMD', name:'Radeon RX 7700 XT',spec:'12GB GDDR6 · 1440p',       tier:'mid',    price:6500 },
      { id: 'rx7800xt',  brand:'AMD', name:'Radeon RX 7800 XT',spec:'16GB GDDR6 · 1440p–4K',   tier:'high',   price:9200 },
      { id: 'rx7900xtx', brand:'AMD', name:'Radeon RX 7900 XTX',spec:'24GB GDDR6 · 4K',        tier:'ultra',  price:18500 },
    ]
  },

  ram: {
    label: 'RAM',
    icon: '💾',
    items: [
      { id: 'ddr4-16-3200', brand:'Kingston', name:'Fury Beast 16GB DDR4',  spec:'2×8GB · 3200MHz · CL16', tier:'budget', price:800 },
      { id: 'ddr4-32-3600', brand:'Corsair',  name:'Vengeance 32GB DDR4',   spec:'2×16GB · 3600MHz · CL18',tier:'mid',    price:1400 },
      { id: 'ddr4-32-4000', brand:'G.Skill',  name:'Trident Z 32GB DDR4',   spec:'2×16GB · 4000MHz · CL16',tier:'high',   price:2000 },
      { id: 'ddr5-16-5600', brand:'Corsair',  name:'Dominator 16GB DDR5',   spec:'2×8GB · 5600MHz · CL36', tier:'mid',    price:1600 },
      { id: 'ddr5-32-5600', brand:'G.Skill',  name:'Trident Z5 32GB DDR5',  spec:'2×16GB · 5600MHz · CL30',tier:'high',   price:2800 },
      { id: 'ddr5-32-6000', brand:'Kingston', name:'Fury Beast 32GB DDR5',  spec:'2×16GB · 6000MHz · CL30',tier:'high',   price:3200 },
      { id: 'ddr5-64-6000', brand:'G.Skill',  name:'Trident Z5 64GB DDR5',  spec:'2×32GB · 6000MHz · CL30',tier:'ultra',  price:5800 },
    ]
  },

  storage: {
    label: 'Storage',
    icon: '💿',
    items: [
      { id: 'ssd-500-wd',   brand:'WD',      name:'Blue SN570 500GB',    spec:'NVMe PCIe 3.0 · 3500/2300 MB/s', tier:'budget', price:500 },
      { id: 'ssd-1tb-wd',   brand:'WD',      name:'Black SN770 1TB',     spec:'NVMe PCIe 4.0 · 5150/4900 MB/s', tier:'mid',    price:950 },
      { id: 'ssd-1tb-sam',  brand:'Samsung', name:'980 Pro 1TB',         spec:'NVMe PCIe 4.0 · 7000/5000 MB/s', tier:'mid',    price:1100 },
      { id: 'ssd-2tb-sam',  brand:'Samsung', name:'990 Pro 2TB',         spec:'NVMe PCIe 4.0 · 7450/6900 MB/s', tier:'high',   price:2200 },
      { id: 'ssd-2tb-wd',   brand:'WD',      name:'Black SN850X 2TB',    spec:'NVMe PCIe 4.0 · 7300/6600 MB/s', tier:'high',   price:2400 },
      { id: 'ssd-4tb-sam',  brand:'Samsung', name:'990 Pro 4TB',         spec:'NVMe PCIe 4.0 · 7450/6900 MB/s', tier:'ultra',  price:4500 },
      { id: 'hdd-2tb-wd',   brand:'WD',      name:'Blue 2TB HDD',        spec:'SATA 3.5" · 7200 RPM',           tier:'budget', price:750 },
      { id: 'hdd-4tb-sea',  brand:'Seagate', name:'Barracuda 4TB HDD',   spec:'SATA 3.5" · 7200 RPM',           tier:'budget', price:1200 },
    ]
  },

  motherboard: {
    label: 'Motherboard',
    icon: '🔌',
    items: [
      /* AM4 */
      { id: 'b550-asus',   brand:'ASUS',    name:'ROG Strix B550-F',      spec:'AM4 · DDR4 · ATX · PCIe 4.0',  tier:'mid',   price:3200 },
      { id: 'b550-msi',    brand:'MSI',     name:'MAG B550 Tomahawk',      spec:'AM4 · DDR4 · ATX · PCIe 4.0',  tier:'mid',   price:2800 },
      { id: 'x570-asus',   brand:'ASUS',    name:'ROG Crosshair VIII',     spec:'AM4 · DDR4 · ATX · PCIe 4.0',  tier:'high',  price:5500 },
      /* AM5 */
      { id: 'b650-msi',    brand:'MSI',     name:'Pro B650-P WiFi',        spec:'AM5 · DDR5 · ATX · PCIe 5.0',  tier:'mid',   price:3600 },
      { id: 'x670-asus',   brand:'ASUS',    name:'ROG Strix X670E-F',      spec:'AM5 · DDR5 · ATX · PCIe 5.0',  tier:'high',  price:6800 },
      { id: 'x670-gigab',  brand:'Gigabyte',name:'AORUS X670E Master',     spec:'AM5 · DDR5 · ATX · PCIe 5.0',  tier:'ultra', price:9200 },
      /* LGA1700 */
      { id: 'b660-msi',    brand:'MSI',     name:'Pro B660-A DDR4',        spec:'LGA1700 · DDR4 · ATX',         tier:'budget',price:2100 },
      { id: 'z690-asus',   brand:'ASUS',    name:'ROG Strix Z690-F',       spec:'LGA1700 · DDR5 · ATX · WiFi 6E',tier:'high', price:5800 },
      { id: 'z790-asus',   brand:'ASUS',    name:'ROG Maximus Z790 Hero',  spec:'LGA1700 · DDR5 · ATX · WiFi 6E',tier:'ultra',price:12500 },
    ]
  },

  psu: {
    label: 'Fuente',
    icon: '⚡',
    items: [
      { id: 'psu-550-evga',  brand:'EVGA',    name:'SuperNOVA 550 G6',   spec:'550W · 80+ Gold · Full Modular', tier:'budget', price:1100 },
      { id: 'psu-650-cors',  brand:'Corsair', name:'RM650x',             spec:'650W · 80+ Gold · Full Modular', tier:'mid',    price:1500 },
      { id: 'psu-750-sea',   brand:'Seasonic', name:'Focus GX-750',      spec:'750W · 80+ Gold · Full Modular', tier:'mid',    price:1700 },
      { id: 'psu-850-cors',  brand:'Corsair', name:'RM850x',             spec:'850W · 80+ Gold · Full Modular', tier:'high',   price:2200 },
      { id: 'psu-1000-evga', brand:'EVGA',    name:'SuperNOVA 1000 G6',  spec:'1000W · 80+ Gold · Full Modular',tier:'high',   price:2800 },
      { id: 'psu-1200-seas', brand:'Seasonic', name:'Prime TX-1200',     spec:'1200W · 80+ Titanium · Modular', tier:'ultra',  price:5500 },
    ]
  },

  cooler: {
    label: 'Enfriamiento',
    icon: '❄️',
    items: [
      { id: 'cool-212',   brand:'Cooler Master', name:'Hyper 212 Black', spec:'Air · 120mm · Universal AM4/AM5/1700', tier:'budget', price:600 },
      { id: 'cool-nh-d15',brand:'Noctua',        name:'NH-D15',          spec:'Air · 2×150mm · TDP 250W+',            tier:'high',   price:2400 },
      { id: 'cool-240-cors',brand:'Corsair',     name:'H100i Elite 240', spec:'AIO 240mm · LCD · AM4/AM5/1700',       tier:'mid',    price:2200 },
      { id: 'cool-360-cors',brand:'Corsair',     name:'H150i Elite 360', spec:'AIO 360mm · LCD · AM4/AM5/1700',       tier:'high',   price:3200 },
      { id: 'cool-360-lian',brand:'Lian Li',     name:'GALAHAD 360 UNI', spec:'AIO 360mm · ARGB · Universal',         tier:'high',   price:3500 },
      { id: 'cool-360-ek',  brand:'EK',          name:'EK-AIO 360 D-RGB', spec:'AIO 360mm · Premium · AM5/1700',      tier:'ultra',  price:4800 },
    ]
  },

  case: {
    label: 'Gabinete',
    icon: '🗜',
    items: [
      { id: 'case-h510',    brand:'NZXT',       name:'H510 Flow',        spec:'Mid-ATX · 2×120mm · Mesh front',     tier:'budget', price:1500 },
      { id: 'case-4000d',   brand:'Corsair',    name:'4000D Airflow',    spec:'Mid-ATX · 3×120mm · High airflow',   tier:'mid',    price:2200 },
      { id: 'case-lian-o11',brand:'Lian Li',    name:'PC-O11 Dynamic EVO',spec:'Mid/Full ATX · Dual chamber',       tier:'high',   price:3200 },
      { id: 'case-meshify', brand:'Fractal',    name:'Meshify 2 Compact', spec:'Mid-ATX · 2×140mm · TG',            tier:'mid',    price:2400 },
      { id: 'case-phanteks',brand:'Phanteks',   name:'Eclipse P600S',    spec:'Full-ATX · Hybrid mesh · Sound insul',tier:'high',  price:3800 },
      { id: 'case-h7-flow', brand:'NZXT',       name:'H7 Flow',          spec:'Mid-ATX · 4×120mm · Full mesh',      tier:'high',   price:2800 },
      { id: 'case-o11-xl',  brand:'Lian Li',    name:'PC-O11 XL ROG',    spec:'Full-ATX · Dual chamber · ROG ed.',  tier:'ultra',  price:5200 },
    ]
  }
};

const CATEGORY_KEYS = Object.keys(catalog);

/* =============================================================
   STATE
   ============================================================= */
let selectedComponents = {};   // { cpu: item, gpu: item, ... }
let activeCategory = 'cpu';

/* =============================================================
   RENDER HELPERS
   ============================================================= */
function getTierLabel(tier) {
  const map = { budget:'Entry', mid:'Mid', high:'High-End', ultra:'Ultra' };
  return map[tier] || tier;
}

function formatPrice(p) {
  return `$${p.toLocaleString('es-MX')} MXN`;
}

function buildTotal() {
  return Object.values(selectedComponents).reduce((s, it) => s + it.price, 0);
}

/* ─── Render component grid ─── */
function renderComponents(catKey) {
  const grid = document.getElementById('compGrid');
  const cat  = catalog[catKey];
  if (!grid || !cat) return;

  grid.innerHTML = cat.items.map(item => `
    <div class="comp-item ${selectedComponents[catKey]?.id === item.id ? 'selected' : ''}"
         onclick="selectComponent('${catKey}','${item.id}')">
      <span class="comp-tier tier-${item.tier}">${getTierLabel(item.tier)}</span>
      <span class="comp-brand">${item.brand}</span>
      <span class="comp-name">${item.name}</span>
      <span class="comp-spec">${item.spec}</span>
      <span class="comp-price">${formatPrice(item.price)}</span>
    </div>
  `).join('');
}

/* ─── Render build summary ─── */
function renderSummary() {
  const itemsEl  = document.getElementById('summaryItems');
  const countEl  = document.getElementById('summaryCount');
  const totalEl  = document.getElementById('summaryTotal');
  const sendBtn  = document.getElementById('sendBuildBtn');
  const entries  = Object.entries(selectedComponents);

  countEl.textContent = `${entries.length} / ${CATEGORY_KEYS.length}`;
  totalEl.textContent  = formatPrice(buildTotal());

  if (entries.length === 0) {
    itemsEl.innerHTML = `
      <div class="summary-empty">
        <div class="empty-icon">🎮</div>
        <p>Selecciona componentes<br>para armar tu PC</p>
      </div>`;
    sendBtn.disabled = true;
    return;
  }

  itemsEl.innerHTML = entries.map(([catKey, item]) => `
    <div class="summary-item">
      <span class="si-cat">${catalog[catKey].label}</span>
      <div class="si-info">
        <div class="si-name">${item.brand} ${item.name}</div>
        <div class="si-price">${formatPrice(item.price)}</div>
      </div>
      <button class="si-remove" onclick="removeComponent('${catKey}')" title="Quitar">✕</button>
    </div>
  `).join('');

  sendBtn.disabled = entries.length < 3;
  renderCompatBars();
}

/* ─── Compatibility indicator bars ─── */
function renderCompatBars() {
  const essential = ['cpu','gpu','ram','storage','motherboard','psu'];
  const barsEl = document.getElementById('compatBars');
  if (!barsEl) return;
  barsEl.innerHTML = essential.map(k => {
    const has = !!selectedComponents[k];
    return `
      <div class="compat-row">
        <span class="compat-cat">${catalog[k].label}</span>
        <div class="compat-bar">
          <div class="compat-fill ${has ? 'fill-ok' : 'fill-missing'}" style="width:${has ? '100' : '0'}%"></div>
        </div>
      </div>`;
  }).join('');
}

/* =============================================================
   ACTIONS
   ============================================================= */
function switchCategory(catKey) {
  activeCategory = catKey;
  document.querySelectorAll('.cat-tab').forEach(t => {
    t.classList.toggle('active', t.dataset.cat === catKey);
  });
  renderComponents(catKey);
}

function selectComponent(catKey, itemId) {
  const item = catalog[catKey].items.find(i => i.id === itemId);
  if (!item) return;
  if (selectedComponents[catKey]?.id === itemId) {
    delete selectedComponents[catKey];
  } else {
    selectedComponents[catKey] = item;
  }
  renderComponents(catKey);
  renderSummary();
}

function removeComponent(catKey) {
  delete selectedComponents[catKey];
  if (activeCategory === catKey) renderComponents(catKey);
  renderSummary();
}

function clearBuild() {
  selectedComponents = {};
  renderComponents(activeCategory);
  renderSummary();
}

/* =============================================================
   EMAILJS SEND
   ============================================================= */
function initBuilderEmailJS() {
  if (typeof emailjs !== 'undefined') {
    emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
  }
}

async function sendBuild() {
  const btn = document.getElementById('sendBuildBtn');
  const name    = document.getElementById('build-name').value.trim();
  const email   = document.getElementById('build-email').value.trim();
  const budget  = document.getElementById('build-budget').value;
  const notes   = document.getElementById('build-notes').value.trim();

  if (!name || !email) {
    showModal('⚠️', 'Datos incompletos', 'Por favor ingresa tu nombre y correo antes de enviar.');
    return;
  }

  const entries = Object.entries(selectedComponents);
  if (entries.length < 1) {
    showModal('⚠️', 'Sin componentes', 'Selecciona al menos un componente para enviar tu build.');
    return;
  }

  const buildList = entries.map(([catKey, item]) =>
    `${catalog[catKey].label.padEnd(12)}: ${item.brand} ${item.name} — ${formatPrice(item.price)}`
  ).join('\n');

  btn.disabled = true;
  btn.textContent = 'ENVIANDO...';

  try {
    await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
      client_name: name,
      reply_to:    email,
      phone:       document.getElementById('build-phone')?.value || '—',
      build_list:  buildList,
      total:       formatPrice(buildTotal()),
      budget:      budget || 'No especificado',
      notes:       notes || 'Sin notas adicionales'
    });
    showModal('✅', '¡Build enviado!', `Recibimos tu configuración de ${entries.length} componentes por ${formatPrice(buildTotal())}. Te contactamos en menos de 24 horas.`);
    clearBuild();
    document.getElementById('build-name').value  = '';
    document.getElementById('build-email').value = '';
    document.getElementById('build-notes').value = '';
  } catch (err) {
    console.error(err);
    showModal('❌', 'Error al enviar', 'Hubo un problema. Escríbenos directamente a contactopixelwaves@gmail.com con tu lista de componentes.');
  } finally {
    btn.disabled = false;
    btn.textContent = 'ENVIAR MI BUILD';
  }
}

/* ─── Contact form (support / domicilio) ─── */
async function sendGamerContact() {
  const btn  = document.getElementById('gfSubmitBtn');
  const name = document.getElementById('gf-name').value.trim();
  const email= document.getElementById('gf-email').value.trim();
  const svc  = document.getElementById('gf-service').value;
  const msg  = document.getElementById('gf-msg').value.trim();
  const status = document.getElementById('gfStatus');

  if (!name || !email || !svc || !msg) {
    status.textContent = '⚠️ Por favor completa todos los campos requeridos.';
    status.className = 'gf-status error';
    return;
  }

  btn.disabled = true;
  btn.textContent = 'ENVIANDO...';
  status.className = 'gf-status';

  try {
    await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
      client_name: name,
      reply_to:    email,
      phone:       document.getElementById('gf-phone')?.value || '—',
      build_list:  `Servicio solicitado: ${svc}`,
      total:       'N/A',
      budget:      'N/A',
      notes:       msg
    });
    status.textContent = '✅ Mensaje enviado. Te contactamos en menos de 24 horas.';
    status.className = 'gf-status success';
    document.getElementById('gf-name').value  = '';
    document.getElementById('gf-email').value = '';
    document.getElementById('gf-msg').value   = '';
    document.getElementById('gf-service').selectedIndex = 0;
  } catch(err) {
    status.textContent = '❌ Error al enviar. Escríbenos a contactopixelwaves@gmail.com';
    status.className = 'gf-status error';
  } finally {
    btn.disabled = false;
    btn.textContent = 'ENVIAR MENSAJE';
  }
}

/* =============================================================
   MODAL
   ============================================================= */
function showModal(icon, title, msg) {
  document.getElementById('modalIcon').textContent  = icon;
  document.getElementById('modalTitle').textContent = title;
  document.getElementById('modalMsg').textContent   = msg;
  document.getElementById('statusModal').classList.add('visible');
}

function closeModal() {
  document.getElementById('statusModal').classList.remove('visible');
}

/* =============================================================
   NAV TABS INIT
   ============================================================= */
function initCatTabs() {
  const tabsEl = document.getElementById('catTabs');
  if (!tabsEl) return;
  tabsEl.innerHTML = CATEGORY_KEYS.map(k => `
    <button class="cat-tab ${k === activeCategory ? 'active' : ''}"
            data-cat="${k}"
            onclick="switchCategory('${k}')">
      ${catalog[k].icon} ${catalog[k].label}
    </button>
  `).join('');
}

/* =============================================================
   NAV SCROLL
   ============================================================= */
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  });
}

/* =============================================================
   SCROLL REVEAL
   ============================================================= */
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), i * 80);
      revealObs.unobserve(e.target);
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

/* =============================================================
   INIT
   ============================================================= */
document.addEventListener('DOMContentLoaded', () => {
  initBuilderEmailJS();
  initCatTabs();
  renderComponents(activeCategory);
  renderSummary();
});
