const express = require("express")
const router = express.Router()


const banco = require("../banco")

router.get("", async (req, res) => {
    let receitas = await banco.mostrarReceitas()
    return res.status(200).json(receitas)
})

router.get("/:idUsuario", async (req, res) => {
    const id = req.params.idUsuario
    let receitas = await banco.mostrarReceitasPorUsuario(id)
    return res.status(200).json(receitas)
})

router.post("", async (req, res) => {
    const receita = req.body
    let resp = await banco.inserirReceita(receita)
    if (resp) {
        return res.status(201).send("receita adicionada")
    } else {
        return res.status(400).send("erro")
    }
})

router.delete("/:id", async (req, res) => {
    const id = req.params.id
    let resp = await banco.deletarReceita(id)
    if(resp) {
        return res.status(204).send("receita deletada")
    } else {
        return res.status(404).send("erro")
    }
})

router.put("/:id", async (req, res) => {
    //vai poder mudar o modo de preparo e o tempo
    const id = req.params.id
    let receita = req.body
    let resp = await banco.atualizarReceita(receita, id)
    if(resp){
        return res.status(204).send("receita atualizada")
    } else {
        return res.status(404).send("erro")
    }
})

router.put("/likes/:id", async (req, res) => {
    const id = req.params.id
    const likes = req.body.likes
    let resp = await banco.atualizaLikes(id, likes)
    if(resp) {
        return res.status(204).send("likes atualizados")
    } else {
        return res.status(404).send("erro")
    }
})

router.put("/dislikes/:id", async (req, res) => {
    const id = req.params.id
    const dislikes = req.body.dislikes
    let resp = await banco.atualizaDislikes(id, dislikes)
    if(resp) {
        return res.status(204).send("dislikes atualizados")
    } else {
        return res.status(404).send("erro")
    }
})

module.exports = router;