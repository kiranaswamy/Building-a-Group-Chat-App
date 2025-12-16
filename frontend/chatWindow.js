
if (!localStorage.getItem('userId')) {
  localStorage.setItem('userId', Math.floor(Math.random() * 100000));
}

const input = document.getElementById('messageInput');
const send = document.getElementById('sendBtn');
const chatMessage = document.getElementById('chatMessage');


const socket = io("http://localhost:3000");


socket.on("receiveMessage", (data) => {
  
  if (data.userId == localStorage.getItem('userId')) return;

  const msg = document.createElement('div');
  msg.className = 'message received';
  msg.innerHTML = `
    ${data.text}
    <div class="time">
      ${new Date(data.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
    </div>
  `;
  chatMessage.appendChild(msg);
  chatMessage.scrollTop = chatMessage.scrollHeight;
});


send.addEventListener('click', () => {
  const text = input.value.trim();
  if (!text) return;

  const msgData = {
    userId: localStorage.getItem('userId') || 1,
    text
  };

  socket.emit("sendMessage", msgData);

  
  const msg = document.createElement('div');
  msg.className = 'message sent';
  msg.innerHTML = `
    ${text}
    <div class="time">
      ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
    </div>
  `;
  chatMessage.appendChild(msg);
  chatMessage.scrollTop = chatMessage.scrollHeight;
  input.value = '';
});
