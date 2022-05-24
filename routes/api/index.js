// Require Express
const router = require('express').Router();
// Require Routes
const userRoutes = require('./user-routes');
const thoughtRoutes = require('./thought-routes');
//  Add user to beginning of user routes
router.use('/users', userRoutes);
// Add thoughts to beginning of user routes
router.use('./thought', thoughtRoutes);

module.exports = router;