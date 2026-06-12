/* ============================================================
   GENUS MOCKUPS v3 — Arquitectura de capas estricta
   
   FILL_COLORS: define únicamente el color del CONTENIDO INTERNO.
   Vidrio, reflejos, etiqueta, tapa → siempre igual, nunca cambian.
   ============================================================ */

/* ── FILL COLORS: solo para el contenido interno ── */
const FILL_COLORS = {
  Incoloro: { base:'rgba(225,242,248,0.28)', mid:'rgba(210,235,245,0.18)', edge:'rgba(195,225,240,0.32)', drop:'rgba(210,235,245,0.45)', surface:'rgba(220,240,248,0.22)' },
  Blanco:   { base:'rgba(248,249,252,0.88)', mid:'rgba(238,242,248,0.80)', edge:'rgba(225,232,242,0.72)', drop:'rgba(250,252,255,0.92)', surface:'rgba(252,254,255,0.85)' },
  Rosa:     { base:'rgba(252,182,206,0.82)', mid:'rgba(248,145,185,0.70)', edge:'rgba(240,100,155,0.60)', drop:'rgba(255,200,220,0.90)', surface:'rgba(255,215,230,0.75)' },
  Rojo:     { base:'rgba(225, 72, 82,0.80)', mid:'rgba(200, 48, 58,0.70)', edge:'rgba(170, 25, 35,0.62)', drop:'rgba(240,110,118,0.88)', surface:'rgba(245,130,135,0.72)' },
  Azul:     { base:'rgba( 88,162,235,0.78)', mid:'rgba( 55,128,215,0.68)', edge:'rgba( 30, 95,188,0.60)', drop:'rgba(140,195,248,0.88)', surface:'rgba(158,205,250,0.72)' },
  Amarillo: { base:'rgba(248,215, 42,0.82)', mid:'rgba(232,188,  8,0.72)', edge:'rgba(200,155,  0,0.62)', drop:'rgba(255,235,120,0.90)', surface:'rgba(255,240,140,0.75)' },
  Verde:    { base:'rgba( 65,188, 98,0.78)', mid:'rgba( 38,158, 70,0.68)', edge:'rgba( 18,125, 45,0.60)', drop:'rgba(125,218,148,0.88)', surface:'rgba(148,225,165,0.72)' },
  Lila:     { base:'rgba(172,102,230,0.78)', mid:'rgba(142, 68,208,0.68)', edge:'rgba(108, 38,178,0.60)', drop:'rgba(205,158,242,0.88)', surface:'rgba(218,172,245,0.72)' },
};

/* ============================================================
   SERUM — frasco cuadrado con hombros redondeados y gotero
   Inspirado en el estilo de la imagen de referencia:
   frasco corto, ancho, hombros curvos, tapa plateada + bulbo grande
   ============================================================ */
