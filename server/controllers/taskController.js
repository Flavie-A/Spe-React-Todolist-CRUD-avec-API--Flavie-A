const TaskModel = require('../models/taskModel');

const TaskController = {
  getAll: async (request, response) => {
    try {
      const tasks = await TaskModel.getAll();
      response.json(tasks);
    } catch (error) {
      response.json({ error: 'Aucune tâche trouvée' });
    }
  },
  
  create: async (request, response) => {
    try {
      const { label, done, priority, comment, category_id } = request.body;
      const newTask = await TaskModel.create(label, done, priority, comment, category_id);
      response.json(newTask);
    } catch (error) {
      response.json({ error: 'La tâche n\'a pas été créée' });
    }
  },

  getById: async (request, response) => {
    try {
      const task = await TaskModel.getOneTask(request.params.id);
      if (!task) {
        return response.json({ error: 'La tâche n\'a pas été trouvée' });
      }
      response.json(task);
    } catch (error) {
      response.json({ error: 'Erreur de requête' });
    }
  },

  update: async (request, response) => {
    try {
      const updatedTask = await TaskModel.updateTask(request.params.id, request.body.label, request.body.done,  request.body.priority,  request.body.comment, request.body.category_id);
      response.json(updatedTask);
    } catch (error) {
      response.json({ error: 'La tâche n\'a pas été mise à jour' });
    }
  },

  delete: async (request, response) => {
    try {
      await TaskModel.deleteOneTask(request.params.id);
      response.send();
    } catch (error) {
      response.json({ error: 'Erreur de requête' });
    }
  },
};

module.exports = TaskController;
