const client = require('./config/db');

const dataMapper = {
 getAllTasks: async () => {
      const query = await client.query('SELECT * FROM tasks');
      return query.rows;
  },
  getOneTask: async (idTask) =>  {
      const query = await client.query('SELECT * FROM tasks WHERE id = $1', [idTask]);
      if (!query.rows.length) {
        return null;
      } else {
        return query.rows[0];
      }
  },

  // Ajouter une nouvelle tâche
addTask: async (label, done, priority, comment, category_id) => {
    const query = await client.query(
      'INSERT INTO tasks (label, done, priority, comment, category_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [label, done, priority, comment, category_id]
    );
      return query.rows[0];
  },

  // Mettre à jour une tâche existante
  updateTask: async (id, label, done, priority, comment, category_id) =>  {
      const query = await client.query(
      'UPDATE tasks SET label = $1, done = $2, priority = $3, comment = $4, category_id = $5, updated_at = CURRENT_TIMESTAMP WHERE id = $6 RETURNING *',
      [label, done, priority, comment, category_id, id]
      );
      return query.rows[0];
  },

  // Supprimer une tâche
  deleteOneTask: async (idTask) => {
      const query = await client.query('DELETE FROM tasks WHERE id = $1', [idTask]);
     return query.rowCount > 0;
  },
    deleteOneTask: async (idTask) => {
    const result = await client.query('DELETE FROM tasks WHERE id = $1', [idTask]);
    return result.rowCount > 0;
  }

  // Récupérer toutes les catégories
  getAllCategories: async () => {
      const query = await client.query('SELECT * FROM categories');
      return query.rows;
  },

  // Récupérer une catégorie par ID
  getOneCategory: async (idCategory) => {
      const query = await client.query('SELECT * FROM category WHERE id = $1', [idCategory]);
      if (!query.rows.length) {
        return null;
      } else {
        return query.rows[0];
      }
  },

  // Ajouter une nouvelle catégorie
  addCategory: async (name, description) =>  {
      const query = await client.query(
        'INSERT INTO category (name, description) VALUES ($1, $2) RETURNING *',
        [name, description]
      );
      return query.rows[0];
  },

  // Mettre à jour une catégorie existante
  updateCategory: async (idCategory, name, description) =>  {
      const query = await client.query(
        'UPDATE category SET name = $1, description = $2 WHERE id = $3 RETURNING *',
        [name, description, idCategory]
      );
      return query.rows[0];
  },

  // Supprimer une catégorie
  deleteOneCategory: async (idCategory) => {
      const query = await client.query('DELETE FROM category WHERE id = $1', [idCategory]);
      if (query.rowCount === 0) {
        throw new Error('Aucune catégorie supprimée, ID invalide');
      }
  },
};

module.exports = dataMapper;
