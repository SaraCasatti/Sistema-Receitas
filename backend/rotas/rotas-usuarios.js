const express = require("express")
const router = express.Router()

const banco = require("../banco")

router.get("/:usuario", async (req, res) => {
    //ve se o usuario existe
    const usuario = req.params.usuario
    resp = await banco.mostraUsuario(usuario)
    console.log(resp)
    if(resp != undefined) {
        return res.status(200).send("usuario existe")
    } else {
        return res.status(404).send("usuario inexistente")
    }
})

router.get("/:usuario/:senha", async (req, res) => {
    //loga o usuario
    const usuario = req.params.usuario
    const senha = req.params.senha
    let senhaOficial = await banco.mostraUsuarioSenha(usuario)
    if (senha == senhaOficial) {
        return res.status(200).send("usuario logado")
    } else {
        return res.status(400).send("senha ou usuario errado")
    }
})

router.post("", async (req, res) => {
    //cadastra o usuario
    const usuario = req.body.usuario
    const senha = req.body.senha
    let resp = await banco.insereUsuario(usuario, senha)
    if(resp) {
        return res.status(201).send("usuario adicionado")
    } else {
        return res.status(400).send("erro")
    }
})

router.delete("/:id", async (req, res) => {
    //deleta o usuario
    const id = req.params.id
    resp = await banco.deletaUsuario(id)
    if(resp == 1) {
        return res.status(204).send("usuario deletado")
    } else {
        return res.status(404).send("erro")
    }
})

router.put("/:usuario", async (req, res) => {
    //pode apenas mudar a senha
    const usuario = req.params.usuario
    const senha = req.body.senha
    resp = await banco.alterarSenha(usuario, senha)
    if(resp == 1){
        return res.status(204).send("senha alterada")
    } else {
        return res.status(404).send("erro")
    }
})

module.exports = router;