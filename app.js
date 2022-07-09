require('dotenv').config({ path: `${__dirname}/.env` });
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');
const { errors } = require('celebrate');

const app = express();
const { DB, PORT = 3001 } = process.env;

const { catchError } = require('./utils/error');
const { requestLogger, errorLogger } = require('./middleware/logger');

mongoose.connect(DB);

app.use(requestLogger);

require('./utils/limiter')(app);

app.use(express.json());
app.use(helmet());
app.use(cors());
app.options('*', cors());

require('./routes')(app);

app.use(errorLogger);
app.use(errors());

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  catchError(err, res);
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening to port ${PORT}`);
});
