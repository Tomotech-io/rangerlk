// Design My Trip logic
const form = document.getElementById('dmtForm');
if (form) {
  const sPkg   = document.getElementById('sPkg');
  const sDates = document.getElementById('sDates');
  const sGroup = document.getElementById('sGroup');
  const sNights= document.getElementById('sNights');
  const sNotes = document.getElementById('sNotes');
  const startDateEl = document.getElementById('startDate');
  const nightsEl = document.getElementById('nights');
  const pkgSelect = document.getElementById('packageSelect');
  const sendWA = document.getElementById('sendWA');

  const WHATSAPP_NUMBER = document.body.dataset.whatsappNumber || '';

  const formatDate = (iso) => {
    if (!iso) return '';
    const d = new Date(iso + 'T00:00:00');
    return d.toLocaleDateString(undefined, { year:'numeric', month:'short', day:'2-digit' });
  };

  const addDays = (dateISO, days) => {
    const d = new Date(dateISO + 'T00:00:00');
    d.setDate(d.getDate() + Number(days));
    return d.toISOString().slice(0,10);
  };

  const updateSummary = () => {
    const fd = new FormData(form);
    const p = fd.get('package') || '—';
    const g = fd.get('group') || '—';
    const n = fd.get('nights') || '—';
    const s = fd.get('start');
    const e = s && n ? addDays(s, n) : '';
    sPkg.textContent = p;
    sGroup.textContent = g;
    sNights.textContent = n;
    sNotes.textContent = (fd.get('notes') || '—').toString();
    sDates.textContent = s ? `${formatDate(s)}${e ? ' → ' + formatDate(e) : ''}` : '—';

    const ready = fd.get('name') && fd.get('package') && fd.get('start') && fd.get('nights');
    sendWA.disabled = !ready;
    sendWA.setAttribute('aria-disabled', String(!ready));
  };

  form.addEventListener('input', updateSummary);
  form.addEventListener('change', updateSummary);
  form.addEventListener('submit', e => { e.preventDefault(); updateSummary(); });

  document.querySelectorAll('[data-package]')?.forEach(btn => {
    btn.addEventListener('click', () => {
      const val = btn.getAttribute('data-package');
      if (val && pkgSelect) { pkgSelect.value = val; updateSummary(); }
    });
  });

  sendWA?.addEventListener('click', () => {
    const fd = new FormData(form);
    const name = fd.get('name') || '';
    const email = fd.get('email') || '';
    const pack = fd.get('package') || '';
    const start = fd.get('start') || '';
    const nights = fd.get('nights') || '';
    const group = fd.get('group') || '';
    const notes = fd.get('notes') || '';
    const end = start && nights ? addDays(start, nights) : '';

    const msg = `Hello Ranger.LK,%0A%0AI'd like to design a trip:%0A• Name: ${encodeURIComponent(name)}%0A• Package: ${encodeURIComponent(pack)}%0A• Dates: ${encodeURIComponent(formatDate(start))}${end?` → ${encodeURIComponent(formatDate(end))}`:''}%0A• Nights: ${encodeURIComponent(nights)}%0A• Group: ${encodeURIComponent(group)}%0A• Email: ${encodeURIComponent(email)}%0A• Notes: ${encodeURIComponent(notes)}%0A%0A(Generated from website)`;

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`;
    window.open(url, '_blank', 'noopener');
  });

  // min date = today
  const todayISO = new Date().toISOString().slice(0,10);
  if (startDateEl) startDateEl.min = todayISO;
}
