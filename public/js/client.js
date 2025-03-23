document.addEventListener("DOMContentLoaded", () => {
    const ip_name = document.getElementById("name")
    const ip_room = document.getElementById("room")
    const btn_join = document.getElementById("btn_join")

    const ip_message = document.getElementById("ip_message")
    const btn_send = document.getElementById("btn_send")

    const ul_message = document.getElementById("ul_message")

    var socket = io.connect() // khong chi dinh de co the ket noi toi socket khac, mac dinh la localhost 5000

    let my_name = ""; //biến lưu tên người dùng, là tên người kèm theo tin nhắn họ gửi

    socket.on("connect", function (data) {
        console.log(data)
    })

    btn_join.addEventListener('click', () => {
        // const name = ip_name.value
        const room = ip_room.value
        my_name = ip_name.value     //ip_name = input name
        socket.emit("join", room)
    })

    btn_send.addEventListener("click", () => {
        const message = ip_message.value
        const obj = {
            name: my_name,
            message: message
        }
        socket.emit("message", JSON.stringify(obj));
    })

    socket.on("thread", function (data) {
        const li = document.createElement("li")
        li.innerHTML = data;
        ul_message.appendChild(li)
    })

})