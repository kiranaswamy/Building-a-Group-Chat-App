const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.header("Authorization");
  if (!authHeader) return res.status(401).json({ message: "No token provided" });


  const token = authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(
      token,
      "da3841253229447e5b3fd026075feacb6110ce1d9d1f9e0ee6ac15ccfa6eabf7"
    );
    req.userId = decoded.userId; 
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};
