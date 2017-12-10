const getUser = (req, res) => {
  res.ok(req.user);
};

export { getUser };
