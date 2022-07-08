const { celebrate } = require('celebrate');
const auth = require('../middleware/auth');
const routerUsers = require('./users');
const routerCards = require('./articles');

const { createUser, login } = require('../controllers/users');
const { ErrorHandler } = require('../utils/error');
const { validatedCreateOrLoginUserSchema } = require('../utils/validations');

module.exports = function (app) {
  app.use('/users', auth, routerUsers);
  app.use('/articles', auth, routerCards);
  app.post('/signin', celebrate(validatedCreateOrLoginUserSchema), login);
  app.post('/signup', celebrate(validatedCreateOrLoginUserSchema), createUser);
  app.get('*', () => {
    throw new ErrorHandler(404, 'Requested resource not found');
  });
};
