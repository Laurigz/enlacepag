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
    <div id="chatBox" class="hidden fixed bottom-24 right-6 z-50 w-[340px] sm:w-[380px] bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col" style="font-family:'Inter',sans-serif; height: 500px; max-height: 80vh;">
      <div class="bg-primary p-4 flex items-center justify-between shadow-md z-10">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center relative">
            <span class="material-symbols-outlined text-white text-xl">smart_toy</span>
            <div class="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-primary"></div>
          </div>
          <div>
            <p class="text-white font-semibold text-[15px] m-0 leading-tight">Enlace Assistant</p>
            <p class="text-white/70 text-[12px] m-0 mt-0.5">Siempre activo</p>
          </div>
        </div>
        <div class="flex gap-1">
          <button id="clearChat" title="Limpiar chat" class="text-white/70 hover:text-white border-0 bg-transparent flex items-center justify-center p-1.5 rounded hover:bg-white/10 transition-colors">
            <span class="material-symbols-outlined text-xl">delete_sweep</span>
          </button>
          <button id="closeChat" title="Cerrar chat" class="text-white/70 hover:text-white border-0 bg-transparent flex items-center justify-center p-1.5 rounded hover:bg-white/10 transition-colors">
            <span class="material-symbols-outlined text-xl">close</span>
          </button>
        </div>
      </div>
      <div id="chatMessages" class="p-4 flex-1 overflow-y-auto bg-slate-50 flex flex-col gap-4" style="scrollbar-width: thin; scroll-behavior: smooth;">
      </div>
      <!-- Typing indicator container hidden by default -->
      <div id="typingIndicator" class="hidden px-4 pb-4 pt-2 bg-slate-50">
        <div style="width:28px;height:28px;background:#0034d3;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:13px;color:white;margin-bottom:6px;">&#129302;</div>
        <div class="bg-white rounded-r-xl rounded-bl-xl p-3 shadow-sm inline-flex gap-1.5 border border-slate-200" style="max-width:85%; width:fit-content;">
          <div class="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style="animation-delay: 0ms"></div>
          <div class="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style="animation-delay: 150ms"></div>
          <div class="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style="animation-delay: 300ms"></div>
        </div>
      </div>
      <div class="p-4 border-t border-slate-200 bg-white flex gap-2 relative shadow-[0_-4px_10px_rgba(0,0,0,0.02)]">
        <input id="chatInput" type="text" placeholder="Escribí tu pregunta..." class="flex-1 text-[14px] pl-4 pr-12 py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all bg-slate-50 relative" />
        <button id="chatSend" class="text-white hover:text-white bg-primary hover:bg-primary/90 transition-colors flex items-center justify-center border-0 absolute right-6 top-1/2 -translate-y-1/2 w-9 h-9 rounded-lg shadow-sm cursor-pointer">
          <span class="material-symbols-outlined text-[20px]" style="font-variation-settings: 'FILL' 1;">send</span>
        </button>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', chatHTML);

  const chatToggle = document.getElementById('chatToggle');
  const chatBox = document.getElementById('chatBox');
  const closeChat = document.getElementById('closeChat');
  const clearChat = document.getElementById('clearChat');
  const chatMessages = document.getElementById('chatMessages');
  const chatInput = document.getElementById('chatInput');
  const chatSend = document.getElementById('chatSend');
  const chatNotif = document.getElementById('chatNotif');
  const typingIndicator = document.getElementById('typingIndicator');

  if (!chatToggle || !chatBox) return;

  /* Knowledge Base mejorada */
  const KB = {
    bienvenida: '<strong>¡Hola! &#128075;</strong> Soy el asistente virtual de <strong>Enlace Agencia Digital</strong>.<br><br>' +
      'Puedo ayudarte con información sobre nuestros servicios clave:<br><br>' +
      '&#127912; <button class="text-primary font-semibold hover:underline bg-transparent border-0 p-0 cursor-pointer text-left focus:outline-none" onclick="window.sendPredefinedMessage(&apos;Branding&apos;)">Branding e Identidad</button><br>' +
      '&#127760; <button class="text-primary font-semibold hover:underline bg-transparent border-0 p-0 cursor-pointer text-left focus:outline-none" onclick="window.sendPredefinedMessage(&apos;Paginas Web&apos;)">Diseño Web / E-commerce</button><br>' +
      '&#129302; <button class="text-primary font-semibold hover:underline bg-transparent border-0 p-0 cursor-pointer text-left focus:outline-none" onclick="window.sendPredefinedMessage(&apos;Inteligencia Artificial&apos;)">Soluciones de IA</button><br>' +
      '&#128200; <button class="text-primary font-semibold hover:underline bg-transparent border-0 p-0 cursor-pointer text-left focus:outline-none" onclick="window.sendPredefinedMessage(&apos;SEO&apos;)">Posicionamiento (SEO/SEM)</button><br><br>' +
      '¿En qué te puedo ayudar hoy?',

    saludo: '¡Hola! Qué gusto saludarte. 👋 ¿En qué te puedo asesorar hoy? Podés preguntarme por precios, tiempos o tipos de servicios.',

    branding: '&#127912; <strong>Branding Integral</strong><br><br>' +
      'Creamos identidades visuales que te diferencian del montón:<br>' +
      '&#8226; Logotipo (variantes)<br>&#8226; Paleta de colores e identidad<br>' +
      '&#8226; Manual de marca<br>&#8226; Kit de RRSS<br><br>' +
      '<strong>Planes:</strong><br>' +
      '&#8226; Standard: $990<br>' +
      '&#8226; Premium: $1.890 &#11088;<br>' +
      '&#8226; Corporate: $3.500<br><br>' +
      'Entrega normal: 10 a 15 días. <br><br><a href="servicio-branding.html" class="inline-block text-white bg-primary px-4 py-2 rounded-md text-[13px] font-bold no-underline hover:bg-slate-800 transition-colors shadow-sm cursor-pointer">Ver Detalles Completos</a>',

    web: '&#127760; <strong>Páginas Web Estratégicas</strong><br><br>' +
      'Hacemos sitios optimizados para vender 24/7:<br>' +
      '&#8226; Landing Pages - desde $800<br>' +
      '&#8226; Webs Institucionales - desde $1.500<br>' +
      '&#8226; E-commerce completos - desde $2.500<br><br>' +
      'Todos incluyen diseño responsivo, optimización SEO técnica y velocidad ultrarrápida.<br><br>' +
      'Entrega: 14 a 21 días. <br><br><a href="servicio-web.html" class="inline-block text-white bg-primary px-4 py-2 rounded-md text-[13px] font-bold no-underline hover:bg-slate-800 transition-colors shadow-sm cursor-pointer">Más Información Web</a>',

    ia: '&#129302; <strong>Inteligencia Artificial (IA)</strong><br><br>' +
      'Ayudamos a las empresas a escalar automatizando tareas:<br>' +
      '&#8226; Chatbots avanzados (como yo!)<br>&#8226; Automatización interna<br>' +
      '&#8226; Análisis predictivo<br><br>' +
      'Nuestros clientes suelen ahorrar 70% en tiempo de soporte y multiplicar sus leads.<br>' +
      'Soluciones a medida desde $1.200. <br><br><a href="servicio-ia.html" class="inline-block text-white bg-primary px-4 py-2 rounded-md text-[13px] font-bold no-underline hover:bg-slate-800 transition-colors shadow-sm cursor-pointer">Ver Soluciones IA</a>',

    seo: '&#128200; <strong>Posicionamiento WEB (SEO/SEM)</strong><br><br>' +
      'Aparecé primero cuando te busquen en Google:<br>' +
      '&#8226; Auditoría y SEO técnico<br>&#8226; Creación estratégica de contenido<br>' +
      '&#8226; Campañas Ads altamente rentables<br>' +
      '&#8226; SEO Local (Google Maps)<br><br>' +
      'Planes mensuales desde $600. <br><br><a href="servicio-posicionamiento.html" class="inline-block text-white bg-primary px-4 py-2 rounded-md text-[13px] font-bold no-underline hover:bg-slate-800 transition-colors shadow-sm cursor-pointer">Mejorar mi Visibilidad</a>',

    precio: '&#128176; <strong>Nuestros Precios Bases</strong><br><br>' +
      '&#8226; <strong>Branding:</strong> $990 | $1.890 | $3.500<br>' +
      '&#8226; <strong>Web:</strong> $800 (Landing) | $2.500 (Tienda)<br>' +
      '&#8226; <strong>IA:</strong> Desde $1.200<br>' +
      '&#8226; <strong>SEO:</strong> Desde $600/mes<br><br>' +
      'Te sugiero agendar una asesoría gratuita para que un experto cotice tu caso puntual. &#127881;<br><br><a href="contacto.html" class="inline-block text-white bg-emerald-600 hover:bg-emerald-700 px-4 py-2 rounded-md text-[13px] font-bold no-underline transition-colors shadow-sm cursor-pointer">Agendar Asesoría</a>',

    tiempo: '&#9201; <strong>Tiempos de Entrega Reales</strong><br><br>' +
      'Trabajamos rápido sin perder calidad:<br>' +
      '&#8226; Branding Integral: <strong>10 a 15 días</strong><br>' +
      '&#8226; Landing Page: <strong>7 a 10 días</strong><br>' +
      '&#8226; Web Corporativa: <strong>14 a 21 días</strong><br>' +
      '&#8226; E-commerce: <strong>21 a 35 días</strong><br>' +
      '&#8226; Auto IA: <strong>15 a 30 días</strong><br>',

    contacto: '&#128233; <strong>Hablemos por donde prefieras</strong><br><br>' +
      '&#8226; Mandame un mensaje usando nuestro formulario web.<br>' +
      '&#8226; Escribinos directo por el botón superior de WhatsApp.<br><br>' +
      'Un especialista humano te contestará rapidísimo. &#127919;<br><br><a href="contacto.html" class="inline-block text-slate-800 bg-white border border-slate-300 hover:bg-slate-50 px-4 py-2 rounded-md text-[13px] font-bold no-underline transition-colors shadow-sm cursor-pointer">Ir a Formulario</a>',

    quien_sos: 'Soy un algoritmo impulsado por Inteligencia Artificial, creado y entrenado por Enlace Agencia Digital para asesorarte al instante sobre nuestros servicios. ¡Un asistente de Inteligencia Artificial al rescate! 🤖',

    default: 'Mmm, no estoy seguro de entender a qué te referís con eso 🤔<br><br>Acordate que puedo darte información de:<br>' +
      '&#8226; <strong>Servicios:</strong> Diseño Web, Branding, IA, SEO.<br>' +
      '&#8226; <strong>Precios y tiempos de entrega.</strong><br>' +
      '&#8226; O contactarte con un <strong>asesor humano</strong>.<br><br>' +
      '¿Sobre qué variante te gustaría saber más?'
  };

  // Helper global para que el onClick del HTML llame a JS de forma segura
  window.sendPredefinedMessage = function (text) {
    if (chatInput) {
      chatInput.value = text;
      sendMessage();
    }
  };

  function getBotResponse(msg) {
    const m = msg.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    if (m.match(/^(hola|buenas|buen dia|buenas tardes|buenas noches|holis|saludos|hey|hi)(?![a-z])/)) return KB.saludo;
    if (m.includes('quien sos') || m.includes('tu nombre') || m.includes('sos un bot') || m.includes('sos humano') || m.includes('robot')) return KB.quien_sos;

    if (m.includes('brand') || m.includes('logo') || m.includes('identidad') || m.includes('visual') || m.includes('diseno') || m.includes('marca')) return KB.branding;
    if (m.includes('web') || m.includes('pagina') || m.includes('sitio') || m.includes('landing') || m.includes('ecommerce') || m.includes('tienda')) return KB.web;
    if (/\bia\b/.test(m) || m.includes('inteligencia') || m.includes('automatiz') || m.includes('chatbot') || m.includes('bot') || /\bai\b/.test(m) || m.includes('datos')) return KB.ia;
    if (m.includes('seo') || m.includes('google') || m.includes('posicion') || m.includes('trafico') || m.includes('sem') || m.includes('ads') || m.includes('publicidad')) return KB.seo;

    if (m.includes('precio') || m.includes('costo') || m.includes('cuanto') || m.includes('pack') || m.includes('plan') || m.includes('presupuesto') || m.includes('valor') || m.includes('tarifa') || m.includes('sale')) return KB.precio;
    if (m.includes('tiempo') || m.includes('plazo') || m.includes('cuando') || m.includes('dias') || m.includes('semana') || m.includes('entrega') || m.includes('tard')) return KB.tiempo;
    if (m.includes('contact') || m.includes('whatsapp') || m.includes('email') || m.includes('llam') || m.includes('hablar') || m.includes('escribi') || m.includes('asesor') || m.includes('humano')) return KB.contacto;

    return KB.default;
  }

  /* -- SESION DEL CHAT -- */
  let chatHistory = JSON.parse(sessionStorage.getItem('EnlaceChatHistory') || '[]');

  function saveHistory() {
    sessionStorage.setItem('EnlaceChatHistory', JSON.stringify(chatHistory));
  }

  function renderMessage(html, isUser, animate = false) {
    const div = document.createElement('div');
    div.className = "flex w-full " + (isUser ? "justify-end" : "flex-col items-start gap-1.5") + (animate ? " animate-fade-in" : "");

    if (isUser) {
      div.innerHTML = "<div class=\"bg-primary text-white rounded-l-2xl rounded-tr-2xl px-4 py-2.5 text-[14.5px] shadow-sm max-w-[85%] break-words leading-relaxed font-medium\">" + html + "</div>";
    } else {
      div.innerHTML = "<div style=\"width:30px;height:30px;background:#0034d3;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:14px;color:white;flex-shrink:0;\">&#129302;</div>\n" +
        "<div class=\"bg-white rounded-r-2xl rounded-bl-2xl px-5 py-3.5 text-[14.5px] text-slate-800 shadow-sm border border-slate-200 shadow-[0_2px_8px_rgba(0,0,0,0.02)] max-w-[92%] leading-relaxed\">" + html + "</div>";
    }
    chatMessages.appendChild(div);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function initChat() {
    chatMessages.innerHTML = '';
    if (chatHistory.length === 0) {
      chatHistory.push({ text: KB.bienvenida, isUser: false });
      saveHistory();
    }
    chatHistory.forEach(msg => renderMessage(msg.text, msg.isUser, false));
    setTimeout(() => chatMessages.scrollTop = chatMessages.scrollHeight, 100);
  }

  let isTyping = false;

  function sendMessage() {
    const text = chatInput.value.trim();
    if (!text || isTyping) return;

    renderMessage(text, true, true);
    chatHistory.push({ text: text, isUser: true });
    saveHistory();
    chatInput.value = '';

    isTyping = true;
    chatMessages.appendChild(typingIndicator);
    typingIndicator.classList.remove('hidden');
    chatMessages.scrollTop = chatMessages.scrollHeight;

    const responseHtml = getBotResponse(text);

    setTimeout(() => {
      typingIndicator.classList.add('hidden');
      renderMessage(responseHtml, false, true);
      chatHistory.push({ text: responseHtml, isUser: false });
      saveHistory();
      isTyping = false;
    }, 900 + Math.random() * 500);
  }

  let chatOpened = sessionStorage.getItem('EnlaceChatOpen') === 'true';
  if (chatOpened) {
    chatBox.classList.remove('hidden');
    if (chatNotif) chatNotif.classList.add('hidden');
    initChat();
  }

  chatToggle.addEventListener('click', () => {
    chatBox.classList.toggle('hidden');
    if (chatNotif) chatNotif.classList.add('hidden');

    chatOpened = !chatBox.classList.contains('hidden');
    sessionStorage.setItem('EnlaceChatOpen', chatOpened);

    if (chatOpened && chatHistory.length === 0) {
      initChat();
    } else if (chatOpened) {
      initChat();
    }
  });

  if (closeChat) closeChat.addEventListener('click', () => {
    chatBox.classList.add('hidden');
    sessionStorage.setItem('EnlaceChatOpen', 'false');
  });

  if (clearChat) clearChat.addEventListener('click', () => {
    if (confirm("¿Limpiar historial de la conversación?")) {
      chatHistory = [];
      saveHistory();
      initChat();
    }
  });

  if (chatSend) chatSend.addEventListener('click', sendMessage);
  if (chatInput) chatInput.addEventListener('keydown', e => { if (e.key === 'Enter') sendMessage(); });

  /* -- 8. INTERACTIVE IMAGE ACCORDION (Native Fallback) -- */
  const accordionContainer = document.getElementById('react-accordion-container');
  if (accordionContainer) {
    const accordionItemsData = [
      { id: 1, title: 'Asistente de Voz', imageUrl: 'https://images.unsplash.com/photo-1628258334105-2a0b3d6efee1?q=80&w=1974&auto=format&fit=crop' },
      { id: 2, title: 'Generación de Imágenes', imageUrl: 'https://images.unsplash.com/photo-1677756119517-756a188d2d94?q=80&w=2070&auto=format&fit=crop' },
      { id: 3, title: 'Chatbot Local RAG', imageUrl: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1974&auto=format&fit=crop' },
      { id: 4, title: 'Agente Inteligente', imageUrl: 'https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?q=80&w=2090&auto=format&fit=crop' },
      { id: 5, title: 'Visión Artificial', imageUrl: 'https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?q=80&w=2070&auto=format&fit=crop' }
    ];

    // Initial render
    accordionContainer.innerHTML = accordionItemsData.map((item, index) => {
      return `
        <div 
          class="accordion-card relative h-[350px] sm:h-[450px] rounded-2xl overflow-hidden cursor-pointer transition-all duration-700 ease-in-out flex-shrink-0"
          data-index="${index}"
        >
          <img 
            src="${item.imageUrl}" 
            alt="${item.title}" 
            class="absolute inset-0 w-full h-full object-cover"
            onerror="this.onerror=null; this.src='https://placehold.co/400x450/2d3748/ffffff?text=Error';"
          />
          <div class="accordion-overlay absolute inset-0 bg-black transition-colors duration-500"></div>
          <span class="accordion-text absolute text-white text-base sm:text-lg font-bold whitespace-nowrap transition-all duration-500 ease-in-out drop-shadow-md">
            ${item.title}
          </span>
        </div>
      `;
    }).join('');

    const cards = accordionContainer.querySelectorAll('.accordion-card');
    const overlays = accordionContainer.querySelectorAll('.accordion-overlay');
    const texts = accordionContainer.querySelectorAll('.accordion-text');

    function setActive(activeIndex) {
      cards.forEach((card, i) => {
        const isActive = i === activeIndex;

        if (isActive) {
          card.classList.remove('w-[60px]', 'sm:w-[70px]');
          card.classList.add('w-[260px]', 'sm:w-[350px]', 'md:w-[400px]');
          overlays[i].classList.remove('bg-opacity-50');
          overlays[i].classList.add('bg-opacity-20');
          texts[i].classList.remove('w-auto', 'text-left', 'bottom-24', 'left-1/2', '-translate-x-1/2', 'rotate-90');
          texts[i].classList.add('bottom-6', 'left-1/2', '-translate-x-1/2', 'rotate-0');
        } else {
          card.classList.remove('w-[260px]', 'sm:w-[350px]', 'md:w-[400px]');
          card.classList.add('w-[60px]', 'sm:w-[70px]');
          overlays[i].classList.remove('bg-opacity-20');
          overlays[i].classList.add('bg-opacity-50');
          texts[i].classList.remove('bottom-6', 'rotate-0');
          texts[i].classList.add('w-auto', 'text-left', 'bottom-24', 'left-1/2', '-translate-x-1/2', 'rotate-90');
        }
      });
    }

    // Bind hover events appropriately for desktop, tap for mobile
    cards.forEach((card, index) => {
      card.addEventListener('mouseenter', () => setActive(index));
      card.addEventListener('click', () => setActive(index));
    });

    // Set initial active state to the last element (like the React example)
    setActive(4);
  }

});
