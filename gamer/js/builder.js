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
     /* AMD Ryzen AM5 */
      { id: 'r5-7600',      brand:'AMD', name:'Ryzen 5 7600',      spec:'6C/12T · 3.8–5.1GHz · AM5', tier:'budget', price:3300  },
      { id: 'r5-7600x',     brand:'AMD', name:'Ryzen 5 7600X',     spec:'6C/12T · 4.7–5.3GHz · AM5', tier:'budget', price:3570  },
      { id: 'r5-8400f',     brand:'AMD', name:'Ryzen 5 8400F',     spec:'6C/12T · 4.7GHz · AM5',     tier:'budget', price:2650  },
      { id: 'r5-8500g',     brand:'AMD', name:'Ryzen 5 8500G',     spec:'6C/12T · 3.5GHz · AM5',     tier:'budget', price:3300  },
      { id: 'r5-8600g',     brand:'AMD', name:'Ryzen 5 8600G',     spec:'6C/12T · 4.3GHz · AM5',     tier:'budget', price:2850  },
      { id: 'r5-9600x',     brand:'AMD', name:'Ryzen 5 9600X',     spec:'6C/12T · 5.4GHz · AM5',     tier:'mid',    price:4050  },
      { id: 'r7-7700',      brand:'AMD', name:'Ryzen 7 7700',      spec:'8C/16T · 3.8–5.3GHz · AM5', tier:'mid',    price:48500  },
      { id: 'r7-7700x',     brand:'AMD', name:'Ryzen 7 7700X',     spec:'8C/16T · 4.5–5.4GHz · AM5', tier:'mid',    price:5100  },
      { id: 'r7-7800x3d',   brand:'AMD', name:'Ryzen 7 7800X3D',   spec:'8C/16T · 4.2GHz · AM5',     tier:'high',   price:7900  },
      { id: 'r7-8700f',     brand:'AMD', name:'Ryzen 7 8700F',     spec:'8C/16T · 5.0GHz · AM5',     tier:'mid',    price:4000  },
      { id: 'r7-8700g',     brand:'AMD', name:'Ryzen 7 8700G',     spec:'8C/16T · 5.1GHz · AM5',     tier:'mid',    price:4100  },
      { id: 'r7-9700x',     brand:'AMD', name:'Ryzen 7 9700X',     spec:'8C/16T · 3.8–5.5GHz · AM5', tier:'high',   price:6000  },
      { id: 'r7-9800x3d',   brand:'AMD', name:'Ryzen 7 9800X3D',   spec:'8C/16T · 4.7–5.2GHz · AM5', tier:'high',   price:9900  },
      { id: 'r7-9850x3d',   brand:'AMD', name:'Ryzen 7 9850X3D',   spec:'8C/16T · 4.7–5.6GHz · AM5', tier:'high',   price:10000 },
      { id: 'r9-7700sbx',   brand:'AMD', name:'Ryzen 9 7700',      spec:'8C/16T · 3.8–5.3GHz · AM5', tier:'high',   price:6250  },
      { id: 'r9-7900',      brand:'AMD', name:'Ryzen 9 7900',      spec:'12C/24T · 3.7–5.4GHz · AM5',tier:'high',   price:8100  },
      { id: 'r9-7900x',     brand:'AMD', name:'Ryzen 9 7900X',     spec:'12C/24T · 4.7GHz · AM5',    tier:'ultra',  price:6400  },
      { id: 'r9-9900x',     brand:'AMD', name:'Ryzen 9 9900X',     spec:'12C/24T · 5.6GHz · AM5',    tier:'ultra',  price:8350  },
      { id: 'r9-9900x3d',   brand:'AMD', name:'Ryzen 9 9900X3D',   spec:'12C/24T · 5.5GHz · AM5',    tier:'ultra',  price:10500 },
      { id: 'r9-9950x',     brand:'AMD', name:'Ryzen 9 9950X',     spec:'16C/32T · 5.7GHz · AM5',    tier:'ultra',  price:11900 },
      { id: 'r9-9950x3d',   brand:'AMD', name:'Ryzen 9 9950X3D',   spec:'16C/32T · 5.7GHz · AM5',    tier:'ultra',  price:12200 },
      { id: 'r9-9950x3d2',  brand:'AMD', name:'Ryzen 9 9950X3D2',  spec:'16C/32T · 4.3–5.6GHz · AM5',tier:'ultra',  price:17400 },
     /* Intel Core Ultra (Arrow Lake - LGA 1851) */
      { id: 'cu5-225f',   brand:'Intel', name:'Core Ultra 5 225F',  spec:'·  3.3–4.9GHz · LGA1851', tier:'budget', price:2700  },
      { id: 'cu5-225',    brand:'Intel', name:'Core Ultra 5 225',   spec:'· 3.3–4.9GHz · LGA1851',  tier:'budget', price:3400  },
      { id: 'cu5-245kf',  brand:'Intel', name:'Core Ultra 5 245KF', spec:'14C · 5.2GHz · LGA1851',  tier:'mid',    price:3900  },
      { id: 'cu5-245k',   brand:'Intel', name:'Core Ultra 5 245K',  spec:'14C · 5.2GHz · LGA1851',  tier:'mid',    price:4000  },
      { id: 'cu5-250kf',  brand:'Intel', name:'Core Ultra 5 250KF', spec:'· 4.2–5.3GHz · LGA1851',  tier:'mid',    price:4150  },
      { id: 'cu5-250k',   brand:'Intel', name:'Core Ultra 5 250K',  spec:'· 4.2–5.3GHz · LGA1851',  tier:'mid',    price:4200  },
      { id: 'cu7-265kf',  brand:'Intel', name:'Core Ultra 7 265KF', spec:'20C · 5.5GHz · LGA1851',  tier:'high',   price:5800  },
      { id: 'cu7-265f',   brand:'Intel', name:'Core Ultra 7 265F',  spec:'20C · 5.3GHz · LGA1851',  tier:'high',   price:6700  },
      { id: 'cu7-265k',   brand:'Intel', name:'Core Ultra 7 265K',  spec:'20C · 3.9GHz · LGA1851',  tier:'high',   price:6700  },
      { id: 'cu7-265',    brand:'Intel', name:'Core Ultra 7 265',   spec:'20C · 2.4–5.3GHz · LGA1851', tier:'high', price:7500 },
      { id: 'cu7-270k',   brand:'Intel', name:'Core Ultra 7 270K',  spec:'· 3.7–5.5GHz · LGA1851',  tier:'high',   price:6400  },
      { id: 'cu9-285',    brand:'Intel', name:'Core Ultra 9 285',   spec:'· 2.5–5.6GHz · LGA1851',  tier:'ultra',  price:10000  },
      { id: 'cu9-285k',   brand:'Intel', name:'Core Ultra 9 285K',  spec:'24C · 5.7GHz · LGA1851',  tier:'ultra',  price:11250 },

      /* Intel Core 14th Gen (Raptor Lake - LGA 1700)   */
      { id: 'i5-14400f',  brand:'Intel', name:'Core i5-14400F',     spec:'10C · 4.7GHz · LGA1700',  tier:'budget', price:3800  },
      { id: 'i5-14400',   brand:'Intel', name:'Core i5-14400',      spec:'10C · 2.5GHz · LGA1700',  tier:'budget', price:4000  },
      { id: 'i5-14600kf', brand:'Intel', name:'Core i5-14600KF',    spec:'· 3.5GHz · LGA1700',      tier:'mid',    price:5100  },
      { id: 'i7-14700f',  brand:'Intel', name:'Core i7-14700F',     spec:'20C · 2.1GHz · LGA1700',  tier:'mid',    price:6400  },
      { id: 'i7-14700kf', brand:'Intel', name:'Core i7-14700KF',    spec:'20C · 3.4GHz · LGA1700',  tier:'mid',    price:7600  },
      { id: 'i9-14900kf', brand:'Intel', name:'Core i9-14900KF',    spec:'· 6.0GHz · LGA1700',      tier:'ultra',  price:8200  },
      { id: 'i9-14900k',  brand:'Intel', name:'Core i9-14900K',     spec:'24C · 3.2GHz · LGA1700',  tier:'ultra',  price:8700  },
      { id: 'i9-14900f',  brand:'Intel', name:'Core i9-14900F',     spec:'24C · 5.8GHz · LGA1700',  tier:'ultra',  price:10500 },
      { id: 'i9-14900',   brand:'Intel', name:'Core i9-14900',      spec:'24C · 2.0GHz · LGA1700',  tier:'ultra',  price:12350 },
      { id: 'i9-14900ks', brand:'Intel', name:'Core i9-14900KS',    spec:'· 6.2GHz · LGA1700',      tier:'ultra',  price:15300 },

      /* Intel Core 13th Gen (Raptor Lake - LGA 1700) */
      { id: 'i9-13900f',  brand:'Intel', name:'Core i9-13900F',     spec:'24C · 2.0GHz · LGA1700',  tier:'ultra',  price:10600 },
      { id: 'i9-13900',   brand:'Intel', name:'Core i9-13900',      spec:'24C · 2.0GHz · LGA1700',  tier:'ultra',  price:11200 },

      /* Intel Core 12th Gen (Alder Lake - LGA 1700) */
      { id: 'i3-12100',   brand:'Intel', name:'Core i3-12100',      spec:'· 3.3GHz · LGA1700',      tier:'budget', price:3325  },
      { id: 'i5-12400f',  brand:'Intel', name:'Core i5-12400F',     spec:'· 2.5GHz · LGA1700',      tier:'budget', price:2900  },
      { id: 'i7-12700',   brand:'Intel', name:'Core i7-12700',      spec:'· 4.9GHz · LGA1700',      tier:'mid',    price:6650  },
      { id: 'i9-12900f',  brand:'Intel', name:'Core i9-12900F',     spec:'16C · 5.1GHz · LGA1700',  tier:'ultra',  price:8100  },
      { id: 'i9-12900k',  brand:'Intel', name:'Core i9-12900K',     spec:'· 5.2GHz · LGA1700',      tier:'ultra',  price:6700  },
      { id: 'i9-12900kf', brand:'Intel', name:'Core i9-12900KF',    spec:'· 3.2GHz · LGA1700',      tier:'ultra',  price:6650  },
    ]
  },

  gpu: {
    label: 'GPU',
    icon: '🖥',
    items: [
     /* ── GPU — NVIDIA GeForce ── */

    /* GT / Legacy */
    { id: 'gt730',        brand:'NVIDIA', name:'GeForce GT 730',       spec:'2GB GDDR5 · 64-bit · PCIe 2.0',   tier:'budget', price:1600  },
    { id: 'gt1030',       brand:'NVIDIA', name:'GeForce GT 1030',      spec:'2GB GDDR4 · PCIe 3.0',            tier:'budget', price:2600  },

    /* RTX 30 series */
    { id: 'rtx3050-6g',   brand:'NVIDIA', name:'GeForce RTX 3050 6G',  spec:'6GB GDDR6 · 96-bit · PCIe 4.0',  tier:'budget', price:4700  },
    { id: 'rtx3060-12g',  brand:'NVIDIA', name:'GeForce RTX 3060 12G', spec:'12GB GDDR6 · 192-bit · PCIe 4.0',tier:'budget', price:6000  },

    /* RTX 50 series */
    { id: 'rtx5050',      brand:'NVIDIA', name:'GeForce RTX 5050',     spec:'8GB GDDR6 · 128-bit · PCIe 5.0',  tier:'budget', price:5400  },
    { id: 'rtx5060',      brand:'NVIDIA', name:'GeForce RTX 5060',     spec:'8GB GDDR7 · 128-bit · PCIe 5.0',  tier:'mid',    price:6400  },
    { id: 'rtx5060ti-8g', brand:'NVIDIA', name:'GeForce RTX 5060 Ti 8G',spec:'8GB GDDR7 · 128-bit · PCIe 5.0', tier:'mid',    price:7900  },
    { id: 'rtx5060ti-16g',brand:'NVIDIA', name:'GeForce RTX 5060 Ti 16G',spec:'16GB GDDR7 · 128-bit · PCIe 5.0',tier:'high',  price:11200 },
    { id: 'rtx5070',      brand:'NVIDIA', name:'GeForce RTX 5070',     spec:'12GB GDDR7 · 192-bit · PCIe 5.0', tier:'high',   price:13100 },
    { id: 'rtx5070ti',    brand:'NVIDIA', name:'GeForce RTX 5070 Ti',  spec:'16GB GDDR7 · 256-bit · PCIe 5.0', tier:'ultra',  price:19800 },
    { id: 'rtx5080',      brand:'NVIDIA', name:'GeForce RTX 5080',     spec:'16GB GDDR7 · 256-bit · PCIe 5.0', tier:'ultra',  price:25300 },

    /* NVIDIA Professional */
    { id: 'rtx-a400',     brand:'NVIDIA', name:'RTX A400',             spec:'4GB GDDR6 · 64-bit · PCIe 4.0',   tier:'budget', price:3800  },
    { id: 'rtx-a1000',    brand:'NVIDIA', name:'RTX A1000',            spec:'8GB GDDR6 · 128-bit · PCIe 4.0',  tier:'mid',    price:8200  },
    { id: 'rtx-pro2000',  brand:'NVIDIA', name:'RTX Pro 2000',         spec:'16GB GDDR7 · 128-bit · PCIe 5.0', tier:'high',   price:16200 },
    { id: 'rtx-5000ada',  brand:'NVIDIA', name:'RTX 5000 Ada',         spec:'32GB GDDR6 · 256-bit · PCIe 4.0', tier:'ultra',  price:82200 },

    /* ── GPU — AMD Radeon ── */

    /* RX 7000 series */
    { id: 'rx7600',       brand:'AMD', name:'Radeon RX 7600',          spec:'8GB GDDR6 · 128-bit · PCIe 4.0',  tier:'budget', price:4900  },

    /* RX 9060 series */
    { id: 'rx9060-8g',    brand:'AMD', name:'Radeon RX 9060 XT 8G',   spec:'8GB GDDR6 · 128-bit · PCIe 5.0',  tier:'budget', price:5200  },
    { id: 'rx9060-16g',   brand:'AMD', name:'Radeon RX 9060 XT 16G',  spec:'16GB GDDR6 · 128-bit · PCIe 5.0', tier:'mid',    price:8300  },

    /* RX 9070 series */
    { id: 'rx9070',       brand:'AMD', name:'Radeon RX 9070',         spec:'16GB GDDR6 · 256-bit · PCIe 5.0',  tier:'high',   price:12300 },
    { id: 'rx9070xt',     brand:'AMD', name:'Radeon RX 9070 XT',      spec:'16GB GDDR6 · 256-bit · PCIe 5.0',  tier:'high',   price:13200 },
    ]
  },

  ram: {
    label: 'RAM',
    icon: '💾',
    quantityEnabled: true,   // flag for rendering RAM with quantity picker
    items: [
      /* DDR4 */
      { id: 'ddr4-8-3200-king',  brand:'Kingston', name:'Fury Beast DDR4 8GB',   spec:'8GB · 3200MHz · CL16 · DDR4', tier:'budget', price:420 },
      { id: 'ddr4-16-3200-king', brand:'Kingston', name:'Fury Beast DDR4 16GB',  spec:'16GB · 3200MHz · CL16 · DDR4',tier:'budget', price:800 },
      { id: 'ddr4-8-3600-cors',  brand:'Corsair',  name:'Vengeance DDR4 8GB',    spec:'8GB · 3600MHz · CL18 · DDR4', tier:'budget', price:450 },
      { id: 'ddr4-16-3600-cors', brand:'Corsair',  name:'Vengeance DDR4 16GB',   spec:'16GB · 3600MHz · CL18 · DDR4',tier:'mid',    price:850 },
      { id: 'ddr4-16-4000-gsk',  brand:'G.Skill',  name:'Trident Z DDR4 16GB',   spec:'16GB · 4000MHz · CL16 · DDR4',tier:'high',   price:1000 },
      { id: 'ddr4-32-4000-gsk',  brand:'G.Skill',  name:'Trident Z DDR4 32GB',   spec:'32GB · 4000MHz · CL16 · DDR4',tier:'high',   price:1900 },
      /* DDR5 */
      { id: 'ddr5-8-5600-cors',  brand:'Corsair',  name:'Dominator DDR5 8GB',    spec:'8GB · 5600MHz · CL36 · DDR5', tier:'mid',    price:700 },
      { id: 'ddr5-16-5600-cors', brand:'Corsair',  name:'Dominator DDR5 16GB',   spec:'16GB · 5600MHz · CL36 · DDR5',tier:'mid',    price:1300 },
      { id: 'ddr5-16-5600-gsk',  brand:'G.Skill',  name:'Trident Z5 DDR5 16GB',  spec:'16GB · 5600MHz · CL30 · DDR5',tier:'high',   price:1400 },
      { id: 'ddr5-32-6000-gsk',  brand:'G.Skill',  name:'Trident Z5 DDR5 32GB',  spec:'32GB · 6000MHz · CL30 · DDR5',tier:'high',   price:2600 },
      { id: 'ddr5-16-6000-king', brand:'Kingston', name:'Fury Beast DDR5 16GB',  spec:'16GB · 6000MHz · CL30 · DDR5',tier:'high',   price:1500 },
      { id: 'ddr5-32-6000-king', brand:'Kingston', name:'Fury Beast DDR5 32GB',  spec:'32GB · 6000MHz · CL30 · DDR5',tier:'high',   price:2900 },
      { id: 'ddr5-32-6000-cors', brand:'Corsair',  name:'Vengeance DDR5 32GB',   spec:'32GB · 6000MHz · CL30 · DDR5',tier:'high',   price:2700 },
      { id: 'ddr5-64-6000-gsk',  brand:'G.Skill',  name:'Trident Z5 DDR5 64GB',  spec:'64GB · 6000MHz · CL30 · DDR5',tier:'ultra',  price:5200 },
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
let selectedComponents = {};   // { cpu: item, gpu: item, ram: {item, qty}, ... }
let activeCategory = 'cpu';

/* ─── Filter state ─── */
let activeFilter = { brand: 'all', tier: 'all', sort: 'default' };

/* ─── RAM quantity state ─── */
let ramQty = 2; // default 2 sticks

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
  return Object.entries(selectedComponents).reduce((s, [catKey, it]) => {
    if (catKey === 'ram') return s + it.price * (it.qty || 1);
    return s + it.price;
  }, 0);
}

/* ─── Render component grid ─── */
function renderComponents(catKey) {
  const grid = document.getElementById('compGrid');
  const cat  = catalog[catKey];
  if (!grid || !cat) return;

  /* ── apply filters ── */
  let items = [...cat.items];

  if (activeFilter.brand !== 'all') {
    items = items.filter(i => i.brand === activeFilter.brand);
  }
  if (activeFilter.tier !== 'all') {
    items = items.filter(i => i.tier === activeFilter.tier);
  }
  if (activeFilter.sort === 'asc') {
    items.sort((a, b) => a.price - b.price);
  } else if (activeFilter.sort === 'desc') {
    items.sort((a, b) => b.price - a.price);
  }

  if (items.length === 0) {
    grid.innerHTML = `
      <div class="filter-empty">
        <div class="empty-icon">🔍</div>
        <p>Sin resultados para este filtro</p>
      </div>`;
    return;
  }

  /* ── RAM quantity selector header ── */
  let qtyHeader = '';
  if (cat.quantityEnabled) {
    const selQty = selectedComponents['ram']?.qty || ramQty;
    qtyHeader = `
      <div class="ram-qty-bar">
        <span class="ram-qty-label">💾 Cantidad de memorias:</span>
        <div class="ram-qty-pills">
          ${[1,2,4].map(q => `
            <button class="ram-qty-pill ${selQty === q ? 'active' : ''}" onclick="setRamQty(${q})">${q} módulo${q>1?'s':''}</button>
          `).join('')}
        </div>
        ${selectedComponents['ram'] ? `<span class="ram-qty-total">Total RAM: ${selectedComponents['ram'].qty * parseInt(selectedComponents['ram'].name.match(/(\d+)GB/)?.[1]||0)}GB</span>` : ''}
      </div>`;
  }

  grid.innerHTML = qtyHeader + items.map(item => {
    const isSelected = selectedComponents[catKey]?.id === item.id;
    const qty = cat.quantityEnabled ? (selectedComponents['ram']?.qty || ramQty) : 1;
    const displayPrice = cat.quantityEnabled
      ? `${formatPrice(item.price)} × ${qty} = ${formatPrice(item.price * qty)}`
      : formatPrice(item.price);
    return `
    <div class="comp-item ${isSelected ? 'selected' : ''}"
         onclick="selectComponent('${catKey}','${item.id}')">
      <span class="comp-tier tier-${item.tier}">${getTierLabel(item.tier)}</span>
      <span class="comp-brand">${item.brand}</span>
      <span class="comp-name">${item.name}</span>
      <span class="comp-spec">${item.spec}</span>
      <span class="comp-price">${displayPrice}</span>
    </div>`;
  }).join('');
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

  itemsEl.innerHTML = entries.map(([catKey, item]) => {
    const qty = catKey === 'ram' ? item.qty || 1 : 1;
    const totalPrice = item.price * qty;
    const qtyLabel = catKey === 'ram' ? ` × ${qty}` : '';
    return `
    <div class="summary-item">
      <span class="si-cat">${catalog[catKey].label}</span>
      <div class="si-info">
        <div class="si-name">${item.brand} ${item.name}${qtyLabel}</div>
        <div class="si-price">${formatPrice(totalPrice)}</div>
      </div>
      <button class="si-remove" onclick="removeComponent('${catKey}')" title="Quitar">✕</button>
    </div>`;
  }).join('');

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
  resetFilters();
  updateBrandPills(catKey);
  renderComponents(catKey);
}

function setRamQty(qty) {
  ramQty = qty;
  if (selectedComponents['ram']) {
    selectedComponents['ram'].qty = qty;
    renderSummary();
  }
  renderComponents('ram');
}

function selectComponent(catKey, itemId) {
  const item = catalog[catKey].items.find(i => i.id === itemId);
  if (!item) return;
  if (selectedComponents[catKey]?.id === itemId) {
    delete selectedComponents[catKey];
  } else {
    if (catKey === 'ram') {
      selectedComponents[catKey] = { ...item, qty: ramQty };
    } else {
      selectedComponents[catKey] = item;
    }
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

  const buildList = entries.map(([catKey, item]) => {
    if (catKey === 'ram') {
      const qty = item.qty || 1;
      return `${catalog[catKey].label.padEnd(12)}: ${item.brand} ${item.name} × ${qty} — ${formatPrice(item.price * qty)}`;
    }
    return `${catalog[catKey].label.padEnd(12)}: ${item.brand} ${item.name} — ${formatPrice(item.price)}`;
  }).join('\n');

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
   FILTER INIT & LOGIC
   ============================================================= */
function initFilters() {
  /* Brand pills */
  document.getElementById('filterBrand')?.addEventListener('click', e => {
    const pill = e.target.closest('[data-brand]');
    if (!pill) return;
    activeFilter.brand = pill.dataset.brand;
    document.querySelectorAll('#filterBrand .filter-pill').forEach(p =>
      p.classList.toggle('active', p.dataset.brand === activeFilter.brand)
    );
    renderComponents(activeCategory);
  });

  /* Tier pills */
  document.getElementById('filterTier')?.addEventListener('click', e => {
    const pill = e.target.closest('[data-tier]');
    if (!pill) return;
    activeFilter.tier = pill.dataset.tier;
    document.querySelectorAll('#filterTier .filter-pill').forEach(p =>
      p.classList.toggle('active', p.dataset.tier === activeFilter.tier)
    );
    renderComponents(activeCategory);
  });

  /* Sort pills */
  document.getElementById('filterSort')?.addEventListener('click', e => {
    const pill = e.target.closest('[data-sort]');
    if (!pill) return;
    activeFilter.sort = pill.dataset.sort;
    document.querySelectorAll('#filterSort .filter-pill').forEach(p =>
      p.classList.toggle('active', p.dataset.sort === activeFilter.sort)
    );
    renderComponents(activeCategory);
  });
}

/* Reset filters when switching category */
function resetFilters() {
  activeFilter = { brand: 'all', tier: 'all', sort: 'default' };
  document.querySelectorAll('#filterBrand .filter-pill').forEach(p =>
    p.classList.toggle('active', p.dataset.brand === 'all')
  );
  document.querySelectorAll('#filterTier .filter-pill').forEach(p =>
    p.classList.toggle('active', p.dataset.tier === 'all')
  );
  document.querySelectorAll('#filterSort .filter-pill').forEach(p =>
    p.classList.toggle('active', p.dataset.sort === 'default')
  );
}

/* ─── Update brand pills based on available brands in category ─── */
function updateBrandPills(catKey) {
  const brands = [...new Set(catalog[catKey].items.map(i => i.brand))];
  const container = document.getElementById('filterBrand');
  if (!container) return;
  container.innerHTML = `<button class="filter-pill active" data-brand="all">Todas</button>` +
    brands.map(b => `<button class="filter-pill" data-brand="${b}">${b}</button>`).join('');
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
  initFilters();
  updateBrandPills(activeCategory);
  renderComponents(activeCategory);
  renderSummary();
});
