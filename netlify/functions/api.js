const express = require('express');
const serverless = require('serverless-http');
const expressLayouts = require("express-ejs-layouts");
const path = require("path");
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('express-flash');
const methodOverride = require('method-override');

// Import database config
require("../../src/database/dbConfig");

const app = express();

// View engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../../src/views"));
app.use(expressLayouts);
app.set("layout", "layouts/main");

// Middleware
app.use(express.static(path.join(__dirname, "../../public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(methodOverride('_method'));
app.use(session({
  secret: process.env.SESSION_SECRET || 'session-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));
app.use(flash());
app.use(morgan('dev'));

// Routes
app.use("/", require("../../src/routes/music.route"));
app.use("/", require("../../src/routes/auth.route"));
app.use("/", require("../../src/routes/admin.route"));

// 404 Error Handler
app.use((req, res, next) => {
  res.status(404).render("404", {
    title: "หน้าที่ไม่พบ - 404 Error"
  });
});

// General Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render("404", {
    title: "เกิดข้อผิดพลาด - Server Error"
  });
});

// Export the serverless function
module.exports.handler = serverless(app); 