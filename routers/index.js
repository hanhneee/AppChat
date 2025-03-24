const accoutRouter = require("./account.router")
const viewRouter = require("../views/views.router")

module.exports = (app) => {
    app.use("/", viewRouter)
    app.use("/api/accounts", accoutRouter)
}