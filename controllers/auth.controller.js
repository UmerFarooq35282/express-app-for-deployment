import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { makeJwtToken } from "../utils/generateToken.js";

const signupFn = async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    if (!fullName || !email || !password) {
      return res.json({ meessage: "All field all required!!" });
    }
    if (password.length < 6) {
      return res.json({
        message: "Password must be greater than 6 characters",
      });
    }
    const user = await User.findOne({ email });
    console.log(user);
    if (user) {
      return res.json({ message: "Email already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });
    if (newUser) {
      makeJwtToken(newUser._id, res);
      await newUser.save();
      return res.status(200).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePic: newUser.profilePic,
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Sever Error:", err: error.message });
  }
};
const loginFn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userCerdentials = await User.findOne({ email });
    if (!userCerdentials) {
      return res.json({ message: "Invalid credentials" });
    }
    const matchedPassword = await bcrypt.compare(
      password,
      userCerdentials.password
    );
    if (!matchedPassword) {
      return res.json({ message: "Invalid credentials" });
    }

    makeJwtToken(userCerdentials._id, res);

    return res.json({
      _id: userCerdentials._id,
      fullName: userCerdentials.fullName,
      email: userCerdentials.email,
      profilePic: userCerdentials.profilePic,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal sever error",
      error: error.meessage,
    });
  }
};
const logoutFn = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    return res.json({ message: "Logged out successfully" });
  } catch (error) {
    res.json({
      message: "Internal server Error",
      error: error.message,
    });
  }
};

export { loginFn, logoutFn, signupFn };
