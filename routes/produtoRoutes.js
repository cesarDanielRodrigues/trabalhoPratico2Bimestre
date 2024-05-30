const router = require("express").Router()

const Produto = require("../models/Produto")

//CREATE
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
      error: "Informe os campos corretamente",
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
router.get("/", async (req,res)=>{
  try{
    const produtos = await Produto.find()
    res.status(201).json(produtos)
  } catch(error){
    res.status(500).json({error:error})
  }
})

//READ com ID
router.get("/:index", async(req,res)=>{
  try{
    const {index} = req.params
    const produto = await Produto.findOne({id:index})
    res.status(201).json(produto)
  }catch(error){
    res.status(500).json({error:error})
    
  }
})

//UPDATE
router.put("/:index", async(req,res)=>{
  try{
    const {index} = req.params
    const { nome, descricao, cor, peso, tipo, preco, data_cadastro } = req.body
    const produto = {
      nome,
      descricao,
      cor,
      peso,
      tipo,
      preco,
      data_cadastro
    }
    await Produto.updateOne({id:index},produto)
    res.status(201).json({message:"Produto atualizado com sucesso!"})
  }catch(error){
    res.status(500).json({error:error})
  }
})

//
module.exports = router
