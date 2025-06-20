exports.getAll = (req, res) => {
  // TODO: fetch all users
  res.json([]);
};

exports.getById = (req, res) => {
  // TODO: fetch user by id
  res.json({ id: req.params.id });
};
