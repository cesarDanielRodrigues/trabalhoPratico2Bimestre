const express = require("express");
const server = express();

const cursos = ["NodeJS", "JavaScript", "PHP", "React", "VueJS"];

server.get("/curso", (req, res) => {
  return res.json(cursos);
});

server.get("/curso/:index", (req, res) => {
  const { index } = req.params;
  return res.json(cursos[index]);
});

server.post("/curso", (req, res) => {
  const { novo_curso } = req.body;
  console.log(novo_curso);
});

server.listen(3000);
