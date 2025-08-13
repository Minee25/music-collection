const musicDb = require("../database/dbConfig");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.loginForm = async (req, res) => {
  const locals = {
    title: "Admin Login",
    layout: "layouts/auth"
  }

  try {
    res.render("./admin/login", locals);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error");
  }
}

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      req.flash("error", "กรุณากรอกชื่อผู้ใช้และรหัสผ่าน");
      return res.redirect("/admin/login");
    }

    // Find Admin user
    const adminUser = await new Promise((resolve, reject) => {
      const sql = `SELECT * FROM admin_users WHERE username = ?`;
      musicDb.get(sql, [username], (err, row) => {
        if (err) {
          console.error("Error fetching admin user:", err.message);
          reject(err);
        } else {
          resolve(row);
        }
      });
    });

    if (!adminUser) {
      req.flash("error", "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง");
      return res.redirect("/admin/login");
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, adminUser.password);

    if (!isPasswordValid) {
      req.flash("error", "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง");
      return res.redirect("/admin/login");
    }

    // JWT token
    const token = jwt.sign(
      {
        adminId: adminUser.admin_id,
        username: adminUser.username,
        role: adminUser.role
      },
      process.env.JWT_SECRET || 'jwt-secret-key',
      { expiresIn: '24h' }
    );

    // Token to client
    res.cookie('token', token, {
      httpOnly: true,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    });

    req.flash("success", "เข้าสู่ระบบสำเร็จ");
    res.redirect("/admin/music-list");
  } catch (err) {
    console.error(err.message);
    res.redirect("/admin/login");
  }
}

exports.logout = async (req, res) => {
  try {
    // Clear the token cookie
    res.clearCookie('token');
    
    // Flash success message
    req.flash("success", "ออกจากระบบสำเร็จ");
    
    // Redirect to login page
    res.redirect("/admin/login");
  } catch (err) {
    console.error(err.message);
    res.redirect("/admin/login");
  }
}