// const ip_name = document.getElementById("name");
const ip_room = document.getElementById("room");
const ip_message = document.getElementById("ip_message");

const btn_join = document.getElementById("btn_join");
const btn_send = document.getElementById("btn_send");

const ul_message = document.getElementById("ul_message");

var socket = io.connect();

// let my_name = "";
let my_name = localStorage.getItem("username");

//on: nhan  emit: gui di
socket.on("connect", function () {
  console.log("Connected to server!");
});

//Lay id phong ra der gui den server
btn_join.addEventListener("click", () => {
  // my_name = ip_name.value;
  const room = ip_room.value;
  socket.emit("join", room);
  alert(`Join room ${room} success`);
});

//Ham gui tin nhan den server
const sendMessage = () => {
  const message = ip_message.value;
  if (!message) {
    return;
  }
  const obj = {
    name: my_name,
    message: message,
  };
  socket.emit("message", JSON.stringify(obj));
  ip_message.value = "";
  ip_message.focus();
};

//Gui tin nhan bang nut Send
btn_send.addEventListener("click", sendMessage);

//Gui tin nhan bang nut Enter
ip_message.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    sendMessage();
  }
});

//Nhan tin nhan tu server
socket.on("thread", function (data) {
  const obj = JSON.parse(data);
  const li = document.createElement("li");
  li.innerHTML = obj.message;
  if (obj.name === my_name) {
    li.classList.add("right");
  }
  ul_message.appendChild(li);
  ul_message.scrollTop = ul_message.scrollHeight;
});
