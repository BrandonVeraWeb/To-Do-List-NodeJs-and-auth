const express = require("express");
const app = express();
const port = 3000;
const task = require("./task.controller");
const mongoose = require("mongoose");
const { Auth, isAuthenticated } = require("./auth.controller");
mongoose.connect();
app.use(express.json());

app.get("/tasks", isAuthenticated, task.list);
app.post("/tasks", isAuthenticated, task.create);
app.patch("/tasks/:id", isAuthenticated, task.update);
app.put("/tasks/:id", isAuthenticated, task.update);
app.delete("/tasks/:id", isAuthenticated, task.destroy);
app.post("/login", Auth.login);
app.post("/register", Auth.register);
app.use(express.static("app"));

app.get("/", (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

app.get("*", task.notFound);

app.listen(port, () => {
  console.log("Server On");
});
