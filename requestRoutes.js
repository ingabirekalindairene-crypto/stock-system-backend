const express = require("express");
const router = express.Router();
const db = require("./database connection");

// CREATE REQUEST
router.post("/", (req, res) => {
  const { user_id, item_name, quantity, description, priority, department_id } = req.body;

  db.query(
    "INSERT INTO requests (user_id,item_name,quantity,description,priority,department_id) VALUES (?,?,?,?,?,?)",
    [user_id, item_name, quantity, description, priority, department_id],
    (err) => {
      if (err) return res.send(err);
      res.send("Request submitted");
    }
  );
});

// GET ALL REQUESTS
router.get("/", (req, res) => {
  db.query("SELECT * FROM requests", (err, result) => {
    if (err) return res.send(err);
    res.json(result);
  });
});

// UPDATE STATUS (WORKFLOW)
router.put("/:id", (req, res) => {
  const { status } = req.body;

  db.query(
    "UPDATE requests SET status=? WHERE id=?",
    [status, req.params.id],
    (err) => {
      if (err) return res.send(err);
      res.send("Status updated");
    }
  );
});

module.exports = router;