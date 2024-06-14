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
    const { nome, email, senha } = request.body;
    if (!nome)
      return response.status(400).json({ message: 'Nome não informado' });
    if (!senha || senha.length < 6)
      return response
        .status(400)
        .json({ message: 'A senha deve ter no minimo 6 caracteres' });
    if (!email)
      return response.status(400).json({ message: 'Email não informado' });
    const emailExists = await UserRepository.findByEmail(email);
    if (emailExists)
      return response.status(400).json({ message: 'Email já cadastrado' });
    const hash = await bcrypt.hash(senha, 10);
    const user = { nome, email, senha: hash };
    const [newUser] = await UserRepository.create(user);
    response.status(201).json(newUser);
  }

  async update(request, response) {
    const { id } = request.params;
    const { nome, senha } = request.body;
    if (!nome)
      return response.status(400).json({ message: 'Nome não informado' });
    if (!senha || senha.length < 6)
      return response
        .status(400)
        .json({ message: 'A senha deve ter no minimo 6 caracteres' });
    const hash = await bcrypt.hash(senha, 10);
    const user = { nome, senha: hash };
    const [updatedUser] = await UserRepository.update(id, user);
    response.json(updatedUser);
  }

  async delete(request, response) {
    const { id } = request.params;
    await UserRepository.delete(id);
    response.sendStatus(204);
  }

  async login(request, response) {
    const { email, senha } = request.body;
    const id = await UserRepository.authenticate({ email, senha });
    if (!id)
      return response
        .status(401)
        .json({ message: 'Email ou senha inválidos!' });
    return response.status(200).json({ message: 'Autenticado', id });
  }
}

export default new UserController();
