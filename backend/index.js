const express = require("express")
const cors = require('cors');
const app = express()


app.use(cors({
    origin: 'http://localhost:5173', // Allow requests from this origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Specify allowed headers
    credentials: true // If you need to send cookies or authentication headers
}));


const bodyParser = require("body-parser")
app.use(bodyParser.json())

app.use("/usuarios", require("./rotas/rotas-usuarios"))
app.use("/receitas", require("./rotas/rotas-receitas"))
app.use("/ingredientes", require("./rotas/rotas-ingredientes.js"))
app.use("/busca", require("./rotas/rotas-busca"))
app.use("/receita_ingredientes", require("./rotas/rotas-receita_ingredientes.js"))

app.listen(8000)