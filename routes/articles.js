/* eslint-disable object-curly-newline */
const router = require('express').Router();
const { celebrate } = require('celebrate');

const { getArticles, createArticle, deleteArticle } = require('../controllers/articles');
const { validatedCreateArticleSchema, validatedDeleteArticleSchema } = require('../utils/validations');

router.get('/', getArticles);
router.post('/', celebrate(validatedCreateArticleSchema), createArticle);
router.delete('/:cardId', celebrate(validatedDeleteArticleSchema), deleteArticle);

module.exports = router;
