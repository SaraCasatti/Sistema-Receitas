const express = require("express")
const router = express.Router()

router.get("/nome/:nome", async (req, res) => {
    //busca por nome
})

router.get("/categoria/:cat", async (req, res) => {
    //busca por categoria
})

router.get("/ingrediente/:ing", async (req, res) => {
    //busca por ingrediente
    //nao ser se vai ser apenas 1 ingrediente ou mais
})

module.exports = router;