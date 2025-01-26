const verifyAdmin = (req, res, next) => {
  if (req.role !== 'admin') {
    return res.status(403).send({ success: false, message: 'Not authorized' });
  }
  next();
};

module.exports = verifyAdmin;
