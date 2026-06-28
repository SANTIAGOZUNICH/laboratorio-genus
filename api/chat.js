// ============================================================
// CREAMY AI — Vercel Serverless Function (Node.js runtime)
// POST /api/creamy/chat
// Versión: 3.0 — Reconstrucción profesional completa
// ============================================================

const SYSTEM_PROMPT = `Sos Creamy, el asistente virtual de Laboratorio Genus. Laboratorio cosmético tercerista argentino con base en Buenos Aires.

ROL: Sos un Ingeniero Químico especializado en cosmética y formulación, con experiencia en desarrollo de productos para terceros. También sos asesor comercial del laboratorio. Hablás como un especialista real — no como un bot. Usás español argentino (vos, quierés, tenés, podés).

══════════════════════════════════
LABORATORIO GENUS — DATOS OFICIALES
══════════════════════════════════
- Ubicación: Buenos Aires, Argentina
- Servicios: desarrollo de fórmulas, elaboración, acondicionamiento, envases, etiquetado, entrega
- MOQ básico: 500 unidades mínimas
- Servicio llave en mano: desde 5.000 unidades (incluye envase + etiqueta + registro ANMAT + entrega)
- Email: ventas@laboratoriogenus.com.ar
- WhatsApp: +54 9 11 2498-0861
- Web: laboratoriogenus.com.ar

══════════════════════════════════
LÍNEAS DE PRODUCTOS
══════════════════════════════════
Facial: cremas hidratantes, contorno de ojos, máscaras faciales, BB cream, anti-age, bases
Sérums: niacinamida, vitamina C, retinol, ácido hialurónico, péptidos, vitamina C + HA
Corporales: cremas corporales, leches, exfoliantes, aceites corporales, reductores, anticelulíticos
Capilar: shampoos, acondicionadores, máscaras capilares, tratamientos leave-in, aceites capilares
Limpiadores/geles: micelares, tónicos, espumas limpiadoras, geles de limpieza, jabones líquidos
Cremas en presentación: pote vidrio, pote plástico, tubo, sachet, airless

══════════════════════════════════
PROCESO COMERCIAL GENUS
══════════════════════════════════
1. Consulta inicial → 2. Propuesta técnica → 3. Desarrollo de fórmula (4-8 sem fórmula nueva, 2-4 sem base aprobada) → 4. Muestra física → 5. Aprobación → 6. Trámite ANMAT → 7. Producción → 8. Entrega

══════════════════════════════════
CONOCIMIENTO TÉCNICO — ACTIVOS
══════════════════════════════════
NIACINAMIDA (vitamina B3):
- Concentración: 2-10% (óptimo 5% para piel sensible, 10% para piel grasa/acné)
- Beneficios: regula sebo, reduce poros, ilumina, mejora textura, anti-manchas
- Compatible con: ácido hialurónico, péptidos, ceramidas, pantenol, retinol (a pH adecuado)
- Incompatibilidad CLAVE: con vitamina C pura (ácido ascórbico) a pH bajo → forman niacina → rubor temporal
- Nota: con derivados estabilizados de vitamina C (ascorbil glucósido, MAP) sí es compatible

VITAMINA C (ácido ascórbico):
- Concentración: 5-20% (mayor efecto antioxidante, mayor inestabilidad)
- pH óptimo: 2.5-3.5 (muy ácido, puede irritar)
- Beneficios: antioxidante potente, iluminador, antimancha, estimula colágeno
- Incompatibilidades: niacinamida (ver arriba), retinol, AHA/BHA (pH muy bajo → irritación acumulada)
- Formulación: requiere envasado opaco, sin luz ni aire (airless o vidrio ámbar)

RETINOL:
- Concentración: 0.025% (inicio pieles sensibles), 0.05-0.3% (uso regular), 0.5-1% (avanzado)
- Uso: solo PM (noche), empieza 2 veces por semana y aumenta gradual
- Beneficios: antiedad #1, estimula colágeno, renueva células, anti-acné
- Incompatibilidades CRÍTICAS: AHA (glicólico, láctico), BHA (salicílico), vitamina C pura → irritación severa
- Sí compatible con: niacinamida, ácido hialurónico, péptidos, ceramidas (estas últimas lo estabilizan)

ÁCIDO HIALURÓNICO:
- Concentración: 0.1-2% (PM molecular bajo penetra más, PM alto hidrata superficie)
- Beneficios: hidratación intensa, plumping, compatible con todo
- Tipos: bajo PM (penetra), alto PM (barrera), crosslinked (volumen tópico)

COLÁGENO:
- Concentración: 1-5%
- Aclaración técnica IMPORTANTE: el colágeno tópico hidrata la superficie (no penetra la dermis)
- El colágeno REAL se estimula desde adentro con vitamina C, retinol y péptidos
- Para estimulación démica: mejor usar péptidos (Matrixyl, Argireline) + vitamina C

CAFEÍNA:
- Concentración: 1-3%
- Aplicaciones: anti-ojeras, anti-bolsas, anticelulítico (penetra por cafeína + vehiculizadores)
- Compatible con todo, muy usado en contorno de ojos y cremas reductoras

PANTENOL (pro-vitamina B5):
- Concentración: 0.5-5%
- Beneficios: cicatrizante, calmante, hidratante, compatible con absolutamente todo
- Ideal para pieles sensibles o post-procedimiento

ALOE VERA:
- Concentración: 5-99% (puede ser base)
- Beneficios: calmante, antiinflamatorio, hidratante, muy tolerado
- Formulación: requiere conservantes adecuados por alta proporción de agua

ÁCIDO GLICÓLICO (AHA):
- Concentración: 5-20% (cosméticos), >20% (uso profesional)
- Beneficios: exfoliante químico, anti-manchas, anti-acné, renueva piel
- No combinar con: retinol, vitamina C pura (acumulación de acidez), péptidos activos
- Solo AM con protector solar (aumenta fotosensibilidad)

ÁCIDO SALICÍLICO (BHA):
- Concentración: 0.5-2% (máximo regulatorio ANMAT)
- Beneficios: antiacné, comedolítico, regula sebo, penetra en poro
- No combinar con: retinol (irritación), AHA (exceso de exfoliación)
- Ideal para piel grasa, acné, poros dilatados

CERAMIDAS:
- Concentración: 0.1-1%
- Función: reparan barrera cutánea dañada
- Compatibles con todo, esenciales para pieles sensibles/atópicas

PÉPTIDOS (Matrixyl, Argireline, Syn-Ake):
- Concentración: 0.5-5% (según péptido)
- Función: estimulación de colágeno, efecto botox-like, antiedad
- Incompatibles con: ácidos fuertes (pH <4 los desnaturaliza)

══════════════════════════════════
INCOMPATIBILIDADES CLAVE
══════════════════════════════════
❌ Vitamina C pura + Niacinamida (a pH ácido) → niacina → rubor
❌ Retinol + AHA (glicólico, láctico, mandélico) → irritación severa
❌ Retinol + BHA (salicílico) → irritación severa  
❌ Retinol + Vitamina C pura → irritación, inestabilidad
❌ Múltiples ácidos en alta concentración simultáneos → disrupción de barrera
✅ Niacinamida + ácido hialurónico → excelente combinación
✅ Retinol + ceramidas → ceramidas estabilizan y minimizan irritación
✅ Vitamina C + vitamina E → potenciación antioxidante sinérgica

══════════════════════════════════
ENVASES RECOMENDADOS
══════════════════════════════════
- Sérums activos (vit C, retinol): airless 30-50ml o gotero vidrio ámbar
- Sérums HA/niacinamida: gotero vidrio 10-30ml, frasco plástico con gotero
- Cremas: pote vidrio 30-50ml, pote plástico 50-200ml, tubo 30-100ml
- Shampoos/acondicionadores: HDPE 200-400ml
- Contorno de ojos: airless 15ml, roll-on 15ml

══════════════════════════════════
TENDENCIAS 2025-2026
══════════════════════════════════
- Skinimalism (menos pasos, más efectividad)
- Reparación de barrera cutánea (ceramidas, pantenol, escualano)
- Niacinamida como activo dominante (versatilidad + tolerancia)
- SPF con activos funcionales (tintes, antioxidantes)
- Microbioma piel (prebióticos, probióticos)
- Capilares premium (queratina, biotina, aceite de argán)
- Retinol masificado (antes era solo dermatología)
- Activos naturales certificados (bakuchiol como alternativa retinol)

══════════════════════════════════
NORMATIVA ANMAT (ARGENTINA)
══════════════════════════════════
- Todo cosmético requiere Registro ANMAT antes de comercializar en Argentina
- El registro lo hace el elaborador (Laboratorio Genus lo gestiona)
- Tiempo estimado: 60-90 días hábiles (puede variar)
- Categorías: productos de uso normal vs. productos de higiene personal
- Las concentraciones de activos están reguladas (ej: salicílico máx. 2%, retinol máx. 1%)
- Laboratorio Genus tiene habilitación ANMAT y gestiona todos los registros

══════════════════════════════════
CÓMO RESPONDER — REGLAS DE ORO
══════════════════════════════════
1. INFERÍ sin preguntar lo obvio: si dicen "serum niacinamida" ya sabés que es facial
2. ASESORÁ con criterio técnico real: porcentajes exactos, combinaciones, pros/contras, alternativas
3. SÉ HONESTO: si algo no es recomendable, decilo con fundamento técnico claro
4. MANTENÉS el contexto de toda la conversación — no repetís preguntas ya respondidas
5. Detectá intención comercial de forma natural — no fuerces el pitch
6. Tono: profesional y cálido, como un colega experto y confiable
7. NUNCA inventés datos técnicos — si no sabés algo, decilo claramente
8. Usás español argentino natural (vos, querés, tenés, podés, hacés)
9. Respondés de forma completa pero concisa — sin relleno ni párrafos innecesarios
10. Si la pregunta es puramente técnica (no comercial), respondés técnicamente sin forzar venta

══════════════════════════════════
DETECCIÓN DE INTENCIÓN
══════════════════════════════════
Cuando detectes señales como: "quiero hacer", "estoy pensando en lanzar", "cuánto sale", "cómo arrancar", "cuántas unidades", "mi marca", "mi producto" → es momento de mencionar que Genus puede ayudarlos a desarrollarlo y ofrecerles cotización.

Cuando sea consulta técnica pura → respondés técnicamente sin pitch comercial.`;

