const jwt = require("jsonwebtoken");
const secret = require("../config/index.js").jwtSecretKey;

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ");
    let decodedData;
    decodedData = jwt.verify(token[token.length - 1], secret);
    if ((decodedData.exp * 1000) <= Date.now()) {
      return res.status(400).json({ message: 'Unauthorized access. Token expire.' })
    }
    req.email = decodedData.data.email
    next();
  } catch (error) {
    return res.status(500).json({ message: 'Unauthorized access. Token expire.' })
  }
};
const setToken = (data) => {
  return jwt.sign({ data }, secret, { expiresIn: "1hr" })
}

module.exports = { auth, setToken };