function svgSerum(color, size) {
  const c = FILL_COLORS[color] || FILL_COLORS['Incoloro'];
  const w = size, h = Math.round(size * 1.62);

  return `<svg width="${w}" height="${h}" viewBox="0 0 180 292" xmlns="http://www.w3.org/2000/svg">
<defs>
  <!-- clip para el interior del frasco (fill-layer solo vive aquí) -->
  <clipPath id="sr-fill-clip-${size}">
    <path d="M38,148 L38,252 Q38,264 50,264 L130,264 Q142,264 142,252 L142,148 Q142,136 130,136 L50,136 Q38,136 38,148 Z"/>
  </clipPath>
  <!-- clip para el cuello -->
  <clipPath id="sr-neck-clip-${size}">
    <rect x="72" y="102" width="36" height="36"/>
  </clipPath>
  <!-- gradiente del vidrio: bordes con tinte, centro claro -->
  <linearGradient id="sr-glass-grad-${size}" x1="0%" y1="0%" x2="100%" y2="0%">
    <stop offset="0%"   stop-color="#1a2a35" stop-opacity=".18"/>
    <stop offset="8%"   stop-color="#2a4050" stop-opacity=".08"/>
    <stop offset="35%"  stop-color="#e8f4f8" stop-opacity=".04"/>
    <stop offset="65%"  stop-color="#ddeef5" stop-opacity=".06"/>
    <stop offset="92%"  stop-color="#1e3040" stop-opacity=".10"/>
    <stop offset="100%" stop-color="#152030" stop-opacity=".20"/>
  </linearGradient>
  <!-- fondo de la sombra base -->
  <radialGradient id="sr-shadow-${size}" cx="50%" cy="50%" r="50%">
    <stop offset="0%"  stop-color="rgba(7,23,47,.28)"/>
    <stop offset="100%" stop-color="transparent"/>
  </radialGradient>
  <!-- gradiente tapa gotero (platino) -->
  <linearGradient id="sr-cap-${size}" x1="0%" y1="0%" x2="100%" y2="0%">
    <stop offset="0%"   stop-color="#6a7880"/>
    <stop offset="15%"  stop-color="#b8c8d0"/>
    <stop offset="38%"  stop-color="#e8f0f4"/>
    <stop offset="60%"  stop-color="#c0ced6"/>
    <stop offset="100%" stop-color="#5e6e78"/>
  </linearGradient>
  <!-- bulbo gotero -->
  <radialGradient id="sr-bulb-${size}" cx="35%" cy="28%" r="65%">
    <stop offset="0%"   stop-color="#f8fafc"/>
    <stop offset="45%"  stop-color="#dde8ee"/>
    <stop offset="100%" stop-color="#b0c4ce"/>
  </radialGradient>
</defs>

<!-- sombra base -->
<ellipse cx="90" cy="276" rx="62" ry="10" fill="url(#sr-shadow-${size})"/>

<!-- ══ GLASS LAYER — parte trasera (se dibuja primero) ══ -->
<!-- base / anillo inferior del frasco -->
<rect x="36" y="256" width="108" height="10" rx="5" fill="#b8cdd8" opacity=".35"/>
<!-- cuerpo vidrio — contorno exterior negro suave (como en la referencia) -->
<path d="M38,148 L38,252 Q38,264 50,264 L130,264 Q142,264 142,252 L142,148 Q142,136 130,136 L50,136 Q38,136 38,148 Z"
      fill="rgba(240,250,255,0.06)" stroke="#1e2e3a" stroke-width="2.2" stroke-linejoin="round"/>

<!-- ══ FILL LAYER — único que cambia de color ══ -->
<g clip-path="url(#sr-fill-clip-${size})">
  <!-- fondo base del líquido -->
  <rect x="38" y="136" width="104" height="128" fill="${c.base}"/>
  <!-- gradiente de profundidad: lado izquierdo más oscuro -->
  <rect x="38" y="136" width="22" height="128" fill="${c.edge}" opacity=".55"/>
  <!-- gradiente derecho -->
  <rect x="120" y="136" width="22" height="128" fill="${c.edge}" opacity=".35"/>
  <!-- superficie del líquido (menisco) -->
  <path d="M38,155 Q50,148 90,150 Q130,148 142,155" fill="${c.surface}" opacity=".80"/>
  <!-- brillo interno del líquido (no es el reflejo del vidrio) -->
  <ellipse cx="72" cy="160" rx="18" ry="4" fill="${c.surface}" opacity=".55" transform="rotate(-6,72,160)"/>
  <!-- tubo del gotero sumergido en el líquido -->
  <rect x="88" y="150" width="4" height="100" rx="2" fill="rgba(200,225,240,.22)"/>
  <!-- gota cayendo del tubo -->
  <path d="M90,230 Q90,242 87,248 Q84,252 90,255 Q96,252 93,248 Q90,242 90,230 Z" fill="${c.drop}" opacity=".88"/>
  <circle cx="90" cy="255" r="3.5" fill="${c.drop}" opacity=".80"/>
</g>

<!-- ══ GLASS LAYER — paredes encima del fill ══ -->
<!-- vidrio frontal (encima del fill, transparente con tinte mínimo) -->
<path d="M38,148 L38,252 Q38,264 50,264 L130,264 Q142,264 142,252 L142,148 Q142,136 130,136 L50,136 Q38,136 38,148 Z"
      fill="url(#sr-glass-grad-${size})"/>
<!-- bordes laterales gruesos vidrio (línea interior izq y der) -->
<line x1="52" y1="138" x2="52" y2="262" stroke="rgba(255,255,255,.12)" stroke-width="2"/>
<line x1="128" y1="138" x2="128" y2="262" stroke="rgba(0,20,40,.06)" stroke-width="2"/>

<!-- cuello frasco — vidrio -->
<g clip-path="url(#sr-neck-clip-${size})">
  <rect x="72" y="102" width="36" height="36" fill="${c.base}" opacity=".30"/>
  <rect x="72" y="102" width="36" height="36" fill="url(#sr-glass-grad-${size})"/>
</g>
<rect x="72" y="102" width="36" height="36" rx="3" fill="none" stroke="#1e2e3a" stroke-width="1.8"/>

<!-- hombros del frasco -->
<path d="M50,136 Q44,136 38,148 L38,148 Q44,138 50,138 Z" fill="rgba(30,48,60,.12)"/>
<path d="M130,136 Q136,136 142,148 L142,148 Q136,138 130,138 Z" fill="rgba(30,48,60,.08)"/>

<!-- ══ REFLECTION LAYER — fijo, nunca cambia ══ -->
<!-- reflejo frontal izquierdo (largo, cálido) -->
<rect x="44" y="142" width="8" height="114" rx="4" fill="white" opacity=".48"/>
<!-- reflejo secundario izquierdo -->
<rect x="55" y="148" width="3" height="88" rx="1.5" fill="white" opacity=".22"/>
<!-- brillo superior derecho -->
<ellipse cx="118" cy="148" rx="10" ry="3.5" fill="white" opacity=".30" transform="rotate(10,118,148)"/>
<!-- destello esquina superior izq -->
<ellipse cx="50" cy="140" rx="7" ry="4" fill="white" opacity=".55" transform="rotate(-15,50,140)"/>

<!-- ══ LABEL LAYER — fijo ══ -->
<rect x="46" y="180" width="88" height="58" rx="3" fill="white" opacity=".90"/>
<rect x="48" y="182" width="84" height="54" rx="2" fill="none" stroke="#ccc" stroke-width=".75"/>
<text x="90" y="203" text-anchor="middle" font-family="'Helvetica Neue',Arial,sans-serif" font-size="12" font-weight="300" letter-spacing="3.5" fill="#1a1a2e">SERUM</text>
<line x1="56" y1="210" x2="124" y2="210" stroke="#aaa" stroke-width=".75"/>
<text x="90" y="221" text-anchor="middle" font-family="'Helvetica Neue',Arial,sans-serif" font-size="6" letter-spacing="2.5" fill="#666">LABORATORIO</text>
<text x="90" y="230" text-anchor="middle" font-family="'Helvetica Neue',Arial,sans-serif" font-size="6" letter-spacing="2.5" fill="#666">GENUS</text>

<!-- ══ CAP LAYER — tapa platino + bulbo gotero, fijo ══ -->
<!-- anillo de rosca (collar platino) -->
<rect x="70" y="90" width="40" height="16" rx="5" fill="url(#sr-cap-${size})"/>
<rect x="72" y="92" width="7"  height="12" rx="3.5" fill="white" opacity=".28"/>
<rect x="70" y="90" width="40" height="3"  rx="1.5" fill="white" opacity=".22"/>
<rect x="70" y="103" width="40" height="3" rx="1" fill="rgba(80,100,110,.28)"/>
<!-- tubo fino del gotero (parte exterior, sobre la tapa) -->
<rect x="88.5" y="56" width="3" height="36" rx="1.5" fill="rgba(180,200,212,.70)"/>
<rect x="89.2" y="58" width="1.2" height="32" rx=".6" fill="white" opacity=".30"/>
<!-- bulbo goma — grande y redondeado como la referencia -->
<ellipse cx="90" cy="34" rx="18" ry="22" fill="url(#sr-bulb-${size})"/>
<ellipse cx="90" cy="33" rx="16" ry="20" fill="none" stroke="rgba(150,175,190,.50)" stroke-width="1"/>
<!-- brillo del bulbo -->
<ellipse cx="82" cy="24" rx="6"  ry="8" fill="white" opacity=".52" transform="rotate(-12,82,24)"/>
<ellipse cx="95" cy="20" rx="3"  ry="4" fill="white" opacity=".32" transform="rotate(8,95,20)"/>
<!-- base bulbo (unión con tubo) -->
<ellipse cx="90" cy="55" rx="10" ry="4" fill="rgba(160,185,198,.60)"/>
</svg>`;
}

