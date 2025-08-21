const jwt = require('jsonwebtoken');

exports.authMiddleware = (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) {
    console.log('No token found, redirecting to login');
    return res.redirect("/admin/login");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "jwt-secret-key");
    req.user = decoded;

    next();
  } catch (err) {
    console.error('Auth middleware error:', err);
    res.clearCookie('token');
    return res.redirect('/admin/login');
  }
}

exports.isAuthenticated = (req, res, next) => {
  const token = req.cookies?.token;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || "jwt-secret-key");
      req.user = decoded;
      return res.redirect("/admin/music-list");
    } catch (err) {
      next();
    }
  } else {
    next();
  }
}
