// routes/transaction.js
const express = require('express');
const router = express.Router();

const Transaction = require('../models/Transaction');
const { isAuthenticated } = require('../middlewares/auth');

router.post('/transactions', isAuthenticated, async (req, res, next) => {
  try {
    console.log('Session in /transactions route:', req.session);
    console.log('User in session:', req.session.user);

    const userId = req.session.user.id;  // use session.user.id
    const { amount, type, category_id, description, date } = req.body;
    // Basic validation
    if (!amount || isNaN(Number(amount))) {
      return res.status(400).send('Invalid amount');
    }
    if (type !== 'income' && type !== 'expense') {
      return res.status(400).send('Invalid type');
    }
    // Create the transaction
    await Transaction.createTransaction(userId, {
      categoryId: category_id || null,
      type,
      amount,
      description,
      date: date || new Date(),
    });

    res.redirect('/budget');
  } catch (err) {
    next(err);
  }
});
// Delete a transaction
router.post('/transactions/:id/delete', isAuthenticated, async (req, res, next) => {
  try {
    // we need to get the user id from the session
    const userId = req.session.user.id;
    // and the transaction id from the route parameters
    const transactionId = req.params.id;
    // Safety: only delete rows belonging to this user
    await Transaction.deleteTransaction(userId, transactionId);
    res.redirect('/budget');
  } catch (err) {
    next(err);
  }
});

// edit logic

// Show edit form for a transaction
router.get('/transactions/:id/edit', isAuthenticated, async (req, res, next) => {
  try {
    const userId = req.session.user.id;
    const transactionId = req.params.id;

    const transaction = await Transaction.getTransactionById(userId, transactionId);
    if (!transaction) {
      return res.status(404).send('Transaction not found');
    }

    const categories = await require('../models/Category').getCategoriesForUser(userId);

    res.render('editTransaction', { transaction, categories });
  } catch (err) {
    next(err);
  }
});

// Handle edit form submission
router.post('/transactions/:id/edit', isAuthenticated, async (req, res, next) => {
  try {
    const userId = req.session.user.id;
    const transactionId = req.params.id;
    const { amount, type, category_id, description, date } = req.body;

    if (!amount || isNaN(Number(amount))) {
      return res.status(400).send('Invalid amount');
    }

    await Transaction.updateTransaction(userId, transactionId, {
      amount,
      type,
      categoryId: category_id || null,
      description,
      date: date || new Date(),
    });

    res.redirect('/budget');
  } catch (err) {
    next(err);
  }
});



module.exports = router;
