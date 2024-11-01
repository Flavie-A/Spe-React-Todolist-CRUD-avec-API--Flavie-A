const express = require('express');
const router = express.Router();
const CategoryController = require('./controllers/categoryController'); 
const TaskController = require('./controllers/taskController');

// Routes pour les catégories
router.get('/categories', CategoryController.getAll);
router.post('/categories', CategoryController.create);
router.get('/categories/:id', CategoryController.getById);
router.put('/categories/:id', CategoryController.update);
router.delete('/categories/:id', CategoryController.delete);

// Routes pour les tâches
router.get('/tasks', TaskController.getAll);
router.post('/tasks', TaskController.create);
router.get('/tasks/:id', TaskController.getById);
router.put('/tasks/:id', TaskController.update);
router.delete('/tasks/:id', TaskController.delete);

module.exports = router;
