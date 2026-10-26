/* Hidden Jyväskylä — page logic. Plain JavaScript + Leaflet, no build step. */
(function () {
  'use strict';

  /* ---------------------------------------------------------------------- */
  /* Config                                                                  */
  /* ---------------------------------------------------------------------- */

  const CITY = { lat: 62.2426, lng: 25.7473, label: 'Jyväskylä city centre' };

  // Area the guide covers. Address search is limited to it, and the map data snapshot covers it.
  const REGION = { south: 61.85, west: 25.25, north: 62.55, east: 26.15 };

  // Quick-pick areas. `radius` (km) is set for places whose spots lie further out.
  const AREAS = [
    { name: 'City centre', lat: 62.2426, lng: 25.7473 },
    { name: 'Kuokkala', lat: 62.2258, lng: 25.7658 },
    { name: 'Palokka', lat: 62.2832, lng: 25.7423 },
    { name: 'Vaajakoski', lat: 62.248, lng: 25.8627 },
    { name: 'Säynätsalo', lat: 62.1417, lng: 25.7692 },
    { name: 'Tikkakoski', lat: 62.3897, lng: 25.6459 },
    { name: 'Korpilahti', lat: 62.0432, lng: 25.5801, radius: 20 },
  ];

  const CATS = {
    lake: { label: 'Lakes', color: '#5aa9ff', icon: 'lake' },
    trail: { label: 'Trails & nature', color: '#8ee05a', icon: 'trail' },
    view: { label: 'Viewpoints', color: '#b794ff', icon: 'view' },
    fire: { label: 'Laavu & BBQ', color: '#ff9f45', icon: 'fire' },
    swim: { label: 'Swim & sauna', color: '#3ee6c4', icon: 'swim' },
    culture: { label: 'Culture', color: '#ffd166', icon: 'culture' },
  };

  const SEASONS = ['spring', 'summer', 'autumn', 'winter'];
  const OSM_PAGE = 25; // OpenStreetMap rows shown before "Show more"

  /* ---------------------------------------------------------------------- */
  /* Icons (24×24 stroke icons)                                              */
  /* ---------------------------------------------------------------------- */

  const WAVE = 'c2-1.6 4-1.6 6 0s4 1.6 6 0 4-1.6 6 0';
  const CLOUD = 'M7 15h10a4 4 0 0 0 .5-8 6 6 0 0 0-11.5 1.5A3.3 3.3 0 0 0 7 15z';
  const ICONS = {
    lake: `<path d="M2 8${WAVE}"/><path d="M2 13${WAVE}"/><path d="M2 18${WAVE}"/>`,
    trail: '<path d="M12 2.5l5.5 7.5h-3l4 6h-13l4-6h-3z"/><path d="M12 16v5.5"/>',
    view: '<path d="M2.5 20l6.5-11 4 6.5 2.5-3.5 6 8z"/><circle cx="16.5" cy="5.5" r="2"/>',
    fire: '<path d="M12 2.5c1.2 2.8 4.3 4.6 4.3 8.4a4.3 4.3 0 0 1-8.6 0c0-2.1 1-3.2 2-4.2.2 1.7 1 2.6 1.9 2.8-.3-2.4-.6-4.6.4-7z"/><path d="M5 21.5l14-3.5M5 18l14 3.5"/>',
    swim: `<circle cx="16.5" cy="5" r="2"/><path d="M3.5 12.5l4.5-3.5 3.5 2.5 3-2.5 3 2"/><path d="M2 17${WAVE}"/><path d="M2 21.5${WAVE}"/>`,
    culture: '<path d="M3 21h18"/><path d="M5 21v-9.5M9.7 21v-9.5M14.3 21v-9.5M19 21v-9.5"/><path d="M2.5 9.5L12 4l9.5 5.5z"/>',
    spark: '<path d="M12 3l2 5.5L19.5 10.5 14 12.5 12 18l-2-5.5L4.5 10.5 10 8.5z"/><path d="M19 3v4M17 5h4"/>',
    map: '<path d="M9 4L3 6.5v13.5l6-2.5 6 2.5 6-2.5V4l-6 2.5z"/><path d="M9 4v13.5M15 6.5V20"/>',
    nav: '<path d="M3 11l18-8-8 18-2.2-7.8z"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5.5M12 7.5h.01"/>',
    external: '<path d="M14 4h6v6"/><path d="M20 4l-9 9"/><path d="M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/>',
    close: '<path d="M6 6l12 12M18 6L6 18"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
    moon: '<path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z"/>',
    partly: '<path d="M8 2.5V4M3.5 7.5H2M4.6 4.1l1 1M11.4 4.1l-1 1"/><path d="M5.2 10.4A3.4 3.4 0 1 1 11.3 7"/><path d="M9 20h8a3.5 3.5 0 0 0 .4-7 5 5 0 0 0-9.6 1.2A2.9 2.9 0 0 0 9 20z"/>',
    cloud: '<path d="M7 18h10a4 4 0 0 0 .5-8 6 6 0 0 0-11.5 1.5A3.3 3.3 0 0 0 7 18z"/>',
    rain: `<path d="${CLOUD}"/><path d="M8 18l-1 3M12 18l-1 3M16 18l-1 3"/>`,
    snow: `<path d="${CLOUD}"/><path d="M8 19h.01M12 19h.01M16 19h.01M10 21.5h.01M14 21.5h.01"/>`,
    fog: '<path d="M4 9h16M2 13h20M5 17h14"/>',
    storm: `<path d="${CLOUD}"/><path d="M12.5 15l-2 3.5h3l-2 3.5"/>`,
  };
  const icon = (name) => `<svg viewBox="0 0 24 24" aria-hidden="true">${ICONS[name] || ''}</svg>`;

  /* ---------------------------------------------------------------------- */
  /* Small helpers                                                           */
  /* ---------------------------------------------------------------------- */

  const $ = (sel, root = document) => root.querySelector(sel);
  const esc = (s) =>
    String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);
  const f1 = (n) => Math.round(n * 10) / 10;
  const toRad = (d) => (d * Math.PI) / 180;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isWide = () => window.matchMedia('(min-width: 961px)').matches;

  function distanceKm(a, b) {
    const dLat = toRad(b.lat - a.lat);
    const dLng = toRad(b.lng - a.lng);
    const h = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLng / 2) ** 2;
    return 2 * 6371 * Math.asin(Math.sqrt(h));
  }

  function fmtKm(km) {
    if (km < 1) return `${Math.max(50, Math.round((km * 1000) / 50) * 50)} m`;
    return `${km < 10 ? km.toFixed(1) : Math.round(km)} km`;
  }

  const directionsUrl = (s) => `https://www.google.com/maps/dir/?api=1&destination=${s.lat},${s.lng}`;
  const inRegion = (p) => p.lat > REGION.south && p.lat < REGION.north && p.lng > REGION.west && p.lng < REGION.east;

  // Deterministic random numbers, so every spot always gets the same placeholder art.
  function hashStr(str) {
    let h = 2166136261;
    for (let i = 0; i < str.length; i++) {
      h ^= str.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return h >>> 0;
  }
  function rng(seed) {
    let a = hashStr(String(seed));
    return () => {
      a = (a + 0x6d2b79f5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  /* ---------------------------------------------------------------------- */
  /* Generative landscape art (hero + photo placeholders)                    */
  /* ---------------------------------------------------------------------- */

  // A spruce silhouette: stacked tiers, mirrored left/right, with a short trunk.
  function pine(x, base, h) {
    const w = h * 0.36;
    const tiers = 4;
    const pts = [];
    for (let i = 1; i <= tiers; i++) {
      const y = base - h + (h * 0.9 * i) / tiers;
      const half = (w / 2) * (0.3 + (0.7 * i) / tiers);
      pts.push([half, y]);
      if (i < tiers) pts.push([half * 0.4, y - h * 0.015]);
    }
    pts.push([w * 0.06, base - h * 0.1], [w * 0.06, base]);
    const right = pts.map(([dx, y]) => `L${f1(x + dx)},${f1(y)}`).join('');
    const left = pts
      .slice()
      .reverse()
      .map(([dx, y]) => `L${f1(x - dx)},${f1(y)}`)
      .join('');
    return `M${f1(x)},${f1(base - h)}${right}${left}Z`;
  }

  // Smooth ridge line built from a few sine waves.
  function ridge(r, base, amp, width) {
    const waves = [1, 2, 3, 5].map((k) => ({
      f: ((0.8 + r() * 1.4) * k * Math.PI * 2) / width,
      p: r() * Math.PI * 2,
      a: amp / k,
    }));
    return (x) => base + waves.reduce((sum, w) => sum + Math.sin(x * w.f + w.p) * w.a, 0);
  }

  function hill(fy, width, height, step) {
    let d = `M0,${height}`;
    for (let x = 0; x <= width + step; x += step) d += `L${x},${f1(fy(x))}`;
    return `${d}L${width + step},${height}Z`;
  }

  function forest(r, fy, from, to, minH, maxH, minGap, maxGap, scale = () => 1) {
    let d = '';
    for (let x = from; x < to; x += minGap + r() * (maxGap - minGap)) {
      d += pine(x, fy(x) + 3, (minH + r() * (maxH - minH)) * scale(x));
    }
    return d;
  }

  function drawHero() {
    const svg = $('#landscape');
    if (!svg) return;
    const W = 1600;
    const H = 900;
    const r = rng('jyvaskyla-night');
    const lakeTop = 700;

    let stars = '';
    for (let i = 0; i < 170; i++) {
      const tw = r() < 0.35;
      const style = tw ? ` class="star tw" style="--d:${f1(2.5 + r() * 4)}s;--delay:${f1(r() * 5)}s"` : ' class="star"';
      stars += `<circle cx="${f1(r() * W)}" cy="${f1(Math.pow(r(), 1.5) * 560)}" r="${f1(0.4 + r() * 1.3)}" opacity="${f1(0.35 + r() * 0.65)}"${style}/>`;
    }

    const far = ridge(r, 600, 46, W);
    const mid = ridge(r, 655, 24, W);
    // Near banks frame the lake from both sides, dropping away towards the middle.
    const leftBank = (x) => lakeTop - 14 + Math.pow(Math.max(0, x) / 700, 2) * 240;
    const rightBank = (x) => lakeTop - 14 + Math.pow(Math.max(0, W - x) / 640, 2) * 240;

    let shimmer = '';
    for (let i = 0; i < 30; i++) {
      const y = lakeTop + 8 + Math.pow(r(), 1.4) * 190;
      const len = 10 + r() * 40 * (y / H);
      shimmer += `<rect class="shimmer" x="${f1(400 + r() * 800)}" y="${f1(y)}" width="${f1(len)}" height="1" rx=".5" fill="#bff6ff" style="--d:${f1(4 + r() * 5)}s;--delay:${f1(r() * 6)}s;--o:${f1(0.08 + r() * 0.24)}"/>`;
    }

    const fireX = 905;
    svg.innerHTML = `
      <defs>
        <linearGradient id="farGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#173a6b"/><stop offset="1" stop-color="#0c1f3f"/></linearGradient>
        <linearGradient id="lakeGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#123a5e"/><stop offset=".35" stop-color="#0b2240"/><stop offset="1" stop-color="#040a16"/></linearGradient>
        <radialGradient id="fireGlow"><stop offset="0" stop-color="#ffb35c" stop-opacity=".95"/><stop offset=".35" stop-color="#ff8a3d" stop-opacity=".35"/><stop offset="1" stop-color="#ff8a3d" stop-opacity="0"/></radialGradient>
        <linearGradient id="shootGrad" gradientUnits="userSpaceOnUse" x1="1300" y1="120" x2="1390" y2="76"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#fff"/></linearGradient>
        <filter id="soft" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="18"/></filter>
        <filter id="softer" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="4"/></filter>
      </defs>
      <g class="layer" data-depth="0.45">${stars}<line class="shooting" x1="1300" y1="120" x2="1390" y2="76"/></g>
      <g class="layer" data-depth="0.3"><path d="${hill(far, W, H, 16)}" fill="url(#farGrad)"/></g>
      <g class="layer" data-depth="0.2"><path d="${hill(mid, W, H, 16)}${forest(r, mid, -10, W + 10, 16, 42, 7, 18)}" fill="#0a1931"/></g>
      <g class="layer" data-depth="0.1">
        <rect x="0" y="${lakeTop}" width="${W}" height="${H - lakeTop}" fill="url(#lakeGrad)"/>
        <ellipse cx="760" cy="${lakeTop + 46}" rx="420" ry="30" fill="#4ff0b4" opacity=".16" filter="url(#soft)"/>
        <ellipse cx="1080" cy="${lakeTop + 70}" rx="300" ry="22" fill="#a98bff" opacity=".12" filter="url(#soft)"/>
        ${shimmer}
        <ellipse cx="${fireX + 20}" cy="${lakeTop + 34}" rx="9" ry="30" fill="#ff9f45" opacity=".4" filter="url(#softer)"/>
        <g transform="translate(${fireX} ${lakeTop - 1})">
          <circle class="fire-glow" cx="20" cy="-8" r="80" fill="url(#fireGlow)"/>
          <path d="M-36 0V-8L0-27 2 0z" fill="#030812"/>
          <path class="flame" d="M20 0c-5 0-7-3-6-7 1-3 3-4 3-8 2 2 3 4 3 6 1-2 2-3 2-5 3 3 5 6 4 10-1 3-3 4-6 4z" fill="#ffc46b"/>
        </g>
      </g>
      <g class="layer" data-depth="0.04">
        <path d="${hill(leftBank, 720, H, 12)}${forest(r, leftBank, -20, 660, 70, 150, 12, 26, (x) => 1.2 - x / 900)}" fill="#030710"/>
        <path d="${hill(rightBank, W, H, 12)}${forest(r, rightBank, 960, W + 20, 70, 150, 12, 26, (x) => 0.5 + (x - 960) / 1000)}" fill="#030710"/>
      </g>`;
  }

  // Placeholder "photo" for a spot: night-sky landscape tinted with the category colour,
  // plus a small motif (laavu fire, tower, trail, building, pier, boat).
  function placeholderArt(spot, w = 400, h = 250) {
    const r = rng(spot.id || spot.key || spot.name);
    const c = CATS[spot.category].color;
    const uid = `a${hashStr(`${spot.id}-${w}`).toString(36)}`;
    const s = h / 250;
    const water = spot.category === 'lake' || spot.category === 'swim' || (spot.category !== 'culture' && r() > 0.55);
    const horizon = h * (0.7 + r() * 0.06);
    const sunX = w * (0.15 + r() * 0.7);
    const sunY = h * (0.16 + r() * 0.2);
    const sunR = h * (0.06 + r() * 0.04);
    const far = ridge(r, h * 0.5, h * 0.07, w);
    const mid = ridge(r, h * 0.6, h * 0.045, w);
    const side = r() < 0.5 ? -1 : 1;

    let art = `<svg viewBox="0 0 ${w} ${h}" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Illustration of ${esc(spot.name)}">
      <defs>
        <linearGradient id="${uid}s" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#060f22"/><stop offset=".75" stop-color="${c}" stop-opacity=".42"/><stop offset="1" stop-color="${c}" stop-opacity=".6"/></linearGradient>
        <radialGradient id="${uid}g"><stop offset="0" stop-color="${c}" stop-opacity=".9"/><stop offset="1" stop-color="${c}" stop-opacity="0"/></radialGradient>
        <radialGradient id="${uid}f"><stop offset="0" stop-color="#ffb35c" stop-opacity=".9"/><stop offset="1" stop-color="#ff8a3d" stop-opacity="0"/></radialGradient>
        <linearGradient id="${uid}w" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${c}" stop-opacity=".4"/><stop offset="1" stop-color="#040a16"/></linearGradient>
      </defs>
      <rect width="${w}" height="${h}" fill="#060f22"/><rect width="${w}" height="${h}" fill="url(#${uid}s)"/>`;

    for (let i = 0; i < 22; i++) {
      art += `<circle cx="${f1(r() * w)}" cy="${f1(r() * h * 0.42)}" r="${f1((0.4 + r() * 0.8) * s)}" fill="#fff" opacity="${f1(0.25 + r() * 0.55)}"/>`;
    }
    art += `<circle cx="${f1(sunX)}" cy="${f1(sunY)}" r="${f1(sunR * 3.2)}" fill="url(#${uid}g)" opacity=".6"/>`;
    art += `<circle cx="${f1(sunX)}" cy="${f1(sunY)}" r="${f1(sunR)}" fill="#fff4dc" opacity=".92"/>`;
    art += `<path d="${hill(far, w, h, 8)}" fill="#163360"/>`;

    if (spot.category === 'view') {
      // Observation tower on the far ridge
      const tx = w * (0.3 + r() * 0.4);
      const ty = far(tx) + 2;
      const th = h * 0.2;
      art += `<path d="M${f1(tx - 7 * s)},${f1(ty)}L${f1(tx - 2.5 * s)},${f1(ty - th)}H${f1(tx + 2.5 * s)}L${f1(tx + 7 * s)},${f1(ty)}z" fill="#0b1b36"/>`;
      art += `<rect x="${f1(tx - 9 * s)}" y="${f1(ty - th - 5 * s)}" width="${f1(18 * s)}" height="${f1(5 * s)}" fill="#0b1b36"/>`;
      art += `<path d="M${f1(tx - 10 * s)},${f1(ty - th - 5 * s)}L${f1(tx)},${f1(ty - th - 12 * s)}L${f1(tx + 10 * s)},${f1(ty - th - 5 * s)}z" fill="#0b1b36"/>`;
    }

    art += `<path d="${hill(mid, w, h, 8)}${forest(r, mid, -6, w + 6, h * 0.05, h * 0.12, 5 * s, 12 * s)}" fill="#0b1b36"/>`;

    let fireAt = null;
    if (water) {
      art += `<rect y="${f1(horizon)}" width="${w}" height="${f1(h - horizon)}" fill="url(#${uid}w)"/>`;
      for (let i = 0; i < 7; i++) {
        const y = horizon + 5 * s + i * ((h - horizon) / 8);
        const len = (16 + r() * 30) * s * (1 - i / 10);
        art += `<rect x="${f1(sunX - len / 2)}" y="${f1(y)}" width="${f1(len)}" height="${f1(1.5 * s)}" rx="${f1(0.75 * s)}" fill="#fff4dc" opacity="${f1(0.45 - i * 0.05)}"/>`;
      }
      // Near bank on one side, sloping away so the water stays visible
      const bank = (x) => {
        const t = side < 0 ? x / (w * 0.5) : (w - x) / (w * 0.5);
        return h * 0.8 + Math.pow(Math.min(1.2, Math.max(0, t)), 2) * h * 0.4;
      };
      const from = side < 0 ? -10 : w * 0.55;
      const to = side < 0 ? w * 0.45 : w + 10;
      art += `<path d="${hill(bank, w, h, 6)}${forest(r, bank, from, to, h * 0.14, h * 0.3, 6 * s, 13 * s, (x) => Math.max(0.35, 1 - (side < 0 ? x / w : (w - x) / w) * 1.4))}" fill="#040a16"/>`;
      if (spot.category === 'swim') {
        // Wooden pier reaching into the water
        const px = side < 0 ? w * 0.36 : w * 0.64;
        const py = horizon + (h - horizon) * 0.5;
        const len = w * 0.22 * -side;
        art += `<rect x="${f1(Math.min(px, px + len))}" y="${f1(py)}" width="${f1(Math.abs(len))}" height="${f1(3 * s)}" fill="#040a16"/>`;
        for (let i = 0; i <= 3; i++) {
          art += `<rect x="${f1(px + (len * i) / 3 - s)}" y="${f1(py)}" width="${f1(2 * s)}" height="${f1(9 * s)}" fill="#040a16"/>`;
        }
      } else if (spot.category === 'lake') {
        // Rowing boat
        const bx = side < 0 ? w * (0.6 + r() * 0.2) : w * (0.2 + r() * 0.2);
        const by = horizon + (h - horizon) * 0.35;
        art += `<path d="M${f1(bx - 14 * s)},${f1(by)}h${f1(28 * s)}l${f1(-5 * s)},${f1(5 * s)}h${f1(-18 * s)}z" fill="#040a16"/>`;
        art += `<rect x="${f1(bx - 13 * s)}" y="${f1(by + 6 * s)}" width="${f1(26 * s)}" height="${f1(1.2 * s)}" fill="${c}" opacity=".45"/>`;
      } else if (spot.category === 'fire') {
        fireAt = { x: side < 0 ? w * 0.72 : w * 0.28, y: horizon };
      }
    } else {
      const near = ridge(r, h * 0.86, h * 0.03, w);
      art += `<path d="${hill(near, w, h, 6)}${forest(r, near, -8, w + 8, h * 0.1, h * 0.24, 9 * s, 26 * s)}" fill="#040a16"/>`;
      if (spot.category === 'trail') {
        art += `<path d="M${f1(w * 0.44)},${h + 2}C${f1(w * 0.62)},${f1(h * 0.95)} ${f1(w * 0.36)},${f1(h * 0.9)} ${f1(w * 0.54)},${f1(h * 0.84)}" fill="none" stroke="${c}" stroke-width="${f1(2.4 * s)}" stroke-dasharray="${f1(6 * s)} ${f1(7 * s)}" stroke-linecap="round" opacity=".85"/>`;
      } else if (spot.category === 'culture') {
        // Low modernist building with lit windows
        const bx = w * 0.3;
        const by = h * 0.9;
        art += `<rect x="${f1(bx)}" y="${f1(by - h * 0.16)}" width="${f1(w * 0.4)}" height="${f1(h * 0.16 + 4)}" fill="#071022"/>`;
        art += `<rect x="${f1(bx + w * 0.26)}" y="${f1(by - h * 0.27)}" width="${f1(w * 0.14)}" height="${f1(h * 0.27)}" fill="#071022"/>`;
        for (let i = 0; i < 6; i++) {
          art += `<rect x="${f1(bx + w * 0.02 + i * w * 0.038)}" y="${f1(by - h * 0.11)}" width="${f1(w * 0.022)}" height="${f1(h * 0.05)}" fill="${c}" opacity="${f1(0.55 + r() * 0.4)}"/>`;
        }
        art += `<rect x="${f1(bx + w * 0.29)}" y="${f1(by - h * 0.22)}" width="${f1(w * 0.08)}" height="${f1(h * 0.025)}" fill="${c}" opacity=".7"/>`;
      } else if (spot.category === 'fire') {
        const fx = w * (0.35 + r() * 0.3);
        fireAt = { x: fx, y: near(fx) + 2 };
      }
    }

    if (fireAt) {
      const { x, y } = fireAt;
      art += `<circle cx="${f1(x + 14 * s)}" cy="${f1(y - 6 * s)}" r="${f1(46 * s)}" fill="url(#${uid}f)"/>`;
      art += `<path d="M${f1(x - 26 * s)},${f1(y)}v${f1(-6 * s)}l${f1(26 * s)},${f1(-14 * s)}l${f1(2 * s)},${f1(20 * s)}z" fill="#030812"/>`;
      art += `<path d="M${f1(x + 14 * s)},${f1(y)}c${f1(-4 * s)},0 ${f1(-5 * s)},${f1(-3 * s)} ${f1(-4 * s)},${f1(-6 * s)} ${f1(1 * s)},${f1(-2 * s)} ${f1(3 * s)},${f1(-3 * s)} ${f1(3 * s)},${f1(-7 * s)} ${f1(3 * s)},${f1(3 * s)} ${f1(5 * s)},${f1(6 * s)} ${f1(4 * s)},${f1(10 * s)}z" fill="#ffc46b"/>`;
    }

    return `${art}</svg>`;
  }

  // Real photo if the spot has one, otherwise the generated placeholder.
  function media(spot, w, h) {
    if (spot.image) {
      return `<img src="${esc(spot.image)}" alt="${esc(spot.name)}" loading="lazy" decoding="async" data-fallback="${esc(spot.key)}" data-w="${w || 400}" data-h="${h || 250}">`;
    }
    return placeholderArt(spot, w, h);
  }

  /* ---------------------------------------------------------------------- */
  /* Data                                                                    */
  /* ---------------------------------------------------------------------- */

  const curated = (window.CURATED_SPOTS || [])
    .filter((s) => CATS[s.category] && Number.isFinite(s.lat) && Number.isFinite(s.lng))
    .map((s) => ({ ...s, kind: 'curated', key: `c-${s.id}` }));

  const byKey = new Map(curated.map((s) => [s.key, s]));

  // Turn an OpenStreetMap element into a category + human label. Returns null for things we skip.
  function classifyOsm(t) {
    if (t.amenity === 'shelter') {
      const label = { lean_to: 'Laavu (lean-to shelter)', basic_hut: 'Kota (hut)', weather_shelter: 'Shelter', picnic_shelter: 'Picnic shelter' }[t.shelter_type] || 'Shelter';
      return { cat: 'fire', label, sub: 'shelter' };
    }
    if (t.tourism === 'wilderness_hut') return { cat: 'fire', label: 'Wilderness hut', sub: 'shelter' };
    if (t.leisure === 'firepit') return { cat: 'fire', label: 'Fire pit', sub: 'pit' };
    if (t.amenity === 'bbq') return { cat: 'fire', label: 'Barbecue spot', sub: 'pit' };
    if (t.tourism === 'picnic_site') return { cat: 'fire', label: 'Picnic site with fire place' };
    if (t.leisure === 'bird_hide') return { cat: 'view', label: 'Bird-watching hide' };
    if (t.man_made === 'tower') return { cat: 'view', label: 'Observation tower' };
    if (t.tourism === 'viewpoint') return { cat: 'view', label: 'Viewpoint' };
    if (t.amenity === 'sauna') return { cat: 'swim', label: 'Sauna' };
    if (['swimming_area', 'beach_resort', 'bathing_place'].includes(t.leisure)) return { cat: 'swim', label: 'Swimming spot' };
    if (t.natural === 'beach') return { cat: 'swim', label: 'Beach', needsName: true };
    if (t.natural === 'water') return { cat: 'lake', label: t.water === 'reservoir' ? 'Reservoir' : 'Lake', needsName: true };
    if (t.route) return { cat: 'trail', label: 'Marked trail', needsName: true };
    if (t.leisure === 'nature_reserve') return { cat: 'trail', label: 'Nature reserve', needsName: true };
    return null;
  }

  function osmToSpot(el) {
    const t = el.tags || {};
    const lat = el.lat ?? el.center?.lat;
    const lng = el.lon ?? el.center?.lon;
    if (!Number.isFinite(lat) || !Number.isFinite(lng)) return null;
    const cls = classifyOsm(t);
    if (!cls) return null;
    const name = t['name:en'] || t.name || '';
    if (!name && cls.needsName) return null;

    const features = [];
    if (t.fireplace === 'yes' || t.bbq === 'yes') features.push('Fire place');
    if (t.wood === 'yes') features.push('Firewood');
    if (t.drinking_water === 'yes') features.push('Drinking water');
    if (t.toilets === 'yes') features.push('Toilet');
    if (t.supervised === 'yes') features.push('Lifeguard');
    if (t.lit === 'yes') features.push('Lit');
    if (t.fee === 'yes') features.push('Fee');
    if (/^\d+([.,]\d+)?$/.test(t.distance || '')) features.push(`${t.distance.replace(',', '.')} km`);
    // Long trails come with sampled points along the route (see nearby()).
    const pts = Array.isArray(el.pts) && el.pts.length ? el.pts : null;
    if (pts) features.push('Closest point');

    return {
      pts,
      kind: 'osm',
      key: `o-${el.type}-${el.id}`,
      id: `${el.type}-${el.id}`,
      category: cls.cat,
      type: cls.label,
      sub: cls.sub,
      name: name || cls.label,
      named: Boolean(name),
      lat,
      lng,
      features,
      osmUrl: `https://www.openstreetmap.org/${el.type}/${el.id}`,
    };
  }

  // Remove noise: duplicates of hand-picked spots, fire pits that belong to a laavu, repeated entries.
  function dedupe(list) {
    const norm = (s) => String(s || '').toLowerCase();
    const curatedNames = curated.map((c) => ({ c, names: [norm(c.name), norm(c.localName)] }));
    const shelters = list.filter((s) => s.sub === 'shelter');
    const out = [];
    for (const s of list) {
      if (curated.some((c) => c.category === s.category && distanceKm(c, s) < 0.15)) continue;
      if (s.named && curatedNames.some(({ c, names }) => names.includes(norm(s.name)) && distanceKm(c, s) < 3)) continue;
      if (s.sub === 'pit') {
        const host = shelters.find((h) => distanceKm(h, s) < 0.06);
        if (host) {
          if (!host.features.includes('Fire place')) host.features.unshift('Fire place');
          continue;
        }
      }
      if (out.some((o) => o.type === s.type && o.name === s.name && distanceKm(o, s) < 0.03)) continue;
      out.push(s);
    }
    return out;
  }

  /* ---------------------------------------------------------------------- */
  /* State + DOM                                                             */
  /* ---------------------------------------------------------------------- */

  const state = {
    center: { lat: CITY.lat, lng: CITY.lng },
    label: CITY.label,
    radius: 10,
    cat: 'all',
    showOsm: true,
    osm: [],
    osmLimit: OSM_PAGE,
    shownCount: 0,
  };

  const el = {
    nav: $('#nav'),
    heroContent: $('.hero__content'),
    form: $('#searchForm'),
    input: $('#searchInput'),
    searchBtn: $('#searchForm button[type="submit"]'),
    locateBtn: $('#locateBtn'),
    quick: $('#quickAreas'),
    heroStatus: $('#heroStatus'),
    explore: $('#explore'),
    placeLabel: $('#placeLabel'),
    resultCount: $('#resultCount'),
    radiusLabel: $('#radiusLabel'),
    weather: $('#weather'),
    filters: $('#filters'),
    radius: $('#radius'),
    radiusOut: $('#radiusOut'),
    liveToggle: $('#liveToggle'),
    list: $('#list'),
    cards: $('#cards'),
    curatedCount: $('#curatedCount'),
    curatedEmpty: $('#curatedEmpty'),
    liveCount: $('#liveCount'),
    liveTitle: $('.list__title--live'),
    liveStatus: $('#liveStatus'),
    rows: $('#rows'),
    moreLive: $('#moreLive'),
    mapwrap: $('.mapwrap'),
    legend: $('#legend'),
    dialog: $('#spotDialog'),
    sheetBody: $('#sheetBody'),
  };

  function setStatus(msg, isError = false) {
    el.heroStatus.textContent = msg;
    el.heroStatus.classList.toggle('is-error', isError);
  }

  function setBusy(btn, busy) {
    btn.disabled = busy;
    btn.classList.toggle('is-busy', busy);
  }

  /* ---------------------------------------------------------------------- */
  /* Map                                                                     */
  /* ---------------------------------------------------------------------- */

  const hasMap = typeof window.L !== 'undefined';
  let map;
  let markerLayer;
  let radiusCircle;
  let meMarker;
  const markers = new Map();

  function initMap() {
    if (!hasMap) {
      $('#map').innerHTML = '<p class="empty" style="margin:24px">The map could not load. The list still works.</p>';
      return;
    }
    map = L.map('map', { scrollWheelZoom: false, zoomSnap: 0.5 }).setView([CITY.lat, CITY.lng], 12);
    addBasemap();

    // Zoomed out, OpenStreetMap pins shrink to dots so the map doesn't drown in icons.
    const updateZoomClass = () => map.getContainer().classList.toggle('is-far', map.getZoom() < 13.5);
    map.on('zoomend', updateZoomClass);
    updateZoomClass();

    radiusCircle = L.circle([CITY.lat, CITY.lng], {
      radius: state.radius * 1000,
      color: '#4ff0b4',
      weight: 1.2,
      opacity: 0.6,
      dashArray: '4 8',
      fillColor: '#4ff0b4',
      fillOpacity: 0.035,
      interactive: false,
    }).addTo(map);

    markerLayer = L.layerGroup().addTo(map);

    meMarker = L.marker([CITY.lat, CITY.lng], {
      icon: L.divIcon({ className: 'pin-wrap', html: '<div class="me"></div>', iconSize: [18, 18], iconAnchor: [9, 9] }),
      interactive: false,
      keyboard: false,
      zIndexOffset: 2000,
    }).addTo(map);

    // Don't hijack page scrolling: wheel-zoom only after the user clicks into the map.
    map.on('click', () => map.scrollWheelZoom.enable());
    map.getContainer().addEventListener('mouseleave', () => map.scrollWheelZoom.disable());

    map.on('popupopen', (e) => {
      const node = e.popup.getElement();
      if (node.dataset.bound) return; // the same popup element is reused when reopened
      node.dataset.bound = '1';
      node.addEventListener('click', (ev) => {
        const btn = ev.target.closest('[data-action="details"]');
        if (btn) openDetails(btn.dataset.key);
      });
    });

    el.legend.innerHTML = '<span><i class="l-gem"></i>Local favourite</span><span><i class="l-osm"></i>OpenStreetMap</span>';
  }

  // OpenFreeMap's dark "fiord" vector style (free, no key). Without WebGL or if MapLibre
  // didn't load, use standard OpenStreetMap tiles darkened with a CSS filter.
  function addBasemap() {
    const webgl = (() => {
      try {
        const c = document.createElement('canvas');
        return Boolean(c.getContext('webgl2') || c.getContext('webgl'));
      } catch {
        return false;
      }
    })();
    if (window.maplibregl && L.maplibreGL && webgl) {
      try {
        L.maplibreGL({
          style: 'https://tiles.openfreemap.org/styles/fiord',
          attribution:
            '<a href="https://openfreemap.org" target="_blank" rel="noopener">OpenFreeMap</a> &copy; <a href="https://www.openmaptiles.org/" target="_blank" rel="noopener">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> contributors',
        }).addTo(map);
        return;
      } catch {
        /* fall through to raster tiles */
      }
    }
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      className: 'tiles-dark',
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> contributors',
    }).addTo(map);
  }

  function fitToRadius() {
    if (!hasMap) return;
    map.fitBounds(radiusCircle.getBounds(), { padding: [16, 16], animate: !reduceMotion });
  }

  function popupHTML(s) {
    const cat = CATS[s.category];
    const d = distanceKm(state.center, s);
    const meta = s.kind === 'curated' ? s.area : [s.named ? s.type : null, ...s.features].filter(Boolean).join(' · ');
    const second =
      s.kind === 'curated'
        ? `<button type="button" class="act" data-action="details" data-key="${esc(s.key)}">${icon('info')}Details</button>`
        : `<a class="act" href="${s.osmUrl}" target="_blank" rel="noopener">${icon('external')}OSM</a>`;
    return `<div style="--c:${cat.color}">
      <div class="pop__kind">${s.kind === 'osm' && s.named ? esc(s.type) : cat.label}</div>
      <div class="pop__name">${esc(s.name)}</div>
      <div class="pop__meta">${fmtKm(d)} away${meta ? ` · ${esc(meta)}` : ''}</div>
      <div class="pop__actions">
        <a class="act" href="${directionsUrl(s)}" target="_blank" rel="noopener">${icon('nav')}Directions</a>
        ${second}
      </div>
    </div>`;
  }

  function renderMarkers(curatedList, osmList) {
    if (!hasMap) return;
    markerLayer.clearLayers();
    markers.clear();
    const add = (s, big) => {
      const size = big ? 34 : 22;
      const cat = CATS[s.category];
      const m = L.marker([s.lat, s.lng], {
        icon: L.divIcon({
          className: 'pin-wrap',
          html: `<div class="pin${big ? '' : ' pin--osm'}" style="--c:${cat.color}">${icon(cat.icon)}</div>`,
          iconSize: [size, size],
          iconAnchor: [size / 2, size / 2],
          popupAnchor: [0, -size / 2],
        }),
        title: s.name,
        alt: s.name,
        riseOnHover: true,
        zIndexOffset: big ? 1000 : 0,
      });
      m.bindPopup(() => popupHTML(s), { autoPanPadding: [40, 40], maxWidth: 280 });
      m.on('click', () => setActive(s.key, { scrollList: true }));
      m.addTo(markerLayer);
      markers.set(s.key, m);
    };
    osmList.forEach(({ s }) => add(s, false));
    curatedList.forEach(({ s }) => add(s, true));
  }

  function pinEl(key) {
    return markers.get(key)?.getElement()?.firstElementChild || null;
  }

  function setActive(key, { scrollList = false } = {}) {
    document.querySelectorAll('.card.is-active, .row.is-active, .pin.is-active').forEach((n) => n.classList.remove('is-active'));
    pinEl(key)?.classList.add('is-active');
    const item = el.list.querySelector(`[data-key="${CSS.escape(key)}"]`);
    if (!item) return;
    item.classList.add('is-active');
    if (scrollList && isWide()) item.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'nearest' });
  }

  function focusSpot(key) {
    const s = byKey.get(key);
    if (!s || !hasMap) return;
    if (!isWide()) el.mapwrap.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
    setActive(key);
    const m = markers.get(key);
    map.once('moveend', () => m?.openPopup());
    map.flyTo([s.lat, s.lng], Math.max(map.getZoom(), 14.5), { duration: reduceMotion ? 0 : 0.9 });
  }

  /* ---------------------------------------------------------------------- */
  /* Rendering                                                               */
  /* ---------------------------------------------------------------------- */

  // A trail's centre can be kilometres from the path itself, so place each trail at its
  // sampled point closest to the searched place. Distance, pin and directions all use it.
  function snapTrails() {
    for (const s of state.osm) {
      if (!s.pts) continue;
      let best = s.pts[0];
      let bestD = Infinity;
      for (const p of s.pts) {
        const d = distanceKm(state.center, { lat: p[0], lng: p[1] });
        if (d < bestD) {
          bestD = d;
          best = p;
        }
      }
      s.lat = best[0];
      s.lng = best[1];
    }
  }

  function nearby() {
    snapTrails();
    const within = (arr) =>
      arr
        .map((s) => ({ s, d: distanceKm(state.center, s) }))
        .filter((x) => x.d <= state.radius)
        .sort((a, b) => a.d - b.d);
    return { c: within(curated), o: state.showOsm ? within(state.osm) : [] };
  }

  function render({ fit = false, fresh = false } = {}) {
    const { c, o } = nearby();
    const counts = {};
    [...c, ...o].forEach(({ s }) => (counts[s.category] = (counts[s.category] || 0) + 1));
    const pick = (arr) => (state.cat === 'all' ? arr : arr.filter(({ s }) => s.category === state.cat));
    const fc = pick(c);
    const fo = pick(o);

    el.list.classList.toggle('is-fresh', fresh);
    renderFilters(counts, c.length + o.length);
    renderCards(fc);
    renderRows(fo);
    renderMarkers(fc, fo);

    el.placeLabel.textContent = state.label;
    el.radiusLabel.textContent = state.radius;
    el.curatedCount.textContent = `(${fc.length})`;
    el.liveCount.textContent = state.showOsm ? `(${fo.length})` : '';
    animateCount(fc.length + fo.length);
    if (fit) fitToRadius();
  }

  function animateCount(to) {
    const from = state.shownCount;
    state.shownCount = to;
    if (reduceMotion || from === to) {
      el.resultCount.textContent = to;
      return;
    }
    const t0 = performance.now();
    const step = (now) => {
      const p = Math.min(1, (now - t0) / 450);
      el.resultCount.textContent = Math.round(from + (to - from) * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  function renderFilters(counts, total) {
    const focused = document.activeElement?.closest?.('.chip')?.dataset.cat;
    const chip = (key, label, iconName, color, n) =>
      `<button type="button" class="chip${state.cat === key ? ' is-active' : ''}${n ? '' : ' is-empty'}" data-cat="${key}" style="--c:${color}" aria-pressed="${state.cat === key}">${icon(iconName)}<span>${label}</span><span class="chip__n">${n}</span></button>`;
    el.filters.innerHTML =
      chip('all', 'All', 'spark', '#4ff0b4', total) +
      Object.entries(CATS)
        .map(([k, cat]) => chip(k, cat.label, cat.icon, cat.color, counts[k] || 0))
        .join('');
    if (focused) el.filters.querySelector(`[data-cat="${focused}"]`)?.focus();
  }

  function renderCards(list) {
    el.cards.innerHTML = list.map(({ s, d }, i) => cardHTML(s, d, i)).join('');
    el.curatedEmpty.hidden = list.length > 0;
    if (!list.length) {
      const atMax = state.radius >= +el.radius.max;
      el.curatedEmpty.innerHTML = `<p>No hand-picked ${state.cat === 'all' ? '' : `${CATS[state.cat].label.toLowerCase()} `}spots within ${state.radius} km of ${esc(state.label)}.</p>
        ${atMax ? '' : `<button type="button" class="btn btn--ghost" data-action="widen">Widen to ${el.radius.max} km</button>`}
        ${state.cat !== 'all' ? '<button type="button" class="btn btn--text" data-action="all">Show all categories</button>' : ''}`;
    }
  }

  function cardHTML(s, d, i) {
    const cat = CATS[s.category];
    const tags = (s.tags || []).slice(0, 4);
    return `<li class="card" data-key="${esc(s.key)}" style="--c:${cat.color};--i:${Math.min(i, 12)}">
      <button type="button" class="card__media" data-action="details" aria-label="Open details: ${esc(s.name)}">
        ${media(s)}
        <span class="badge">${icon(cat.icon)}${cat.label}</span>
        <span class="pill">${fmtKm(d)}</span>
      </button>
      <div class="card__body">
        <span class="card__area">${esc(s.area || '')}</span>
        <h3>${esc(s.name)}</h3>
        <p>${esc(s.short || '')}</p>
        ${tags.length ? `<ul class="tags">${tags.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>` : ''}
        <div class="card__actions">
          <button type="button" class="act" data-action="map">${icon('map')}Map</button>
          <a class="act" href="${directionsUrl(s)}" target="_blank" rel="noopener">${icon('nav')}Directions</a>
          <button type="button" class="act" data-action="details">${icon('info')}Details</button>
        </div>
      </div>
    </li>`;
  }

  function renderRows(list) {
    const shown = list.slice(0, state.osmLimit);
    el.rows.innerHTML = shown.map(({ s, d }, i) => rowHTML(s, d, i)).join('');
    el.moreLive.hidden = list.length <= shown.length;
    el.moreLive.textContent = `Show ${Math.min(OSM_PAGE, list.length - shown.length)} more`;
    el.rows.hidden = !state.showOsm;
    el.liveTitle.hidden = !state.showOsm;
  }

  function rowHTML(s, d, i) {
    const cat = CATS[s.category];
    const sub = [s.named ? s.type : null, ...s.features].filter(Boolean).join(' · ') || 'Mapped on OpenStreetMap';
    return `<li class="row" data-key="${esc(s.key)}" style="--c:${cat.color};--i:${Math.min(i, 14)}">
      <span class="row__icon">${icon(cat.icon)}</span>
      <button type="button" class="row__main" data-action="map">
        <span class="row__name">${esc(s.name)}</span>
        <span class="row__sub">${esc(sub)}</span>
      </button>
      <span class="row__dist">${fmtKm(d)}</span>
      <a class="row__go" href="${directionsUrl(s)}" target="_blank" rel="noopener" aria-label="Directions to ${esc(s.name)}">${icon('nav')}</a>
    </li>`;
  }

  /* ---------------------------------------------------------------------- */
  /* Detail sheet                                                            */
  /* ---------------------------------------------------------------------- */

  function openDetails(key) {
    const s = byKey.get(key);
    if (!s || s.kind !== 'curated') return;
    const cat = CATS[s.category];
    const tips = s.tips || [];
    el.sheetBody.style.setProperty('--c', cat.color);
    el.sheetBody.innerHTML = `
      <div class="sheet__media">
        ${media(s, 800, 400)}
        <button class="sheet__close" type="button" data-action="close" aria-label="Close">${icon('close')}</button>
      </div>
      <div class="sheet__body">
        <div class="sheet__kind">
          <span class="badge">${icon(cat.icon)}${cat.label}</span>
          ${s.area ? `<span>${esc(s.area)}</span>` : ''}
          <span>${fmtKm(distanceKm(state.center, s))} from ${esc(state.label)}</span>
        </div>
        <h2 id="sheetTitle">${esc(s.name)}</h2>
        ${s.localName && s.localName !== s.name ? `<p class="sheet__local">${esc(s.localName)}</p>` : ''}
        <p class="sheet__desc">${esc(s.description || s.short || '')}</p>
        <div class="sheet__grid">
          ${tips.length ? `<div class="sheet__box"><h3>Good to know</h3><ul class="sheet__tips">${tips.map((t) => `<li>${esc(t)}</li>`).join('')}</ul></div>` : ''}
          <div class="sheet__box">
            <h3>Best seasons</h3>
            <div class="seasons">${SEASONS.map((x) => `<span class="season${(s.seasons || []).includes(x) ? ' is-on' : ''}">${cap(x)}</span>`).join('')}</div>
            ${s.tags?.length ? `<ul class="tags">${s.tags.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>` : ''}
            <p class="coords">${s.lat.toFixed(5)}, ${s.lng.toFixed(5)}</p>
          </div>
        </div>
        <div class="sheet__actions">
          <a class="btn btn--primary" href="${directionsUrl(s)}" target="_blank" rel="noopener">${icon('nav')}<span>Directions</span></a>
          <button class="btn btn--ghost" type="button" data-action="map" data-key="${esc(s.key)}">${icon('map')}Show on map</button>
          ${s.link ? `<a class="btn btn--ghost" href="${esc(s.link)}" target="_blank" rel="noopener">${icon('external')}More info</a>` : ''}
        </div>
      </div>`;
    if (!el.dialog.open) el.dialog.showModal();
    el.sheetBody.scrollTop = 0;
  }

  /* ---------------------------------------------------------------------- */
  /* Weather (Open-Meteo, no key needed)                                     */
  /* ---------------------------------------------------------------------- */

  const WMO = {
    0: ['Clear sky', 'sun'], 1: ['Mainly clear', 'sun'], 2: ['Partly cloudy', 'partly'], 3: ['Overcast', 'cloud'],
    45: ['Fog', 'fog'], 48: ['Freezing fog', 'fog'],
    51: ['Light drizzle', 'rain'], 53: ['Drizzle', 'rain'], 55: ['Heavy drizzle', 'rain'], 56: ['Freezing drizzle', 'rain'], 57: ['Freezing drizzle', 'rain'],
    61: ['Light rain', 'rain'], 63: ['Rain', 'rain'], 65: ['Heavy rain', 'rain'], 66: ['Freezing rain', 'rain'], 67: ['Freezing rain', 'rain'],
    71: ['Light snow', 'snow'], 73: ['Snow', 'snow'], 75: ['Heavy snow', 'snow'], 77: ['Snow grains', 'snow'],
    80: ['Rain showers', 'rain'], 81: ['Rain showers', 'rain'], 82: ['Heavy showers', 'rain'], 85: ['Snow showers', 'snow'], 86: ['Snow showers', 'snow'],
    95: ['Thunderstorm', 'storm'], 96: ['Thunderstorm, hail', 'storm'], 99: ['Thunderstorm, hail', 'storm'],
  };
  const WEATHER_COLOR = { sun: '#ffd166', partly: '#ffd166', moon: '#b794ff', cloud: '#94a6c0', fog: '#94a6c0', rain: '#5aa9ff', storm: '#5aa9ff', snow: '#eaf1fb' };
  let weatherCtl;

  async function loadWeather({ lat, lng }) {
    weatherCtl?.abort();
    weatherCtl = new AbortController();
    el.weather.innerHTML = '<div class="weather__skeleton"></div>';
    try {
      const url =
        `https://api.open-meteo.com/v1/forecast?latitude=${lat.toFixed(4)}&longitude=${lng.toFixed(4)}` +
        '&current=temperature_2m,weather_code,wind_speed_10m,is_day&daily=sunrise,sunset' +
        '&wind_speed_unit=ms&timezone=Europe%2FHelsinki&forecast_days=2';
      const res = await fetch(url, { signal: weatherCtl.signal });
      if (!res.ok) throw new Error(`weather ${res.status}`);
      const w = await res.json();
      const cur = w.current;
      let [cond, ic] = WMO[cur.weather_code] || ['Weather', 'cloud'];
      if (ic === 'sun' && !cur.is_day) ic = 'moon';
      const hhmm = (iso) => (iso || '').slice(11, 16);
      const { sunrise, sunset } = w.daily;
      // Times are local ISO strings, so plain string comparison works.
      const sun = cur.time < sunrise[0] ? `Sunrise ${hhmm(sunrise[0])}` : cur.time < sunset[0] ? `Sunset ${hhmm(sunset[0])}` : `Sunrise ${hhmm(sunrise[1])}`;
      el.weather.innerHTML = `
        <div class="weather__icon" style="--wc:${WEATHER_COLOR[ic]}">${icon(ic)}</div>
        <div><div class="weather__temp">${Math.round(cur.temperature_2m)}°C</div><div class="weather__cond">${cond}</div></div>
        <div class="weather__meta">Wind ${Math.round(cur.wind_speed_10m)} m/s<br>${sun}</div>`;
    } catch (err) {
      if (err.name === 'AbortError') return;
      el.weather.innerHTML = '<div class="weather__cond">Weather unavailable right now</div>';
    }
  }

  /* ---------------------------------------------------------------------- */
  /* Location: address search (Nominatim) + browser geolocation              */
  /* ---------------------------------------------------------------------- */

  const searchCache = new Map();

  async function searchPlace(q) {
    const key = q.toLowerCase();
    if (searchCache.has(key)) return searchCache.get(key);
    const params = new URLSearchParams({
      format: 'jsonv2',
      q,
      limit: '1',
      countrycodes: 'fi',
      viewbox: `${REGION.west},${REGION.north},${REGION.east},${REGION.south}`,
      bounded: '1',
      'accept-language': 'en',
    });
    const res = await fetch(`https://nominatim.openstreetmap.org/search?${params}`);
    if (!res.ok) throw new Error(`search ${res.status}`);
    const [hit] = await res.json();
    const result = hit ? { lat: +hit.lat, lng: +hit.lon, label: hit.name || hit.display_name.split(',').slice(0, 2).join(',') } : null;
    searchCache.set(key, result);
    return result;
  }

  async function reverseName({ lat, lng }) {
    try {
      const params = new URLSearchParams({ format: 'jsonv2', lat, lon: lng, zoom: '16', 'accept-language': 'en' });
      const res = await fetch(`https://nominatim.openstreetmap.org/reverse?${params}`);
      const a = (await res.json()).address || {};
      return a.suburb || a.neighbourhood || a.quarter || a.city_district || a.village || a.town || a.city || null;
    } catch {
      return null;
    }
  }

  function setCenter(p, label, { scroll = true } = {}) {
    state.center = { lat: p.lat, lng: p.lng };
    state.label = label;
    state.osmLimit = OSM_PAGE;
    if (hasMap) {
      meMarker.setLatLng(state.center);
      radiusCircle.setLatLng(state.center);
      map.closePopup();
    }
    render({ fit: true, fresh: true });
    loadWeather(state.center);
    if (scroll) el.explore.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
  }

  function locate() {
    if (!('geolocation' in navigator)) {
      setStatus("Your browser can't share its location. Type an address instead.", true);
      return;
    }
    setBusy(el.locateBtn, true);
    setStatus('Finding you…');
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        setBusy(el.locateBtn, false);
        const p = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        if (!inRegion(p)) {
          setStatus(`You're about ${Math.round(distanceKm(p, CITY))} km from Jyväskylä, so here's the city centre instead.`);
          setCenter(CITY, CITY.label);
          return;
        }
        setStatus('');
        setCenter(p, 'your location');
        const place = await reverseName(p);
        if (place && state.center.lat === p.lat && state.center.lng === p.lng) {
          state.label = `you (${place})`;
          el.placeLabel.textContent = state.label;
        }
      },
      (err) => {
        setBusy(el.locateBtn, false);
        setStatus(err.code === 1 ? 'Location access was blocked. Type an address instead.' : "Couldn't get your location. Type an address instead.", true);
      },
      { enableHighAccuracy: true, timeout: 12000, maximumAge: 60000 }
    );
  }

  /* ---------------------------------------------------------------------- */
  /* OpenStreetMap snapshot                                                  */
  /* ---------------------------------------------------------------------- */

  async function loadOsm() {
    el.liveStatus.textContent = 'Loading map data…';
    try {
      const res = await fetch('data/osm-spots.json');
      if (!res.ok) throw new Error(`osm ${res.status}`);
      const data = await res.json();
      state.osm = dedupe((data.elements || []).map(osmToSpot).filter(Boolean));
      state.osm.forEach((s) => byKey.set(s.key, s));
      const when = data.snapshot ? new Date(data.snapshot).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : null;
      el.liveStatus.textContent = `Laavus, fire pits, beaches, lakes and trails as mapped by the OpenStreetMap community${when ? ` (data from ${when})` : ''}.`;
      render({ fresh: true });
    } catch {
      el.liveStatus.textContent = "Couldn't load the OpenStreetMap layer. The hand-picked spots still work.";
      el.liveStatus.classList.add('is-error');
    }
  }

  /* ---------------------------------------------------------------------- */
  /* Events                                                                  */
  /* ---------------------------------------------------------------------- */

  function updateRangeFill() {
    const { min, max, value } = el.radius;
    el.radius.style.setProperty('--p', `${((value - min) / (max - min)) * 100}%`);
  }

  function setRadius(km) {
    state.radius = km;
    el.radius.value = km;
    el.radiusOut.textContent = `${km} km`;
    updateRangeFill();
    if (hasMap) radiusCircle.setRadius(km * 1000);
  }

  function bindEvents() {
    el.form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const q = el.input.value.trim();
      if (!q) return;
      setBusy(el.searchBtn, true);
      setStatus('Searching…');
      try {
        const hit = await searchPlace(q);
        if (!hit) {
          setStatus(`Couldn't find "${q}" in the Jyväskylä area. Try a street, district or landmark.`, true);
          return;
        }
        setStatus('');
        setCenter(hit, hit.label);
      } catch {
        setStatus('Address search is unavailable right now. Try one of the areas below.', true);
      } finally {
        setBusy(el.searchBtn, false);
      }
    });

    el.locateBtn.addEventListener('click', locate);

    el.quick.innerHTML = AREAS.map((a, i) => `<button type="button" class="qchip" data-area="${i}">${esc(a.name)}</button>`).join('');
    el.quick.addEventListener('click', (e) => {
      const b = e.target.closest('[data-area]');
      if (!b) return;
      const a = AREAS[+b.dataset.area];
      setStatus('');
      if (a.radius && state.radius < a.radius) setRadius(a.radius);
      setCenter(a, a.name === 'City centre' ? CITY.label : a.name);
    });

    el.filters.addEventListener('click', (e) => {
      const b = e.target.closest('[data-cat]');
      if (!b) return;
      state.cat = state.cat === b.dataset.cat ? 'all' : b.dataset.cat;
      state.osmLimit = OSM_PAGE;
      render({ fresh: true });
    });

    let radiusTimer;
    el.radius.addEventListener('input', () => {
      setRadius(+el.radius.value);
      clearTimeout(radiusTimer);
      radiusTimer = setTimeout(() => render(), 120);
    });
    el.radius.addEventListener('change', () => {
      clearTimeout(radiusTimer);
      render({ fit: true });
    });

    el.liveToggle.addEventListener('change', () => {
      state.showOsm = el.liveToggle.checked;
      el.liveStatus.hidden = !state.showOsm;
      render({ fresh: true });
    });

    el.moreLive.addEventListener('click', () => {
      state.osmLimit += OSM_PAGE;
      render();
    });

    el.list.addEventListener('click', (e) => {
      const t = e.target.closest('[data-action]');
      if (!t) return;
      const key = t.dataset.key || t.closest('[data-key]')?.dataset.key;
      const action = t.dataset.action;
      if (action === 'map') focusSpot(key);
      else if (action === 'details') openDetails(key);
      else if (action === 'widen') {
        el.radius.value = el.radius.max;
        el.radius.dispatchEvent(new Event('input'));
        el.radius.dispatchEvent(new Event('change'));
      } else if (action === 'all') {
        state.cat = 'all';
        render({ fresh: true });
      }
    });

    // Hovering a card or row highlights its pin on the map.
    let hovered = null;
    el.list.addEventListener('mouseover', (e) => {
      const key = e.target.closest('[data-key]')?.dataset.key || null;
      if (key === hovered) return;
      if (hovered) pinEl(hovered)?.classList.remove('is-hover');
      hovered = key;
      if (key) pinEl(key)?.classList.add('is-hover');
    });

    el.dialog.addEventListener('click', (e) => {
      if (e.target === el.dialog) el.dialog.close();
      const t = e.target.closest('[data-action]');
      if (!t) return;
      if (t.dataset.action === 'close') el.dialog.close();
      if (t.dataset.action === 'map') {
        el.dialog.close();
        focusSpot(t.dataset.key);
      }
    });

    // A spot photo that fails to load falls back to the generated art.
    document.addEventListener(
      'error',
      (e) => {
        const img = e.target;
        if (img.tagName !== 'IMG' || !img.dataset.fallback) return;
        const s = byKey.get(img.dataset.fallback);
        if (s) img.outerHTML = placeholderArt(s, +img.dataset.w, +img.dataset.h);
      },
      true
    );

    // Nav background + hero parallax
    const layers = [...document.querySelectorAll('#landscape .layer')].map((g) => ({ g, depth: +g.dataset.depth }));
    let ticking = false;
    window.addEventListener(
      'scroll',
      () => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(() => {
          ticking = false;
          const y = window.scrollY;
          el.nav.classList.toggle('is-scrolled', y > 40);
          if (reduceMotion || y > window.innerHeight * 1.2) return;
          layers.forEach(({ g, depth }) => (g.style.transform = `translateY(${f1(y * depth)}px)`));
          el.heroContent.style.opacity = Math.max(0, 1 - y / (window.innerHeight * 0.75));
          el.heroContent.style.transform = `translateY(${f1(y * 0.25)}px)`;
        });
      },
      { passive: true }
    );
  }

  /* ---------------------------------------------------------------------- */
  /* Start                                                                   */
  /* ---------------------------------------------------------------------- */

  drawHero();
  initMap();
  bindEvents();
  updateRangeFill();
  render({ fit: true, fresh: true });
  loadWeather(state.center);
  loadOsm();
})();
