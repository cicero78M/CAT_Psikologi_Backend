exports.create = (req, res) => {
  // TODO: create question
  res.json({ message: 'created' });
};

exports.getAll = (req, res) => {
  // TODO: list questions
  res.json([]);
};

exports.getById = (req, res) => {
  // TODO: get question by id
  res.json({ id: req.params.id });
};
