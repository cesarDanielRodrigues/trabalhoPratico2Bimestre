const router = require("express").Router()

const Produto = require("../models/Produto")

router.post("/", (req, res) => {
  const { id, nome, descricao, cor, peso, tipo, preco, data_cadastro } =
    req.body
  if (
    !id &&
    !nome &&
    !descricao &&
    !cor &&
    !peso &&
    !tipo &&
    !preco &&
    !data_cadastro
  ) {
    res.status(422).json({
      error: "Informar o nome, cargo, salario e desligao é obrigatório!",
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

router.get("/",(req,res)=>{
  try{
    const produtos = Produto.getMaxListeners()
    console.log(produtos)
    res.status(200).json(produtos)
  } catch(error){
    res.status(500).json({error:error})
  }
})

module.exports = router
