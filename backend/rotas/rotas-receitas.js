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
        return res.send(201).send("receita adicionada")
    } else {
        return res.send(400).send("erro")
    }
    console.log(receita)
})

router.delete("/:id", async (req, res) => {

})

router.put("/:id", async (req, res) => {
    //vai poder mudar o modo de preparo e o tempo
})

module.exports = router;