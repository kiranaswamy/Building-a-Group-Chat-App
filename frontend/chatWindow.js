
// const socket = io("ws://localhost:3000");
// const input = document.getElementById("messageInput");
// const chatMessage = document.getElementById("chatMessage");
// const searchInput = document.getElementById("searchInput");

// // console.log("Current userId from localStorage:", localStorage.getItem('userId')); 
// // localStorage.setItem('email', response.data.user.email);
// let recipientSocketId = null;
// let recipientUserId = null;

// searchInput.addEventListener("input", () => {
//     const email = searchInput.value.trim().toLowerCase();

//     // Get all contacts from the rendered list
//     const contacts = Array.from(document.getElementById("contacts").children);

//     // Find the user whose email matches input
//     const user = contacts.map(li => ({
//         email: li.dataset.email.toLowerCase(),
//         socketId: li.dataset.socketId,
//         userId: li.dataset.userId
//     })).find(u => u.email .includes(email));

//     if (user) {
//         recipientSocketId = user.socketId;
//         recipientUserId = user.userId;
//         console.log("Recipient selected automatically:", recipientSocketId, recipientUserId);
//     } else {
//         recipientSocketId = null;
//         recipientUserId = null;
//     }
// });

// let myId = "";
// let recipientId = null;

// // function selectContact(id) {
// //   recipientId = id;
// //   console.log("Selected recipient:", recipientId);
// // }

// function selectContact(user) {
//   recipientSocketId = user.socketId;
//   recipientUserId = user.userId;

//   console.log("Selected:", recipientSocketId, recipientUserId);
// }

// socket.on("connect", () => {
//   myId = socket.id;
  
//   const email = localStorage.getItem("email");
//   if (email) {
//     socket.emit("registerUser", { email });
//   }
// });

// // Append message to chat
// function getMessage(data){
//   const msgDiv = document.createElement("div");

//   const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

//   // Sender = right, Receiver = left
//   msgDiv.className = data.socketId === myId ? "message sent" : "message received";

//   msgDiv.innerHTML = `
//     ${data.senderName} said: ${data.message}
//     <div class='time'>${time}</div>
//   `;

//   chatMessage.appendChild(msgDiv);
//   chatMessage.scrollTop = chatMessage.scrollHeight;
// }

// // Receive messages
// socket.on("chatMessage", (object) => {
//   getMessage(object);
// });

// // Send message
// function sendBtn (){
//   const msg = input.value.trim();
//   if (!msg || !recipientSocketId) {
//     alert("Please select a recipient first");
//     return;
//   }

//   const email = localStorage.getItem('email');   // ✅ get email
//   const userId = localStorage.getItem('userId'); // ✅ get userId if needed

 
//  console.log("Sending message with email:", email, "userId:", userId);

//   // Emit to server
//   socket.emit('chatMessage',{
//     message: msg,
//     email: email,
//     // userId:userId,
//     // recipientId: recipientId
//     recipientSocketId,
//     recipientUserId
// } );


//   input.value ="";
// }

// // TEMP demo users (replace later with server users)
// socket.on("onlineUsers", (users) => {
//   renderContacts(users.filter(u => u.socketId !== myId));
// });

// function renderContacts(users) {
//   const contacts = document.getElementById("contacts");
//   contacts.innerHTML = "";

//   users.forEach(user => {
//     const li = document.createElement("li");
//      li.textContent = user.name + " (" + user.email + ")";
//     // li.textContent = user.name;

//     li.textContent = `${user.name} (${user.email})`;
//     li.dataset.socketId = user.socketId;
//     li.dataset.userId = user.userId;
//     li.dataset.email = user.email;

//     li.onclick = () => selectContact(user);

//     contacts.appendChild(li);
//   });
// }




// const socket = io("ws://localhost:3000");
// const input = document.getElementById("messageInput");
// const chatMessage = document.getElementById("chatMessage");
// const searchInput = document.getElementById("searchInput");

// let recipientSocketId = null;
// let recipientUserId = null;
// let currentRoom = null;
// let myId = "";

// /* ---------- SAFE GROUP CLICK ---------- */
// window.addEventListener("DOMContentLoaded", () => {
//   const groupBtn = document.getElementById("groupChat");
//   if (groupBtn) {
//     groupBtn.addEventListener("click", async () => {
//       currentRoom = 1;
//       recipientSocketId = null;

