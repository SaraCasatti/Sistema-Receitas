const express = require("express")
const router = express.Router()

const banco = require("../banco")

router.get("", async (req, res) => {
    const ingredientes = await banco.mostrarIngredientes()
    console.log(ingredientes)
    res.status(200).json(ingredientes)
})

module.exports = router;