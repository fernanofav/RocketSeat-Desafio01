const express = require("express");
const cors = require("cors");
const { uuid } = require('uuidv4');

// const { v4: uuid, validate: isUuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;

  //  https://github.com/fernanofav/RocketSeat-Desafio01;

  const repositorie = { id: uuid(), title, url, techs, like: [] }

  repositories.push(repositorie);

  return response.json(repositorie);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;

  const repositorieIndex = repositories.findIndex(repositorie => repositorie.id === id);
  const { like }         = repositories[repositorieIndex];

  if (repositorieIndex < 0){
     return response.status(400).json({ error: 'Project not found.'});
  }

  const repositorie = {
     id,
     title,
     url,
     techs,
     like,
  }

  repositories[repositorieIndex] = repositorie;

  return response.json(repositorie); 
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const repositorieIndex = repositories.findIndex(repositorie => repositorie.id === id);

  if (repositorieIndex < 0){
     return response.status(400).json({ error: 'Repositorie not found.'});
  }
  
  repositories.splice(repositorieIndex, 1);

  return response.status(204).send(); 
});

app.put("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const repositorieIndex = repositories.findIndex(project => project.id === id);

  if (repositorieIndex < 0){
    return response.status(400).json({ error: 'Repositorie not found.'});
 }

  const repositorie = repositories[repositorieIndex];

  repositorie.like.push(1);

  repositories[repositorieIndex] = repositorie;

  return response.json(repositorie.like.length);
});

module.exports = app;
