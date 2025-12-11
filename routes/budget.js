const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../middlewares/auth');

// Import the controller function for the budget dashboard
const budgetController = require('../controllers/budgetController'); 

// All routes in this file require authentication
router.use(isAuthenticated);

// GET /budget - Show the main budget dashboard
router.get('/', budgetController.getBudgetDashboard);

module.exports = router;
