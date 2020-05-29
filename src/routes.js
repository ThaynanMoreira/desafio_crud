import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

import appMiddleware from './app/middlewares/app';
import authMiddleware from './app/middlewares/auth';

const routes = new Router();

// App variables
routes.use(appMiddleware);

routes.get('/health', (req, res) => {
    let messageHealth = 'server running';
    if (process.env.NODE_ENV !== 'production') {
      messageHealth = `server running with ${process.env.NODE_ENV} config`;
    }
    res.status(200).send(messageHealth);
  });

// Users
routes.post('/users', UserController.store);
// Sessions
routes.post('/sessions', SessionController.store);

// ################
// Token
routes.use(authMiddleware);

// Users
routes.put('/users/:id', UserController.update);
routes.get('/users/:id', UserController.show);
routes.delete('/users/:id', UserController.delete);
routes.get('/users', UserController.getAll);

export default routes;
