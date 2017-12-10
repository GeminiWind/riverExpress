import { validationResult } from 'express-validator/check';
import Aritcle from '../../Models/Article';
import Comment from '../../Models/Comment';

/**
 * Filter article by specified tag
 *
 *
 * @param {any} articles
 * @param {any} tag
 */
const filterByTag = (articles, tags) => {
  const result = articles.filter(article => article.tags.includes(tags));
  return result;
};

/**
 * Filter article by specified category
 *
 * @param {any} articles
 * @param {any} tag
 */
const filterByCategory = (articles, category) => {
  const result = articles.filter(article => (article.category === category));
  return result;
};

/**
 * Filter articles by author
 *
 * @param {any} articles
 * @param {any} tag
 */
const filterByAuthor = (articles, author) => {
  const result = articles.filter(article => article.author.slug === author);
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
    articles = await Aritcle.find({}).sort('-createdAt');
    articles.forEach(async (article) => {
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
    const articles = await Aritcle.find({
      popular: true,
    }).sort('-createdAt');
    articles.forEach(async (article) => {
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
 * Show specified article
 *
 * @param {any} req
 * @param {any} res
 */
const show = async (req, res) => {
  const { slug } = req.params;
  try {
    const article = await Aritcle.findOne({
      slug,
    });
    if (article) {
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
    const article = new Aritcle();
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
 *
 *
 * @param {any} req
 * @param {any} res
 */
const destroy = async (req, res) => {
  try {
    await Aritcle.remove({
      slug: req.params.slug,
    });
    res.noContent();
  } catch (error) {
    res.InternalServerError(error);
  }
};

export { index, show, store, update, destroy, popular };
