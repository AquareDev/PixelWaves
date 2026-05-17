/* =============================================================
   Pixel Waves — IT Consulting
   js/contact.js  —  Contact form with EmailJS
   =============================================================

   SETUP (one-time, takes ~5 minutes):
   ─────────────────────────────────────────────────────────────
   1. Go to https://www.emailjs.com and create a free account.
   2. Add an Email Service:
        Dashboard → Email Services → Add New Service
        Connect your Gmail (contactopixelwaves@gmail.com)
        Copy the Service ID  →  paste it in EMAILJS_SERVICE_ID below.
   3. Create an Email Template:
        Dashboard → Email Templates → Create New Template
        Suggested template body:
          Subject : Nueva cotización desde Pixel Waves — {{service}}
          Body    :
            Nombre  : {{from_name}}
            Empresa : {{company}}
            Correo  : {{reply_to}}
            Servicio: {{service}}
            Mensaje : {{message}}
        Copy the Template ID  →  paste it in EMAILJS_TEMPLATE_ID below.
   4. Get your Public Key:
        Dashboard → Account → Public Key
        Paste it in EMAILJS_PUBLIC_KEY below.
   5. Save this file. Done — the form will now deliver real emails.
   ============================================================= */

const EMAILJS_SERVICE_ID  = 'service_jscpnwp';   // ← replace
const EMAILJS_TEMPLATE_ID = 'template_5pti1ab';  // ← replace
const EMAILJS_PUBLIC_KEY  = 'v5tGCGDwUVwLMGb1D';   // ← replace

/**
 * Initialise EmailJS. Called once when the page loads.
 */
function initEmailJS() {
  if (typeof emailjs === 'undefined') {
    console.warn('EmailJS SDK not loaded.');
    return;
  }
  emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
}

/**
 * Collect form values and return them as a plain object.
 * Returns null if required fields are empty.
 */
function collectFormData() {
  const name    = document.getElementById('f-name').value.trim();
  const company = document.getElementById('f-company').value.trim();
  const email   = document.getElementById('f-email').value.trim();
  const service = document.getElementById('f-service').value;
  const message = document.getElementById('f-msg').value.trim();

  if (!name || !email || !service || !message) {
    return null;
  }

  return { from_name: name, company: company || '—', reply_to: email, service, message };
}

/**
 * Show a status message below the submit button.
 * @param {'success'|'error'} type
 * @param {string} text
 */
function showStatus(type, text) {
  const el = document.getElementById('formStatus');
  el.textContent = text;
  el.className   = `form-status ${type}`;
}

function hideStatus() {
  const el = document.getElementById('formStatus');
  el.className = 'form-status';
}

/**
 * Reset the form fields back to their default state.
 */
function resetForm() {
  ['f-name', 'f-company', 'f-email', 'f-msg'].forEach(id => {
    document.getElementById(id).value = '';
  });
  document.getElementById('f-service').selectedIndex = 0;
}

/**
 * Main submit handler — wired to the form's submit button.
 */
async function handleSubmit() {
  const btn = document.getElementById('submitBtn');
  const t   = translations[currentLang];  // from i18n.js

  hideStatus();

  const data = collectFormData();
  if (!data) {
    showStatus('error', currentLang === 'es'
      ? '⚠️ Por favor completa todos los campos requeridos.'
      : '⚠️ Please fill in all required fields.');
    return;
  }

  /* Disable button and show loading state */
  btn.disabled    = true;
  btn.textContent = t['form.sending'];

  try {
    await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, data);
    showStatus('success', t['form.success']);
    resetForm();
  } catch (err) {
    console.error('EmailJS error:', err);
    showStatus('error', t['form.error']);
  } finally {
    btn.disabled    = false;
    btn.textContent = t['form.submit'];
  }
}
