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

    if (!amount || isNaN(Number(amount))) {
      return res.status(400).send('Invalid amount');
    }
    if (type !== 'income' && type !== 'expense') {
      return res.status(400).send('Invalid type');
    }

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

// Transaction deletion route
router.post('/transactions/delete/:id', isAuthenticated, async (req, res, next) => {
  try {
    const transactionId = req.params.id;
    const userId = req.session.user.id;

    const deleted = await Transaction.deleteTransaction(transactionId, userId);

    if (deleted) {
      // You might redirect back to the page they came from, or a default view
      res.redirect('/login'); 
    } else {
      // Transaction not found error
      res.status(404).send('Transaction not found or unauthorized');
    }

  } catch (err) {
    next(err);
  }
});


module.exports = router;
