import UserModel from '../models/User';

class UserController {
  async registerUser(req, res) {
    const { agent } = req.body;

    const userExists = await UserModel.findOne({ agent });

    if (userExists) {
      return res.status(400).json({ error: 'User already exists.' });
    }

    const user = await UserModel.create(req.body);

    if (!user) {
      return res.status(400).json({ error: 'Error registering user.' });
    }

    return res.json(user);
  }

  async loginUser(req, res) {
    const { name, agent } = req.body;

    const user = await UserModel.findOne({ agent });

    if (!user) {
      return res.status(400).json({ error: 'Error logging in user.' });
    }

    if (user.name !== name) {
      return res.status(400).json({ error: 'User not found.' });
    }

    return res.json(user);
  }

  async deleteUser(req, res) {
    const { agent } = req.params;

    const user = await UserModel.findOneAndDelete({ agent });

    if (!user) {
      return res.status(400).json({ error: 'Error deleting user.' });
    }

    return res.send();
  }

  async listAllUsers(req, res) {
    const users = await UserModel.find({}, '-__v').sort('DESC');

    if (!users) {
      return res.status(400).json({ error: 'Error when listing users.' });
    }

    return res.json(users);
  }

  async listUser(req, res) {
    const { agent } = req.params;

    const user = await UserModel.findOne({ agent }, '-__v');

    if (!user) {
      return res.status(400).json({ error: 'Error while listing user.' });
    }

    return res.json(user);
  }
}

export default new UserController();
