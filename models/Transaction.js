const { pool } = require('../config/database');

async function getTransactionsForUser(userId) {
  // Fetch transactions along with category names

  const result = await pool.query(
    `
    SELECT t.*, c.name AS category_name
    FROM transactions t
    LEFT JOIN categories c ON t.category_id = c.id
    WHERE t.user_id = $1
    ORDER BY t.date DESC, t.created_at DESC
    `,
    [userId]
  );
  return result.rows;
}
// Create a new transaction
async function createTransaction(userId, { categoryId, type, amount, description, date }) {
  const result = await pool.query(
    `
    INSERT INTO transactions (user_id, category_id, type, amount, description, date)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *
    `,
    [userId, categoryId || null, type, amount, description || null, date]
  );
  return result.rows[0];
}
// Get dashboard summary (total income, total expense, balance)
async function getDashboardSummary(userId) {
  const result = await pool.query(
    `
    SELECT
      COALESCE(SUM(CASE WHEN type = 'income' THEN amount END), 0) AS total_income,
      COALESCE(SUM(CASE WHEN type = 'expense' THEN amount END), 0) AS total_expense
    FROM transactions
    WHERE user_id = $1
    `,
    [userId]
  );

  const row = result.rows[0];
  return {
    totalIncome: Number(row.total_income),
    totalExpense: Number(row.total_expense),
    balance: Number(row.total_income) - Number(row.total_expense)
  };
}
// Get a single transaction by ID
async function getTransactionById(userId, transactionId) {
  const result = await pool.query(
    `
    SELECT t.*, c.name AS category_name
    FROM transactions t
    LEFT JOIN categories c ON t.category_id = c.id
    WHERE t.user_id = $1 AND t.id = $2
    `,
    [userId, transactionId]
  );
  return result.rows[0];
}
// Update a transaction
async function updateTransaction(userId, transactionId, { amount, type, categoryId, description, date }) {
  const result = await pool.query(
    `
    UPDATE transactions
    SET amount = $1,
        type = $2,
        category_id = $3,
        description = $4,
        date = $5
    WHERE id = $6 AND user_id = $7
    RETURNING *
    `,
    [amount, type, categoryId, description, date, transactionId, userId]
  );
  return result.rows[0];
}
// Delete a transaction
async function deleteTransaction(userId, transactionId) {
  await pool.query(
    `
    DELETE FROM transactions
    WHERE id = $1 AND user_id = $2
    `,
    [transactionId, userId]
  );
}

module.exports = {
  getTransactionsForUser,
  createTransaction,
  getDashboardSummary,
  getTransactionById,
  updateTransaction,
  deleteTransaction,
};
