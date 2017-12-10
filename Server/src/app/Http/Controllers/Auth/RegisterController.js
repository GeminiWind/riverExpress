import { validationResult } from 'express-validator/check';
import User from '../../../Models/User';

/**
 *
 *
 * @param {any} rq
 * @param {any} res
 */
const register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.badRequest(errors.mapped());
  }
  try {
    const user = new User();
    user.email = req.body.email;
    user.password = req.body.password;
    user.profile.first_name = req.body.firstName;
    user.profile.last_name = req.body.lastName;
    const userCreated = await user.save();
    res.created(userCreated);
  } catch (error) {
    res.InternalServerError({
      error,
    });
  }
};

export { register };
