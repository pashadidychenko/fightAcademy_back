const { FighterRepository } = require("../repositories/fighterRepository");

class FighterService {
  getAllFighter() {
    const fighters = FighterRepository.getAll();
    return fighters;
  }

  addFighter(data) {
    return FighterRepository.create(data);
  }

  getFighterById(id) {
    return FighterRepository.getOne({ id });
  }

  updateFighter(id, data) {
    return FighterRepository.update(id, data);
  }

  deleteFighter(id) {
    return FighterRepository.delete(id);
  }
  // TODO: Implement methods to work with fighters
}

module.exports = new FighterService();
