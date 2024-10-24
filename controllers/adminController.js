const db = require("../config/db");

exports.registerAdmin = (req, res) => {
  const { username, password, candidate_id } = req.body;
  const query =
    "INSERT INTO admins (username, password, candidate_id) VALUES (?, ?, ?)";
  db.query(query, [username, password, candidate_id], (err, result) => {
    if (err) return res.status(500).send(err);
    res.status(200).json({ message: "Admin registered successfully" });
  });
};

exports.loginAdmin = (req, res) => {
  const { username, password, candidate_id } = req.body;
  const query =
    "SELECT * FROM admins WHERE username = ? AND password = ? AND candidate_id = ?";
  db.query(query, [username, password, candidate_id], (err, results) => {
    if (err) return res.status(500).send(err);
    if (results.length > 0) {
      res.status(200).json({ adminId: results[0].id });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  });
};
