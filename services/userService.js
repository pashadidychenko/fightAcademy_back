const { UserRepository } = require("../repositories/userRepository");

class UserService {
  getAllUser() {
    const user = UserRepository.getAll();
    return user;
  }

  addUser(data) {
    return UserRepository.create(data);
  }

  getUserById(id) {
    return UserRepository.getOne({ id });
  }

  updateUser(id, data) {
    return UserRepository.update(id, data);
  }

  deleteUser(id) {
    return UserRepository.delete(id);
  }

  // TODO: Implement methods to work with user

  search(search) {
    const item = UserRepository.getOne(search);
    if (!item) {
      return null;
    }
    return item;
  }
}

module.exports = new UserService();
