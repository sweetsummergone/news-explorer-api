/* eslint-disable object-curly-newline */
const router = require('express').Router();
const { celebrate } = require('celebrate');

const { getArticles, createArticle, deleteArticle, deleteArticleByLink } = require('../controllers/articles');
const { validatedCreateArticleSchema, validatedDeleteArticleSchema, validatedDeleteArticleByLinkSchema } = require('../utils/validations');

router.get('/', getArticles);
router.post('/', celebrate(validatedCreateArticleSchema), createArticle);
router.delete('/', celebrate(validatedDeleteArticleByLinkSchema), deleteArticleByLink);
router.delete('/:articleId', celebrate(validatedDeleteArticleSchema), deleteArticle);

module.exports = router;
