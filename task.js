const mongoose = require("mongoose");

const Tasks = mongoose.model("Task", {
  task: { type: String, required: true },
  state: { type: String, required: true, minlength: 3 },
});

module.exports = Tasks;
