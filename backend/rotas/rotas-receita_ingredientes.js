const express = require("express")
const router = express.Router()

const banco = require("../banco")

router.get("", async (req, res) => {
    let resp = await banco.mostraReceitaIngredientes()
    return res.status(200).json(resp)
})

router.get("/:id_receita", async (req, res) => {
    //pega todos os ingredientes de uma receita
    const id_receita = req.params.id_receita
    let resp = await banco.mostraIngredientesPorReceita(id_receita)
    return res.status(200).json(resp)
})

router.post("", async (req, res) => {
    let resIng = req.body
    let resp = await banco.insereReceitaIngrediente(resIng)
    if(resp){
        return res.status(200).send("receita_ingredientes adicionado")
    } else {
        return res.status(400).send("erro")
    }
})

router.delete("/:id_receitas/:id_ingredientes", async (req, res) => {
    const id_receitas = req.params.id_receitas
    const id_ingredientes = req.params.id_ingredientes
    let resp = await banco.deletaReceitaIngrediente(id_receitas, id_ingredientes)
    if(resp){
        return res.status(204).send("receita_ingrediente deletado")
    } else {
        return res.status(404).send("erro")
    }
})

router.delete("/:id_receitas", async (req, res) => {
    const id_receitas = req.params.id_receitas
    let resp = await banco.deletaReceitaIngredientePorReceita(id_receitas)
    if(resp){
        return res.status(204).send("receita_ingrediente deletado")
    } else {
        return res.status(404).send("erro")
    }
})

router.put("/:id_receitas/:id_ingredientes", async (req, res) => {
    //atualiza quantidade e unidade
    const id_receitas = req.params.id_receitas
    const id_ingredientes = req.params.id_ingredientes
    let resIng = req.body
    let resp = await banco.atualizaReceitaIngrediente(id_receitas, id_ingredientes, resIng)
    if(resp){
        return res.status(204).send("receita_ingredientes foi atualizado")
    } else {
        return res.status(404).send("erro")
    }
})

module.exports = router;