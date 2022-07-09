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
});

articleSchema.statics.authAndDelete = function authAndDelete({ articleId, reqUserId, ownerId }) {
  if (reqUserId === ownerId) {
    return this.deleteOne({ _id: articleId })
      .orFail(() => {
        throw new ErrorHandler(404, `No card found with ${articleId}`);
      });
  }
  return Promise.reject(new ErrorHandler(403, 'Access denied'));
};

module.exports = mongoose.model('article', articleSchema);
