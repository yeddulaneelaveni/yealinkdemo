// chatbot.js

const chatIntents = [
  // ── Greetings ──
  {
    intent: "greeting",
    patterns: ["hi", "hello", "hey", "good morning", "good afternoon"],
    response: "Hi! Welcome to Freshroots Technologies 👋 Ask me about our services, solutions, pricing, or company info."
  },

  // ── Company / About ──
  {
    intent: "about_company",
    patterns: ["about", "who are you", "company info", "what is freshroots"],
    response: "Freshroots Technologies Private Limited is a systems integration specialist founded in 2025, focused on bridging cutting-edge technology with business transformation across industries."
  },
  {
    intent: "founding_year",
    patterns: ["founded", "when started", "established", "year"],
    response: "Freshroots was founded in 2025, with the mission of delivering seamless integration solutions across industries."
  },
  {
    intent: "leadership",
    patterns: ["ceo", "founder", "leadership", "team", "who runs"],
    response: "Our leadership includes Kafeel Ahmed (Founder & CEO, 20+ years in enterprise tech integration) and Siddeswara (Technical Director, Advisory Board Member)."
  },
  {
    intent: "values",
    patterns: ["values", "mission", "principles"],
    response: "Our core values are Trust & Reliability, Innovation First, Client Success, and Excellence in every project."
  },

  // ── Contact ──
  {
    intent: "contact",
    patterns: ["contact", "talk to", "sales", "call", "phone", "email", "reach"],
    response: "You can reach us at sales@freshrootstech.com or +91 8310699171. Our office is at F5, B3 Kumar Castles, Palm Grove Enclave, Gubbalala, Bangalore 560062."
  },
  {
    intent: "location",
    patterns: ["location", "address", "office", "where are you"],
    response: "We're located at F5, B3 Kumar Castles, Palm Grove Enclave, Gubbalala, Bangalore 560062."
  },

  // ── Services Overview ──
  {
    intent: "services_overview",
    patterns: ["services", "what do you offer", "what do you do"],
    response: "We offer four main service areas: Devices, DC Services, Security, and Network — covering everything from device deployment to full data center management."
  },

  // ── End Compute / Device Solutions ──
  {
    intent: "device_deployment",
    patterns: ["device supply", "device deployment", "hardware procurement"],
    response: "We handle complete hardware lifecycle management — procurement strategy, installation, configuration management, and asset tracking."
  },
  {
    intent: "mdm",
    patterns: ["mdm", "mobile device management"],
    response: "Our MDM solution covers device enrollment, policy management, app distribution, and remote wipe for secure mobile management."
  },
  {
    intent: "vdi",
    patterns: ["vdi", "virtual desktop"],
    response: "We provide Virtual Desktop Infrastructure — desktop virtualization, application delivery, performance optimization, and user experience management."
  },
  {
    intent: "secure_browser",
    patterns: ["secure browser", "browser isolation", "web gateway"],
    response: "Our secure browser solutions include secure web gateway, browser isolation, policy enforcement, and threat protection."
  },
  {
    intent: "docking",
    patterns: ["docking", "docking station"],
    response: "We offer universal docking stations, multi-monitor support, USB-C integration, and cable management solutions."
  },
  {
    intent: "rack_mounting",
    patterns: ["rack mounting", "rack solutions", "data center rack"],
    response: "We provide professional rack installation — rack design, cable management, power distribution, and cooling solutions."
  },
  {
    intent: "collaboration",
    patterns: ["collaboration", "video conferencing", "huddle room", "meeting room"],
    response: "Our collaboration solutions cover video conferencing, digital whiteboarding, screen sharing, and recording — check our product catalog for specific room setups like Huddle Room and Small Room."
  },
  {
    intent: "itam",
    patterns: ["itam", "asset management"],
    response: "Our IT Asset Management (ITAM) covers asset discovery, license management, cost optimization, and compliance tracking."
  },
  {
    intent: "itsm",
    patterns: ["itsm", "service management"],
    response: "Our ITSM solutions include incident management, change management, problem resolution, and service catalog setup."
  },
  {
    intent: "productivity_tools",
    patterns: ["productivity", "office suite", "productivity tools"],
    response: "We offer productivity and collaboration software suites — office suites, communication tools, project management, and knowledge management."
  },

  // ── DC Services ──
  {
    intent: "dc_services",
    patterns: ["data center", "dc services", "server", "storage"],
    response: "Our Data Center Services include server/storage deployment, managed services, migration, DC consulting, disaster recovery, and cloud management."
  },
  {
    intent: "cloud_management",
    patterns: ["cloud", "aws", "azure", "gcp", "multi-cloud"],
    response: "We provide multi-cloud strategy and management across AWS, Azure, and GCP, including migration, cost optimization, and hybrid infrastructure management."
  },
  {
    intent: "disaster_recovery",
    patterns: ["disaster recovery", "dr", "business continuity"],
    response: "We offer comprehensive Disaster Recovery planning — DR setup, active-active/active-passive DR, and business continuity solutions."
  },

  // ── Observability / FinOps ──
  {
    intent: "observability",
    patterns: ["observability", "monitoring", "mttr"],
    response: "Through our partnership with base14, we offer full-stack observability — unified logs, metrics, and traces with 90% reduced MTTR and sub-2 second query speeds."
  },
  {
    intent: "finops",
    patterns: ["finops", "ai cost", "cloud cost", "cost reduction"],
    response: "Our FinOps intelligence platform helps cut AI and cloud costs by up to 60% through real-time cost dashboards, GPU utilization tracking, and smart optimization recommendations."
  },
  {
    intent: "llm_finetuning",
    patterns: ["llm", "fine-tuning", "ai training", "lora", "peft"],
    response: "We provide custom LLM fine-tuning using LoRA and PEFT techniques — up to 3x faster training with enterprise-grade data prep and compliance validation."
  },

  // ── Industries ──
  {
    intent: "industries",
    patterns: ["industries", "sectors", "verticals"],
    response: "We serve Enterprise & Corporate, Manufacturing, Healthcare, Education, Retail & E-commerce, Logistics, and BFSI (Banking, Financial Services & Insurance) sectors."
  },
  {
    intent: "bfsi",
    patterns: ["bfsi", "banking", "financial services", "insurance"],
    response: "Our BFSI solutions include Core Banking Systems, Payment Solutions, Risk Management, Financial Analytics, Customer Experience, and RegTech — all with regulatory compliance built in."
  },

  // ── Pricing (generic fallback, kept LAST so product-specific pricing is checked first) ──
  {
    intent: "pricing",
    patterns: ["price", "cost", "how much", "rate", "pricing"],
    response: "Pricing depends on the specific solution and scale needed. Ask me about a specific product, or type 'products' to see our full catalog."
  }
];

