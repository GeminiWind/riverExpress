import { check } from 'express-validator/check';

const loginRequest = [
  check('email')
    .isEmail().withMessage('must be an email'),
  check('password')
    .exists().withMessage('must be exists'),
];

export { loginRequest };
