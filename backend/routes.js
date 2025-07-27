/*const express = require("express"); //import express

const ToDo=require("./models/todo")

const router= express.Router();

router.get("/todos",async(req,res) =>{  //create get request (arrow function =>)
    //console.log("hmmmm")
    const todos =await ToDo.find();

    res.status(200).json(todos);
});

router.post("/todos",async (req,res) =>{ //initially it should be false
    const {task}=req.body;
    if(!task){
        return res.status(400).json({msg:"Todo is required"});
    }
    const newToDo= new todo({task})
    await newToDo.save();
    res.status(201).json(newToDo);
    //res.status(200).json({msg:"POST todos /api/todos"});
});

router.put("/todos/:id",(req,res) =>{  //edit  
    res.status(200).json({msg:"PUT todos /api/todos"});
});

router.delete("/todos/:id",(req,res) =>{  //
    res.status(200).json({msg:"DELETE todos /api/todos"});
});


module.exports = router;*/

const express = require("express");

const router = express.Router();

const Todo = require("./models/todo");

//GET /todos
router.get("/todos", async (req, res) => {
  const todos = await Todo.find();
  res.status(200).json(todos);
});

// POST /todos
router.post("/todos", async (req, res) => {
  const newTodo = new Todo(req.body);
  if (!newTodo.title) {
    return res.status(400).json({ msg: "Title is required" });
  }
  await newTodo.save();
  res.status(201).json(newTodo);
});

// PUT /todos/:id
router.put("/todos/:id", async (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;
  const todo = await Todo.findById(id);
  if (!todo) {
    return res.status(404).json({ msg: "Todo not found" });
  }

  if (typeof completed !== "boolean") {
    return res.status(400).json({ msg: "Completed must be a boolean value" });
  }

  if (todo.completed !== completed) {
    todo.completed = completed;
  }
  await todo.save();
  res.status(200).json(todo);
});

//DELETE /todos/:id
router.delete("/todos/:id", async (req, res) => {
  const { id } = req.params;
  await Todo.findByIdAndDelete(id);
  res.status(200).json({ msg: "Todo deleted successfully" });
});

module.exports = router;

