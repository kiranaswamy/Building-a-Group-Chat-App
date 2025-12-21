function renderContacts(users) {
  const contacts = document.getElementById("contacts");
  contacts.innerHTML = "";

  users.forEach(user => {
    const li = document.createElement("li");
    li.textContent = user.name;
    li.onclick = () => selectContact(user.socketId);
    contacts.appendChild(li);
  });
}
