import * as Yup from 'yup';

import User from '../models/User';

class UserController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .required()
        .min(6),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Wrong data.' });
    }

    const userExists = await User.findByEmail(req.body.email);
    if (userExists) {
      return res.status(400).json({ error: 'User already exists.' });
    }

    const { id, name, email } = await User.create(req.body);
    return res.json({ id, name, email });
  }

  async update(req, res) {

    if(req.vars.userId != req.params.id){
      return res.status(405).json({ error: 'It is not allowed to change the data of other collaborators.' });
    }

    const schema = Yup.object().shape({
      name: Yup.string()
      .required(),
      email: Yup.string().email()
      .required(),
      oldPassword: Yup.string().min(6),
      password: Yup.string()
        .min(6)
        .when('oldPassword', (oldPassword, field) =>
          oldPassword ? field.required() : field
        ),
      confirmPassword: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Wrong data.' });
    }

    const { email, oldPassword } = req.body;
    const user = await User.findByPk(req.vars.userId);

    if (email !== user.email) {
      const userExists = await User.findByEmail(email);
      if (userExists) {
        return res.status(400).json({ error: 'Email is aready being used.' });
      }
    }

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Old password is not correct.' });
    }

    const { id, name } = await user.update(req.body);
    return res.json({ id, name, email });
  }

  async delete(req, res) {
    const { id } = req.params;

    const result = await User.destroy({
      where: {
        id,
      },
    });
    if(result){
      return res.status(204).json({ response: 'Not content.' });
    } else {
      return res.status(404).json({ error: 'Not found.' });
    }
  }

  async show(req, res) {
    if(req.vars.userId != req.params.id) {
      return res.status(404).json({ error: 'Not found.' });
    }

    const { id, name, email } = await User.findByPk(req.params.id);
    return res.json({ id, name, email });
  }

  async getAll(req, res) {
    const users = await User.findAll();
    return res.json(users.map((u) => {
       return {id: u.id, name: u.name, email: u.email}
      }));
  }
}

export default new UserController();