//       socket.emit("joinGroup", currentRoom);

//       try {
//         const res = await fetch(`http://localhost:3000/groups/${currentRoom}/messages`);
//         const messages = await res.json();

//         chatMessage.innerHTML = "";
//         messages.forEach(msg => {
//           displayMessage(
//             msg.senderName,
//             msg.message,
//             msg.senderName === localStorage.getItem("email")
//           );
//         });
//       } catch (err) {
//         console.error("Failed to load group messages", err);
//       }
//     });
//   }
// });

// /* ---------- MESSAGE UI ---------- */
// function displayMessage(senderName, message, isSentByMe = false) {
//   const msgDiv = document.createElement("div");
//   const time = new Date().toLocaleTimeString([], {
//     hour: "2-digit",
//     minute: "2-digit"
//   });

//   msgDiv.className = isSentByMe ? "message sent" : "message received";
//   msgDiv.innerHTML = `${senderName}: ${message}<div class='time'>${time}</div>`;

//   chatMessage.appendChild(msgDiv);
//   chatMessage.scrollTop = chatMessage.scrollHeight;
// }

// /* ---------- SEARCH ---------- */
// if (searchInput) {
//   searchInput.addEventListener("input", () => {
//     const email = searchInput.value.trim().toLowerCase();
//     const contacts = Array.from(document.getElementById("contacts").children);

//     const user = contacts
//       .map(li => ({
//         email: li.dataset.email?.toLowerCase(),
//         socketId: li.dataset.socketId,
//         userId: li.dataset.userId
//       }))
//       .find(u => u.email && u.email.toLowerCase().includes(email));

//     if (user) {
//       recipientSocketId = user.socketId;
//       recipientUserId = user.userId;
//     } else {
//       recipientSocketId = null;
//       recipientUserId = null;
//     }
//   });
// }

// /* ---------- CONTACT SELECT ---------- */
// function selectContact(user) {
//   currentRoom = null;
//   recipientSocketId = user.socketId;
//   recipientUserId = user.userId;
// }

// /* ---------- SOCKET CONNECT ---------- */
// socket.on("connect", () => {
//   myId = socket.id;

//   const email = localStorage.getItem("email");
//   if (email) {
//     socket.emit("registerUser", { email });
//   }
// });

// /* ---------- PERSONAL MESSAGE RECEIVE ---------- */
// socket.on("chatMessage", (data) => {
//   const isMe = data.socketId === myId;
//   displayMessage(data.senderName, data.message, isMe);
// });

// /* ---------- GROUP MESSAGE RECEIVE ---------- */
// socket.on("groupMessage", (msg) => {
//   const isMe = msg.senderName === localStorage.getItem("name");
//   displayMessage(msg.senderName, msg.message, isMe);
// });

// /* ---------- SEND BUTTON ---------- */
// function sendBtn() {
//   const msg = input.value.trim();
//   if (!msg) return;

//   const email = localStorage.getItem("email");

//   // ✅ GROUP CHAT
//   if (currentRoom !== null) {
//     socket.emit("groupMessage", {
//       groupId: currentRoom,
//       username: email,
//       message: msg
//     });
//     input.value = "";
//     return;
//   }

//   // ✅ PERSONAL CHAT
//   if (!recipientSocketId) {
//     alert("Please select a recipient first");
//     return;
//   }

//   socket.emit("chatMessage", {
//     message: msg,
//     email,
//     recipientSocketId,
//     recipientUserId
//   });

//   input.value = "";
// }

// /* ---------- ONLINE USERS ---------- */
// socket.on("onlineUsers", (users) => {
//   renderContacts(users.filter(u => u.socketId !== myId));
// });

// function renderContacts(users) {
//   const contacts = document.getElementById("contacts");
//   contacts.innerHTML = "";

//   users.forEach(user => {
//     const li = document.createElement("li");
//     li.textContent = `${user.name} (${user.email})`;
//     li.dataset.socketId = user.socketId;
//     li.dataset.userId = user.userId;
//     li.dataset.email = user.email;

//     li.onclick = () => selectContact(user);
//     contacts.appendChild(li);
//   });
// }

// const socket = io("ws://localhost:3000");
// const input = document.getElementById("messageInput");
// const chatMessage = document.getElementById("chatMessage");
// const searchInput = document.getElementById("searchInput");

