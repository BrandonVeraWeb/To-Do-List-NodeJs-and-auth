const mongoose = require("mongoose");
const Tasks = require("./task");

const task = {
  list: async (req, res) => {
    const task = await Tasks.find();
    res.status(200).send(task);
  },
  get: async (req, res) => {
    const { id } = req.params;
    const user = await Tasks.findOne({ _id: id });
    res.status(200).send(user);
  },
  create: async (req, res) => {
    const task = new Tasks(req.body);
    const saveTask = await task.save();
    res.status(201).send(saveTask._id);
  },
  update: async (req, res) => {
    const { id } = req.params;
    const task = await Tasks.findOne({ _id: id });
    Object.assign(task, req.body);
    await task.save();
  },
  destroy: async (req, res) => {
    const { id } = req.params;
    const task = await Tasks.findOne({ _id: id });
    if (task) {
      await task.remove();
    }
  },
  notFound: async (req, res) => {
    res.status(404).send("PAGE NOT FOUND");
  },
};

module.exports = task;