/* ============================================================
   CREMA — pote cilíndrico de vidrio con crema visible encima
   ============================================================ */
function svgCrema(color, size) {
  const c = FILL_COLORS[color] || FILL_COLORS['Incoloro'];
  const w = size, h = Math.round(size * 0.82);

  return `<svg width="${w}" height="${h}" viewBox="0 0 260 214" xmlns="http://www.w3.org/2000/svg">
<defs>
  <clipPath id="cr-fill-clip-${size}">
    <rect x="20" y="94" width="220" height="96" rx="8"/>
  </clipPath>
  <clipPath id="cr-cream-clip-${size}">
    <ellipse cx="130" cy="86" rx="104" ry="38"/>
  </clipPath>
  <linearGradient id="cr-glass-${size}" x1="0%" y1="0%" x2="100%" y2="0%">
    <stop offset="0%"   stop-color="#1a2a35" stop-opacity=".20"/>
    <stop offset="9%"   stop-color="#2a3f50" stop-opacity=".08"/>
    <stop offset="40%"  stop-color="#ecf6fb" stop-opacity=".04"/>
    <stop offset="72%"  stop-color="#daeef6" stop-opacity=".07"/>
    <stop offset="91%"  stop-color="#1e3040" stop-opacity=".10"/>
    <stop offset="100%" stop-color="#142030" stop-opacity=".22"/>
  </linearGradient>
  <linearGradient id="cr-lid-${size}" x1="0%" y1="0%" x2="0%" y2="100%">
    <stop offset="0%"  stop-color="#f8fafb"/>
    <stop offset="40%" stop-color="#e4edf2"/>
    <stop offset="100%" stop-color="#ccd8e0"/>
  </linearGradient>
  <linearGradient id="cr-lid-rim-${size}" x1="0%" y1="0%" x2="100%" y2="0%">
    <stop offset="0%"   stop-color="#6a7a84"/>
    <stop offset="20%"  stop-color="#c2d0d8"/>
    <stop offset="48%"  stop-color="#eef4f8"/>
    <stop offset="74%"  stop-color="#b8c8d2"/>
    <stop offset="100%" stop-color="#60707a"/>
  </linearGradient>
  <radialGradient id="cr-shadow-${size}" cx="50%" cy="50%" r="50%">
    <stop offset="0%"  stop-color="rgba(7,23,47,.24)"/>
    <stop offset="100%" stop-color="transparent"/>
  </radialGradient>
</defs>

<!-- sombra base -->
<ellipse cx="130" cy="206" rx="94" ry="10" fill="url(#cr-shadow-${size})"/>

<!-- ══ GLASS LAYER — cuerpo trasero ══ -->
<rect x="20" y="94" width="220" height="96" rx="8"
      fill="rgba(230,248,255,0.05)" stroke="#1e2e3a" stroke-width="2"/>

<!-- ══ FILL LAYER — solo el contenido cambia ══ -->
<!-- CREMA dentro del pote (visible a través del vidrio) -->
<g clip-path="url(#cr-fill-clip-${size})">
  <rect x="20" y="94" width="220" height="96" fill="${c.base}"/>
  <!-- sombra lateral izq -->
  <rect x="20" y="94" width="28" height="96" fill="${c.edge}" opacity=".50"/>
  <!-- sombra lateral der -->
  <rect x="212" y="94" width="28" height="96" fill="${c.edge}" opacity=".32"/>
  <!-- tono base más oscuro en el fondo -->
  <rect x="20" y="165" width="220" height="25" fill="${c.edge}" opacity=".28"/>
</g>
<!-- CREMA ENCIMA del pote (copete, fuera de la clipPath del cuerpo) -->
<g clip-path="url(#cr-cream-clip-${size})">
  <!-- masa base de crema -->
  <ellipse cx="130" cy="92" rx="104" ry="36" fill="${c.base}"/>
  <!-- copete central -->
  <path d="M98,82 Q110,48 130,40 Q150,48 162,82 Q148,72 130,68 Q112,72 98,82 Z" fill="${c.surface}"/>
  <!-- sombra que da volumen al copete -->
  <path d="M72,88 Q98,62 130,56 Q162,62 188,88" fill="none" stroke="${c.edge}" stroke-width="10" stroke-opacity=".28" stroke-linecap="round"/>
  <path d="M88,94 Q112,74 130,68 Q148,74 172,94" fill="none" stroke="${c.edge}" stroke-width="6" stroke-opacity=".20" stroke-linecap="round"/>
  <!-- brillo superficie crema -->
  <ellipse cx="108" cy="54" rx="14" ry="6" fill="white" opacity=".42" transform="rotate(-18,108,54)"/>
  <ellipse cx="148" cy="50" rx="8"  ry="4" fill="white" opacity=".28" transform="rotate(10,148,50)"/>
</g>

<!-- ══ GLASS LAYER — paredes encima del fill ══ -->
<rect x="20" y="94" width="220" height="96" rx="8" fill="url(#cr-glass-${size})"/>
<!-- línea interna izq -->
<line x1="35" y1="96" x2="35" y2="188" stroke="rgba(255,255,255,.14)" stroke-width="2"/>
<!-- línea interna der -->
<line x1="225" y1="96" x2="225" y2="188" stroke="rgba(0,20,40,.06)" stroke-width="2"/>
<!-- escalón vidrio inferior -->
<rect x="20" y="175" width="220" height="4" rx="2" fill="rgba(30,48,62,.10)"/>
<!-- base pote -->
<rect x="22" y="182" width="216" height="8" rx="4" fill="rgba(30,48,62,.20)"/>

<!-- aro superior del pote (platino) -->
<rect x="18" y="86" width="224" height="14" rx="7" fill="url(#cr-lid-rim-${size})"/>
<rect x="20" y="88" width="12"  height="10" rx="5" fill="white" opacity=".28"/>
<rect x="18" y="86" width="224" height="3"  rx="1.5" fill="white" opacity=".22"/>

<!-- ══ REFLECTION LAYER — fijo ══ -->
<rect x="24" y="96" width="12" height="88" rx="6" fill="white" opacity=".44"/>
<rect x="38" y="100" width="4" height="72" rx="2" fill="white" opacity=".18"/>
<rect x="222" y="100" width="8" height="78" rx="4" fill="white" opacity=".18"/>
<ellipse cx="84" cy="90" rx="36" ry="4" fill="white" opacity=".42"/>

<!-- ══ LABEL LAYER — fijo ══ -->
<rect x="66" y="110" width="128" height="60" rx="3" fill="white" opacity=".90"/>
<rect x="68" y="112" width="124" height="56" rx="2" fill="none" stroke="#ccc" stroke-width=".75"/>
<text x="130" y="133" text-anchor="middle" font-family="'Helvetica Neue',Arial,sans-serif" font-size="15" font-weight="300" letter-spacing="4" fill="#1a1a2e">CREMA</text>
<line x1="78" y1="140" x2="182" y2="140" stroke="#aaa" stroke-width=".75"/>
<text x="130" y="152" text-anchor="middle" font-family="'Helvetica Neue',Arial,sans-serif" font-size="6.5" letter-spacing="2.5" fill="#666">LABORATORIO</text>
<text x="130" y="162" text-anchor="middle" font-family="'Helvetica Neue',Arial,sans-serif" font-size="6.5" letter-spacing="2.5" fill="#666">GENUS</text>

<!-- ══ CAP LAYER — tapa blanca, fija ══ -->
<ellipse cx="130" cy="74" rx="112" ry="22" fill="url(#cr-lid-${size})"/>
<ellipse cx="130" cy="70" rx="108" ry="17" fill="#f0f5f8"/>
<ellipse cx="130" cy="66" rx="102" ry="13" fill="white" opacity=".68"/>
<ellipse cx="106" cy="64" rx="24"  ry="7" fill="white" opacity=".52" transform="rotate(-16,106,64)"/>
<ellipse cx="152" cy="60" rx="15"  ry="4.5" fill="white" opacity=".36" transform="rotate(9,152,60)"/>
<rect x="18" y="86" width="224" height="3" rx="1.5" fill="rgba(80,100,112,.20)"/>
</svg>`;
}

