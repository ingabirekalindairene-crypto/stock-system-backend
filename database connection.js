const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "INGA KAL IRENE12",
  database: "stock_system"
});

db.connect(err => {
  if (err) throw err;
  console.log("Database connected");
});

module.exports = db;