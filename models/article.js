const mongoose = require('mongoose');
const { ErrorHandler } = require('../utils/error');

const articleSchema = new mongoose.Schema({
  keyword: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        /^https?:\/\/[w{3}.]?[A-Z0-9\-._~:?%#[\]/@!$&'()*+,;=]+[/#]?/gim.test(v);
      },
      message: (props) => `${props.value} is not a valid URL`,
    },
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        /^https?:\/\/[w{3}.]?[A-Z0-9\-._~:?%#[\]/@!$&'()*+,;=]+[/#]?/gim.test(v);
      },
      message: (props) => `${props.value} is not a valid URL`,
    },
  },
  users: {
    type: [String],
    required: true,
  },
});

articleSchema.statics.findArticle = function findArticle({ link }) {
  return this.find({ link })
    .orFail(() => {
      throw new ErrorHandler(404, `No card found with ${link}`);
    });
};

articleSchema.statics.addNewUser = function addNewUser(articleId, user) {
  return this.updateOne({ _id: articleId }, { $push: { users: user } });
};

articleSchema.statics.authAndDelete = function authAndDelete({ articleId, user }) {
  return this.updateOne({ _id: articleId }, { $pull: { users: user } })
    .orFail(() => {
      throw new ErrorHandler(404, `No card found with ${articleId}`);
    });
};

articleSchema.statics.authAndDeleteByLink = function authAndDeleteByLink({ url, user }) {
  return this.updateOne({ link: url }, { $pull: { users: user } })
    .orFail(() => {
      throw new ErrorHandler(404, `No user found with ID ${user}`);
    });
};

module.exports = mongoose.model('article', articleSchema);
