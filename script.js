document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("userInput");
    const messages = document.getElementById("messages");
  
    input.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        const userText = input.value.trim();
        if (!userText) return;
        appendMessage("You: " + userText);
        getBotResponse(userText.toLowerCase());
        input.value = "";
      }
    });
  
    function appendMessage(text) {
      const msg = document.createElement("div");
      msg.textContent = text;
      messages.appendChild(msg);
      messages.scrollTop = messages.scrollHeight;
    }
  
    function getBotResponse(msg) {
      let response = "Hmm... I didn't catch that. Try asking about experience, skills, or hobbies!";
  
      if (msg.includes("name")) {
        response = "I'm Nishi's assistant. Nice to meet you!";
      } else if (msg.includes("experience")) {
        response = "Nishi has 3+ years of experience in Middleware and Automation with Ansible at TCS.";
      } else if (msg.includes("skills")) {
        response = "She’s skilled in Ansible, Docker, Jenkins, Oracle WebLogic, and more!";
      } else if (msg.includes("contact")) {
        response = "You can reach her at nishisheeba196@gmail.com 📧";
      } else if (msg.includes("hobbies") || msg.includes("interests")) {
        response = "She loves art, music, and literature 🎨🎶📚";
      } else if (msg.includes("hi") || msg.includes("hello")) {
        response = "Hey there! 👋 How can I help you today?";
      }
  
      setTimeout(() => {
        appendMessage("Bot: " + response);
      }, 500); // Simulate typing delay
    }
  });  