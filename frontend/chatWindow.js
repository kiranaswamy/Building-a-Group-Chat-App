const input = document.getElementById('messageInput');
const send = document.getElementById('sendBtn');
const chatMessage = document.getElementById('chatMessage');

send.addEventListener('click', sendMessage);

function sendMessage() {
  const text = input.value.trim();
  if (!text) return;

  const msg = document.createElement('div');
  msg.className = 'message sent';
  msg.innerHTML = `
    ${text}
    <div class="time">
      ${new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
      })}
    </div>
  `;

  chatMessage.appendChild(msg);
  chatMessage.scrollTop = chatMessage.scrollHeight;
  input.value = '';
}
