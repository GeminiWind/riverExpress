import { validationResult } from 'express-validator/check';
import jwt from 'jsonwebtoken';
import User from '../../../Models/User';

/**
 *
 *
 * @param {any} req
 * @param {any} res
 */
const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.badRequest(errors.mapped());
  }
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      res.notFound({ message: 'User is not exists' });
    } else if (user.validPassword(req.body.password)) {
      const expiresIn = 604800;
      const token = jwt.sign(JSON.parse(JSON.stringify(user)), process.env.APP_KEY, {
        expiresIn, // in seconds
      });
      res.ok({
        token: `JWT ${token}`,
        expiration: Date.now() + expiresIn,
      });
    }
  } catch (error) {
    res.InternalServerError({
      error,
    });
  }
};

export { login };
