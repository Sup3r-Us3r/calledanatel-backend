import 'dotenv/config';

import express from 'express';
import http from 'http';
import socketio from 'socket.io';
import cors from 'cors';

import routes from './routes';

import './database';

class App {
  constructor() {
    this.server = express();
    this.httpServer = http.createServer(this.server);
    this.middlewares();
    this.routes();
    this.websocket();
  }

  middlewares() {
    this.server.use(cors({ origin: '*' }));
    this.server.use(express.json());
    this.server.use(express.urlencoded({ extended: false }));
  }

  websocket() {
    const io = socketio(this.httpServer);

    io.origins('*:*');

    io.on('connection', (socket) => {
      socket.on('changeData', (response) => {
        io.emit('changeData', response);
      });

      socket.on('disconnect', () => console.log('User has left the app'));
    });
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().httpServer;
