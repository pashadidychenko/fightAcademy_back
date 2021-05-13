const { Router } = require("express");
const FighterService = require("../services/fighterService");
const { responseMiddleware } = require("../middlewares/response.middleware");
const {
  createFighterValid,
  updateFighterValid,
} = require("../middlewares/fighter.validation.middleware");

const router = Router();

router.get(
  "/",
  (req, res, next) => {
    try {
      const fighterData = FighterService.getAllFighter();
      res.data = fighterData;
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
      const fighterData = FighterService.getFighterById(id);
      res.data = fighterData;
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
  createFighterValid,
  (req, res, next) => {
    try {
      const fighterData = FighterService.addFighter(req.body);
      res.data = fighterData;
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
  updateFighterValid,
  (req, res, next) => {
    try {
      const id = req.params.id;
      const fighterData = FighterService.updateFighter(id, req.body);
      res.data = fighterData;
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
      let fighterData = FighterService.deleteFighter(id);
      let status = 200;
      if (data.length) {
        userData = { message: `Fighter with ${id} deleted` };
      } else {
        status = 404;
      }
      res.statusCode = status;
      res.data = fighterData;
    } catch (err) {
      res.err = err;
    } finally {
      next();
    }
  },
  responseMiddleware
);

// TODO: Implement route controllers for fighter

module.exports = router;
