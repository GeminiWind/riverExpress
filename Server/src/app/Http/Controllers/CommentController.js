import Article from '../../Models/Article';
import Comment from '../../Models/Comment';

/**
 *
 *
 * @param {any} req
 * @param {any} res
 */
const store = async (req, res) => {
  // validate
  // if ok
  try {
    const articleSlug = req.params.slug;
    const article = await Article.findOne({ slug: articleSlug });
    if (article) {
      // insert comment
      const comment = new Comment();
      comment.content = req.body.content;
      comment.user = req.user._id;
      comment.article = article._id;

      const commentCreated = await comment.save();
      res.created(commentCreated);
    }
  } catch (error) {
    res.InternalServerError(error);
  }
};

/**
 *
 *
 * @param {any} req
 * @param {any} res
 */
function update(req, res) {

}

/**
 *
 *
 * @param {any} req
 * @param {any} res
 */
function destroy(req, res) {

}

export { store, update, destroy };
