const express = require('express');
var router = express.Router();

router.use('/api/auth', require('../controllers/auth.controller'));
router.use('/api/blog', require('../controllers/blog.controller'));

module.exports = router;