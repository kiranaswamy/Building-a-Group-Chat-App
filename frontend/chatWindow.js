
// if (!localStorage.getItem('userId')) {
//   localStorage.setItem('userId', Math.floor(Math.random() * 100000));
// }

// const input = document.getElementById('messageInput');
// const send = document.getElementById('sendBtn');
// const chatMessage = document.getElementById('chatMessage');


// const socket = io("http://localhost:3000");


// socket.on("receiveMessage", (data) => {
  
//   if (data.userId == localStorage.getItem('userId')) return;

//   const msg = document.createElement('div');
//   msg.className = 'message received';
//   msg.innerHTML = `
//     ${data.text}
//     <div class="time">
//       ${new Date(data.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
//     </div>
//   `;
//   chatMessage.appendChild(msg);
//   chatMessage.scrollTop = chatMessage.scrollHeight;
// });


// send.addEventListener('click', () => {
//   const text = input.value.trim();
//   if (!text) return;

//   const msgData = {
//     userId: localStorage.getItem('userId') || 1,
//     text
//   };

//   socket.emit("sendMessage", msgData);

  
//   const msg = document.createElement('div');
//   msg.className = 'message sent';
//   msg.innerHTML = `
//     ${text}
//     <div class="time">
//       ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
//     </div>
//   `;
//   chatMessage.appendChild(msg);
//   chatMessage.scrollTop = chatMessage.scrollHeight;
//   input.value = '';
// });


// const input = document.getElementById('messageInput');
// const sendBtn = document.getElementById('sendBtn');
// const messageInput = document.getElementById('messageInput');

// const url = "http://localhost:3000";

// async function fetchMessages() {
//   const res = await fetch(`${url}/message`);
//   const data = await res.json();

//   messageInput.innerHTML = data
//     .map(m => `<li>${m.text}</li>`)
//     .join('');
// }

// sendBtn.addEventListener('click', async () => {
//   const text = input.value.trim();
//   if (!text) return;

//   await fetch(`${url}/message`, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ text })
//   });

//   input.value = '';
//   fetchMessages();
// });

// setInterval(fetchMessages, 1000);

const input = document.getElementById('messageInput');
const sendBtn = document.getElementById('sendBtn');
const chatMessage = document.getElementById('chatMessage');


if (!localStorage.getItem('userId')) {
  localStorage.setItem('userId', Math.floor(Math.random() * 100000));
}
const userId = localStorage.getItem('userId');


const socket = io("http://localhost:3000");


socket.on('chatMessage', (msg) => {
  const msgDiv = document.createElement('div');
  msgDiv.className = msg.userId == userId ? 'message sent' : 'message received';
  msgDiv.innerHTML = `
    ${msg.text}
    <div class="time">
      ${new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
    </div>
  `;
  chatMessage.appendChild(msgDiv);
  chatMessage.scrollTop = chatMessage.scrollHeight;
});


sendBtn.addEventListener('click', () => {
  const text = input.value.trim();
  if (!text) return;

  const data = { text, userId };
  socket.emit('chatMessage', data);

  input.value = '';
});
