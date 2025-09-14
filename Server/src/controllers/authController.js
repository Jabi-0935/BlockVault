const bcryptjs = require("bcryptjs");
const { User } = require("../model/User");
const {generate_jwt} = require('../config/jwt')

const signup = async (req, res) => {
  if (await User.findOne({ email: req.body.email })) {
    return res.status(400).json({ error: "Email already exists" });
  }
  const salt = await bcryptjs.genSalt(10);
  const secpass = await bcryptjs.hash(req.body.password, salt);
  let user = new User({
    name: req.body.name,
    email: req.body.email,
    passhash: secpass,
  });
  await user.save();
  return res.json({
    message: `User Registered Successfully`,
    email: `${req.body.email}`,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  let user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({error: "User not found, if not signed up please signup" });
  }

  if (await bcryptjs.compare(password, user.passhash)) {
    let payload ={
        id :user._id,
        email:user.email
    }
    let jwt_token = generate_jwt(payload)
    return res.json({
      status:"Success",
      message: `Welcome back ${user.name}`,
      token:jwt_token,
      user:{
        name:user.name,
        email:user.email
      }
    });
  } else {
    return res.status(401).json({ error: "Invalid Credentials" });
  }
};

const profile=async (req,res)=>{
  const user = await User.findById(req.user.id).select("-passhash");
  return res.json({ message: `Welcome back ${user.name} this is you profile page` });
}


module.exports = { signup, login,profile };