/* ============================================================
   SHAMPOO — botella redondeada de vidrio con pump plateado
   ============================================================ */
function svgShampoo(color, size) {
  const c = FILL_COLORS[color] || FILL_COLORS['Incoloro'];
  const w = Math.round(size * 0.68), h = Math.round(size * 1.62);

  return `<svg width="${w}" height="${h}" viewBox="0 0 136 280" xmlns="http://www.w3.org/2000/svg">
<defs>
  <clipPath id="sh-fill-clip-${size}">
    <path d="M18,104 Q12,116 12,132 L12,242 Q12,254 22,254 L114,254 Q124,254 124,242 L124,132 Q124,116 118,104 Z"/>
  </clipPath>
  <linearGradient id="sh-glass-${size}" x1="0%" y1="0%" x2="100%" y2="0%">
    <stop offset="0%"   stop-color="#1a2a35" stop-opacity=".20"/>
    <stop offset="10%"  stop-color="#28404f" stop-opacity=".08"/>
    <stop offset="40%"  stop-color="#eaf6fb" stop-opacity=".04"/>
    <stop offset="70%"  stop-color="#d8eef6" stop-opacity=".06"/>
    <stop offset="90%"  stop-color="#1c2e3c" stop-opacity=".10"/>
    <stop offset="100%" stop-color="#142030" stop-opacity=".22"/>
  </linearGradient>
  <linearGradient id="sh-pump-${size}" x1="0%" y1="0%" x2="100%" y2="0%">
    <stop offset="0%"   stop-color="#6a7880"/>
    <stop offset="18%"  stop-color="#b8c8d2"/>
    <stop offset="42%"  stop-color="#e8f0f4"/>
    <stop offset="65%"  stop-color="#b0c0ca"/>
    <stop offset="100%" stop-color="#5e6e78"/>
  </linearGradient>
  <radialGradient id="sh-shadow-${size}" cx="50%" cy="50%" r="50%">
    <stop offset="0%"  stop-color="rgba(7,23,47,.24)"/>
    <stop offset="100%" stop-color="transparent"/>
  </radialGradient>
</defs>

<!-- sombra base -->
<ellipse cx="68" cy="268" rx="54" ry="9" fill="url(#sh-shadow-${size})"/>

<!-- ══ GLASS LAYER — cuerpo trasero ══ -->
<path d="M18,104 Q12,116 12,132 L12,242 Q12,254 22,254 L114,254 Q124,254 124,242 L124,132 Q124,116 118,104 Z"
      fill="rgba(228,246,254,0.05)" stroke="#1e2e3a" stroke-width="2.2" stroke-linejoin="round"/>

<!-- ══ FILL LAYER — solo el contenido cambia ══ -->
<g clip-path="url(#sh-fill-clip-${size})">
  <!-- fondo del líquido -->
  <path d="M18,104 Q12,116 12,132 L12,242 Q12,254 22,254 L114,254 Q124,254 124,242 L124,132 Q124,116 118,104 Z" fill="${c.base}"/>
  <!-- sombra lateral izq (volumen) -->
  <rect x="12" y="100" width="20" height="160" fill="${c.edge}" opacity=".52"/>
  <!-- sombra lateral der -->
  <rect x="104" y="100" width="20" height="160" fill="${c.edge}" opacity=".34"/>
  <!-- tono más oscuro en el fondo -->
  <rect x="12" y="218" width="112" height="36" fill="${c.edge}" opacity=".22"/>
  <!-- superficie del líquido -->
  <path d="M18,122 Q34,115 68,118 Q102,115 118,122" fill="${c.surface}" opacity=".72"/>
  <!-- tubo interior -->
  <rect x="66" y="118" width="4" height="118" rx="2" fill="rgba(200,225,240,.22)"/>
  <!-- burbujas internas -->
  <circle cx="42"  cy="150" r="3.2" fill="${c.surface}" opacity=".55"/>
  <circle cx="96"  cy="168" r="2.4" fill="${c.surface}" opacity=".45"/>
  <circle cx="35"  cy="188" r="2.0" fill="${c.surface}" opacity=".42"/>
  <circle cx="100" cy="208" r="2.8" fill="${c.surface}" opacity=".50"/>
  <circle cx="50"  cy="228" r="2.2" fill="${c.surface}" opacity=".40"/>
</g>

<!-- ══ GLASS LAYER — paredes encima del fill ══ -->
<path d="M18,104 Q12,116 12,132 L12,242 Q12,254 22,254 L114,254 Q124,254 124,242 L124,132 Q124,116 118,104 Z"
      fill="url(#sh-glass-${size})"/>
<!-- línea vidrio izq interior -->
<path d="M24,108 Q18,120 18,134 L18,242 Q18,252 26,254" fill="none" stroke="rgba(255,255,255,.16)" stroke-width="2" stroke-linecap="round"/>
<!-- línea vidrio der -->
<path d="M112,108 Q118,120 118,134 L118,242" fill="none" stroke="rgba(0,20,40,.06)" stroke-width="2" stroke-linecap="round"/>
<!-- hombros botella -->
<path d="M28,96 Q18,100 18,104 L118,104 Q118,100 108,96 Z" fill="rgba(30,48,60,.14)"/>
<!-- cuello -->
<rect x="50" y="60" width="36" height="38" rx="5"
      fill="rgba(228,246,254,0.10)" stroke="#1e2e3a" stroke-width="1.8"/>
<!-- anillo superior del cuello -->
<rect x="48" y="94" width="40" height="12" rx="4" fill="rgba(30,48,62,.18)"/>
<!-- base botella -->
<rect x="14" y="246" width="108" height="8" rx="4" fill="rgba(30,48,62,.25)"/>

<!-- ══ REFLECTION LAYER — fijo ══ -->
<path d="M16,112 Q13,124 13,136 L13,240 Q13,252 21,254" fill="none" stroke="white" stroke-width="9" stroke-opacity=".38" stroke-linecap="round"/>
<rect x="54" y="64" width="4" height="30" rx="2" fill="white" opacity=".35"/>
<ellipse cx="45" cy="100" rx="20" ry="4" fill="white" opacity=".32" transform="rotate(-8,45,100)"/>

<!-- ══ LABEL LAYER — fijo ══ -->
<rect x="20" y="142" width="96" height="68" rx="3" fill="white" opacity=".90"/>
<rect x="22" y="144" width="92" height="64" rx="2" fill="none" stroke="#ccc" stroke-width=".75"/>
<text x="68" y="166" text-anchor="middle" font-family="'Helvetica Neue',Arial,sans-serif" font-size="11" font-weight="300" letter-spacing="2.5" fill="#1a1a2e">SHAMPOO</text>
<line x1="30" y1="173" x2="106" y2="173" stroke="#aaa" stroke-width=".75"/>
<text x="68" y="185" text-anchor="middle" font-family="'Helvetica Neue',Arial,sans-serif" font-size="6" letter-spacing="2.5" fill="#666">LABORATORIO</text>
<text x="68" y="196" text-anchor="middle" font-family="'Helvetica Neue',Arial,sans-serif" font-size="6" letter-spacing="2.5" fill="#666">GENUS</text>

<!-- ══ CAP LAYER — pump platino, fijo ══ -->
<!-- collar platino -->
<rect x="46" y="48" width="44" height="16" rx="5" fill="url(#sh-pump-${size})"/>
<rect x="48" y="50" width="9"  height="12" rx="4.5" fill="white" opacity=".28"/>
<rect x="46" y="48" width="44" height="3"  rx="1.5" fill="white" opacity=".22"/>
<!-- tubo vertical pump -->
<rect x="63" y="8" width="10" height="42" rx="4" fill="url(#sh-pump-${size})"/>
<rect x="65" y="10" width="3" height="38" rx="1.5" fill="white" opacity=".28"/>
<!-- cabeza pump (horizontal) -->
<path d="M30,8 Q32,2 50,4 L74,6 Q78,6 78,12 L74,18 Q60,18 50,16 Q32,16 30,10 Z" fill="url(#sh-pump-${size})"/>
<rect x="34" y="6" width="10" height="6" rx="3" fill="white" opacity=".24"/>
<!-- punta pump -->
<ellipse cx="32" cy="10" rx="6" ry="5" fill="#b0c0ca"/>
<ellipse cx="32" cy="9"  rx="4" ry="3" fill="#ccd6de"/>
</svg>`;
}

