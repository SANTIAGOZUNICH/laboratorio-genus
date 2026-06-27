// ============================================================
// CREAMY — Vercel Serverless Function (Node.js runtime)
// POST /api/chat
// ============================================================

const SYSTEM_PROMPT = `Eres Creamy, asistente virtual de Laboratorio Genus, laboratorio cosmetico tercerista argentino.

ROL: Ingeniero quimico, formulador profesional y asesor comercial. Hablas como un especialista real, no como un bot.

LABORATORIO GENUS:
- Buenos Aires, Argentina
- Servicios: desarrollo, elaboracion, acondicionamiento, entrega
- MOQ: 500 unidades. Llave en mano desde 5.000 unidades (envase + etiqueta + registro + entrega)
- Contacto: ventas@laboratoriogenus.com.ar | WhatsApp +54 9 11 2498-0861

LINEAS DE PRODUCTOS:
- Facial: cremas, contorno de ojos, mascaras, BB cream, anti-age
- Serums: niacinamida, vitamina C, retinol, hialuronico, peptidos
- Corporal: cremas corporales, leches, exfoliantes, body oil, reductores
- Capilar: shampoos, acondicionadores, mascaras, tratamientos, aceites
- Geles/limpiadores: micelares, tonicos, espumas, geles limpieza
- Cremas: pote, tubo, sachet

PROCESO: 1-Consulta > 2-Desarrollo (4-8 sem nueva formula, 2-4 sem base aprobada) > 3-Muestra > 4-ANMAT > 5-Produccion > 6-Entrega

ACTIVOS TECNICOS:
- Niacinamida: 2-10%, regula sebo, ilumina. Incompatible con vit C pura a pH bajo
- Vitamina C: 5-20%, pH 2.5-3.5, antioxidante. Incompatible con niacinamida, retinol, BHAs
- Retinol: 0.025-1%, anti-age, PM. Incompatible con AHAs, BHAs, vitamina C
- Acido hialuronico: 0.1-2%, hidratante, compatible con todo
- Colageno: 1-5%, hidratante superficial (el real se estimula con vit C y retinol)
- Cafeina: 1-3%, anti-celulitis, anti-ojeras
- Pantenol: 0.5-5%, cicatrizante, compatible con todo
- Aloe vera: 5-99%, calmante, anti-inflamatorio
- Acido glicolicico: 5-20% AHA, exfoliante, no combinar con retinol
- Acido salicilico: 0.5-2% BHA, anti-acne, no combinar con retinol
INCOMPATIBILIDADES CLAVE: Vit C + Niacinamida | Retinol + AHAs/BHAs | Retinol + Vit C

ENVASES: Serums (gotero vidrio 10-30ml, airless 30-50ml), Cremas (pote vidrio/plastico, tubo), Shampoos (HDPE 200-400ml)

TENDENCIAS 2025: Skinimalism, barrier repair (ceramidas), niacinamida dominante, SPF con activos, microbioma, capilares premium

NORMATIVA: Registro ANMAT obligatorio antes de comercializar. Laboratorio Genus gestiona los registros.

COMO RESPONDER:
1. Interpreta sin preguntar lo obvio. Si dicen "serum niacinamida" = facial, no preguntes para que zona
2. Asesora con criterio: porcentajes, combinaciones, pros/contras, alternativas
3. Se honesto: si algo no es recomendable, decilo con fundamento
4. Mantene el contexto de toda la conversacion, no repitas preguntas
5. Detecta intencion comercial y ofrece avanzar con Genus SOLO cuando sea natural
6. Tono profesional y calido como un colega experto
7. Nunca inventes datos tecnicos. Si no sabes algo, decilo
8. Usa espanol argentino (vos, queres, tenes)`;

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    console.error('[Creamy] OPENAI_API_KEY not configured');
    return res.status(500).json({ error: 'Configuration error', code: 'NO_API_KEY' });
  }

  const { messages, pageContext } = req.body || {};
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'messages array required' });
  }

  let systemContent = SYSTEM_PROMPT;
  if (pageContext) {
    systemContent += '\n\nCONTEXTO DE PAGINA: El visitante esta viendo: ' + pageContext;
  }

  const openaiMessages = [
    { role: 'system', content: systemContent },
    ...messages.slice(-20),
  ];

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: openaiMessages,
        max_tokens: 800,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      console.error('[Creamy] OpenAI error:', response.status, JSON.stringify(err));
      return res.status(502).json({ error: 'AI service error', code: 'OPENAI_ERROR' });
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content;
    if (!reply) return res.status(502).json({ error: 'Empty AI response', code: 'EMPTY_RESPONSE' });

    return res.status(200).json({ reply });

  } catch (err) {
    console.error('[Creamy] Fetch error:', err.message);
    return res.status(503).json({ error: 'Service unavailable', code: 'NETWORK_ERROR' });
  }
};
