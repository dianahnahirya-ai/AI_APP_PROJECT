export const schoolContext = (req, res, next) => {
  // If user is logged in, attach their schoolId (unless SUPER_ADMIN checking all)
  if (req.user && req.user.role !== 'SUPER_ADMIN') {
    if (!req.user.schoolId) {
      return res.status(403).json({ error: 'User does not belong to any school' });
    }
    req.schoolId = req.user.schoolId;
  }
  next();
};
