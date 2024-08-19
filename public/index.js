const sendBtn = document.querySelector("#send-btn");
const input = document.querySelector("#msg-input");
const container = document.querySelector(".messages-box");
const socket = io();

function createChatBox(msg, boxClass, textClass) {
    const box = document.createElement("div"); 
    box.classList.add("chat-box", boxClass);
    container.appendChild(box);
    const chat = document.createElement("div");
    box.appendChild(chat);
    chat.innerText = msg;
    chat.classList.add("text", textClass);
}
function sendMsg() {
    const inputMsg = input.value;
    input.value = "";
    createChatBox(inputMsg, "outgoing-box", "outgoing-text");
    socket.emit("message", inputMsg);
}
sendBtn.addEventListener("click", () => {
    if(input.value) sendMsg();
});

input.addEventListener("keypress", (evt) => {
    if(evt.key === "Enter" && input.value) sendMsg();
});

socket.on("message", (receivedMsg) => {
    createChatBox(receivedMsg, "incoming-box", "incoming-text");
});
 