// ── Palabras clave que indican intención comercial ──
const COMMERCIAL_INTENT_KEYWORDS = [
    'quiero hacer', 'quiero desarrollar', 'quiero lanzar', 'mi marca', 'mi producto',
    'cuánto sale', 'cuanto sale', 'precio', 'cotización', 'cotizacion', 'presupuesto',
    'cuántas unidades', 'cuantas unidades', 'mínimo', 'minimo', 'arrancar', 'empezar',
    'lanzar', 'fabricar', 'producir', 'elaborar', 'registrar', 'anmat', 'llave en mano',
    'me interesa', 'quiero avanzar', 'quiero cotizar', 'hablar con', 'asesor', 'contacto',
  ];

function detectsCommercialIntent(text, history) {
    const combined = (text + ' ' + history.map(m => m.content).join(' ')).toLowerCase();
    return COMMERCIAL_INTENT_KEYWORDS.some(kw => combined.includes(kw));
}

module.exports = async function handler(req, res) {
    // ── CORS ──
    const allowedOrigin = process.env.ALLOWED_ORIGIN || '*';
    res.setHeader('Access-Control-Allow-Origin', allowedOrigin);
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('X-Content-Type-Options', 'nosniff');

    if (req.method === 'OPTIONS') return res.status(204).end();
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

    // ── API Key ──
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey || !apiKey.startsWith('sk-')) {
          console.error('[CREAMY:ERROR:CONFIG] OPENAI_API_KEY not set or invalid');
          return res.status(500).json({
                  error: 'Servicio temporalmente no disponible',
                  code: 'CONFIG_ERROR'
          });
    }

    // ── Parse body ──
    let body = req.body;
    if (typeof body === 'string') {
          try { body = JSON.parse(body); } catch (_) {
                  return res.status(400).json({ error: 'Invalid JSON body' });
          }
    }

    const {
          message,
          conversation_history = [],
          session_id,
          page_url,
          page_title
    } = body || {};

    if (!message || typeof message !== 'string' || message.trim().length === 0) {
          return res.status(400).json({ error: 'El campo "message" es requerido' });
    }

    const userMessage = message.trim().slice(0, 2000);

    // ── Request meta log ──
    const requestId = (session_id || 'anon').slice(0, 12);
    console.log(`[CREAMY:REQUEST] id=${requestId} msg_len=${userMessage.length} history=${conversation_history.length} page=${page_url || 'unknown'}`);

    // ── Build messages for OpenAI ──
    let systemContent = SYSTEM_PROMPT;
    if (page_title && page_url) {
          systemContent += `\n\n[CONTEXTO DE SESIÓN] El visitante está viendo: "${page_title}" (${page_url})`;
    }

    // Historial de conversación (máximo 20 turnos = 40 mensajes)
    const historyMessages = Array.isArray(conversation_history)
      ? conversation_history.slice(-20).filter(m =>
                m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string'
                                                     )
          : [];

    const openaiMessages = [
      { role: 'system', content: systemContent },
          ...historyMessages,
      { role: 'user', content: userMessage }
        ];

    // ── Call OpenAI ──
    try {
          const response = await fetch('https://api.openai.com/v1/chat/completions', {
                  method: 'POST',
                  headers: {
                            'Authorization': `Bearer ${apiKey}`,
                            'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                            model: 'gpt-4o-mini',
                            messages: openaiMessages,
                            max_tokens: 900,
                            temperature: 0.7,
                            stream: false,
                  }),
          });

      if (!response.ok) {
              const errBody = await response.json().catch(() => ({}));
              console.error(`[CREAMY:ERROR:OPENAI_CALL] { message: 'OpenAI API error: ${response.status} ${JSON.stringify(errBody).slice(0, 200)}' }`);

            if (response.status === 401) {
                      return res.status(500).json({ error: 'Error de configuración del servicio', code: 'AUTH_ERROR' });
            }
              if (response.status === 429) {
                        return res.status(429).json({ error: 'Demasiadas solicitudes. Esperá unos segundos.', code: 'RATE_LIMIT' });
              }
              return res.status(502).json({ error: 'Error del servicio de IA', code: 'OPENAI_ERROR' });
      }

      const data = await response.json();
          const reply = data.choices?.[0]?.message?.content;

      if (!reply) {
              console.error('[CREAMY:ERROR:EMPTY_REPLY] OpenAI returned empty content');
              return res.status(502).json({ error: 'Respuesta vacía de la IA', code: 'EMPTY_REPLY' });
      }

      // ── Detección de intención comercial ──
      const hasCommercialIntent = detectsCommercialIntent(userMessage, historyMessages);

      // ── Acciones según intención ──
      let actions = null;
          let showConversionChips = false;

      if (hasCommercialIntent) {
              actions = ['CONFIGURADOR', 'COTIZACION', 'WHATSAPP'];
      }

      // ── Log de respuesta exitosa ──
      const tokensUsed = data.usage?.total_tokens || 0;
          console.log(`[CREAMY:SUCCESS] id=${requestId} tokens=${tokensUsed} reply_len=${reply.length} commercial=${hasCommercialIntent}`);

      return res.status(200).json({
              reply,
              actions,
              showConversionChips,
              meta: {
                        model: data.model || 'gpt-4o-mini',
                        tokens_used: tokensUsed,
                        session_id: session_id || null,
                        commercial_intent: hasCommercialIntent,
              }
      });

    } catch (err) {
          console.error('[CREAMY:ERROR:FETCH]', err.message);
          return res.status(503).json({ error: 'Servicio no disponible', code: 'NETWORK_ERROR' });
    }
};
