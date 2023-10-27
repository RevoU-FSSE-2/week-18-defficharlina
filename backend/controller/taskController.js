const { ObjectId } = require("mongodb");

const getAllTask = async (req, res) => {

  try {
    const task = await req.db.collection('tasks').find().toArray()
    
    res.status(200).json({
      message: 'Task successfully retrieved',
      data: task
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const createTask = async (req, res) => {
  const { name, activity, priority, due_date, status } = req.body

  
  console.log(name, activity, priority, due_date, status, `<=================== task ==================`);
  
  try {
    const newTask = await req.db.collection('tasks').insertOne({ name, activity, priority, due_date, status })
    
    res.status(200).json({
      message: 'Task successfully created',
      data: newTask
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

  const editTask = async (req, res) => {
  const {id} = req.params
  const { name, activity, priority, due_date, status } = req.body
  
  console.log(req.query, `<=================== query ==================`);
  
  try {
    const task = await req.db.collection('tasks').findOneAndUpdate({ _id: new ObjectId(id) }, { $set: { name, activity, priority, due_date, status } })
    
    res.status(200).json({
      message: 'Task successfully edit',
      data: task
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

  const deleteTask = async (req, res) => {
  const {id} = req.params
  
  console.log(req.query, `<=================== query ==================`);
  
  try {
    const task = await req.db.collection('tasks').findOneAndDelete({ _id: new ObjectId(id) })

    if (!task) {
      // Data tidak ditemukan, kirim respon khusus
      res.status(404).json({
        message: 'Task not found',
        data: null
      });
    } else {
    res.status(200).json({
      message: 'Task successfully delete',
      data: task
    })
  } 
} catch (error) {
    res.status(500).json({ error: error.message })
  }
}

module.exports = {
  getAllTask,
  createTask,
  editTask,
  deleteTask
}