// ── Product list ──
function listAllProducts() {
  if (!products || products.length === 0) {
    return "Sorry, product data isn't loaded yet. Please try again in a moment.";
  }
  const list = products
    .map(p => `• ${p.title}${p.price ? ` — ${formatINR(p.price)}` : ' — price on request'}`)
    .join('\n');
  return `Here are our products:\n${list}\n\nType a product name to see full details.`;
}

// ── Smarter product search (matches title, model, or keyword) ──
function findProductByName(msg) {
  const lower = msg.toLowerCase();

  // exact / partial title match first
  let match = products.find(p => lower.includes(p.title.toLowerCase()));
  if (match) return match;

  // match by model code
  match = products.find(p => p.model && lower.includes(p.model.toLowerCase()));
  if (match) return match;

  // match by keyword inside title (e.g. "microphone", "speaker", "camera")
  const words = lower.split(/\s+/);
  match = products.find(p =>
    words.some(w => w.length > 3 && p.title.toLowerCase().includes(w))
  );
  return match || null;
}

// ── Full product description ──
function getProductDetails(p) {
  const price = p.price ? formatINR(p.price) : "Price on request";
  const category = p.label ? `Category: ${p.label}\n` : "";
  const model = p.model ? `Model: ${p.model}\n` : "";
  const desc = p.description ? `${p.description}\n` : "";
  return `${p.title}\n${category}${model}${desc}Price: ${price}\n\nWant me to connect you with our sales team for this product?`;
}

// ── Main response logic ──
function getChatResponse(userMessage) {
  const msg = userMessage.toLowerCase();

  // "show me products" / "product list" type queries
  if (/product(s)?( list)?$|show.*product|what.*(products|items).*have|catalog/.test(msg)) {
    return listAllProducts();
  }

  // specific product match (title, model, or keyword)
  const product = findProductByName(msg);
  if (product) {
    return getProductDetails(product);
  }

  // general intents
  for (const item of chatIntents) {
    if (item.patterns.some(p => msg.includes(p))) {
      return item.response;
    }
  }

  return "I'm not sure about that. Would you like to speak with our team? Email sales@freshrootstech.com or call +91 8310699171.";
}

// ── Chat widget behavior ──
function toggleChat() {
  const box = document.getElementById('chat-box');
  box.style.display = box.style.display === 'none' ? 'flex' : 'none';

  // greet only once when opened for the first time
  const msgBox = document.getElementById('chat-messages');
  if (msgBox.children.length === 0) {
    addMessage("Hi! Welcome to Freshroots 👋 Ask me about our products, services, or pricing. Type 'products' to see our full catalog.", 'bot');
  }
}

function handleKeyPress(event) {
  if (event.key === 'Enter') sendChatMessage();
}

function sendChatMessage() {
  const input = document.getElementById('chat-input');
  const text = input.value.trim();
  if (!text) return;

  addMessage(text, 'user');
  input.value = '';

  // small delay to feel more natural
  setTimeout(() => {
    const reply = getChatResponse(text);
    addMessage(reply, 'bot');
  }, 400);
}

function addMessage(text, sender) {
  const msgBox = document.getElementById('chat-messages');
  const div = document.createElement('div');
  div.className = `chat-msg ${sender}`;
  div.textContent = text;
  msgBox.appendChild(div);
  msgBox.scrollTop = msgBox.scrollHeight;
}