const mongoose = require("mongoose");
const Tasks = require("./task");

const Task = {
  list: async (req, res) => {
    const task = await Tasks.find();
    res.status(200).send(task);
  },

  create: async (req, res) => {
    const task = new Tasks(req.body);
    //const saveTask = await task.save();
    await task.save();
    //res.status(201).send(saveTask._id);
    res.status(201).send("Actualizando Task");
  },
  update: async (req, res) => {
    // const { id } = req.params;
    // const task = await Tasks.findOne({ _id: id });
    // Object.assign(task, req.body);
    // await task.save();
    res.status(204).send("Actualizando");
  },
  destroy: async (req, res) => {
    const { id } = req.params;
    const task = await Tasks.findOne({ _id: id });
    if (task) {
      await task.remove();
    }
  },
};

module.exports = Task;
