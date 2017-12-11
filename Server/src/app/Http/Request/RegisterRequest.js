import { check } from 'express-validator/check';

const registerRequest = [
  check('email')
    .isEmail().withMessage('must be an email')
    .trim()
    .normalizeEmail(),
  check('password', 'passwords must be at least 6 chars long')
    .isLength({ min: 6 }),
  check('firstName').exists(),
  check('lastName').exists(),
];

export { registerRequest };