// /* 🔹 ADDED (Predictive + Smart UI refs) */
// const predictiveDiv = document.getElementById("predictiveSuggestions");
// const smartDiv = document.getElementById("smartReplies");

// let recipientSocketId = null;
// let recipientUserId = null;
// let currentRoom = null;
// let myId = "";

// /* ---------- SAFE GROUP CLICK ---------- */
// window.addEventListener("DOMContentLoaded", () => {
//   const groupBtn = document.getElementById("groupChat");
//   if (groupBtn) {
//     groupBtn.addEventListener("click", async () => {
//       currentRoom = 1;
//       recipientSocketId = null;

//       socket.emit("joinGroup", currentRoom);

//       try {
//         const res = await fetch(`http://localhost:3000/groups/${currentRoom}/messages`);
//         const messages = await res.json();

//         chatMessage.innerHTML = "";
//         messages.forEach(msg => {
//           displayMessage(
//             msg.senderName,
//             msg.message,
//             msg.senderName === localStorage.getItem("email")
//           );
//         });
//       } catch (err) {
//         console.error("Failed to load group messages", err);
//       }
//     });
//   }
// });

// /* ---------- MESSAGE UI ---------- */
// function displayMessage(senderName, message, isSentByMe = false) {
//   const msgDiv = document.createElement("div");
//   const time = new Date().toLocaleTimeString([], {
//     hour: "2-digit",
//     minute: "2-digit"
//   });

//   msgDiv.className = isSentByMe ? "message sent" : "message received";
//   msgDiv.innerHTML = `${senderName}: ${message}<div class='time'>${time}</div>`;

//   chatMessage.appendChild(msgDiv);
//   chatMessage.scrollTop = chatMessage.scrollHeight;
// }

// /* ---------- SEARCH ---------- */
// if (searchInput) {
//   searchInput.addEventListener("input", () => {
//     const email = searchInput.value.trim().toLowerCase();
//     const contacts = Array.from(document.getElementById("contacts").children);

//     const user = contacts
//       .map(li => ({
//         email: li.dataset.email?.toLowerCase(),
//         socketId: li.dataset.socketId,
//         userId: li.dataset.userId
//       }))
//       .find(u => u.email && u.email.includes(email));

//     if (user) {
//       recipientSocketId = user.socketId;
//       recipientUserId = user.userId;
//     } else {
//       recipientSocketId = null;
//       recipientUserId = null;
//     }
//   });
// }

// /* ---------- CONTACT SELECT ---------- */
// function selectContact(user) {
//   currentRoom = null;
//   recipientSocketId = user.socketId;
//   recipientUserId = user.userId;
// }

// /* ---------- SOCKET CONNECT ---------- */
// socket.on("connect", () => {
//   myId = socket.id;
//   const email = localStorage.getItem("email");
//   if (email) socket.emit("registerUser", { email });
// });

// /* ---------- PERSONAL MESSAGE RECEIVE ---------- */
// socket.on("chatMessage", (data) => {
//   const isMe = data.socketId === myId;
//   displayMessage(data.senderName, data.message, isMe);

//   if (!isMe) showSmartReplies(data.message); // 🔹 ADDED
// });

// /* ---------- GROUP MESSAGE RECEIVE ---------- */
// socket.on("groupMessage", (msg) => {
//   const isMe = msg.senderName === localStorage.getItem("name");
//   displayMessage(msg.senderName, msg.message, isMe);

//   if (!isMe) showSmartReplies(msg.message); // 🔹 ADDED
// });

// /* ---------- SEND BUTTON ---------- */
// function sendBtn() {
//   const msg = input.value.trim();
//   if (!msg) return;

//   const email = localStorage.getItem("email");

//   // GROUP CHAT
//   if (currentRoom !== null) {
//     socket.emit("groupMessage", {
//       groupId: currentRoom,
//       username: email,
//       message: msg
//     });
//     input.value = "";
//     predictiveDiv.innerHTML = "";
//     smartDiv.innerHTML = "";
//     return;
//   }

//   // PERSONAL CHAT
//   if (!recipientSocketId) {
//     alert("Please select a recipient first");
//     return;
//   }

//   socket.emit("chatMessage", {
//     message: msg,
//     email,
//     recipientSocketId,
//     recipientUserId
//   });

//   input.value = "";
//   predictiveDiv.innerHTML = "";
//   smartDiv.innerHTML = "";
// }

