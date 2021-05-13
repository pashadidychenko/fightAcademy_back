const { user } = require("../models/user");
const UserService = require("../services/userService");

const createUserValid = (req, res, next) => {
  let newUser = req.body;
  const modelKeys = Object.keys(user);
  const newUserKeys = Object.keys(newUser);
  let checkParams = newUserKeys.every((key) => modelKeys.includes(key));

  if (checkParams !== true || newUserKeys.length !== 5) {
    res.status(404);
    res.err = "Incorect User Data";
    return responseMiddleware(req, res, next);
  }

  if (newUserKeys.length === 0) {
    res.status(404);
    res.err = "User data not found";
    return responseMiddleware(req, res, next);
  }

  if (!newUser.email.includes("@gmail")) {
    res.status(404);
    res.err = "Please use only Gmail email";
    return responseMiddleware(req, res, next);
  }

  if (
    newUser.phoneNumber.slice(0, 4) !== "+380" ||
    newUser.phoneNumber.length !== 13
  ) {
    res.status(404);
    res.err = "Phone Number must be in format +380xxxxxxxxx";
    return responseMiddleware(req, res, next);
  }
  if (newUser.password.length < 3) {
    res.status(404);
    res.err = "Password must be more than 2 characters";
    return responseMiddleware(req, res, next);
  }

  const users = UserService.getAllUser();
  users.map((user) => {
    if (user.email.toLowerCase() === newUser.email.toLowerCase()) {
      res.status(404);
      res.err = "Found User with same Email, Please enter new Email";
      return responseMiddleware(req, res, next);
    }
    if (user.phoneNumber.toLowerCase() === newUser.phoneNumber.toLowerCase()) {
      res.status(404);
      res.err =
        "Found User with same Phone Number, Please enter new Phone Number";
      return responseMiddleware(req, res, next);
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
    res.status(404);
    res.err = "Incorect User Data";
    return responseMiddleware(req, res, next);
  }

  if (newUserKeys.length === 0) {
    res.status(404);
    res.err = "User data not found";
    return responseMiddleware(req, res, next);
  }

  if (newUser.email && !newUser.email.includes("@gmail")) {
    res.status(404);
    res.err = "Please use only Gmail email";
    return responseMiddleware(req, res, next);
  }

  if (
    (newUser.phoneNumber && newUser.phoneNumber.slice(0, 4) !== "+380") ||
    (newUser.phoneNumber && newUser.phoneNumber.length !== 13)
  ) {
    res.status(404);
    res.err = "Phone Number must be in format +380xxxxxxxxx";
    return responseMiddleware(req, res, next);
  }
  if (newUser.password && newUser.password.length < 2) {
    res.status(404);
    res.err = "Password must be more than 2 characters";
    return responseMiddleware(req, res, next);
  }

  const users = UserService.getAllUser();
  users
    .filter((user) => user.id !== id)
    .map((user) => {
      if (
        newUser.email &&
        user.email.toLowerCase() === newUser.email.toLowerCase()
      ) {
        res.status(404);
        res.err = "Found User with same Email, Please enter new Email";
        return responseMiddleware(req, res, next);
      }
      if (
        newUser.phoneNumber &&
        user.phoneNumber.toLowerCase() === newUser.phoneNumber.toLowerCase()
      ) {
        res.status(404);
        res.err =
          "Found User with same Phone Number, Please enter new Phone Number";
        return responseMiddleware(req, res, next);
      }
    });

  // TODO: Implement validatior for user entity during update
  next();
};

exports.createUserValid = createUserValid;
exports.updateUserValid = updateUserValid;
