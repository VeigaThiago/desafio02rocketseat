const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {

  return response.json(repositories)
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;
  
  const hold = {
    id: uuid(),
    title,
    url,
    techs, 
    likes: 0
  }

  repositories.push(hold)

  return response.json(hold);

});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params
  const { title, url, techs } = request.body

  const repositorieIndex = repositories.findIndex(repositorie => repositorie.id == id)
  
  if (repositorieIndex < 0){
    return response.status(400).send()
  }

  const likeArr = repositories[repositorieIndex].likes

  const newRepositorie = {
    id: id,
    title,
    url,
    techs,
    likes: likeArr
  }
  
  repositories[repositorieIndex] = newRepositorie;

  return response.json(newRepositorie);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params

  const repositorieIndex = repositories.findIndex(repositorie => repositorie.id == id)

  if (repositorieIndex < 0){
    return response.status(400).send()
  }

  repositories.splice(repositorieIndex, 1)

  return response.status(204).send('Deleted')

});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params

  const repositorieIndex = repositories.findIndex(repositorie => repositorie.id == id)

  if (repositorieIndex < 0){
    return response.status(400).send()
  }

  repositories[repositorieIndex].likes += 1
  
  return response.json(repositories[repositorieIndex]);

});

module.exports = app;
