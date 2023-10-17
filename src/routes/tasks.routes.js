const { Router } = require("express");
const router = Router();
const pool = require("../db");
const {
  getAllTask,
  getTask,
  createTask,
  deleteTask,
  updateTask,
} = require("../controllers/taks.controller");

router.get("/task", getAllTask);

//para obtener una sola tarea

router.get("/task/:id", getTask);

router.post("/task", createTask);

router.delete("/task/:id", deleteTask);

router.put("/task/:id", updateTask);

module.exports = router;
