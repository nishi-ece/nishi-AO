document.addEventListener("DOMContentLoaded", () => {
    // Initial fade-in
    document.body.classList.add("fade-in");
  
    // Slide-up elements on scroll
    const slideElements = document.querySelectorAll('.slide-up');
  
    const revealOnScroll = () => {
      slideElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
          el.classList.add('visible');
        }
      });
    };
  
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Trigger once on load
  });

  const input = document.getElementById('userInput');
const messages = document.getElementById('messages');

input.addEventListener('keypress', function(e) {
  if (e.key === 'Enter') {
    const userText = input.value.trim();
    if (!userText) return;
    appendMessage(`You: ${userText}`);
    getBotResponse(userText.toLowerCase());
    input.value = '';
  }
});

function appendMessage(text) {
  const msg = document.createElement('div');
  msg.textContent = text;
  messages.appendChild(msg);
  messages.scrollTop = messages.scrollHeight;
}

function getBotResponse(msg) {
  let response = "I'm not sure how to answer that.";

  if (msg.includes("name")) {
    response = "I'm Nishi's assistant. Nice to meet you!";
  } else if (msg.includes("experience")) {
    response = "Nishi has 3+ years of experience in Middleware and Automation with Ansible at TCS.";
  } else if (msg.includes("skills")) {
    response = "Her key skills include Ansible, WebLogic, Jenkins, Docker, and more!";
  } else if (msg.includes("contact")) {
    response = "You can reach her at nishisheeba196@gmail.com 📧";
  } else if (msg.includes("hobbies")) {
    response = "She loves art, music, and literature 🎨🎶📚";
  } else if (msg.includes("hi") || msg.includes("hello")) {
    response = "Hey there! 👋 How can I help you today?";
  }

  appendMessage(`Bot: ${response}`);
}
