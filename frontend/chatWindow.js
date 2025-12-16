const input = document.getElementById('messageInput');
const send = document.getElementById('sendBtn');
const chatMessage = document.getElementById('chatMessage');

// send.addEventListener('click', sendMessage);

// function sendMessage() {
//   const text = input.value.trim();
//   if (!text) return;

//   const msg = document.createElement('div');
//   msg.className = 'message sent';
//   msg.innerHTML = `
//     ${text}
//     <div class="time">
//       ${new Date().toLocaleTimeString([], {
//         hour: '2-digit',
//         minute: '2-digit'
//       })}
//     </div>
//   `;

//   chatMessage.appendChild(msg);
//   chatMessage.scrollTop = chatMessage.scrollHeight;
//   input.value = '';
// }

send.addEventListener('click', sendMessage);

async function sendMessage() {
  const text = input.value.trim();
  if (!text) return;

  console.log('userId:', localStorage.getItem('userId')); // ✅ HERE
  console.log('message:', text);


  try {
    await axios.post('http://localhost:3000/chat/send', {
      userId: localStorage.getItem('userId'),
      message: text
    });

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

  } catch (err) {
    console.log(err);
  }
}