// /* ---------- ONLINE USERS ---------- */
// socket.on("onlineUsers", (users) => {
//   renderContacts(users.filter(u => u.socketId !== myId));
// });

// function renderContacts(users) {
//   const contacts = document.getElementById("contacts");
//   contacts.innerHTML = "";

//   users.forEach(user => {
//     const li = document.createElement("li");
//     li.textContent = `${user.name} (${user.email})`;
//     li.dataset.socketId = user.socketId;
//     li.dataset.userId = user.userId;
//     li.dataset.email = user.email;

//     li.onclick = () => selectContact(user);
//     contacts.appendChild(li);
//   });
// }

// /* =====================================================
//    🔥 PREDICTIVE TYPING (ADDED)
// ===================================================== */
// const predictiveData = {
//   "let's": ["meet", "talk", "go"],
//   "meet": ["at 5 pm", "tomorrow", "in office"],
//   "are": ["you", "we"],
//   "how": ["are you?", "is it going?"]
// };

// input.addEventListener("input", () => {
//   const words = input.value.trim().toLowerCase().split(" ");
//   const lastWord = words[words.length - 1];

//   const suggestions = predictiveData[lastWord] || [];
//   predictiveDiv.innerHTML = suggestions
//     .map(w => `<button onclick="usePrediction('${w}')">${w}</button>`)
//     .join("");
// });

// function usePrediction(word) {
//   input.value += word + " ";
//   predictiveDiv.innerHTML = "";
// }

// /* =====================================================
//    🔥 SMART REPLIES (ADDED)
// ===================================================== */
// const smartRepliesData = {
//   "hello": ["Hi 😊", "Hey 👋", "Hello!"],
//   "are you coming to the meeting?": [
//     "Yes, I’ll be there.",
//     "Running late, will join soon.",
//     "Can we reschedule?"
//   ],
//   "ok": ["👍", "Got it", "Sure"]
// };

// function showSmartReplies(message) {
//   const replies = smartRepliesData[message.toLowerCase()] || [];
//   smartDiv.innerHTML = replies
//     .map(r => `<button onclick="sendSmartReply('${r}')">${r}</button>`)
//     .join("");
// }

// function sendSmartReply(reply) {
//   input.value = reply;
//   sendBtn();
//   smartDiv.innerHTML = "";
// }

const socket = io("ws://localhost:3000");
const input = document.getElementById("messageInput");
const chatMessage = document.getElementById("chatMessage");
const searchInput = document.getElementById("searchInput");

/* 🔹 ADDED (Predictive + Smart UI refs) */
const predictiveDiv = document.getElementById("predictiveSuggestions");
const smartDiv = document.getElementById("smartReplies");

let recipientSocketId = null;
let recipientUserId = null;
let currentRoom = null;
let myId = "";

/* ---------- SAFE GROUP CLICK ---------- */
window.addEventListener("DOMContentLoaded", () => {
  const groupBtn = document.getElementById("groupChat");
  if (groupBtn) {
    groupBtn.addEventListener("click", async () => {
      currentRoom = 1;
      recipientSocketId = null;

      socket.emit("joinGroup", currentRoom);

      try {
        const res = await fetch(`http://localhost:3000/groups/${currentRoom}/messages`);
        const messages = await res.json();

        chatMessage.innerHTML = "";
        messages.forEach(msg => {
          displayMessage(
            msg.senderName,
            msg.message,
            msg.senderName === localStorage.getItem("email")
          );
        });
      } catch (err) {
        console.error("Failed to load group messages", err);
      }
    });
  }
});

/* ---------- MESSAGE UI ---------- */
function displayMessage(senderName, message, isSentByMe = false) {
  const msgDiv = document.createElement("div");
  const time = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit"
  });

  msgDiv.className = isSentByMe ? "message sent" : "message received";
  msgDiv.innerHTML = `${senderName}: ${message}<div class='time'>${time}</div>`;

  chatMessage.appendChild(msgDiv);
  chatMessage.scrollTop = chatMessage.scrollHeight;
}

/* ---------- SEARCH ---------- */
if (searchInput) {
  searchInput.addEventListener("input", () => {
    const email = searchInput.value.trim().toLowerCase();
    const contacts = Array.from(document.getElementById("contacts").children);

    const user = contacts
      .map(li => ({
        email: li.dataset.email?.toLowerCase(),
        socketId: li.dataset.socketId,
        userId: li.dataset.userId
      }))
      .find(u => u.email && u.email.includes(email));

    if (user) {
      recipientSocketId = user.socketId;
      recipientUserId = user.userId;
    } else {
      recipientSocketId = null;
      recipientUserId = null;
    }
  });
}