/* ============================================================
   GEL — pote grande ancho de vidrio transparente
   ============================================================ */
function svgGel(color, size) {
  const c = FILL_COLORS[color] || FILL_COLORS['Incoloro'];
  const w = size, h = Math.round(size * 0.76);

  return `<svg width="${w}" height="${h}" viewBox="0 0 280 214" xmlns="http://www.w3.org/2000/svg">
<defs>
  <clipPath id="gl-fill-clip-${size}">
    <rect x="16" y="92" width="248" height="98" rx="10"/>
  </clipPath>
  <clipPath id="gl-gel-clip-${size}">
    <ellipse cx="140" cy="84" rx="120" ry="36"/>
  </clipPath>
  <linearGradient id="gl-glass-${size}" x1="0%" y1="0%" x2="100%" y2="0%">
    <stop offset="0%"   stop-color="#1a2a35" stop-opacity=".20"/>
    <stop offset="9%"   stop-color="#26404f" stop-opacity=".08"/>
    <stop offset="42%"  stop-color="#ecf7fb" stop-opacity=".04"/>
    <stop offset="74%"  stop-color="#d8edf5" stop-opacity=".07"/>
    <stop offset="91%"  stop-color="#1c2e3c" stop-opacity=".10"/>
    <stop offset="100%" stop-color="#142030" stop-opacity=".22"/>
  </linearGradient>
  <linearGradient id="gl-lid-${size}" x1="0%" y1="0%" x2="0%" y2="100%">
    <stop offset="0%"  stop-color="#f6f9fb"/>
    <stop offset="40%" stop-color="#e2ecf2"/>
    <stop offset="100%" stop-color="#c8d6e0"/>
  </linearGradient>
  <linearGradient id="gl-lid-rim-${size}" x1="0%" y1="0%" x2="100%" y2="0%">
    <stop offset="0%"   stop-color="#68787e"/>
    <stop offset="20%"  stop-color="#bcccd4"/>
    <stop offset="48%"  stop-color="#ecf3f7"/>
    <stop offset="74%"  stop-color="#b4c4cc"/>
    <stop offset="100%" stop-color="#5c6c74"/>
  </linearGradient>
  <radialGradient id="gl-shadow-${size}" cx="50%" cy="50%" r="50%">
    <stop offset="0%"  stop-color="rgba(7,23,47,.22)"/>
    <stop offset="100%" stop-color="transparent"/>
  </radialGradient>
</defs>

<!-- sombra base -->
<ellipse cx="140" cy="206" rx="108" ry="10" fill="url(#gl-shadow-${size})"/>

<!-- ══ GLASS LAYER — cuerpo trasero ══ -->
<rect x="16" y="92" width="248" height="98" rx="10"
      fill="rgba(230,248,255,0.05)" stroke="#1e2e3a" stroke-width="2.2"/>

<!-- ══ FILL LAYER — solo el contenido cambia ══ -->
<!-- GEL dentro del pote -->
<g clip-path="url(#gl-fill-clip-${size})">
  <rect x="16" y="92" width="248" height="98" fill="${c.base}"/>
  <rect x="16" y="92" width="32"  height="98" fill="${c.edge}" opacity=".50"/>
  <rect x="232" y="92" width="32" height="98" fill="${c.edge}" opacity=".32"/>
  <rect x="16" y="168" width="248" height="22" fill="${c.edge}" opacity=".24"/>
</g>
<!-- GEL EN LA SUPERFICIE (visible por encima del aro, ondulado) -->
<g clip-path="url(#gl-gel-clip-${size})">
  <ellipse cx="140" cy="90" rx="120" ry="34" fill="${c.base}"/>
  <!-- ondulaciones del gel -->
  <path d="M38,86 Q80,72 140,78 Q200,84 242,74" fill="none" stroke="${c.surface}" stroke-width="7" stroke-opacity=".60" stroke-linecap="round"/>
  <path d="M55,93 Q100,80 140,86 Q180,92 225,80" fill="none" stroke="${c.surface}" stroke-width="4" stroke-opacity=".44" stroke-linecap="round"/>
  <!-- burbujas en la superficie del gel -->
  <circle cx="88"  cy="80" r="4.5" fill="${c.surface}" opacity=".68"/>
  <circle cx="150" cy="76" r="3.2" fill="${c.surface}" opacity=".58"/>
  <circle cx="185" cy="82" r="2.8" fill="${c.surface}" opacity=".52"/>
  <circle cx="115" cy="88" r="2.2" fill="${c.surface}" opacity=".48"/>
  <circle cx="168" cy="88" r="4.0" fill="${c.surface}" opacity=".62"/>
  <!-- brillo gel -->
  <ellipse cx="106" cy="78" rx="24" ry="7" fill="white" opacity=".38" transform="rotate(-10,106,78)"/>
  <ellipse cx="162" cy="73" rx="15" ry="4.5" fill="white" opacity=".28" transform="rotate(7,162,73)"/>
</g>

<!-- ══ GLASS LAYER — paredes encima del fill ══ -->
<rect x="16" y="92" width="248" height="98" rx="10" fill="url(#gl-glass-${size})"/>
<!-- línea interna izq -->
<line x1="34" y1="94" x2="34" y2="188" stroke="rgba(255,255,255,.16)" stroke-width="2"/>
<!-- línea interna der -->
<line x1="246" y1="94" x2="246" y2="188" stroke="rgba(0,20,40,.06)" stroke-width="2"/>
<!-- escalones vidrio -->
<rect x="16" y="150" width="248" height="3" rx="1.5" fill="rgba(30,48,62,.08)"/>
<rect x="16" y="174" width="248" height="3" rx="1.5" fill="rgba(30,48,62,.10)"/>
<!-- base pote -->
<rect x="18" y="182" width="244" height="8" rx="4" fill="rgba(30,48,62,.22)"/>

<!-- aro superior platino -->
<rect x="14" y="82" width="252" height="16" rx="8" fill="url(#gl-lid-rim-${size})"/>
<rect x="16" y="84" width="14"  height="12" rx="6" fill="white" opacity=".28"/>
<rect x="14" y="82" width="252" height="3"  rx="1.5" fill="white" opacity=".20"/>

<!-- ══ REFLECTION LAYER — fijo ══ -->
<rect x="20" y="94" width="16" height="90" rx="8" fill="white" opacity=".42"/>
<rect x="38" y="98" width="5"  height="76" rx="2.5" fill="white" opacity=".18"/>
<rect x="240" y="98" width="10" height="78" rx="5" fill="white" opacity=".16"/>
<ellipse cx="92" cy="87" rx="44" ry="4" fill="white" opacity=".44"/>

<!-- ══ LABEL LAYER — fijo ══ -->
<rect x="80" y="108" width="120" height="60" rx="3" fill="white" opacity=".90"/>
<rect x="82" y="110" width="116" height="56" rx="2" fill="none" stroke="#ccc" stroke-width=".75"/>
<text x="140" y="131" text-anchor="middle" font-family="'Helvetica Neue',Arial,sans-serif" font-size="14" font-weight="300" letter-spacing="4" fill="#1a1a2e">GEL</text>
<line x1="92" y1="138" x2="188" y2="138" stroke="#aaa" stroke-width=".75"/>
<text x="140" y="150" text-anchor="middle" font-family="'Helvetica Neue',Arial,sans-serif" font-size="6.5" letter-spacing="2.5" fill="#666">LABORATORIO</text>
<text x="140" y="161" text-anchor="middle" font-family="'Helvetica Neue',Arial,sans-serif" font-size="6.5" letter-spacing="2.5" fill="#666">GENUS</text>

<!-- ══ CAP LAYER — tapa blanca amplia, fija ══ -->
<ellipse cx="140" cy="68" rx="128" ry="24" fill="url(#gl-lid-${size})"/>
<ellipse cx="140" cy="63" rx="124" ry="19" fill="#eff5f8"/>
<ellipse cx="140" cy="59" rx="118" ry="14" fill="white" opacity=".68"/>
<ellipse cx="114" cy="57" rx="30"  ry="8"  fill="white" opacity=".52" transform="rotate(-15,114,57)"/>
<ellipse cx="162" cy="53" rx="18"  ry="5"  fill="white" opacity=".36" transform="rotate(9,162,53)"/>
<!-- aro inferior tapa -->
<rect x="14" y="82" width="252" height="3" rx="1.5" fill="rgba(75,95,108,.22)"/>
</svg>`;
}

/* ── API pública ── */
window.GENUS_MOCKUP = {
  getSVG(producto, color, size) {
    const s = size || 200;
    const col = color || 'Incoloro';
    switch(producto) {
      case 'Serum':   return svgSerum(col, s);
      case 'Crema':   return svgCrema(col, s);
      case 'Shampoo': return svgShampoo(col, s);
      case 'Gel':     return svgGel(col, s);
      default:        return svgCrema(col, s);
    }
  },
  FILL_COLORS,
};
