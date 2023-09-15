const jwt = require("jsonwebtoken");

const userAuth = (req, res, next) => {

  try {
    const auth = req.headers.authorization;
    const token = auth?.split(" ")[1];
    const decoded = jwt.verify(token, "shhhhh");

    if (!decoded) {
      return res.status(401).json({ message: "User is not authorized" });
    }

    const userId = decoded.userId;

    req.body.userId = userId;
    console.log("userid",userId)

    next();
  } catch (error) {
    console.error("userAuth error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};




module.exports = { userAuth };
