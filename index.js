const express = require("express");
const server = express();
server.use(express.json());

const cursos = ["NodeJS", "JavaScript", "PHP", "React", "VueJS"];

// Checar se o create do curso esta recebendo um valor válido
function checkCurso(req,res, next){
  if(!req.body.novo_curso){
    return res.status(400).json({erro:"Nome do curso é obrigatório nesse formato {'novo_curso':'Lua'}"})
  }
  return next()
}

//Checar se o id informado ao buscar com id(get com id) esta válido
function checkIDCurso(req,res, next){
  const curso = cursos[req.params.index]
  if(!curso){
    return res.status(400).json({erro:"O curso não existe no ID solicitado"})
  }
  return next();

}
//Checando se o requestBody não é Falsy
function checkRequestBody(req, res, next){
  const {curso} = req.body
  if(!curso){
    return res.status(400).json({erro: 'A requisição esta vazia, por favor insira assim EX{"curso":"ReactJS"}'})
  }
  return next( )
}
//Mensagem de delete
function menssageDelete(res){
  return res.json({ message: "Curso deletado com sucesso!!" })
}

//
function consoleLogCursos(){
  console.log(cursos)
}

// CREATE
server.post("/curso",checkCurso, (req, res) => {
  const { novo_curso } = req.body;
  cursos.push(novo_curso);
  consoleLogCursos()
  return res.json(cursos);
});

// READ
server.get("/curso", (req, res) => {
  return res.json(cursos);
});

// READ passando ID
server.get("/curso/:index",checkIDCurso, (req, res) => {
  const { index } = req.params;
  return res.json(cursos[index]);
});

// UPDATE
server.put("/curso/:index",checkRequestBody, (req, res) => {
  const { index } = req.params;
  const { curso } = req.body;
  
  cursos[index] = curso;
  
  return res.json(curso);
});

//DELETE
server.delete("/curso/:index",(req, res) => {
  const { index } = req.params;
  cursos.splice(index, 1);
  menssageDelete(res)
  consoleLogCursos()
});
server.listen(3000);
