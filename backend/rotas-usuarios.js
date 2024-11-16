const express = require("express")
const router = express.Router()

const banco = require("./banco")

router.get("/:usuario", async (req, res) => {
    const usuario = req.params.usuario
    
})

router.post("", async (req, res) => {
    const usuario = req.body.usuario
    const senha = req.body.senha
    await banco.insereUsuario(usuario, senha)
    res.send(`usuario ${usuario} adicionado`)
})

router.delete("/:id", async (req, res) => {
    const id = req.params.id
    await banco.deletaUsuario(id)
    res.send(`usuario deletado`)
})

router.put("/:id", async (req, res) => {
    //não sei se eu vou fazer o put para os usuarios 
    //se eu for fazer vai poder mudar o usuario e a senha
})
module.exports = router;