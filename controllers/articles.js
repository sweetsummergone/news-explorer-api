const Article = require('../models/article');

module.exports.getArticles = (req, res, next) => {
  Article.find({ users: req.user._id })
    .then((articles) => res.send({ articles, user: req.user._id }))
    .catch((err) => {
      next(err);
    });
};

module.exports.deleteArticle = (req, res, next) => {
  const { articleId } = req.params;

  Article.authAndDelete({ articleId, user: req.user._id })
    .then((article) => res.send(article))
    .catch((err) => {
      next(err);
    });
};

module.exports.deleteArticleByLink = (req, res, next) => {
  const { url } = req.body;
  Article.authAndDeleteByLink({ url, user: req.user._id })
    .then((article) => res.send(article))
    .catch((err) => {
      next(err);
    });
};

module.exports.createArticle = (req, res, next) => {
  const {
    keyword, title, text, date, source, link, image,
  } = req.body;
  Article.findArticle({ link })
    .then(() => {
      Article.findOneAndUpdate({ link }, { $push: { users: req.user._id } })
        .then((article) => res.send(article));
    })
    .catch((error) => {
      if (error.statusCode === 404) {
        Article.create({
          keyword, title, text, date, source, link, image, users: [req.user._id],
        })
          .then((article) => res.send(article))
          .catch((err) => {
            next(err);
          });
      } else next(error);
    });
};
