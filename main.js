/* =========================================
   ENLACE - main.js
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* -- 1. NAVBAR: scrolled class + mobile menu -- */
  const navbar = document.getElementById('navbar');
  const menuBtn = document.getElementById('menuBtn');
  const mobileMenu = document.getElementById('mobileMenu');

  if (navbar) window.addEventListener('scroll', () => navbar.classList.toggle('scrolled', window.scrollY > 20));
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => mobileMenu.classList.toggle('hidden'));
    mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mobileMenu.classList.add('hidden')));
  }

  /* -- 2. SCROLLSPY -- */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('a.nav-link');
  if (sections.length && navLinks.length) {
    const spyObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(l => l.classList.remove('active'));
          const active = document.querySelector('a.nav-link[href="#' + entry.target.id + '"]');
          if (active) active.classList.add('active');
        }
      });
    }, { rootMargin: '-40% 0px -50% 0px' });
    sections.forEach(s => spyObserver.observe(s));
  }

  /* -- 3. SCROLL REVEAL -- */
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('visible'); revealObs.unobserve(entry.target); }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

  /* -- 4. PORTFOLIO FILTER -- */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      portfolioItems.forEach(item => {
        const cats = item.dataset.cat || '';
        const show = filter === 'all' || cats.includes(filter);
        item.style.opacity = show ? '1' : '0.15';
        item.style.transform = show ? 'scale(1)' : 'scale(0.95)';
        item.style.pointerEvents = show ? 'auto' : 'none';
      });
    });
  });

  /* -- 5. BUDGET BUTTONS -- */
  const budgetInput = document.getElementById('presupuesto');
  if (budgetInput) {
    document.querySelectorAll('.budget-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.budget-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        budgetInput.value = btn.dataset.val;
      });
    });
  }

  /* -- 6. LEAD FORM -- */
  const form = document.getElementById('leadForm');
  if (form) {
    const submitBtn = document.getElementById('submitBtn');
    const btnText = document.getElementById('btnText');
    const btnLoader = document.getElementById('btnLoader');
    const formSuccess = document.getElementById('formSuccess');
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      let valid = true;
      form.querySelectorAll('[required]').forEach(field => {
        if (!field.value.trim()) {
          valid = false;
          field.style.borderColor = '#ef4444';
          field.addEventListener('input', () => field.style.borderColor = '', { once: true });
        }
      });
      if (!valid) return;
      if (submitBtn) submitBtn.disabled = true;
      if (btnText) btnText.classList.add('hidden');
      if (btnLoader) btnLoader.classList.remove('hidden');
      await new Promise(r => setTimeout(r, 1800));
      if (form) form.classList.add('hidden');
      if (formSuccess) formSuccess.classList.remove('hidden');
    });
  }

  /* -- 7. CHATBOT -- */
  const chatHTML = `
    <!-- Chatbot Toggle -->
    <div class="fixed bottom-6 right-6 z-50 group flex flex-col items-end">
      <div id="chatNotif" class="absolute -top-12 right-0 bg-white text-primary text-sm font-bold px-4 py-2 rounded-lg opacity-100 transition-opacity whitespace-nowrap shadow-lg">
        ¿Hablamos?<div class="absolute -bottom-1.5 right-6 w-3 h-3 bg-white rotate-45 rounded-sm"></div>
      </div>
      <button id="chatToggle" class="flex items-center justify-center w-14 h-14 rounded-full bg-primary text-white shadow-xl shadow-primary/40 hover:scale-105 transition-all cursor-pointer">
        <span class="material-symbols-outlined text-[28px]">chat</span>
      </button>
    </div>
    <!-- Chatbot Box -->
    <div id="chatBox" class="hidden fixed bottom-24 right-6 z-50 w-80 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden" style="font-family:'Inter',sans-serif;">
      <div class="bg-primary p-4 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center">
            <span class="material-symbols-outlined text-white text-lg">smart_toy</span>
          </div>
          <div>
            <p class="text-white font-semibold text-sm m-0 leading-tight">Enlace Assistant</p>
            <p class="text-white/70 text-xs m-0 mt-0.5">● Online ahora</p>
          </div>
        </div>
        <button id="closeChat" class="text-white/70 hover:text-white border-0 bg-transparent flex items-center justify-center">
          <span class="material-symbols-outlined">close</span>
        </button>
      </div>
      <div id="chatMessages" class="p-4 h-64 overflow-y-auto bg-slate-50" style="scrollbar-width: thin;">
      </div>
      <div class="p-3 border-t border-slate-100 bg-white flex gap-2">
        <input id="chatInput" type="text" placeholder="Escribí tu pregunta..." class="flex-1 text-sm px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:border-primary" />
        <button id="chatSend" class="bg-primary text-white w-10 h-10 rounded-lg text-sm font-bold hover:bg-primary/90 transition-colors flex items-center justify-center border-0">
          <span class="material-symbols-outlined">send</span>
        </button>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', chatHTML);

  const chatToggle = document.getElementById('chatToggle');
  const chatBox = document.getElementById('chatBox');
  const closeChat = document.getElementById('closeChat');
  const chatMessages = document.getElementById('chatMessages');
  const chatInput = document.getElementById('chatInput');
  const chatSend = document.getElementById('chatSend');
  const chatNotif = document.getElementById('chatNotif');

  if (!chatToggle || !chatBox) return;

  /* Knowledge Base */
  const KB = {
    bienvenida: '<strong>Hola! &#128075;</strong> Soy el asistente de <strong>Enlace Agencia Digital</strong>. Te recomiendo explorar:<br><br>' +
      '&#127912; <a href="servicio-branding.html" style="color:#002d62;font-weight:600;">Branding</a> - identidades desde $990<br>' +
      '&#127760; <a href="servicio-web.html" style="color:#002d62;font-weight:600;">Paginas Web</a> - sitios que venden 24/7<br>' +
      '&#129302; <a href="servicio-ia.html" style="color:#002d62;font-weight:600;">Inteligencia Artificial</a> - automatizacion y chatbots<br>' +
      '&#128200; <a href="servicio-posicionamiento.html" style="color:#002d62;font-weight:600;">SEO/SEM</a> - mas trafico, mas clientes<br><br>' +
      '&#128522; Sobre cual queres info?',

    branding: '&#127912; <strong>Branding Integral</strong><br><br>' +
      'Creamos identidades visuales completas:<br>' +
      '&#8226; Logotipo (multiples variantes)<br>&#8226; Paleta de colores estrategica<br>' +
      '&#8226; Tipografia de autor<br>&#8226; Manual de marca completo<br>&#8226; Kit de redes sociales<br><br>' +
      '<strong>Planes:</strong><br>' +
      '&#8226; Standard: $990 - logo + paleta<br>' +
      '&#8226; Premium: $1.890 - identidad + manual + RRSS &#11088;<br>' +
      '&#8226; Corporate: $3.500 - estrategia 360 + packaging<br><br>' +
      'Entrega: 10-15 dias. <a href="servicio-branding.html" style="color:#002d62;">&#8594; Ver mas</a>',

    web: '&#127760; <strong>Paginas Web que venden 24/7</strong><br><br>' +
      '&#8226; Diseno UX/UI a medida<br>&#8226; Velocidad optimizada (Core Web Vitals)<br>' +
      '&#8226; Mobile First y responsive<br><br>' +
      '<strong>Tipos:</strong><br>&#8226; Landing Pages - desde $800<br>' +
      '&#8226; E-commerce - desde $2.500<br>&#8226; Portales Corporativos<br>&#8226; Apps a medida<br><br>' +
      'Entrega: 14-21 dias. <a href="servicio-web.html" style="color:#002d62;">&#8594; Ver mas</a>',

    ia: '&#129302; <strong>Inteligencia Artificial</strong><br><br>' +
      '&#8226; Automatizacion de procesos repetitivos<br>&#8226; Analisis avanzado de datos<br>' +
      '&#8226; Chatbots con lenguaje natural (24/7)<br>&#8226; Analitica predictiva de ventas<br><br>' +
      '<strong>Resultados tipicos:</strong><br>' +
      '&#8226; 70% ahorro en soporte tecnico<br>&#8226; 3x mas conversion de ventas<br>&#8226; 24/7 sin costo extra<br><br>' +
      'Desde $1.200 segun alcance. <a href="servicio-ia.html" style="color:#002d62;">&#8594; Ver mas</a>',

    seo: '&#128200; <strong>Posicionamiento Virtual (SEO/SEM)</strong><br><br>' +
      '&#8226; SEO On-page y Off-page tecnico<br>&#8226; Campanas SEM y Google Ads<br>' +
      '&#8226; Contenido estrategico optimizado<br>&#8226; SEO Local (Google Maps)<br><br>' +
      '<strong>Resultados:</strong><br>&#8226; +145% trafico organico<br>&#8226; -30% costo por lead<br>&#8226; 2.4M leads generados<br><br>' +
      'Desde $600/mes. <a href="servicio-posicionamiento.html" style="color:#002d62;">&#8594; Ver mas</a>',

    precio: '&#128176; <strong>Precios de Enlace</strong><br><br>' +
      '&#127912; Branding: $990 | $1.890 | $3.500<br>' +
      '&#127760; Web: desde $800 (landing) | $2.500 (e-commerce)<br>' +
      '&#129302; IA: desde $1.200 segun alcance<br>' +
      '&#128200; SEO: desde $600/mes<br><br>' +
      'Para un presupuesto exacto, agenda una <a href="contacto.html" style="color:#002d62;">consultoria gratuita</a>! &#127881;',

    tiempo: '&#9201; <strong>Tiempos de Entrega</strong><br><br>' +
      '&#8226; Branding: <strong>10-15 dias</strong><br>&#8226; Landing Page: <strong>7-10 dias</strong><br>' +
      '&#8226; Web corporativa: <strong>14-21 dias</strong><br>&#8226; E-commerce: <strong>21-35 dias</strong><br>' +
      '&#8226; Setup IA: <strong>15-30 dias</strong><br>&#8226; SEO organico: resultados en <strong>3-6 meses</strong>',

    contacto: '&#128233; <strong>Contacto</strong><br><br>' +
      '&#8226; Formulario: <a href="contacto.html" style="color:#002d62;">contacto.html</a><br>' +
      '&#8226; WhatsApp: boton en el menu superior<br>&#8226; Respondemos en menos de <strong>24 horas</strong><br><br>' +
      'Agenda una <strong>consultoria gratuita</strong> sin compromiso. &#127919;',

    garantia: '&#10003; <strong>Garantias</strong><br><br>' +
      '&#8226; Revisiones ilimitadas hasta tu aprobacion<br>&#8226; Entrega en tiempo o devolucion del anticipo<br>' +
      '&#8226; Soporte post-entrega incluido<br>&#8226; Codigo fuente entregado al cliente<br>&#8226; Contrato formal en todos los proyectos',

    recomendacion: '&#129300; <strong>Cual servicio te conviene?</strong><br><br>' +
      '&#8226; <strong>Arrancas desde cero?</strong> &#8594; <a href="servicio-branding.html" style="color:#002d62;">Branding</a><br>' +
      '&#8226; <strong>Necesitas mas clientes?</strong> &#8594; <a href="servicio-web.html" style="color:#002d62;">Web</a> + <a href="servicio-posicionamiento.html" style="color:#002d62;">SEO</a><br>' +
      '&#8226; <strong>Queres automatizar?</strong> &#8594; <a href="servicio-ia.html" style="color:#002d62;">IA</a><br>' +
      '&#8226; <strong>Presupuesto limitado?</strong> &#8594; Landing desde $800<br><br>' +
      '<a href="contacto.html" style="color:#002d62;">Agenda consultoria gratis</a> para recomendacion personalizada! &#127919;',

    default: 'Puedo ayudarte con:<br>' +
      '&#8226; <strong>Servicios:</strong> branding, web, IA, SEO<br>' +
      '&#8226; <strong>Precios y planes</strong><br>&#8226; <strong>Tiempos de entrega</strong><br>' +
      '&#8226; <strong>Garantias</strong><br>&#8226; <strong>Como contactarnos</strong><br><br>' +
      'O visita <a href="contacto.html" style="color:#002d62;">nuestra pagina de contacto</a>. &#128588;'
  };

  function getBotResponse(msg) {
    const m = msg.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    if (m.includes('brand') || m.includes('logo') || m.includes('identidad') || m.includes('visual') || m.includes('diseno') || m.includes('marca')) return KB.branding;
    if (m.includes('web') || m.includes('pagina') || m.includes('sitio') || m.includes('landing') || m.includes('ecommerce') || m.includes('tienda')) return KB.web;
    if (/\bia\b/.test(m) || m.includes('inteligencia') || m.includes('automatiz') || m.includes('chatbot') || m.includes('robot') || /\bai\b/.test(m) || m.includes('datos')) return KB.ia;
    if (m.includes('seo') || m.includes('google') || m.includes('posicion') || m.includes('trafico') || m.includes('sem') || m.includes('ads') || m.includes('publicidad')) return KB.seo;
    if (m.includes('precio') || m.includes('costo') || m.includes('cuanto') || m.includes('pack') || m.includes('plan') || m.includes('presupuesto') || m.includes('valor') || m.includes('tarifa')) return KB.precio;
    if (m.includes('tiempo') || m.includes('plazo') || m.includes('cuando') || m.includes('dias') || m.includes('semana') || m.includes('entrega')) return KB.tiempo;
    if (m.includes('contact') || m.includes('whatsapp') || m.includes('email') || m.includes('llam') || m.includes('hablar') || m.includes('escribi')) return KB.contacto;
    if (m.includes('garantia') || m.includes('revision') || m.includes('devolucion') || m.includes('seguro') || m.includes('contrato')) return KB.garantia;
    if (m.includes('recomiend') || m.includes('conviene') || m.includes('empez') || m.includes('cual') || m.includes('mejor') || m.includes('necesito')) return KB.recomendacion;
    return KB.default;
  }

  function addMessage(html, isUser) {
    const div = document.createElement('div');
    div.style.cssText = 'display:flex;gap:8px;margin-bottom:8px;' + (isUser ? 'flex-direction:row-reverse;' : '');
    if (isUser) {
      div.innerHTML = '<div style="background:#002d62;color:#fff;border-radius:0.75rem 0.75rem 0 0.75rem;padding:0.5rem 0.75rem;font-size:0.8rem;max-width:85%;">' + html + '</div>';
    } else {
      div.innerHTML =
        '<div style="width:28px;height:28px;min-width:28px;background:#002d62;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:13px;flex-shrink:0;">&#129302;</div>' +
        '<div style="background:#fff;border-radius:0 0.75rem 0.75rem 0.75rem;padding:0.6rem 0.75rem;font-size:0.79rem;color:#1e293b;box-shadow:0 1px 4px rgba(0,0,0,.1);max-width:85%;line-height:1.55;">' + html + '</div>';
    }
    chatMessages.appendChild(div);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function sendMessage() {
    const text = chatInput.value.trim();
    if (!text) return;
    addMessage(text, true);
    chatInput.value = '';
    setTimeout(() => addMessage(getBotResponse(text), false), 700);
  }

  let chatOpened = false;
  chatToggle.addEventListener('click', () => {
    chatBox.classList.toggle('hidden');
    if (chatNotif) chatNotif.classList.add('hidden');
    if (!chatOpened && !chatBox.classList.contains('hidden')) {
      chatOpened = true;
      setTimeout(() => addMessage(KB.bienvenida, false), 400);
    }
  });
  if (closeChat) closeChat.addEventListener('click', () => chatBox.classList.add('hidden'));
  if (chatSend) chatSend.addEventListener('click', sendMessage);
  if (chatInput) chatInput.addEventListener('keydown', e => { if (e.key === 'Enter') sendMessage(); });

});
