
/**
 * ENLACE - chatbot.js
 * Un chatbot interactivo preparado para API de Gemini y optimizado para móvil/tablet.
 */

(function() {
    // 1. Inyectar estilos globales necesarios
    const styles = `
      @keyframes chat-fade-in-up {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
      }
      @keyframes chat-pop-in {
        from { opacity: 0; transform: scale(0.9) translateY(20px); }
        to { opacity: 1; transform: scale(1) translateY(0); }
      }
      .chat-animate-in { animation: chat-fade-in-up 0.3s ease-out forwards; }
      .chat-box-active { animation: chat-pop-in 0.4s cubic-bezier(0.18, 0.89, 0.32, 1.28) forwards; }
      
      #chatMessages::-webkit-scrollbar { width: 4px; }
      #chatMessages::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
      
      .chat-dot { animation: chat-dot-bounce 1.4s infinite ease-in-out both; width: 5px; height: 5px; background: #94a3b8; border-radius: 50%; opacity: 0.6; }
      .chat-dot:nth-child(1) { animation-delay: -0.32s; }
      .chat-dot:nth-child(2) { animation-delay: -0.16s; }
      @keyframes chat-dot-bounce {
        0%, 80%, 100% { transform: scale(0); }
        40% { transform: scale(1.0); }
      }

      /* Responsividad para móviles */
      @media (max-width: 640px) {
        #chatBox {
          width: calc(100vw - 32px) !important;
          right: 16px !important;
          left: 16px !important;
          bottom: 80px !important;
          height: 70vh !important;
        }
        #enlace-chat-toggle-container {
          right: 16px !important;
          bottom: 16px !important;
        }
      }
    `;
    const styleSheet = document.createElement("style");
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);

    const chatHTML = `
    <!-- Chatbot Toggle -->
    <div id="enlace-chat-toggle-container" style="position: fixed; bottom: 24px; right: 24px; z-index: 9999; display: flex; flex-direction: column; align-items: flex-end;">
      <div id="chatNotif" style="position: absolute; bottom: 80px; right: 0; background: white; color: #0034d3; font-size: 14px; font-weight: bold; padding: 8px 16px; border-radius: 8px; opacity: 0; transition: all 0.5s ease; white-space: nowrap; box-shadow: 0 10px 25px rgba(0,0,0,0.1); border: 1px solid #f1f5f9; pointer-events: none; font-family: 'Inter', sans-serif;">
        <span>¿En qué puedo ayudarte?</span>
        <div style="position: absolute; bottom: -6px; right: 24px; width: 12px; height: 12px; background: white; transform: rotate(45deg); border-right: 1px solid #f1f5f9; border-bottom: 1px solid #f1f5f9;"></div>
      </div>
      <button id="chatToggle" style="display: flex; align-items: center; justify-content: center; width: 56px; height: 56px; border-radius: 50%; background-color: #0034d3; color: white; border: none; cursor: pointer; box-shadow: 0 10px 20px rgba(0, 45, 98, 0.4); transition: all 0.3s ease;">
        <span class="material-symbols-outlined" style="font-size: 28px;">smart_toy</span>
      </button>
    </div>

    <!-- Chatbot Box -->
    <div id="chatBox" style="display: none; position: fixed; bottom: 100px; right: 24px; z-index: 9999; width: 380px; height: 550px; max-height: calc(100vh - 120px); background: white; border-radius: 24px; flex-direction: column; overflow: hidden; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25); border: 1px solid #e8e2d7; font-family: 'Inter', sans-serif;">
      <!-- Header -->
      <div style="background: #0034d3; padding: 20px; display: flex; align-items: center; justify-content: space-between; color: white;">
        <div style="display: flex; align-items: center; gap: 12px;">
          <div style="width: 42px; height: 42px; background: rgba(255,255,255,0.1); border-radius: 12px; display: flex; align-items: center; justify-content: center; position: relative; border: 1px solid rgba(255,255,255,0.2);">
            <span class="material-symbols-outlined" style="font-size: 24px;">electric_bolt</span>
            <div style="position: absolute; bottom: -2px; right: -2px; width: 12px; height: 12px; background: #4ade80; border-radius: 50%; border: 2px solid #0034d3;"></div>
          </div>
          <div>
            <p style="margin: 0; font-weight: bold; font-size: 16px; letter-spacing: -0.01em;">Enlace AI</p>
            <div style="display: flex; align-items: center; gap: 4px;">
                <span style="width: 6px; height: 6px; background: #4ade80; border-radius: 50%;"></span>
                <p style="margin: 0; font-size: 11px; opacity: 0.8; text-transform: uppercase; font-weight: 600;">Power by Gemini</p>
            </div>
          </div>
        </div>
        <button id="closeChat" style="background: transparent; border: none; color: white; cursor: pointer; padding: 8px; border-radius: 12px; transition: background 0.2s;">
          <span class="material-symbols-outlined">close</span>
        </button>
      </div>

      <!-- Messages Area -->
      <div id="chatMessages" style="flex: 1; padding: 20px; overflow-y: auto; background: #f8fafc; display: flex; flex-direction: column; gap: 16px;">
        <!-- Mensajes dinámicos -->
      </div>

      <!-- Typing Indicator -->
      <div id="typingIndicator" style="display: none; padding: 0 20px 15px; background: #f8fafc;">
        <div style="display: flex; align-items: flex-start; gap: 10px;">
          <div style="width: 32px; height: 32px; background: #0034d3; border-radius: 10px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
             <span class="material-symbols-outlined" style="color: white; font-size: 16px;">smart_toy</span>
          </div>
          <div style="background: white; border: 1px solid #f1f5f9; padding: 12px 16px; border-radius: 18px; border-top-left-radius: 4px; box-shadow: 0 2px 5px rgba(0,0,0,0.02);">
             <div style="display: flex; gap: 5px;">
               <div class="chat-dot"></div>
               <div class="chat-dot"></div>
               <div class="chat-dot"></div>
             </div>
          </div>
        </div>
      </div>

      <!-- Input Area -->
      <div style="padding: 16px 20px; background: white; border-top: 1px solid #f1f5f9;">
        <div style="display: flex; gap: 10px; align-items: center; position: relative;">
          <input id="chatInput" type="text" placeholder="Haz tu pregunta a nuestra IA..." style="flex: 1; padding: 14px 50px 14px 16px; border-radius: 16px; border: 1px solid #e2e8f0; font-size: 14px; background: #f8fafc; outline: none; transition: all 0.2s; color: #1e293b; font-family: inherit; width: 100%;" />
          <button id="chatSend" style="position: absolute; right: 6px; width: 38px; height: 38px; background: #0034d3; color: white; border: none; border-radius: 12px; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.2s; box-shadow: 0 4px 12px rgba(0, 45, 98, 0.2);">
            <span class="material-symbols-outlined" style="font-size: 20px;">send</span>
          </button>
        </div>
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
    const typingIndicator = document.getElementById('typingIndicator');

    // CONFIGURACIÓN API GEMINI (Preparada)
    const GEMINI_CONFIG = {
        apiKey: "TU_API_KEY_AQUI", // El usuario vinculará esto después
        model: "gemini-pro",
        promptBase: "Eres Enlace AI, el asistente experto de Enlace Agencia Digital. Responde de forma profesional, corta y concisa. Ayuda con planes (Standard $990, Premium $1890, Corporate $3500) y servicios (Web, Branding, IA, SEO)."
    };

    const LOGIC = {
        initial: "¿Hola! Soy **Enlace AI**. ¿En qué puedo asesorarte hoy sobre nuestros planes o servicios personalizados?",
        default: "Lo siento, ¿podrías repetirlo? Estoy especializado en nuestros **planes** (Standard, Premium, Corporate) y **servicios** (Logo, Web, Instagram, IA)."
    };

    let history = JSON.parse(sessionStorage.getItem('EnlaceChatHistoryV4') || '[]');

    function saveHistory() {
        sessionStorage.setItem('EnlaceChatHistoryV4', JSON.stringify(history));
    }

    function renderMessage(text, isUser) {
        const div = document.createElement('div');
        div.className = 'chat-animate-in';
        div.style.cssText = `display: flex; width: 100%; ${isUser ? 'justify-content: flex-end' : 'flex-direction: column; align-items: flex-start; gap: 6px;'}`;
        
        const formattedText = text.replace(/\*\?(.*?)\*\*/g, '<strong>$1</strong>')
                                  .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

        if (isUser) {
            div.innerHTML = `<div style="background: #0034d3; color: white; border-radius: 18px; border-top-right-radius: 4px; padding: 12px 18px; font-size: 14px; font-weight: 500; box-shadow: 0 4px 15px rgba(0,45,98,0.15); max-width: 85%; word-wrap: break-word; line-height: 1.5;">${formattedText}</div>`;
        } else {
            div.innerHTML = `
                <div style="display: flex; align-items: flex-start; gap: 10px; width: 100%;">
                    <div style="width: 36px; height: 36px; background: #0034d3; border-radius: 10px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
                        <span class="material-symbols-outlined" style="color: white; font-size: 18px;">smart_toy</span>
                    </div>
                    <div style="background: white; border: 1px solid #f1f5f9; color: #334155; padding: 14px 20px; border-radius: 20px; border-top-left-radius: 4px; font-size: 14px; box-shadow: 0 4px 20px rgba(0,0,0,0.03); max-width: 80%; line-height: 1.6;">${formattedText}</div>
                </div>`;
        }
        chatMessages.appendChild(div);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    async function callGemini(userInput) {
        // En una implementación real, aquí se llamaría a la API de Gemini.
        // Por ahora simulamos la respuesta pero dejamos la estructura lista.
        return new Promise((resolve) => {
            setTimeout(() => {
                const lower = userInput.toLowerCase();
                if (lower.includes("plan") || lower.includes("precio")) resolve("Nuestros planes van desde el **Standard ($990)** hasta el **Corporate ($3500)**. ¿Cuál te interesa más?");
                else if (lower.includes("branding") || lower.includes("marca") || lower.includes("logo")) resolve("En **Branding**, creamos identidades completas, logos y manuales de marca para destacar en el mercado.");
                else if (lower.includes("web") || lower.includes("pagina")) resolve("Creamos **Páginas Web Premium** optimizadas para convertir y con diseño de vanguardia.");
                else resolve("Entendido. Como representante de **Enlace AI**, estoy listo para ayudarte con tu estrategia digital. ¿Quieres profundizar en algún servicio?");
            }, 1200);
        });
    }

    let isTyping = false;
    async function sendMessage() {
        const text = chatInput.value.trim();
        if (!text || isTyping) return;

        renderMessage(text, true);
        history.push({ text, isUser: true });
        saveHistory();
        chatInput.value = '';

        isTyping = true;
        typingIndicator.style.display = 'block';
        chatMessages.scrollTop = chatMessages.scrollHeight;

        try {
            // Aquí se activaría la lógica de Gemini
            const response = await callGemini(text);
            typingIndicator.style.display = 'none';
            renderMessage(response, false);
            history.push({ text: response, isUser: false });
            saveHistory();
        } catch (error) {
            typingIndicator.style.display = 'none';
            renderMessage("Hubo un error al conectar con mi cerebro de IA. ¿Podemos intentar de nuevo?", false);
        } finally {
            isTyping = false;
        }
    }

    chatToggle.onclick = () => {
        if (chatBox.style.display === 'none') {
            chatBox.style.display = 'flex';
            chatBox.classList.add('chat-box-active');
            chatNotif.style.opacity = '0';
            init();
        } else {
            chatBox.style.display = 'none';
            chatBox.classList.remove('chat-box-active');
        }
    };

    closeChat.onclick = () => {
        chatBox.style.display = 'none';
        chatBox.classList.remove('chat-box-active');
    };

    chatSend.onclick = sendMessage;
    chatInput.onkeydown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            sendMessage();
        }
    };

    function init() {
        chatMessages.innerHTML = '';
        if (history.length === 0) {
            renderMessage(LOGIC.initial, false);
            history.push({ text: LOGIC.initial, isUser: false });
            saveHistory();
        } else {
            history.forEach(m => renderMessage(m.text, m.isUser));
        }
        setTimeout(() => chatMessages.scrollTop = chatMessages.scrollHeight, 100);
    }

    setTimeout(() => {
        if (chatBox.style.display === 'none') {
            chatNotif.style.opacity = '1';
        }
    }, 4000);
})();
