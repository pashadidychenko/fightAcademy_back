const { Router } = require("express");
const UserService = require("../services/userService");
const {
  createUserValid,
  updateUserValid,
} = require("../middlewares/user.validation.middleware");
const { responseMiddleware } = require("../middlewares/response.middleware");

const router = Router();

router.get(
  "/",
  (req, res, next) => {
    try {
      const userData = UserService.getAllUser();
      res.data = userData;
    } catch (err) {
      res.err = err;
    } finally {
      next();
    }
  },
  responseMiddleware
);

router.get(
  "/:id",
  (req, res, next) => {
    try {
      const id = req.params.id;
      const userData = UserService.getUserById(id);
      res.data = userData;
    } catch (err) {
      res.err = err;
    } finally {
      next();
    }
  },
  responseMiddleware
);

router.post(
  "/",
  createUserValid,
  (req, res, next) => {
    try {
      const userData = UserService.addUser(req.body);
      res.data = userData;
    } catch (err) {
      res.err = err;
    } finally {
      next();
    }
  },
  responseMiddleware
);

router.put(
  "/:id",
  updateUserValid,
  (req, res, next) => {
    try {
      const id = req.params.id;
      const userData = UserService.updateUser(id, req.body);
      res.data = userData;
    } catch (err) {
      res.err = err;
    } finally {
      next();
    }
  },
  responseMiddleware
);

router.delete(
  "/:id",
  (req, res, next) => {
    try {
      const id = req.params.id;
      let userData = UserService.deleteUser(id);
      let status = 200;
      if (data.length) {
        userData = { message: `User with ${id} deleted` };
      } else {
        status = 404;
      }
      res.statusCode = status;
      res.data = userData;
    } catch (err) {
      res.err = err;
    } finally {
      next();
    }
  },
  responseMiddleware
);

// TODO: Implement route controllers for user

module.exports = router;
