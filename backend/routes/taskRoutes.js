const { Router } = require("express");
const {
  getAllTask,
  createTask,
  editTask,
  deleteTask,
} = require("../controller/taskController");

const taskRouter = Router();

taskRouter.get("/", getAllTask);
taskRouter.post('/', createTask)
taskRouter.put('/:id', editTask)
taskRouter.delete('/:id', deleteTask)

module.exports = taskRouter;
