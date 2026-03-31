const express = require("express");
const router = express.Router();
const db = require("./database connection");
const bcrypt = require("bcryptjs");

router.post("/register", async (req, res) => {
  const { name, email, password, role } = req.body;
  const hashed = await bcrypt.hash(password, 10);

  db.query(
    "INSERT INTO users (name,email,password,role) VALUES (?,?,?,?)",
    [name, email, hashed, role],
    (err) => {
      if (err) {
        return res.status(400).json({ success: false, message: "Email already exists or registration error" });
      }
      res.status(201).json({ success: true, message: "User registered successfully" });
    }
  );
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  db.query("SELECT * FROM users WHERE email=?", [email], async (err, result) => {
    if (err) return res.status(500).json({ success: false, message: "Database error" });
    
    if (result.length === 0) return res.status(401).json({ success: false, message: "User not found" });

    const valid = await bcrypt.compare(password, result[0].password);
    if (!valid) return res.status(401).json({ success: false, message: "Wrong password" });

    res.status(200).json({ success: true, user: result[0] });
  });
});

module.exports = router;