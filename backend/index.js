const express = require("express")
const app = express()

const bodyParser = require("body-parser")
app.use(bodyParser.json())

app.use("/usuarios", require("./rotas-usuarios"))
app.use("/receitas", require("./rotas-receitas"))
app.use("/busca", require("./rotas-busca"))

app.listen(8000)