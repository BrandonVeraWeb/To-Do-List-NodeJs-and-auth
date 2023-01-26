const express = require("express");
const app = express();
const port = 3000;
const task = require("./task.controller");
const mongoose = require("mongoose");

app.use(express.json());
app.use(express.static("app"));
app.get("/tasks", task.list);
app.get("/tasks/:id", task.get);
app.post("/tasks", task.create);
app.patch("/tasks/:id", task.update);
app.put("/tasks/:id", task.update);
app.delete("/tasks/:id", task.destroy);

app.get("/", (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

app.get("*", task.notFound);

app.listen(port, () => {
  console.log("Server On");
});
