// Example user data (replace later with Firebase)
const users = [
    { id: 1, name: "Sarah Johnson", image: "https://i.pravatar.cc/150?img=47", lastMessage: "Hey there!" },
    { id: 2, name: "Michael Lee", image: "https://i.pravatar.cc/150?img=12", lastMessage: "How was your day?" },
    { id: 3, name: "Amaka Bello", image: "https://i.pravatar.cc/150?img=32", lastMessage: "Let's meet tomorrow!" }
  ];
  
  const chatList = document.getElementById("chatList");
  const chatBody = document.getElementById("chatBody");
  const messageInput = document.getElementById("messageInput");
  const sendBtn = document.getElementById("sendBtn");
  const chatUserName = document.getElementById("chatUserName");
  const chatUserImage = document.getElementById("chatUserImage");
  
  let currentChat = null;
  let messages = {};
  
  // Load user chats
  users.forEach(user => {
    const chatItem = document.createElement("div");
    chatItem.classList.add("chat-item");
    chatItem.innerHTML = `
      <img src="${user.image}" alt="${user.name}">
      <div class="chat-info">
        <h4>${user.name}</h4>
        <p>${user.lastMessage}</p>
      </div>
    `;
    chatItem.addEventListener("click", () => openChat(user));
    chatList.appendChild(chatItem);
  });
  
  // Open chat
  function openChat(user) {
    currentChat = user;
    chatUserName.textContent = user.name;
    chatUserImage.src = user.image;
    chatBody.innerHTML = "";
    messageInput.disabled = false;
    sendBtn.disabled = false;
  
    const chatMessages = messages[user.id] || [];
    chatMessages.forEach(msg => displayMessage(msg.text, msg.type));
  
    // ✅ Mobile: slide chat area in
    document.getElementById("chatArea").classList.add("active");
  }
  
  // Back button for mobile
  document.getElementById("backBtn").addEventListener("click", () => {
    document.getElementById("chatArea").classList.remove("active");
  });
  
  // Display message
  function displayMessage(text, type) {
    const msg = document.createElement("div");
    msg.classList.add("message", type);
    msg.textContent = text;
    chatBody.appendChild(msg);
    chatBody.scrollTop = chatBody.scrollHeight;
  }
  
  // Send message
  sendBtn.addEventListener("click", () => {
    const text = messageInput.value.trim();
    if (!text || !currentChat) return;
  
    displayMessage(text, "sent");
    if (!messages[currentChat.id]) messages[currentChat.id] = [];
    messages[currentChat.id].push({ text, type: "sent" });
  
    messageInput.value = "";
  
    // Simulate reply
    setTimeout(() => {
      const reply = "Got it!";
      displayMessage(reply, "received");
      messages[currentChat.id].push({ text: reply, type: "received" });
    }, 1000);
  });
  
  // Image Zoom Feature
const modal = document.getElementById("imageModal");
const modalImg = document.getElementById("modalImg");
const closeBtn = document.querySelector(".image-modal .close");

// Target all profile pictures (in chat list & header)
const allProfilePics = document.querySelectorAll(".profile-pic, .chat-profile");

allProfilePics.forEach(pic => {
  pic.addEventListener("click", () => {
    modal.style.display = "flex";
    modalImg.src = pic.src;
  });
});

closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target === modal) modal.style.display = "none";
});
