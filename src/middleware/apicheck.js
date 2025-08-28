require('dotenv').config({quiet:true})

const apicheck = (req, res, next) => {
  const validApiKey = process.env.API_KEY;
  if (req.headers["api-key"] === validApiKey) {
    next();
  } else {
    console.log(req.headers);
    res.status(401).json({ error: "Invalid Api Key" });
  }
};

module.exports = apicheck;
