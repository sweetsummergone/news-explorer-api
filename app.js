const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const { celebrate } = require('celebrate');

const routerUsers = require('./routes/users');
const routerCards = require('./routes/articles');

const app = express();
const { PORT = 3001 } = process.env;
const { createUser, login } = require('./controllers/users');
const { catchError, ErrorHandler } = require('./utils/error');
const auth = require('./middleware/auth');

const { requestLogger, errorLogger } = require('./middleware/logger');
const { validatedCreateOrLoginUserSchema } = require('./utils/validations');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

mongoose.connect('mongodb://localhost:27017/newsdb');

app.use(requestLogger);

app.use(express.json());
app.use(helmet());
app.use(limiter);
app.use(cors());
app.options('*', cors());

app.use('/users', auth, routerUsers);
app.use('/articles', auth, routerCards);
app.post('/signin', celebrate(validatedCreateOrLoginUserSchema), login);
app.post('/signup', celebrate(validatedCreateOrLoginUserSchema), createUser);
app.get('*', () => {
  throw new ErrorHandler(404, 'Requested resource not found');
});

app.use(errorLogger);

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  catchError(err, res);
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening to port ${PORT}`);
});
