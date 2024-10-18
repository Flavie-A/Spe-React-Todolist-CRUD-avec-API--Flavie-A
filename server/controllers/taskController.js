// controllers/taskController.js
const dataMapper = require('../datamapper.js');

const TaskController = {
  getAll: async (req, res) => {
    try {
      const tasks = await dataMapper.getAllTasks();
      res.json(tasks);
    } catch (error) {
            console.error('Error fetching tasks:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  create: async (req, res) => { 
    try {
    const { label, done, priority, comment, category_id } = req.body;
      const newTask = await dataMapper.addTask(label, done, priority, comment, category_id );
      res.status(201).json(newTask);
    } catch (error) {
      res.status(400).json({ error: 'Bad Request' });
    }
  },

  getById: async (req, res) => {
    try {
      const task = await dataMapper.getOneTask(req.params.id);
      if (!task) {
        return res.status(404).json({ error: 'Task not found' });
      }
      res.json(task);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  update: async (req, res) => {
    try {
      const updatedTask = await dataMapper.updateTask(req.params.id, req.body.label, req.body.done,  req.body.priority,  req.body.comment, req.body.category_id);
      res.json(updatedTask);
    } catch (error) {
      res.status(400).json({ error: 'Bad Request' });
    }
  },

  delete: async (req, res) => {
    try {
      await dataMapper.deleteOneTask(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};

module.exports = TaskController;
