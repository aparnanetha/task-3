
const themeBtn = document.getElementById("themeToggle");
const scrollBtn = document.getElementById("scrollBtn");
const body = document.body;


if (localStorage.getItem("theme") === "dark") {
  body.classList.add("dark");
}

themeBtn.addEventListener("click", () => {
  body.classList.toggle("dark");
  localStorage.setItem("theme", body.classList.contains("dark") ? "dark" : "light");
});


if (scrollBtn) {
  scrollBtn.addEventListener("click", () => {
    document.getElementById("infoSection").scrollIntoView({ behavior: "smooth" });
  });
}

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
});

document.querySelectorAll(".card").forEach(card => {
  observer.observe(card);
});


const sendBtn = document.getElementById("sendBtn");
const userInput = document.getElementById("userInput");
const chatBody = document.getElementById("chatBody");
const toggleChat = document.getElementById("toggleChat");

// Sample chatbot responses
const responses = {
  fever: "For fever, take Paracetamol 500mg and stay hydrated.",
  cold: "Drink warm fluids and try Cetrizine for cold symptoms.",
  diabetes: "Maintain diet & exercise. Medicines like Metformin help.",
  headache: "You can use Ibuprofen or take rest in a quiet place.",
  pain: "Apply hot/cold packs or consult a doctor for chronic pain.",
  cancer: "Cancer is complex. Please consult a specialist immediately.",
};

// Send message on button click
sendBtn.addEventListener("click", () => {
  const query = userInput.value.trim();
  if (!query) return;

  appendMessage(query, "user");
  userInput.value = "";

  // Simulate bot thinking
  setTimeout(() => {
    const lower = query.toLowerCase();
    let reply = "I'm still learning! Try asking about a disease or medicine.";
    for (const keyword in responses) {
      if (lower.includes(keyword)) {
        reply = responses[keyword];
        break;
      }
    }
    typeMessage(reply);
  }, 800);
});

// Append user or bot message
function appendMessage(text, sender) {
  const msg = document.createElement("div");
  msg.className = sender === "user" ? "user-message" : "bot-message";
  msg.textContent = text;
  chatBody.appendChild(msg);
  chatBody.scrollTop = chatBody.scrollHeight;
}

// Simulated typing effect for bot
function typeMessage(text) {
  let index = 0;

  // Create bot message element
  const typingMsg = document.createElement("div");
  typingMsg.className = "bot-message";
  typingMsg.textContent = "";
  chatBody.appendChild(typingMsg);

  const interval = setInterval(() => {
    typingMsg.textContent += text.charAt(index);
    index++;
    chatBody.scrollTop = chatBody.scrollHeight;

    if (index === text.length) {
      clearInterval(interval);
    }
  }, 30);
}

// Toggle chatbot visibility (minimize)
if (toggleChat) {
  toggleChat.addEventListener("click", () => {
    document.querySelector(".chatbot-card").classList.toggle("minimized");
  });
}
