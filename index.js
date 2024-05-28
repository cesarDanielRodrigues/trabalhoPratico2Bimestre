const express = require("express");
const server = express();
server.use(express.json());

const cursos = ["NodeJS", "JavaScript", "PHP", "React", "VueJS"];

// CREATE
server.post("/curso", (req, res) => {
  const { novo_curso } = req.body;
  cursos.push(novo_curso);

  return res.json(cursos);
});

// READ
server.get("/curso", (req, res) => {
  return res.json(cursos);
});

// READ passando ID
server.get("/curso/:index", (req, res) => {
  const { index } = req.params;
  return res.json(cursos[index]);
});


// UPDATE
server.put("/curso/:index", (req, res) => {
  const { index } = req.params;
  const { curso } = req.body;

  cursos[index] = curso;

  return res.json(curso);
});

//DELETE
server.delete('/curso/:index', (req, res)=>{
  const { index } = req.params;
  cursos.splice(index, 1)
  return res.json({message: "Curso deletado com sucesso"})
})
server.listen(3000);
