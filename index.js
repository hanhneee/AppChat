const express = require('express')
const app = express();
const http = require("http")
const server = http.createServer(app);


app.get('/', (req, res) => {
    res.send('<h1>Hello World</h1>');
})

server.listen(5000, ()=>{
    console.log("server run at port 5000");
})