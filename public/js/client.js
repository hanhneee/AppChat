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
        alert(`Join room ${room} successfully`)
    })

    const sendMessage = ()=>{
            const message = ip_message.value
            if (!message){
                return;
            }
            const obj = {
                name: my_name,
                message: message
            }
            socket.emit("message", JSON.stringify(obj));
            ip_message.value = ''
            ip_message.focus();
        }
    
    

    btn_send.addEventListener("click", sendMessage)

    ip_message.addEventListener('keydown',(event)=>{
        if (event.key === "Enter"){
            sendMessage()
        }
    })
    socket.on("thread", function (data) {
        const obj = JSON.parse(data)

        const li = document.createElement("li")
        li.innerHTML = obj.message;
        if (obj.name === my_name) {
            li.classList.add("right")
        }

        ul_message.appendChild(li)

        ul_message.scrollTop = ul_message.scrollHeight
    })

})