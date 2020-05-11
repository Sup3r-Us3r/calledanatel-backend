import { Router } from 'express';

import UserController from './app/controllers/UserController';
import ProtocolController from './app/controllers/ProtocolController';

const routes = Router();

// UserController Routes
routes.post('/register', UserController.registerUser);
routes.post('/login', UserController.loginUser);
routes.delete('/delete/:agent', UserController.deleteUser);
routes.get('/users', UserController.listAllUsers);
routes.get('/user/:agent', UserController.listUser);

// ProtocolController Routes
routes.post('/register/protocol', ProtocolController.registerDataProtocol);
routes.put('/protocol/update/:id', ProtocolController.updateProtocol);
routes.delete('/protocol/delete/:id', ProtocolController.deleteProtocol);
routes.get('/protocols', ProtocolController.listAllProtocols);
routes.get('/protocol/:anatelprotocol', ProtocolController.listProtocol);

export default routes;
