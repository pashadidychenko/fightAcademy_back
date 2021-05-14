const { fighter } = require("../models/fighter");
const FighterService = require("../services/fighterService");
const { responseMiddleware } = require("../middlewares/response.middleware");

const createFighterValid = (req, res, next) => {
  let newFighter = req.body;
  const modelKeys = Object.keys(fighter);
  const newFighterKeys = Object.keys(newFighter);
  let checkParams = newFighterKeys.every((key) => modelKeys.includes(key));

  if (
    checkParams !== true ||
    newFighterKeys.length < 3 ||
    newFighterKeys.length > 4
  ) {
    res.status(400);
    res.err = "Incorect Fighter Data";
    return responseMiddleware(req, res, next);
  }

  if (newFighter.length === 0) {
    res.status(400);
    res.err = "Fighter data not found";
    return responseMiddleware(req, res, next);
  }

  if (!newFighter.name || newFighter.name.length === 0) {
    res.status(400);
    res.err = "Fighter name not found";
    return responseMiddleware(req, res, next);
  }

  if (!newFighter.power) {
    res.status(400);
    res.err = "Fighter power not found";
    return responseMiddleware(req, res, next);
  }

  if (!newFighter.defense) {
    res.status(400);
    res.err = "Fighter defense not found";
    return responseMiddleware(req, res, next);
  }

  if (!newFighter.health) {
    newFighter.health = 100;
  }

  if (
    isNaN(newFighter.power) ||
    Number(newFighter.power) > 100 ||
    Number(newFighter.power) < 1
  ) {
    res.status(400);
    res.err = "Please Enter correct Power";
    return responseMiddleware(req, res, next);
  }

  if (
    isNaN(newFighter.defense) ||
    Number(newFighter.defense) > 10 ||
    Number(newFighter.defense) < 1
  ) {
    res.status(400);
    res.err = "Please Enter correct Defense";
    return responseMiddleware(req, res, next);
  }

  if (
    isNaN(newFighter.health) ||
    Number(newFighter.health) > 120 ||
    Number(newFighter.health) < 80
  ) {
    res.status(400);
    res.err = "Please Enter correct Health";
    return responseMiddleware(req, res, next);
  }

  const fighters = FighterService.getAllFighter();
  fighters.map((fighter) => {
    if (fighter.name.toLowerCase() === newFighter.name.toLowerCase()) {
      res.status(400);
      res.err = "Found Fighter with same name, Please enter new name";
      return responseMiddleware(req, res, next);
    }
  });

  // TODO: Implement validatior for fighter entity during creation
  next();
};

const updateFighterValid = (req, res, next) => {
  const id = req.params.id;
  let newFighter = req.body;
  const modelKeys = Object.keys(fighter);
  const newFighterKeys = Object.keys(newFighter);
  let checkParams = newFighterKeys.every((key) => modelKeys.includes(key));

  if (checkParams !== true) {
    res.status(400);
    res.err = "Incorect Fighter Data";
    return responseMiddleware(req, res, next);
  }

  if (newFighter.id) {
    res.status(400);
    res.err = "Incorect Fighter Data";
    return responseMiddleware(req, res, next);
  }

  if (newFighter.length === 0) {
    res.status(400);
    res.err = "Fighter data not found";
    return responseMiddleware(req, res, next);
  }

  if (
    (newFighter.power && isNaN(newFighter.power)) ||
    (newFighter.power && Number(newFighter.power) > 100) ||
    Number(newFighter.power) < 1
  ) {
    res.status(400);
    res.err = "Please Enter correct Power";
    return responseMiddleware(req, res, next);
  }

  if (
    (newFighter.defense && isNaN(newFighter.defense)) ||
    (newFighter.defense && Number(newFighter.defense) > 10) ||
    Number(newFighter.defense) < 1
  ) {
    res.status(400);
    res.err = "Please Enter correct Defense";
    return responseMiddleware(req, res, next);
  }

  if (
    (newFighter.health && isNaN(newFighter.health)) ||
    (newFighter.health && Number(newFighter.health) > 120) ||
    Number(newFighter.health) < 80
  ) {
    res.status(400);
    res.err = "Please Enter correct Health";
    return responseMiddleware(req, res, next);
  }

  const fighters = FighterService.getAllFighter();
  fighters
    .filter((fighter) => fighter.id !== id)
    .map((fighter) => {
      if (
        newFighter.name &&
        fighter.name.toLowerCase() === newFighter.name.toLowerCase()
      ) {
        res.status(400);
        res.err = "Found Fighter with same name, Please enter new name";
        return responseMiddleware(req, res, next);
      }
    });

  // TODO: Implement validatior for fighter entity during update
  next();
};

exports.createFighterValid = createFighterValid;
exports.updateFighterValid = updateFighterValid;
