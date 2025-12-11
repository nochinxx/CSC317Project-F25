// routes/budget.js

const express = require('express');
const router = express.Router();

const Transaction = require('../models/Transaction');
const Category = require('../models/Category');
const { isAuthenticated } = require('../middlewares/auth');

router.get('/budget', isAuthenticated, async (req, res, next) => {
    try {
      if (!req.session || !req.session.user) {
        return res.redirect('/auth/login');
      }
  
      const userId = req.session.user.id;
      console.log('HIT /budget route, userId =', userId); 
  
      const [summary, transactions, categories] = await Promise.all([
        Transaction.getDashboardSummary(userId),
        Transaction.getTransactionsForUser(userId),
        Category.getCategoriesForUser(userId),
      ]);
      // If user has no categories yet, seed defaults once
    if (!categories.length) {
        await Category.seedDefaultCategoriesForUser(userId);
        categories = await Category.getCategoriesForUser(userId);
      }
  
      console.log('Summary from DB:', summary);            
      res.render('budget', { summary, transactions, categories });
    } catch (err) {
      next(err);
    }
  });
  

module.exports = router;
