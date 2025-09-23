// Hydrate all <img data-asset="key"> with paths from /src/data/assets.json
(async () => {
  try {
    const res = await fetch('/src/data/assets.json', { cache: 'no-store' });
    const map = await res.json();
    document.querySelectorAll('img[data-asset]').forEach(img => {
      const key = img.getAttribute('data-asset');
      if (map[key]) img.src = map[key];
    });
  } catch (e) {
    // Optional: set a default/fallback image or log
    // console.warn('Asset map failed to load', e);
  }
})();
