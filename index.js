const express = require('express')
const app = express();
const http = require("http")
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const connectDB = require("./configs/database")
const router = require("./routers") //tu chi dinh den index

app.use(express.json())
app.use(express.static('public'))
app.set("view engine", 'ejs')
app.set("views", 'views')   //thu muc cung cap


io.on("connection", function (client) {
    console.log("co nguoi ket noi");
    var room;  //room chat
    //tham gia chat
    client.on("join", function (data) {
        room = data;
        client.join(room)
        console.log(`client da tham gia room: ${room}`);
    })
    // nhan tin nhan va gui lai cho room
    client.on("message", function (data) {
        console.log(`Tin nhan tu ${room}:`, data)
        io.to(room).emit("thread", data)
    })
})

connectDB();
router(app);


// app.get('/chat', (req, res) => {
//     return res.render("chat.ejs")
// });

server.listen(5000, () => {
    console.log("server run at port 5000");
})