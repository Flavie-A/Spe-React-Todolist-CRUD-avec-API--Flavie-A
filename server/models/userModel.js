// models/userModel.js

const pool = require('../config/db'); // Assurez-vous que ce fichier gère la connexion à votre base de données

class User {
  // Récupérer tous les utilisateurs
  static async getAll() {
    const result = await pool.query('SELECT * FROM users');
    return result.rows;
  }

  // Créer un nouvel utilisateur
  static async create(username, email, password) {
    const result = await pool.query(
      'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *',
      [username, email, password]
    );
    return result.rows[0];
  }

  // Récupérer un utilisateur par ID
  static async getById(id) {
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    return result.rows[0];
  }

  // Mettre à jour un utilisateur par ID
  static async update(id, username, email, password) {
    const result = await pool.query(
      'UPDATE users SET username = $1, email = $2, password = $3, updated_at = NOW() WHERE id = $4 RETURNING *',
      [username, email, password, id]
    );
    return result.rows[0];
  }

  // Supprimer un utilisateur par ID
  static async delete(id) {
    const result = await pool.query('DELETE FROM users WHERE id = $1', [id]);
    return result.rowCount; // 1 si supprimé, 0 si non trouvé
  }
}

module.exports = User;
