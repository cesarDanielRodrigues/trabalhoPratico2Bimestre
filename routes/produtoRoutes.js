const router = require("express").Router()
const Produto = require("../models/Produto")

//CREATE
router.post("/", async (req, res) => {
  const { id, nome, descricao, cor, peso, tipo, preco, data_cadastro } =
    req.body
  if (
    typeof id !== "number" ||
    typeof nome !== "string" ||
    typeof descricao !== "string" ||
    typeof cor !== "string" ||
    typeof peso !== "number" ||
    typeof tipo !== "string" ||
    typeof preco !== "number" ||
    isNaN(new Date(data_cadastro).getTime())
  ) {
    res.status(422).json({
      error: "Informe os campos corretamente",
    })
  }
  if (
    !nome ||
    !descricao ||
    !cor ||
    !peso ||
    !tipo ||
    !preco ||
    !data_cadastro
  ) {
    return res.status(422).json({
      error:
        "Todos os campos (nome, descricao, cor, peso, tipo, preco, data_cadastro) são obrigatórios!",
    })
  }
  const existingProduct = await Produto.findOne({ id })
  if (existingProduct) {
    return res.status(409).json({
      error: "ID já existe no banco de dados. Escolha um ID diferente.",
    })
  }
  const produto = {
    id,
    nome,
    descricao,
    cor,
    peso,
    tipo,
    preco,
    data_cadastro,
  }
  try {
    Produto.create(produto)
    res.status(201).json({ message: "Produto cadastrado com sucesso!" })
  } catch (error) {
    res.status(500).json({ error: error })
  }
})

//READ
router.get("/", async (req, res) => {
  try {
    const produtos = await Produto.find()
    res.status(201).json(produtos)
  } catch (error) {
    res.status(500).json({ error: error })
  }
})

//READ com ID ou NOME
router.get("/:index", async (req, res) => {
  try {
    const { index } = req.params
    let produto;

    if (!isNaN(index)) {
      produto = await Produto.findOne({ id: index });
    }

    if (!produto) {
      produto = await Produto.findOne({ nome: index });
    }
    if(!produto){
      return res.status(404).json({ message: "Produto não encontrado" })
    }
    res.status(201).json(produto)
  } catch (error) {
    res.status(500).json({ error: error })
  }
})

//UPDATE
router.put("/:index", async (req, res) => {
  try {
    const { index } = req.params
    const { nome, descricao, cor, peso, tipo, preco, data_cadastro } = req.body

    const existingProduct = await Produto.findOne({ id: index })
    if (!existingProduct) {
      return res.status(404).json({ message: "Produto não encontrado" })
    }

    if (
      !nome ||
      !descricao ||
      !cor ||
      !peso ||
      !tipo ||
      !preco ||
      !data_cadastro
    ) {
      return res.status(422).json({
        error:
          "Todos os campos (nome, descricao, cor, peso, tipo, preco, data_cadastro) são obrigatórios!",
      })
    }

    if (
      typeof nome !== "string" ||
      typeof descricao !== "string" ||
      typeof cor !== "string" ||
      typeof peso !== "number" ||
      typeof tipo !== "string" ||
      typeof preco !== "number" ||
      isNaN(new Date(data_cadastro).getTime())
    ) {
      return res.status(422).json({
        error:
          "Verifique os tipos dos campos (nome: string, descricao: string, cor: string, peso: number, tipo: string, preco: number, data_cadastro: date).",
      })
    }

    const produto = {
      nome,
      descricao,
      cor,
      peso,
      tipo,
      preco,
      data_cadastro,
    }
    await Produto.updateOne({ id: index }, produto)
    res.status(201).json({ message: "Produto atualizado com sucesso!" })
  } catch (error) {
    res.status(500).json({ error: error })
  }
})

//DELETE
router.delete("/:index", async (req, res) => {
  try {
    const { index } = req.params
    const existingProduct = await Produto.findOne({ id: index })
    if (!existingProduct) {
      return res.status(404).json({ message: "Produto não encontrado" })
    }
    await Produto.deleteOne({ id: index })
    res.status(201).json({ message: "Produto deletado com sucesso!" })
  } catch (error) {
    res.status(500).json({ error: error })
  }
})
module.exports = router
