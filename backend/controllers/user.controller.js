const jwt = require("jsonwebtoken");

const User = require("../models/User");
const validateEmail = require("../utils/validateEmail");
const gravatar = require("../utils/gravatar");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    // payload + secret + expire time
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

module.exports = {
  // REGISTER A USER
  signUp: async (
    _,
    { inputs: { username, email, password, confirmPassword } }
  ) => {
    // validate email
    if (!validateEmail(email)) throw Error("Please use a valid email");

    // check if password matches
    if (password !== confirmPassword)
      throw Error("The passwords does not match");

    // sanitaze the username
    const UserName = username.replace(/\s+/g, "").toLowerCase();

    let user = await User.findOne({
      $or: [{ username: UserName }, { email }],
    });

    // check if username and email exist
    if (user && user.username === UserName)
      throw Error("Username already exist");

    if (user && user.email === email) throw Error("Email already exist");

    username = username.replace(/\s+/g, "");
    const avatar = gravatar(email);

    user = await User.create({
      username,
      email,
      password,
      avatar,
    });

    return `your registeration is successful. Thank You!!!`;
  },

  // SIGNIN A USER
  signIn: async (_, { UsernameOrEmail, password }) => {
    // sanitaze the username
    const UserNameEmail = UsernameOrEmail.replace(/\s+/g, "").toLowerCase();

    const user = await User.findOne({
      $or: [{ username: UserNameEmail }, { email: UserNameEmail }],
    }).select("+password"); // select expiclity password;

    if (!user) throw Error("Sorry you are not registered in this platform");

    if (!(await user.correctPassword(password, user.password)))
      throw Error("Incorrect user details");

    return { token: signToken(user._id), user: user };
  },

  //GET ALL USERS
  users: async (_, arges, { reqUser }) => {
    if (!(await reqUser))
      throw Error("Please login before you can have access");

    const users = await User.find();

    if (!users.length > 0)
      throw Error("No users yet, Please try again later", "UNAVAILABLE");

    return users;
  },

  // GET A USER
  user: async (_, { id }, { reqUser }) => {
    if (!(await reqUser))
      throw Error("Please login before you can have access");

    const user = await User.findById(id).populate("addedBooks");

    if (!user)
      throw Error("User is not available or have been deleted", "UNAVAILABLE");

    return user;
  },
};
