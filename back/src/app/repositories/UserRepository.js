import {
  atualizaUser,
  deletaUser,
  insertUser,
  login,
  receberUser,
  receberUserId,
  verificaEmail,
} from '../dbCrud.js';

class UserRepository {
  async findAll() {
    const users = await receberUser();
    return users;
  }

  async findById(id) {
    const user = await receberUserId(id);
    return user;
  }

  async findByEmail(email) {
    const [emailExists] = await verificaEmail(email);
    return emailExists;
  }

  async create(user) {
    const [newUser] = await insertUser(user);
    return newUser;
  }

  async update(id, user) {
    const [updated] = await atualizaUser(id, user);
    return updated;
  }

  async delete(id) {
    const deleted = await deletaUser(id);
    return deleted;
  }

  async authenticate(user) {
    const id = await login(user);
    return id;
  }
}

export default new UserRepository();
