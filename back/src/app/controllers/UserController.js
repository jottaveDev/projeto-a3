import bcrypt from 'bcrypt';
import UserRepository from '../repositories/UserRepository.js';

class UserController {
  async index(request, response) {
    const users = await UserRepository.findAll();
    response.json(users);
  }

  async show(request, response) {
    const { id } = request.params;
    const user = await UserRepository.findById(id);
    response.json(user);
  }

  async store(request, response) {
    let { nome, email, senha } = request.body;
    const emailExists = await UserRepository.findByEmail(email);
    if (!nome)
      return response.status(400).json({ message: 'Nome não informado' });
    if (!senha)
      return response.status(400).json({ message: 'Senha não informada' });
    if (emailExists)
      return response.status(400).json({ message: 'E-mail já cadastrado' });
    const hash = bcrypt.hashSync(senha, 10);
    senha = hash;
    const user = { nome, email, senha };
    const newUser = await UserRepository.create(user);
    response.json(newUser);
  }

  async update(request, response) {
    const { id } = request.params;
    const { nome, senha } = request.body;
    if (!nome)
      return response.status(400).json({ message: 'Nome não informado' });
    if (!senha)
      return response.status(400).json({ message: 'Senha não informada' });
    const user = { nome, senha };
    const [updatedUser] = await UserRepository.update(id, user);
    response.json(updatedUser);
  }

  async delete(request, response) {
    const { id } = request.params;
    await UserRepository.delete(id);
    response.sendStatus(204);
  }
}

export default new UserController();
