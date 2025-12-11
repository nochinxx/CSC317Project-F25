const { pool } = require('../config/database');

// Get all categories for a user
async function getCategoriesForUser(userId) {
  const result = await pool.query(
    `
    SELECT *
    FROM categories
    WHERE user_id = $1
    ORDER BY type, name
    `,
    [userId]
  );
  return result.rows;
}

// Create a new category
async function createCategory(userId, { name, type }) {
  const result = await pool.query(
    `
    INSERT INTO categories (user_id, name, type)
    VALUES ($1, $2, $3)
    RETURNING *
    `,
    [userId, name, type]
  );
  return result.rows[0];
}

// seeder for first time users
async function seedDefaultCategoriesForUser(userId) {
    const defaults = [
      { name: 'Salary', type: 'income' },
      { name: 'Freelance', type: 'income' },
      { name: 'Rent', type: 'expense' },
      { name: 'Food', type: 'expense' },
      { name: 'Utilities', type: 'expense' },
      { name: 'Savings', type: 'expense' },
      { name: 'Entertainment', type: 'expense' },
    ];
  
    for (const c of defaults) {
      await createCategory(userId, c);
    }
  }

module.exports = {
  getCategoriesForUser,
  createCategory,
  seedDefaultCategoriesForUser,
};
