const Category = require('../models/categoryModel'); 

class CategoryController {
  // Méthode pour récupérer toutes les catégories
  getAll: async function (request, response) {
    try {
      const categories = await Category.getAllCategories();
      response.json(categories);
    } catch (error) {
      console.error('Erreur lors de la récupération des catégories:', error);
      response.status(500).json({ message: 'Erreur lors de la récupération des catégories' });
    }
  }

  // Méthode pour créer une nouvelle catégorie
  create : async function (request, response) {
    const { name, description } = request.body;
    try {
      const newCategory = await Category.addCategory(name, description);
      response.status(201).json(newCategory);
    } catch (error) {
      console.error('Erreur lors de la création de la catégorie:', error);
      response.status(500).json({ message: 'Erreur lors de la création de la catégorie' });
    }
  }

  // Méthode pour récupérer une catégorie par son ID
  getById: async function (request, response) {
    try {
      const category = await Category.getOneCategory(request.params.id);
      if (!category) {
        return response.status(404).json({ message: 'Catégorie non trouvée' });
      }
      response.json(category);
    } catch (error) {
      console.error('Erreur lors de la récupération de la catégorie:', error);
      response.status(500).json({ message: 'Erreur lors de la récupération de la catégorie' });
    }
  }

  // Méthode pour mettre à jour une catégorie
  // static async update(request, response) {
  update : async function (request, response) {
    const { name, description } = request.body;
    try {
      const updatedCategory = await Category.updateCategory(request.params.id, name, description);
      if (!updatedCategory) {
        return response.status(404).json({ message: 'Catégorie non trouvée' });
      }
      response.json(updatedCategory);
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la catégorie:', error);
      response.status(500).json({ message: 'Erreur lors de la mise à jour de la catégorie' });
    }
  }

  // Méthode pour supprimer une catégorie
  // static async delete(request, response) {
  update : async function (request, response) {
    try {
      const deleted = await Category.deleteOneCategory(request.params.id);
      if (!deleted) {
        return response.status(404).json({ message: 'Catégorie non trouvée' });
      }
      response.json({ message: 'Catégorie supprimée' });
    } catch (error) {
      console.error('Erreur lors de la suppression de la catégorie:', error);
      response.status(500).json({ message: 'Erreur lors de la suppression de la catégorie' });
    }
  }
}

module.exports = CategoryController;
