const { Router } = require("express");
const AuthService = require("../services/authService");
const { responseMiddleware } = require("../middlewares/response.middleware");

const router = Router();

router.post(
  "/login",
  (req, res, next) => {
    try {
      let data;
      const email = req.body.email;
      const password = req.body.password;
      if (email) {
        data = AuthService.login({ email, password });
      } else {
        throw Error("Incorect login information");
      }
      res.data = data;
      // TODO: Implement login action (get the user if it exist with entered credentials)
    } catch (err) {
      res.err = err;
    } finally {
      next();
    }
  },
  responseMiddleware
);

module.exports = router;
