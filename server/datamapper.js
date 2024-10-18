const db = require('./config/db'); // Assurez-vous que la connexion à la base de données est bien importée

const dataMapper = {
  // Récupérer toutes les tâches
  getAllTasks: async () => {
    try {
      const query = await db.query('SELECT * FROM tasks');
      return query.rows;
    } catch (error) {
      throw new Error(`Erreur lors de la récupération des tâches : ${error.message}`);
    }
  },

  // Récupérer une seule tâche par ID
  getOneTask: async function (idTask) {
    try {
      const query = await db.query('SELECT * FROM tasks WHERE id = $1', [idTask]);
      if (!query.rows.length) {
        return null;
      } else {
        return query.rows[0];
      }
    } catch (error) {
      throw new Error(`Erreur lors de la récupération de la tâche : ${error.message}`);
    }
  },

  // Ajouter une nouvelle tâche
addTask: async function (label, done, priority, comment, category_id) {
  try {
    const query = await db.query(
      'INSERT INTO tasks (label, done, priority, comment, category_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [label, done, priority, comment, category_id]
    );
      return query.rows[0];
    } catch (error) {
      throw new Error(`Erreur lors de l'ajout de la tâche : ${error.message}`);
    }
  },

  // Mettre à jour une tâche existante
  updateTask: async function (id, label, done, priority, comment, category_id) {
    try {
      const query = await db.query(
      'UPDATE tasks SET label = $1, done = $2, priority = $3, comment = $4, category_id = $5, updated_at = CURRENT_TIMESTAMP WHERE id = $6 RETURNING *',
      [label, done, priority, comment, category_id, id]
      );
      return query.rows[0];
    } catch (error) {
      throw new Error(`Erreur lors de la mise à jour de la tâche : ${error.message}`);
    }
  },

  // Supprimer une tâche
  deleteOneTask: async function (idTask) {
    try {
      const query = await db.query('DELETE FROM tasks WHERE id = $1', [idTask]);
      if (query.rowCount === 0) {
        throw new Error('Aucune tâche supprimée, ID invalide');
      }
    } catch (error) {
      throw new Error(`Erreur lors de la suppression de la tâche : ${error.message}`);
    }
  },

  // Récupérer toutes les catégories
  getAllCategories: async () => {
    try {
      const query = await db.query('SELECT * FROM categories');
      return query.rows;
    } catch (error) {
      throw new Error(`Erreur lors de la récupération des catégories : ${error.message}`);
    }
  },

  // Récupérer une catégorie par ID
  getOneCategory: async function (idCategory) {
    try {
      const query = await db.query('SELECT * FROM category WHERE id = $1', [idCategory]);
      if (!query.rows.length) {
        return null;
      } else {
        return query.rows[0];
      }
    } catch (error) {
      throw new Error(`Erreur lors de la récupération de la catégorie : ${error.message}`);
    }
  },

  // Ajouter une nouvelle catégorie
  addCategory: async function (name, description) {
    try {
      const query = await db.query(
        'INSERT INTO category (name, description) VALUES ($1, $2) RETURNING *',
        [name, description]
      );
      return query.rows[0];
    } catch (error) {
      throw new Error(`Erreur lors de l'ajout de la catégorie : ${error.message}`);
    }
  },

  // Mettre à jour une catégorie existante
  updateCategory: async function (idCategory, name, description) {
    try {
      const query = await db.query(
        'UPDATE category SET name = $1, description = $2 WHERE id = $3 RETURNING *',
        [name, description, idCategory]
      );
      return query.rows[0];
    } catch (error) {
      throw new Error(`Erreur lors de la mise à jour de la catégorie : ${error.message}`);
    }
  },

  // Supprimer une catégorie
  deleteOneCategory: async function (idCategory) {
    try {
      const query = await db.query('DELETE FROM category WHERE id = $1', [idCategory]);
      if (query.rowCount === 0) {
        throw new Error('Aucune catégorie supprimée, ID invalide');
      }
    } catch (error) {
      throw new Error(`Erreur lors de la suppression de la catégorie : ${error.message}`);
    }
  },
};

module.exports = dataMapper;
