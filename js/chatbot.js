const input = document.getElementById("input")
const sendBtn = document.getElementById("send")
const message = document.getElementById("messages")

sendBtn.addEventListener("click", sendMessage);
input.addEventListener("keypress",e=>{
    if(e.key === "Enter") sendMessage();
});

async function sendMessage() {
    const text = input.value.trim();
    if (!text) {
        return;
    }
    addMessage(text, "user");
    input.value = "";

    const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: text })
  });
    const data = await res.json();
  addMessage(data.reply, "bot");
}
function addMessage(text, sender) {
  const div = document.createElement("div");
  div.className = sender;
  div.textContent = text;
  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;
}