const { Router } = require('express');
const {
    getAllTask,
    createTask,
    editTask,
    deleteTask,
  } = require("../controller/userController");

const {
    userAuthorization,
    adminAuthorization,
  } = require("../middleware/authenticationMiddleware");

const userRouter = Router();

userRouter.get("/", adminAuthorization, getAllTask);
userRouter.post('/', userAuthorization, createTask)
userRouter.put('/:id', userAuthorization, editTask)
userRouter.delete('/:id', userAuthorization, deleteTask)

module.exports = userRouter;


 