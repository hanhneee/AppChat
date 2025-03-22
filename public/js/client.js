const ip_name = document.getElementById("name");
const ip_room = document.getElementById("room");
const ip_message = document.getElementById("ip_message");

const btn_join = document.getElementById("btn_join");
const btn_send = document.getElementById("btn_send");

const ul_message = document.getElementById("ul_message");

var socket = io.connect();

//on: han  emit: gui di
socket.on("connect", function () {
  console.log("Connected to server!");
});

//Lay id phong ra der gui den server
btn_join.addEventListener("click", () => {
//   const name = ip_name.value
  const room = ip_room.value;
  socket.emit("join", room);
});

//Lay tin nhan ra de gui den Server
btn_send.addEventListener("click", () => {
    const name = ip_name.value
  const message = ip_message.value;
  socket.emit("message", name + ": " + message);
});

socket.on("thread", function (data) {
  const li = document.createElement("li");
  li.innerHTML = data;
  ul_message.appendChild(li);
});
