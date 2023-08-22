const jwt = require("jsonwebtoken");

const userAuth = (req, res, next) => {
  const auth = req.headers.authorization;

  const token = auth?.split(" ")[1];

  const decoded = jwt.verify(token, "shhhhh");

  if (!decoded) {
    return res.status(404).json({ message: "User is not authorised" });
  }

  const userId = decoded.userId;

  req.body.userId = userId;

  next();

 
};

module.exports = { userAuth };
