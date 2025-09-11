require("dotenv").config({quiet:true});
const app = require("./app.js");
const connectdb = require("./config/db.js");
const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 5000;

connectdb(MONGO_URI)
  .then(() => {
    console.log("DB Connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error("DB connection failed:", err);
    process.exit(1);
  });

