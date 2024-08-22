const jwt = require("jsonwebtoken");

const maxAge = 3 * 24 * 60 * 60; // 3 days
const createToken = (id) => {
  return jwt.sign({ id }, "secret", {
    expiresIn: maxAge,
  });
};

const validateToken = (token) => {
  let id = jwt.verify(token, "secret").id;
  return id;
};

module.exports = {
  createToken,
  validateToken,
};