/* ---------- CONTACT SELECT ---------- */
function selectContact(user) {
  currentRoom = null;
  recipientSocketId = user.socketId;
  recipientUserId = user.userId;
}

/* ---------- SOCKET CONNECT ---------- */
socket.on("connect", () => {
  myId = socket.id;
  const email = localStorage.getItem("email");
  if (email) socket.emit("registerUser", { email });
});

/* ---------- PERSONAL MESSAGE RECEIVE ---------- */
socket.on("chatMessage", (data) => {
  const isMe = data.socketId === myId;
  displayMessage(data.senderName, data.message, isMe);

  if (!isMe) showSmartReplies(data.message); // 🔹 UPDATED
});

/* ---------- GROUP MESSAGE RECEIVE ---------- */
socket.on("groupMessage", (msg) => {
  const isMe = msg.senderName === localStorage.getItem("name");
  displayMessage(msg.senderName, msg.message, isMe);

  if (!isMe) showSmartReplies(msg.message); // 🔹 UPDATED
});

/* ---------- SEND BUTTON ---------- */
function sendBtn() {
  const msg = input.value.trim();
  if (!msg) return;

  const email = localStorage.getItem("email");

  // GROUP CHAT
  if (currentRoom !== null) {
    socket.emit("groupMessage", {
      groupId: currentRoom,
      username: email,
      message: msg
    });
    input.value = "";
    predictiveDiv.innerHTML = "";
    smartDiv.innerHTML = "";
    return;
  }

  // PERSONAL CHAT
  if (!recipientSocketId) {
    alert("Please select a recipient first");
    return;
  }

  socket.emit("chatMessage", {
    message: msg,
    email,
    recipientSocketId,
    recipientUserId
  });

  input.value = "";
  predictiveDiv.innerHTML = "";
  smartDiv.innerHTML = "";
}

/* ---------- ONLINE USERS ---------- */
socket.on("onlineUsers", (users) => {
  renderContacts(users.filter(u => u.socketId !== myId));
});

function renderContacts(users) {
  const contacts = document.getElementById("contacts");
  contacts.innerHTML = "";

  users.forEach(user => {
    const li = document.createElement("li");
    li.textContent = `${user.name} (${user.email})`;
    li.dataset.socketId = user.socketId;
    li.dataset.userId = user.userId;
    li.dataset.email = user.email;

    li.onclick = () => selectContact(user);
    contacts.appendChild(li);
  });
}



const predictiveData = {
  "lets": ["meet", "talk", "go"],
  "meet": ["at 5 pm", "tomorrow", "in office"],
  "are": ["you", "we"],
  "how": ["are you", "is it going"]
};

input.addEventListener("input", () => {
  const words = input.value.trim().split(" ");
  const lastWord = words[words.length - 1]
    .toLowerCase()
    .replace(/[^a-z]/g, ""); // ✅ normalization

  const suggestions = predictiveData[lastWord] || [];
  predictiveDiv.innerHTML = suggestions
    .map(w => `<button onclick="usePrediction('${w}')">${w}</button>`)
    .join("");
});

function usePrediction(word) {
  const words = input.value.trim().split(" ");
  words[words.length - 1] = word;
  input.value = words.join(" ") + " ";
  predictiveDiv.innerHTML = "";
}


const smartRepliesData = {
  "hello": ["Hi 😊", "Hey 👋", "Hello!"],
  "are you coming to the meeting": [
    "Yes, I’ll be there.",
    "Running late, will join soon.",
    "Can we reschedule?"
  ],
  "ok": ["👍", "Got it", "Sure"]
};

function showSmartReplies(message) {
  const cleanMsg = message
    .toLowerCase()
    .replace(/[^a-z\s]/g, "") // ✅ removes ?
    .trim();

  const replies = smartRepliesData[cleanMsg] || [];
  smartDiv.innerHTML = replies
    .map(r => `<button onclick="sendSmartReply('${r}')">${r}</button>`)
    .join("");
}

function sendSmartReply(reply) {
  input.value = reply;
  sendBtn();
  smartDiv.innerHTML = "";
}
