document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("userInput");
    const messages = document.getElementById("messages");
    const sendBtn = document.getElementById("sendBtn");
    const chatToggle = document.getElementById("chatToggle");
    const chatbot = document.getElementById("chatbot");
  
    chatToggle.addEventListener("click", () => {
      chatbot.classList.toggle("hidden");
      input.focus();
    });
  
    sendBtn.addEventListener("click", sendMessage);
    input.addEventListener("keypress", function (e) {
      if (e.key === "Enter") sendMessage();
    });
  
    function sendMessage() {
      const userText = input.value.trim();
      if (!userText) return;
      appendMessage("You: " + userText);
      getBotResponse(userText.toLowerCase());
      input.value = "";
    }
  
    function appendMessage(text) {
      const msg = document.createElement("div");
      msg.textContent = text;
      messages.appendChild(msg);
      messages.scrollTop = messages.scrollHeight;
    }
  
    function getBotResponse(msg) {
      let response = "Hmm... Try asking about experience, skills, or hobbies!";
      if (msg.includes("name")) response = "I'm Nishi's assistant. 😊";
      else if (msg.includes("experience")) response = "3+ years at TCS with Middleware and Automation.";
      else if (msg.includes("skills")) response = "Ansible, Docker, WebLogic, Jenkins, GitHub, etc.";
      else if (msg.includes("contact")) response = "Email: nishisheeba196@gmail.com";
      else if (msg.includes("hobbies")) response = "Art, music, literature 🎨🎶📚";
      else if (msg.includes("hello") || msg.includes("hi")) response = "Hey there! 👋";
  
      setTimeout(() => appendMessage("Bot: " + response), 400);
    }
  });
  