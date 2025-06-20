const crypto = require('crypto');
const Class = require('../models/class');

exports.create = async (req, res) => {
  try {
    const inviteCode = crypto.randomBytes(4).toString('hex');
    const newClass = await Class.create(req.body.name, req.user.id, inviteCode);
    res.json(newClass);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Creation failed' });
  }
};

exports.getAll = async (req, res) => {
  const classes = await Class.findAll();
  res.json(classes);
};

exports.getById = async (req, res) => {
  const cls = await Class.findById(req.params.id);
  if (!cls) {
    return res.status(404).json({ message: 'Class not found' });
  }
  res.json(cls);
};

exports.join = async (req, res) => {
  try {
    const cls = await Class.findByInviteCode(req.body.invite_code);
    if (!cls) {
      return res.status(404).json({ message: 'Invalid invite code' });
    }
    await Class.addMember(cls.id, req.user.id);
    res.json({ message: 'Joined', class_id: cls.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Join failed' });
  }
};

exports.members = async (req, res) => {
  const members = await Class.getMembers(req.params.id);
  res.json(members);
};
