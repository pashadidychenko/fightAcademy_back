const { user } = require("../models/user");
const UserService = require("../services/userService");

const createUserValid = (req, res, next) => {
  let newUser = req.body;
  const modelKeys = Object.keys(user);
  const newUserKeys = Object.keys(newUser);
  let checkParams = newUserKeys.every((key) => modelKeys.includes(key));

  if (checkParams !== true || newUserKeys.length !== 5) {
    throw Error("Incorect User Data");
  }

  if (newUserKeys.length === 0) {
    throw Error("User data not found");
  }

  if (!newUser.email.includes("@gmail")) {
    throw Error("Please use only Gmail email");
  }

  if (
    newUser.phoneNumber.slice(0, 4) !== "+380" ||
    newUser.phoneNumber.length !== 13
  ) {
    throw Error("Phone Number must be in format +380xxxxxxxxx");
  }
  if (newUser.password.length < 2) {
    throw Error("Password must be more than 2 characters");
  }

  const users = UserService.getAllUser();
  users.map((user) => {
    if (user.email.toLowerCase() === newUser.email.toLowerCase()) {
      throw Error("Found User with same Email, Please enter new Email");
    }
    if (user.phoneNumber.toLowerCase() === newUser.phoneNumber.toLowerCase()) {
      throw Error(
        "Found User with same Phone Number, Please enter new Phone Number"
      );
    }
  });

  // TODO: Implement validatior for user entity during creation
  next();
};

const updateUserValid = (req, res, next) => {
  const id = req.params.id;
  let newUser = req.body;
  const modelKeys = Object.keys(user);
  const newUserKeys = Object.keys(newUser);
  let checkParams = newUserKeys.every((key) => modelKeys.includes(key));

  if (checkParams !== true) {
    throw Error("Incorect User Data");
  }

  if (newUserKeys.length === 0) {
    throw Error("User data not found");
  }

  if (!newUser.email.includes("@gmail")) {
    throw Error("Please use only Gmail email");
  }

  if (
    newUser.phoneNumber.slice(0, 4) !== "+380" ||
    newUser.phoneNumber.length !== 13
  ) {
    throw Error("Phone Number must be in format +380xxxxxxxxx");
  }
  if (newUser.password.length < 2) {
    throw Error("Password must be more than 2 characters");
  }

  const users = UserService.getAllUser();
  users
    .filter((user) => user.id !== id)
    .map((user) => {
      if (user.email.toLowerCase() === newUser.email.toLowerCase()) {
        throw Error("Found User with same Email, Please enter new Email");
      }
      if (
        user.phoneNumber.toLowerCase() === newUser.phoneNumber.toLowerCase()
      ) {
        throw Error(
          "Found User with same Phone Number, Please enter new Phone Number"
        );
      }
    });

  // TODO: Implement validatior for user entity during update
  next();
};

exports.createUserValid = createUserValid;
exports.updateUserValid = updateUserValid;
