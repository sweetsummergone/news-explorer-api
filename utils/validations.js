const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

// User

const validatedCreateOrLoginUserSchema = {
  body: Joi.object().keys({
    email: Joi.string().max(42).required().email({ minDomainSegments: 2 }),

    password: Joi.string().required().min(8).max(32)
      .required(),

    name: Joi.string().min(2).max(30),
  }),
};

// Article

const validatedCreateArticleSchema = {
  body: Joi.object().keys({
    keyword: Joi.string().max(42).min(2).required(),

    title: Joi.string().max(30).min(2).required(),

    text: Joi.string().required(),

    date: Joi.string().required(),

    source: Joi.string().required(),

    link: Joi.string().required().uri(),

    image: Joi.string().required().uri(),

    owner: Joi.objectId().required(),
  }),
};

const validatedDeleteArticleSchema = {
  body: Joi.object().keys({
    owner: Joi.objectId().required(),
  }),
};

module.exports = {
  validatedCreateOrLoginUserSchema,
  validatedCreateArticleSchema,
  validatedDeleteArticleSchema,
};