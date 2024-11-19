const express = require("express")
const router = express.Router()

const banco = require("../banco")

router.get("/nome/:nome", async (req, res) => {
    //busca por nome
    const nome = req.params.nome
    let resp = await banco.buscaPorNome(nome)
    return res.send(200).json(resp)
})

router.get("/categoria/:cat", async (req, res) => {
    //busca por categoria
    const cat = req.params.cat
    let resp = await banco.buscaPorCategoria(cat)
    return res.status(200).json(resp)
})

router.get("/ingrediente/:id_ing", async (req, res) => {
    //busca por 1 ingrediente
    const id_ing = req.params.id_ing
    let resp = banco.buscaPorIngrediente(id_ing)
    return res.status(200).json(resp)
})

router.get("/ingredientes", async (req, res) => {
    let ingredientes = req.body
    console.log(ingredientes)
    let resp = await banco.buscaPorIngredientes(ingredientes)
    return res.status(200).json(ingredientes)
})

router.get("/especificacoes/:esp/:op", async (req, res) => {
    //esp = especificacoes (lactose, glutem e origem animal)
    //op = opcoes (sim ou nao)
    const esp = req.params.esp
    const op = req.params.op
    let resp = await banco.buscaPorEspecificacoes(esp, op)
    return res.status(200).json(resp)
})

module.exports = router;