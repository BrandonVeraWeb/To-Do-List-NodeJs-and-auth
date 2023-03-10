const express = require("express");
const app = express();
const port = 3000;
const Task = require("./task.controller");
const mongoose = require("mongoose");
const { Auth, isAuthenticated } = require("./auth.controller");
mongoose.connect();
app.use(express.json());

app.get("/tasks", isAuthenticated, Task.list);
app.post("/tasks", isAuthenticated, Task.create);
app.patch("/tasks/:id", isAuthenticated, Task.update);
app.put("/tasks/:id", isAuthenticated, Task.update);
app.delete("/tasks/:id", isAuthenticated, Task.destroy);

app.post("/login", Auth.login);
app.post("/register", Auth.register);

app.use(express.static("app"));

app.get("/", (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

app.get("*", (req, res) => {
  res.status(404).send("Esta pagina no existe");
});

app.listen(port, () => {
  console.log("Server On");
});
