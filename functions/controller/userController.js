const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SIGN } = require("../config/jwt");
const StandartError = require("../utils/standard-error");

const registerService = async (req, username, password, role) => {
  const user = await req.db.collection("users").findOne({ username });

  if (user) {
    throw new Error("Username already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 8); // return !@#123

  const newUser = await req.db
    .collection("users")
    .insertOne({ username, password: hashedPassword, role });

  return newUser;
};

const register = async (req, res, next) => {
  const { username, password, role } = req.body;

  try {
    const newUser = await registerService(req, username, password, role);

    res.status(200).json({
      message: "User succesfully registered",
      data: newUser,
    });
  } catch (error) {
    const StandardError = new StandartError({
      message: error.message || "Error while registering user",
      status: 500,
    });

    next(StandardError);
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await req.db.collection("users").findOne({ username });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    console.log(user);
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    console.log(JWT_SIGN);
    if (isPasswordCorrect) {
      const token = jwt.sign(
        { username: user.username, id: user._id, role: user.role },
        JWT_SIGN
      );
      res.status(200).json({
        message: "User successfully logged in",
        data: token,
      });
    } else {
      res.status(400).json({ error: "Password is incorrect" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  register,
  login,
};
