const pool = require("../db");

const getAllTask = async (req, res, next) => {
  try {
    const result = await pool.query("SELECT * FROM task");
    res.json(result.rows);
  } catch (error) {
    next(error);
  }
};

const getTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM task WHERE id = $1", [id]);
    console.log(result);
    // agregando un mensaje al no conseguir el id
    if (result.rows.length === 0)
      return res.status(404).json({
        message: "tarea no encontrada",
      });
    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

const createTask = async (req, res, next) => {
  const { title, description } = req.body;
  //insertar los valores
  try {
    const result = await pool.query(
      "INSERT INTO task (title, description) VALUES ($1, $2) RETURNING*",
      [title, description]
    );
    console.log(result.rows[0]);
    res.json(result.rows[0]);
  } catch (error) {
    console.log(error)
    next(error);
  }
};

const deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      "DELETE FROM task WHERE id = $1 RETURNING *",
      [id]
    );
    res.send("eliminando una tarea");
    if (result.rows.length === 0)
      return res.status(404).json({
        message: "tarea no encontrada",
      });
      return res.sendStatus(204)
  } catch (error) {
    console.log(error.message)
  }
};

const updateTask = async (req, res, next) => {
  try {
    const {id} = req.params;
    const {title, description} = req.body;
    const result = await pool.query('UPDATE task SET title= $1, description = $2 WHERE id = $3 RETURNING*', [title, description, id]);
    // console.log(result)
    // res.send("actualizando una tarea"); 
    if (result.rows.length === 0)
    return res.status(404).json({
      message: "actualizacion no realizada",
    });
    return res.json(result.rows[0])

  } catch (error) {
    console.log(error.message)
    
  }
};

module.exports = { getAllTask, getTask, createTask, deleteTask, updateTask };
