const express = require("express")
const app = express()

const bodyParser = require("body-parser")
app.use(bodyParser.json())

app.use("/usuarios", require("./rotas/rotas-usuarios"))
app.use("/receitas", require("./rotas/rotas-receitas"))
app.use("/ingredientes", require("./rotas/rotas-ingredientes.js"))
app.use("/busca", require("./rotas/rotas-busca"))
app.use("/receita_ingredientes", require("./rotas/rotas-receita_ingredientes.js"))

app.listen(8000)