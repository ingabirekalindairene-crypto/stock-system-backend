const multer = require("multer");

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

router.post("/upload/:id", upload.single("receipt"), (req, res) => {
  const file = req.file.filename;

  db.query(
    "INSERT INTO payments (request_id, receipt) VALUES (?,?)",
    [req.params.id, file],
    (err) => {
      if (err) return res.send(err);
      res.send("Receipt uploaded");
    }
  );
});