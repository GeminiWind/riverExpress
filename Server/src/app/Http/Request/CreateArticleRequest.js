import { check } from 'express-validator/check';

const createArticleRequest = [
  check('title').exists(),
  check('content').exists(),
  check('shortIntro').exists(),
  check('tags').exists(),
  check('category').exists(),
  check('author.name').exists(),
  check('author.dob').exists(),
  check('author.intro').exists(),
  check('image').exists(),

];

export { createArticleRequest };
