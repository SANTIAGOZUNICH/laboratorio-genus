/* ============================================================
   CREAMY — Widget JS v2.0
   Asistente Virtual de Laboratorio Genus
   Sin dependencias externas. Vanilla JS.
   ============================================================ */

(function() {
  'use strict';

  /* ── Configuracion ── */
  const CFG = {
    API_URL: '/api/chat',
    STORAGE_KEY: 'creamy_session',
    MAX_HISTORY: 20,
    TYPING_DELAY: 600,
  };

  /* ── Contextos por pagina ── */
  const PAGE_CONTEXTS = {
    'index': 'Pagina de inicio de Laboratorio Genus - presenta los servicios generales',
    'quienes-somos': 'Pagina "Quienes Somos" - historia y valores del laboratorio',
    'productos': 'Pagina de productos - lineas de productos disponibles (facial, capilar, corporal, serums, geles)',
    'desarrolla-tu-producto': 'Pagina de desarrollo personalizado - el visitante esta diseñando su propio producto cosmético',
    'llave-en-mano': 'Pagina de servicio Llave en Mano - servicio completo desde 5000 unidades',
    'calidad': 'Pagina de calidad - certificaciones y procesos de control de calidad',
    'contacto': 'Pagina de contacto - el visitante quiere comunicarse con el laboratorio',
    'cotizador': 'Cotizador - el visitante esta solicitando una cotizacion',
  };

  /* ── Detectar pagina actual ── */
  function getPageContext() {
    const path = window.location.pathname;
    const file = path.split('/').pop().replace('.html', '') || 'index';
    return PAGE_CONTEXTS[file] || PAGE_CONTEXTS['index'];
  }

  /* ── Mensajes de bienvenida segun pagina ── */
  const WELCOME_MSGS = {
    'index': '¡Hola! Soy **Creamy**, tu asesor de Laboratorio Genus. ¿Tenés una idea para un producto cosmético? ¡Te ayudo a hacerlo realidad!',
    'productos': '¡Hola! Estás viendo nuestros productos. ¿Querés saber más sobre alguna línea o activo en particular?',
    'desarrolla-tu-producto': '¡Perfecto! Estás en el lugar indicado para crear tu producto. ¿Qué producto querés desarrollar?',
    'llave-en-mano': '¡Hola! El servicio Llave en Mano es ideal si querés lanzar tu marca sin complicaciones. ¿Te cuento cómo funciona?',
    'cotizador': '¡Hola! Puedo ayudarte antes de solicitar la cotización. ¿Tenés dudas sobre el desarrollo o los costos?',
    'default': '¡Hola! Soy **Creamy**, especialista de Laboratorio Genus. ¿En qué puedo ayudarte hoy?',
  };

  function getWelcomeMsg() {
    const path = window.location.pathname;
    const file = path.split('/').pop().replace('.html', '') || 'index';
    return WELCOME_MSGS[file] || WELCOME_MSGS['default'];
  }

  /* ── Sugerencias iniciales ── */
  const INITIAL_CHIPS = [
    '¿Qué es un serum?',
    '¿Cuál es el MOQ?',
    'Quiero lanzar mi marca',
    '¿Cuánto demora el desarrollo?',
  ];

  /* ── Estado ── */
  let state = {
    open: false,
    messages: [],
    loading: false,
    tooltipShown: false,
    firstOpen: true,
  };

  /* ── HTML del widget ── */
  function buildHTML() {
    return `
    <div class="cr-widget" id="crWidget">
      <!-- Tooltip bienvenida -->
      <div class="cr-tooltip" id="crTooltip" style="display:none">
        👋 ¡Hola! Soy Creamy, tu asesor cosmético de Laboratorio Genus.
      </div>

      <!-- Panel de chat -->
      <div class="cr-panel" id="crPanel" style="display:none">
        <!-- Header -->
        <div class="cr-header">
          <div class="cr-header-avatar">
            <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="18" cy="13" r="8" fill="white" opacity=".9"/>
              <circle cx="15" cy="11" r="1.8" fill="#169ab0" class="cr-eye"/>
              <circle cx="21" cy="11" r="1.8" fill="#169ab0" class="cr-eye"/>
              <path d="M14.5 14.5 Q18 17 21.5 14.5" stroke="#169ab0" stroke-width="1.5" fill="none" stroke-linecap="round"/>
              <ellipse cx="18" cy="28" rx="10" ry="6" fill="white" opacity=".7"/>
            </svg>
          </div>
          <div class="cr-header-info">
            <div class="cr-header-name">Creamy</div>
            <div class="cr-header-sub">
              <span class="cr-online-dot"></span>
              Asesor de Laboratorio Genus
            </div>
          </div>
          <button class="cr-header-close" id="crClose" aria-label="Cerrar chat">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        <!-- Mensajes -->
        <div class="cr-messages" id="crMessages"></div>

        <!-- Input -->
        <div class="cr-input-area">
          <div class="cr-input-wrap">
            <textarea class="cr-input" id="crInput" 
              placeholder="Escribí tu consulta..." 
              rows="1" 
              maxlength="1000"
              aria-label="Mensaje para Creamy"></textarea>
          </div>
          <button class="cr-send-btn" id="crSend" aria-label="Enviar mensaje">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"/>
              <polygon points="22 2 15 22 11 13 2 9 22 2"/>
            </svg>
          </button>
        </div>

        <!-- Footer -->
        <div class="cr-footer">
          <a href="https://wa.me/5491124980861" target="_blank">WhatsApp</a> · 
          <a href="mailto:ventas@laboratoriogenus.com.ar">Email</a>
        </div>
      </div>

      <!-- Avatar flotante -->
      <div class="cr-avatar-wrap" id="crAvatarWrap">
        <div class="cr-pulse-ring"></div>
        <div class="cr-avatar" id="crAvatar">
          <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="18" cy="13" r="8" fill="white" opacity=".9"/>
            <ellipse cx="15" cy="11.5" rx="1.8" ry="1.8" fill="#169ab0" class="cr-eye"/>
            <ellipse cx="21" cy="11.5" rx="1.8" ry="1.8" fill="#169ab0" class="cr-eye"/>
            <path d="M14.5 15 Q18 17.5 21.5 15" stroke="#169ab0" stroke-width="1.5" fill="none" stroke-linecap="round"/>
            <ellipse cx="18" cy="28" rx="10" ry="6" fill="white" opacity=".7"/>
          </svg>
        </div>
        <div class="cr-hand" id="crHand">👋</div>
      </div>
    </div>`;
  }

  /* ── Render de mensajes ── */
  function renderMsg(role, text, isWelcome) {
    const isBot = role === 'assistant';
    const div = document.createElement('div');
    div.className = 'cr-msg cr-msg-' + (isBot ? 'bot' : 'user');

    if (isBot) {
      div.innerHTML = `
        <div class="cr-msg-avatar">
          <svg viewBox="0 0 20 20" fill="none">
            <circle cx="10" cy="7" r="4.5" fill="white" opacity=".9"/>
            <ellipse cx="8.5" cy="6" rx="1" ry="1" fill="#169ab0"/>
            <ellipse cx="11.5" cy="6" rx="1" ry="1" fill="#169ab0"/>
            <path d="M8 8.5 Q10 10 12 8.5" stroke="#169ab0" stroke-width="1" fill="none" stroke-linecap="round"/>
          </svg>
        </div>
        <div class="cr-bubble">${formatText(text)}</div>`;
    } else {
      div.innerHTML = `<div class="cr-bubble">${escapeHtml(text)}</div>`;
    }

    return div;
  }

  function formatText(text) {
    // Convertir markdown basico a HTML
    return escapeHtml(text)
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`(.*?)`/g, '<code style="background:#f0f7f9;padding:2px 6px;border-radius:4px;font-size:12px">$1</code>')
      .replace(/\n/g, '<br>');
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  /* ── Agregar mensaje al chat ── */
  function addMsg(role, text, extra) {
    const container = document.getElementById('crMessages');
    if (!container) return;

    const msgEl = renderMsg(role, text);
    container.appendChild(msgEl);

    // CTAs comerciales opcionales
    if (extra && extra.showCTA) {
      const ctaRow = document.createElement('div');
      ctaRow.className = 'cr-cta-row';
      ctaRow.innerHTML = `
        <a href="/cotizador.html" class="cr-cta-btn cr-cta-primary">
          📋 Solicitar cotización
        </a>
        <a href="https://wa.me/5491124980861" target="_blank" class="cr-cta-btn cr-cta-secondary">
          💬 WhatsApp
        </a>`;
      container.appendChild(ctaRow);
    }

    // Scroll al final
    container.scrollTop = container.scrollHeight;

    return msgEl;
  }

  /* ── Chips de sugerencias ── */
  function addChips(chips) {
    const container = document.getElementById('crMessages');
    if (!container) return;

    const row = document.createElement('div');
    row.className = 'cr-suggestions';
    row.innerHTML = chips.map(c =>
      `<button class="cr-chip" onclick="window.__creamy.sendChip(this, '${c.replace(/'/g, "\\'")}')">${c}</button>`
    ).join('');
    container.appendChild(row);
    container.scrollTop = container.scrollHeight;
  }

  /* ── Bienvenida inicial ── */
  function showWelcome() {
    const container = document.getElementById('crMessages');
    if (!container) return;

    // Mensaje de bienvenida
    const welcomeDiv = document.createElement('div');
    welcomeDiv.className = 'cr-welcome';
    const msg = getWelcomeMsg();
    welcomeDiv.innerHTML = '<strong>¡Hola! Soy Creamy 👋</strong>' + formatText(msg.replace('¡Hola! Soy **Creamy**, ', ''));
    container.appendChild(welcomeDiv);

    // Chips iniciales
    setTimeout(() => addChips(INITIAL_CHIPS), 400);
  }

  /* ── Typing indicator ── */
  function showTyping() {
    const container = document.getElementById('crMessages');
    if (!container) return;

    const div = document.createElement('div');
    div.className = 'cr-typing';
    div.id = 'crTyping';
    div.innerHTML = `
      <div class="cr-msg-avatar">
        <svg viewBox="0 0 20 20" fill="none">
          <circle cx="10" cy="7" r="4.5" fill="white" opacity=".9"/>
          <ellipse cx="8.5" cy="6" rx="1" ry="1" fill="#169ab0"/>
          <ellipse cx="11.5" cy="6" rx="1" ry="1" fill="#169ab0"/>
        </svg>
      </div>
      <div class="cr-typing-bubble">
        <div class="cr-typing-dot"></div>
        <div class="cr-typing-dot"></div>
        <div class="cr-typing-dot"></div>
      </div>`;
    container.appendChild(div);
    container.scrollTop = container.scrollHeight;
  }

  function hideTyping() {
    const el = document.getElementById('crTyping');
    if (el) el.remove();
  }

  /* ── Detectar intencion comercial ── */
  function hasCommercialIntent(text) {
    const keywords = ['precio', 'costo', 'cotizacion', 'presupuesto', 'fabricar', 'producir',
      'lanzar', 'marca', 'muestras', 'pedido', 'cuanto sale', 'cuanto cuesta',
      'quiero hacer', 'quiero desarrollar', 'quiero fabricar', 'cuanto demora'];
    const lower = text.toLowerCase();
    return keywords.some(k => lower.includes(k));
  }

  /* ── Enviar mensaje a la API ── */
  async function sendMessage(userText) {
    if (state.loading || !userText.trim()) return;

    state.loading = true;
    const btn = document.getElementById('crSend');
    const input = document.getElementById('crInput');
    if (btn) btn.disabled = true;
    if (input) { input.value = ''; input.style.height = 'auto'; }

    // Mostrar mensaje del usuario
    addMsg('user', userText);

    // Guardar en historial
    state.messages.push({ role: 'user', content: userText });
    if (state.messages.length > CFG.MAX_HISTORY) {
      state.messages = state.messages.slice(-CFG.MAX_HISTORY);
    }

    // Mostrar typing
    setTimeout(() => showTyping(), 300);

    try {
      const response = await fetch(CFG.API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: state.messages,
          pageContext: getPageContext(),
        }),
      });

      hideTyping();

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.code || 'HTTP_' + response.status);
      }

      const data = await response.json();
      const reply = data.reply;

      if (!reply) throw new Error('EMPTY_REPLY');

      // Guardar respuesta en historial
      state.messages.push({ role: 'assistant', content: reply });

      // Detectar intencion comercial
      const showCTA = hasCommercialIntent(userText) || hasCommercialIntent(reply);

      // Mostrar respuesta
      addMsg('assistant', reply, { showCTA });

    } catch (err) {
      hideTyping();
      console.error('[Creamy] Error:', err.message);

      // Mensajes de error inteligentes
      let errMsg = 'Lo siento, tuve un problema temporal. Por favor intentá de nuevo en unos segundos.';

      if (err.message === 'NO_API_KEY') {
        errMsg = 'Creamy está en configuración. Por favor contactanos directamente por WhatsApp o email.';
      } else if (err.message === 'Failed to fetch' || err.message === 'NetworkError') {
        errMsg = 'No pude conectarme al servidor. Verificá tu conexión a internet.';
      }

      const container = document.getElementById('crMessages');
      if (container) {
        const errDiv = document.createElement('div');
        errDiv.className = 'cr-msg cr-msg-bot';
        errDiv.innerHTML = `<div class="cr-error-bubble">⚠️ ${errMsg}</div>`;
        container.appendChild(errDiv);
        container.scrollTop = container.scrollHeight;
      }
    } finally {
      state.loading = false;
      if (btn) btn.disabled = false;
      if (input) input.focus();
    }
  }

  /* ── Abrir / cerrar panel ── */
  function openPanel() {
    const panel = document.getElementById('crPanel');
    const avatarWrap = document.getElementById('crAvatarWrap');
    const hand = document.getElementById('crHand');
    const tooltip = document.getElementById('crTooltip');

    if (!panel) return;

    state.open = true;
    panel.style.display = 'flex';
    panel.classList.remove('cr-closing');
    if (tooltip) tooltip.style.display = 'none';

    // Primera apertura: mostrar bienvenida
    if (state.firstOpen) {
      state.firstOpen = false;
      showWelcome();
    }

    // Foco en input
    setTimeout(() => {
      const input = document.getElementById('crInput');
      if (input) input.focus();
    }, 350);

    // Guardar en session
    try {
      sessionStorage.setItem(CFG.STORAGE_KEY, JSON.stringify({
        opened: true,
        messages: state.messages,
      }));
    } catch(e) {}
  }

  function closePanel() {
    const panel = document.getElementById('crPanel');
    if (!panel) return;

    state.open = false;
    panel.classList.add('cr-closing');

    setTimeout(() => {
      if (!state.open) {
        panel.style.display = 'none';
        panel.classList.remove('cr-closing');
      }
    }, 280);
  }

  function togglePanel() {
    if (state.open) {
      closePanel();
    } else {
      openPanel();
    }
  }

  /* ── Tooltip de bienvenida ── */
  function showTooltip() {
    if (state.tooltipShown) return;
    const tooltip = document.getElementById('crTooltip');
    if (!tooltip) return;

    // Solo mostrar una vez por sesion
    try {
      if (sessionStorage.getItem(CFG.STORAGE_KEY)) return;
    } catch(e) {}

    state.tooltipShown = true;
    tooltip.style.display = 'block';

    // Ocultar automaticamente despues de 5 segundos
    setTimeout(() => {
      if (!state.open && tooltip) tooltip.style.display = 'none';
    }, 5000);
  }

  /* ── Auto-resize textarea ── */
  function autoResize(el) {
    el.style.height = 'auto';
    el.style.height = Math.min(el.scrollHeight, 100) + 'px';
  }

  /* ── Inicializacion ── */
  function init() {
    // Inyectar HTML
    const container = document.createElement('div');
    container.innerHTML = buildHTML();
    document.body.appendChild(container.firstElementChild);

    // Inyectar CSS si no está ya cargado
    if (!document.querySelector('link[href*="creamy.css"]')) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'creamy.css';
      document.head.appendChild(link);
    }

    /* ── Eventos ── */
    const avatarWrap = document.getElementById('crAvatarWrap');
    const closeBtn = document.getElementById('crClose');
    const sendBtn = document.getElementById('crSend');
    const input = document.getElementById('crInput');

    // Click en avatar
    if (avatarWrap) {
      avatarWrap.addEventListener('click', function(e) {
        e.stopPropagation();
        togglePanel();
      });
    }

    // Cerrar
    if (closeBtn) {
      closeBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        closePanel();
      });
    }

    // Enviar con boton
    if (sendBtn) {
      sendBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        const text = input ? input.value.trim() : '';
        if (text) sendMessage(text);
      });
    }

    // Enviar con Enter (Shift+Enter = nueva linea)
    if (input) {
      input.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          const text = this.value.trim();
          if (text) sendMessage(text);
        }
      });
      input.addEventListener('input', function() {
        autoResize(this);
      });
    }

    // Prevenir que el panel se cierre al hacer click dentro
    const panel = document.getElementById('crPanel');
    if (panel) {
      panel.addEventListener('click', function(e) {
        e.stopPropagation();
      });
    }

    /* ── Tooltip automatico ── */
    setTimeout(showTooltip, 2500);

    /* ── Agitar mano ── */
    const hand = document.getElementById('crHand');
    if (hand) {
      setTimeout(() => {
        hand.classList.add('cr-wave-active');
        setTimeout(() => hand.classList.remove('cr-wave-active'), 8000);
      }, 1000);
    }

    /* ── Restaurar sesion ── */
    try {
      const saved = sessionStorage.getItem(CFG.STORAGE_KEY);
      if (saved) {
        const data = JSON.parse(saved);
        if (data.messages && data.messages.length > 0) {
          state.messages = data.messages;
          state.firstOpen = false;
        }
      }
    } catch(e) {}

    /* ── API publica ── */
    window.__creamy = {
      open: openPanel,
      close: closePanel,
      toggle: togglePanel,
      send: sendMessage,
      sendChip: function(btn, text) {
        if (btn && btn.parentElement) btn.parentElement.remove();
        sendMessage(text);
      },
    };

    console.log('[Creamy] Widget inicializado correctamente ✓');
  }

  /* ── Punto de entrada ── */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
