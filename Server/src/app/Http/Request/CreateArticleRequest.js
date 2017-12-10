import { check } from 'express-validator/check';

const createArticleRequest = [
  check('title').exists(),
  check('content').exists(),
  check('short_intro').exists(),
  check('tags').exists(),
  check('category').exists(),
  check('author.name').exists(),
  check('author.dob').exists(),
  check('athor.intro').exists(),
  check('image').exists(),

];

export { createArticleRequest };
