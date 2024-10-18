const db = require('../config/db');

const categoryModel = {
  getAllCategories: async () => {
    const query = await db.query('SELECT * FROM categories');
    return query.rows;
  },

  addCategory: async (name, description) => {
    const query = await db.query(
      'INSERT INTO categories (name, description) VALUES ($1, $2) RETURNING *',
      [name, description]
    );
    return query.rows[0];
  },

  getOneCategory: async (idCategory) => {
    const query = await db.query('SELECT * FROM categories WHERE id = $1', [idCategory]);
    return query.rows[0];
  },

  updateCategory: async (idCategory, name, description) => {
    const query = await db.query(
      'UPDATE categories SET name = $1, description = $2 WHERE id = $3 RETURNING *',
      [name, description, idCategory]
    );
    return query.rows[0];
  },

  deleteOneCategory: async (idCategory) => {
    const query = await db.query('DELETE FROM categories WHERE id = $1 RETURNING *', [idCategory]);
    return query.rowCount > 0;
  },
};

module.exports = categoryModel;
