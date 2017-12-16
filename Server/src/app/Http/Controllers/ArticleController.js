import _ from 'lodash';
import { validationResult } from 'express-validator/check';
import Article from '../../Models/Article';
import Comment from '../../Models/Comment';
import Fuse from 'fuse.js';

/**
 * Filter article by specified tag
 *
 *
 * @param {any} articles
 * @param {any} tag
 */
const filterByTag = (articles, tag) => {
  let options = {
    shouldSort: true,
    threshold: 0.2,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 4,
    keys: [
      "tags"
    ]
  };

  let fuse = new Fuse(articles, options);
  let result = fuse.search(tag);
  
  return result;
};

/**
 * Filter article by specified category
 *
 * @param {any} articles
 * @param {any} tag
 */
const filterByCategory = (articles, category) => {
  let options = {
    shouldSort: true,
    threshold: 0.2,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 4,
    keys: [
      "category"
    ]
  };

  let fuse = new Fuse(articles, options);
  let result = fuse.search(category);

  return result;
};

/**
 * Filter articles by author
 *
 * @param {any} articles
 * @param {any} author
 */
const filterByAuthor = (articles, author) => {
  let options = {
    shouldSort: true,
    threshold: 0.6,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 4,
    keys: [
      "author.slug",
    ]
  };

  let fuse = new Fuse(articles, options);
  let result = fuse.search(author);

  return result;
};

/**
 * List articles
 *
 * @param {any} req
 * @param {any} res
 */
const index = async (req, res) => {
  let articles;
  try {
    articles = await Article.find({}).sort('-createdAt');
    _.forEach(articles, async (article) => {
      // attach comments
      article.comments = await Comment.find({
        article: article._id,
      }).populate('user').sort('-created_at');
    });
    if (req.query.tag) {
      articles = filterByTag(articles, req.query.tag);
    }
    if (req.query.category) {
      articles = filterByCategory(articles, req.query.category);
    }
    if (req.query.author) {
      articles = filterByAuthor(articles, req.query.author);
    }

    res.ok(articles);
  } catch (error) {
    res.InternalServerError(error);
  }
};

/**
 * List popular articles
 *
 * @param {any} req
 * @param {any} res
 */
const popular = async (req, res) => {
  try {
    const articles = await Article.find({
      popular: true,
    }).sort('-createdAt');
    _.forEach(articles, async (article) => {
      // attach comments
      article.comments = await Comment.find({
        article: article._id,
      }).populate('user').sort('-created_at');
    });

    res.ok(articles);
  } catch (error) {
    res.InternalServerError(error);
  }
};

/**
 * List recent comment articles
 *
 * @param {any} req
 * @param {any} res
 */
const recentComment = async (req, res) => {
  try {
    const recentComments = await Comment.find({}).sort('-createdAt').populate('article');
    
    const result = recentComments.map(record => {
      record = record.toObject();
      return record.article;
    });
    res.ok(result);
  } catch (error) {
    res.InternalServerError(error);
  }
};


/**
 * Show specified article
 *
 * @param {any} req
 * @param {any} res
 */
const show = async (req, res) => {
  const { slug } = req.params;
  try {
    const article = await Article.findOne({
      slug,
    });
    if (article) {
      // attach comments on article
      article.comments = await Comment.find({
        article: article._id,
      }).populate('user').sort('-created_at');

      res.ok(article);
    }
  } catch (error) {
    res.InternalServerError(error);
  }
};

/**
 * Store new article
 *
 * @param {any} req
 * @param {any} res
 */
const store = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.badRequest(errors.mapped());
  }
  try {
    const article = new Article();
    article.title = req.body.title;
    article.content = req.body.content;
    article.short_intro = req.body.shortIntro;
    article.tags = req.body.tags;
    article.category = req.body.category;
    article.author = req.body.author;
    article.image = req.body.image;
    article.popular = req.body.popular;

    const articleCreated = await article.save();
    if (articleCreated) {
      res.created(articleCreated);
    }
  } catch (error) {
    res.InternalServerError(error);
  }
};

/**
 * Update specified article
 *
 * @param {any} req
 * @param {any} res
 */
const update = async (req, res) => {
};

/**
 * Delete specified article
 *
 * @param {any} req
 * @param {any} res
 */
const destroy = async (req, res) => {
  try {
    await Article.remove({
      slug: req.params.slug,
    });
    res.noContent();
  } catch (error) {
    res.InternalServerError(error);
  }
};

export { index, show, store, update, destroy, popular, recentComment };
