const Category = require('../models/categoryModel'); // Assurez-vous que le chemin est correct

class CategoryController {
  // Méthode pour récupérer toutes les catégories
  static async getAll(req, res) {
    try {
      const categories = await Category.getAllCategories();
      res.json(categories);
    } catch (error) {
      console.error('Erreur lors de la récupération des catégories:', error);
      res.status(500).json({ message: 'Erreur lors de la récupération des catégories' });
    }
  }

  // Méthode pour créer une nouvelle catégorie
  static async create(req, res) {
    const { name, description } = req.body;
    try {
      const newCategory = await Category.addCategory(name, description);
      res.status(201).json(newCategory);
    } catch (error) {
      console.error('Erreur lors de la création de la catégorie:', error);
      res.status(500).json({ message: 'Erreur lors de la création de la catégorie' });
    }
  }

  // Méthode pour récupérer une catégorie par son ID
  static async getById(req, res) {
    try {
      const category = await Category.getOneCategory(req.params.id);
      if (!category) {
        return res.status(404).json({ message: 'Catégorie non trouvée' });
      }
      res.json(category);
    } catch (error) {
      console.error('Erreur lors de la récupération de la catégorie:', error);
      res.status(500).json({ message: 'Erreur lors de la récupération de la catégorie' });
    }
  }

  // Méthode pour mettre à jour une catégorie
  static async update(req, res) {
    const { name, description } = req.body;
    try {
      const updatedCategory = await Category.updateCategory(req.params.id, name, description);
      if (!updatedCategory) {
        return res.status(404).json({ message: 'Catégorie non trouvée' });
      }
      res.json(updatedCategory);
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la catégorie:', error);
      res.status(500).json({ message: 'Erreur lors de la mise à jour de la catégorie' });
    }
  }

  // Méthode pour supprimer une catégorie
  static async delete(req, res) {
    try {
      const deleted = await Category.deleteOneCategory(req.params.id);
      if (!deleted) {
        return res.status(404).json({ message: 'Catégorie non trouvée' });
      }
      res.json({ message: 'Catégorie supprimée' });
    } catch (error) {
      console.error('Erreur lors de la suppression de la catégorie:', error);
      res.status(500).json({ message: 'Erreur lors de la suppression de la catégorie' });
    }
  }
}

module.exports = CategoryController;
