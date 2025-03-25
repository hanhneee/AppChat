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
  li.innerHTML = `<span>${obj.message}</span>
   <i onclick="show(event)" class="choose_emotion fa-solid fa-face-smile" style="color: white"></i>
  `;
  if (obj.name === my_name) {
    li.classList.add("right");
  }
  ul_message.appendChild(li);
  ul_message.scrollTop = ul_message.scrollHeight;
  // loadChooseEmotion();
});

function show(e) {
  if (e.target.classList.contains("choose_emotion")) {
    if (e.target.innerHTML.toString().trim().length === 0) {
      e.target.innerHTML = `
    <div class="emotions">
             <i class="fa-solid fa-heart"></i>
             <i class="fa-solid fa-face-laugh-beam"></i>
             <i class="fa-solid fa-face-sad-tear"></i>
             <i class="fa-solid fa-face-rolling-eyes"></i>
           </div>
   `;
    } else {
      e.target.innerHTML = ``;
    }
  }
}

// function loadChooseEmotion() {
//   const choose_emotion = document.getElementsByClassName("choose_emotion");
//   for (let ce of choose_emotion) {
//     ce.addEventListener("click", (e) => {

//     });
//   }
// }
