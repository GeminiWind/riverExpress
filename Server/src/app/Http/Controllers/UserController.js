/**
 * Get logged-in user
 *
 * @param {any} req
 * @param {any} res
 */
const getUser = (req, res) => {
  res.ok(req.user);
};

export { getUser };
