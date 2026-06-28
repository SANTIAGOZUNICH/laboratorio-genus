// CREAMY AI v3.0 — Vercel Serverless API
// POST /api/creamy/chat

const SYSTEM_PROMPT = `Sos Creamy, asistente virtual de Laboratorio Genus (Buenos Aires, Argentina).

ROL: Ingeniero Quimico especializado en cosmetica y formulacion. Asesor comercial. Hablas como experto real, NO como bot. Espanol argentino.

LABORATORIO GENUS:
- MOQ: 500 unidades. Llave en mano desde 5.000 unidades (envase+etiqueta+ANMAT+entrega)
- Email: ventas@laboratoriogenus.com.ar | WhatsApp: +54 9 11 2498-0861
- Servicios: desarrollo formulas, elaboracion, acondicionamiento, envases, registro ANMAT
- Proceso: Consulta > Desarrollo (4-8 sem nueva, 2-4 sem base aprobada) > Muestra > ANMAT > Produccion > Entrega

LINEAS: Facial (cremas, serums, contorno ojos, BB cream, anti-age) | Corporal (cremas, leches, reductores) | Capilar (shampoos, mascaras, tratamientos) | Limpiadores (micelares, espumas, tonicos)

ACTIVOS CLAVE:
- NIACINAMIDA: 2-10%, regula sebo, ilumina. INCOMPATIBLE con Vit C pura a pH bajo
- VITAMINA C: 5-20%, pH 2.5-3.5, antioxidante. INCOMPATIBLE con niacinamida, retinol, AHA/BHA
- RETINOL: 0.025-1%, antiedad PM. INCOMPATIBLE con AHA, BHA, Vit C pura. Compatible con HA, ceramidas
- AC HIALURONICO: 0.1-2%, hidratante, compatible con TODO
- COLAGENO: 1-5%, hidrata superficie (NO penetra dermis - el real se estimula con Vit C + retinol + peptidos)
- CAFEINA: 1-3%, anti-ojeras, anticelultico
- PANTENOL: 0.5-5%, cicatrizante, compatible con todo
- ACIDO GLICOLICO (AHA): 5-20%, exfoliante. NO con retinol
- ACIDO SALICILICO (BHA): 0.5-2%, antiacne. NO con retinol
- CERAMIDAS: 0.1-1%, reparan barrera. Compatible con todo
- PEPTIDOS: 0.5-5%, antiedad. NO con acidos fuertes

ENVASES: Serums activos -> airless o gotero vidrio ambar | Cremas -> pote vidrio/plastico, tubo | Shampoos -> HDPE 200-400ml

TENDENCIAS 2025: Skinimalism, barrera (ceramidas), niacinamida dominante, SPF activo, microbioma, capilares premium, bakuchiol (alternativa retinol)

ANMAT: Registro obligatorio. Genus lo gestiona (60-90 dias habiles). Tiene habilitacion ANMAT.

REGLAS:
1. Inferi sin preguntar lo obvio (serum niacinamida = facial, no preguntes zona)
2. Asesora con criterio: porcentajes exactos, combinaciones, pros/contras
3. Se honesto: si algo no es recomendable, decilo con fundamento
4. Mantene contexto: no repitas preguntas ya respondidas
5. Detecta intencion comercial natural — no fuerces pitch
6. Tono profesional y calido, como colega experto
7. NUNCA inventes datos — si no sabes algo, decilo
8. Espanol argentino (vos, queres, tenes, podes)`;

const COMMERCIAL_KEYWORDS = ['quiero hacer','quiero desarrollar','quiero lanzar','mi marca','mi producto','cuanto sale','precio','cotizacion','presupuesto','cuantas unidades','minimo','arrancar','fabricar','producir','elaborar','registrar','anmat','llave en mano','me interesa','quiero avanzar','quiero cotizar','hablar con asesor'];

function hasCommercialIntent(text, history) {
  const combined = (text + ' ' + history.map(m => m.content || '').join(' ')).toLowerCase();
  return COMMERCIAL_KEYWORDS.some(kw => combined.includes(kw));
}

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', process.env.ALLOWED_ORIGIN || '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey || !apiKey.startsWith('sk-')) {
    console.error('[CREAMY:ERROR:CONFIG] OPENAI_API_KEY missing or invalid');
    return res.status(500).json({ error: 'Servicio no disponible', code: 'CONFIG_ERROR' });
  }

  let body = req.body;
  if (typeof body === 'string') { try { body = JSON.parse(body); } catch(_) { return res.status(400).json({error:'Invalid JSON'}); } }

  const { message, conversation_history = [], session_id, page_url, page_title } = body || {};
  if (!message || !message.trim()) return res.status(400).json({ error: 'message requerido' });

  const userMsg = message.trim().slice(0, 2000);
  const rid = (session_id || 'anon').slice(0, 12);
  console.log(`[CREAMY:REQUEST] id=${rid} len=${userMsg.length} history=${conversation_history.length}`);

  let sysContent = SYSTEM_PROMPT;
  if (page_title) sysContent += `\n\n[PAGINA ACTUAL]: "${page_title}"`;

  const history = Array.isArray(conversation_history)
    ? conversation_history.slice(-20).filter(m => m && ['user','assistant'].includes(m.role) && typeof m.content === 'string')
    : [];

  const messages = [
    { role: 'system', content: sysContent },
    ...history,
    { role: 'user', content: userMsg }
  ];

  try {
    const oRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ model: 'gpt-4o-mini', messages, max_tokens: 900, temperature: 0.7 })
    });

    if (!oRes.ok) {
      const err = await oRes.json().catch(() => ({}));
      console.error(`[CREAMY:ERROR:OPENAI_CALL] { message: 'OpenAI API error: ${oRes.status} ${JSON.stringify(err).slice(0,200)}' }`);
      if (oRes.status === 401) return res.status(500).json({ error: 'Error config', code: 'AUTH_ERROR' });
      if (oRes.status === 429) return res.status(429).json({ error: 'Rate limit', code: 'RATE_LIMIT' });
      return res.status(502).json({ error: 'Error IA', code: 'OPENAI_ERROR' });
    }

    const data = await oRes.json();
    const reply = data.choices?.[0]?.message?.content;
    if (!reply) return res.status(502).json({ error: 'Respuesta vacia', code: 'EMPTY_REPLY' });

    const commercial = hasCommercialIntent(userMsg, history);
    const tokens = data.usage?.total_tokens || 0;
    console.log(`[CREAMY:SUCCESS] id=${rid} tokens=${tokens} commercial=${commercial}`);

    return res.status(200).json({
      reply,
      actions: commercial ? ['CONFIGURADOR','COTIZACION','WHATSAPP'] : null,
      showConversionChips: false,
      meta: { model: 'gpt-4o-mini', tokens_used: tokens, commercial_intent: commercial }
    });

  } catch(err) {
    console.error('[CREAMY:ERROR:FETCH]', err.message);
    return res.status(503).json({ error: 'Servicio no disponible', code: 'NETWORK_ERROR' });
  }
};
