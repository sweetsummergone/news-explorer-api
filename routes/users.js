/* eslint-disable object-curly-newline */
const router = require('express').Router();

const { getUsers, getUser } = require('../controllers/users');

// route definitions
router.get('/', getUsers);
router.get('/me', getUser);

module.exports = router;
