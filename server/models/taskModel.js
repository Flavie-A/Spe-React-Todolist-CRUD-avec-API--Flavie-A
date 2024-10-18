
const pool = require('../config/db');

class Task {
  // Récupérer toutes les tâches
  static async getAll() {
    const result = await pool.query('SELECT * FROM task');
    return result.rows;
  }

  // Créer une nouvelle tâche
  static async create(title, status, priority, comment, category_id) {
    const result = await pool.query(
      'INSERT INTO task (label, done, priority, comment, category_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [title, status, priority, comment, category_id]
    );
    return result.rows[0];
  }

  // Récupérer une tâche par ID
  static async getById(id) {
    const result = await pool.query('SELECT * FROM task WHERE id = $1', [id]);
    return result.rows[0];
  }

  // Mettre à jour une tâche
  static async update(id, label, done, priority, comment, category_id) {
    const result = await pool.query(
      'UPDATE task SET label = $1, done = $2, priority = $3, comment = $4, category_id = $5, updated_at = NOW() WHERE id = $6 RETURNING *',
      [label, done, priority, comment, category_id, id]
    );
    return result.rows[0];
  }

  // Supprimer une tâche
  static async delete(id) {
    const result = await pool.query('DELETE FROM task WHERE id = $1', [id]);
    return result.rowCount;
  }
}

module.exports = Task;
