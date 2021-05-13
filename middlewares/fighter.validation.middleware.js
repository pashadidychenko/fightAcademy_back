const { fighter } = require("../models/fighter");
const FighterService = require("../services/fighterService");

const createFighterValid = (req, res, next) => {
  let newFighter = req.body;
  const modelKeys = Object.keys(fighter);
  const newFighterKeys = Object.keys(newFighter);
  let checkParams = newFighterKeys.every((key) => modelKeys.includes(key));

  if (checkParams !== true || newFighter.length < 3) {
    throw Error("Incorect Fighter Data");
  }

  if (newFighter.length === 0) {
    throw Error("Fighter data not found");
  }

  if (!newFighter.health) {
    newFighter.health = 100;
  }

  if (100 < newFighter.power < 1) {
    throw Error("Please Enter correct Power");
  }

  if (10 < newFighter.defense < 1) {
    throw Error("Please Enter correct Defense");
  }

  if (120 < newFighter.health < 80) {
    throw Error("Please Enter correct Health");
  }

  const fighters = FighterService.getAllFighter();
  fighters.map((fighter) => {
    if (fighter.name.toLowerCase() === newFighter.name.toLowerCase()) {
      throw Error("Found Fighter with same name, Please enter new name");
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
    throw Error("Incorect Fighter Data");
  }

  if (newFighter.length === 0) {
    throw Error("Fighter data not found");
  }

  if (100 < newFighter.power < 1) {
    throw Error("Please Enter correct Power");
  }

  if (10 < newFighter.defense < 1) {
    throw Error("Please Enter correct Defense");
  }

  if (120 < newFighter.health < 80) {
    throw Error("Please Enter correct Health");
  }

  const fighters = FighterService.getAllFighter();
  fighters
    .filter((fighter) => fighter.id !== id)
    .map((fighter) => {
      if (fighter.name.toLowerCase() === newFighter.name.toLowerCase()) {
        throw Error("Found Fighter with same name, Please enter new name");
      }
    });

  // TODO: Implement validatior for fighter entity during update
  next();
};

exports.createFighterValid = createFighterValid;
exports.updateFighterValid = updateFighterValid;
