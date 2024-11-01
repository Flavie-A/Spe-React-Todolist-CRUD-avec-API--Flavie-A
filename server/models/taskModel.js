
const dataMapper  = require('../datamapper.js');

const TaskModel = {
  getAll: async () => {
    return await dataMapper.getAllTasks();
  },

  create: async (label, done, priority, comment, category_id) => {
    return await dataMapper.addTask(label, done, priority, comment, category_id);
  },

  getById: async (id) => {
    return await dataMapper.getOneTask(id);
  },

  update: async (id, label, done, priority, comment, category_id) => {
    return await dataMapper.updateTask(id, label, done, priority, comment, category_id);
  },

  delete: async (id) => {
    return await dataMapper.deleteOneTask(id);
  }
};

module.exports = TaskModel;