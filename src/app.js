// import 'dotenv/config';
require('dotenv/config');

// import express from 'express';
// import http from 'http';
// import socketio from 'socket.io';
// import cors from 'cors';
const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const cors = require('cors');

// import routes from './routes';
const routes = require('./routes');

// import { setUserOnline, getUsersOnline, userLeaves } from './util/getUsersOnline';
const handleUsers = require('./util/handleUsers');

// import './database';
require('./database');

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
      socket.on('userOnline', (response) => {
        io.emit(
          'userOnline',
          handleUsers.setUserOnline({ socketId: socket.id, ...response })
        );
      });

      socket.on('changeData', (response) => {
        io.emit('changeData', response);
      });

      socket.on('disconnect', () => {
        handleUsers.userLeaves(socket.id);

        io.emit('userOnline', handleUsers.getUsersOnline());
      });
    });
  }

  routes() {
    this.server.use(routes);
  }
}

// export default new App().httpServer;
module.exports = new App().httpServer;
