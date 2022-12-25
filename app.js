/* eslint-disable no-underscore-dangle */
/* eslint-disable import/no-cycle */
/* eslint-disable import/extensions */
import * as http from 'http';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import pino from 'pino';
import { Server } from 'socket.io';
import formatMessage from './utils/messages.js';
import middleware from './middlewares/index.middlewares.js';
import {
  userJoin, getCurrentUser, userLeaves, getRoomUsers
} from './utils/users.js';

// eslint-disable-next-line import/prefer-default-export
export const logger = pino();
const app = express();
const server = http.createServer(app);
const io = new Server(server);
const PORT = process.env.PORT || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

// eslint-disable-next-line no-unused-vars
const botName = 'Admin';
io.on('connection', (socket) => {
  // Joining a room
  socket.on('joinRoom', ({ username, room }) => {
    const user = userJoin(socket.id, username, room);
    socket.join(user.room);

    // Welcome the current user
    socket.emit('message', formatMessage(botName, 'Welcome to ChatCord!'));

    // Brodcast when a user connects
    socket.broadcast
      .to(user.room)
      .emit('message', formatMessage(botName, `${user.username} has joined the chat!`));

    // Sends users and room info
    io.to(user.room).emit('roomUsers', {
      room: user.room,
      users: getRoomUsers(user.room)
    });
  });

  // Listen for chat Message
  socket.on('chatMessage', (msg) => {
    const user = getCurrentUser(socket.id);

    io.to(user.room).emit('message', formatMessage(user.username, msg));
  });

  // Runs when client disconnects
  socket.on('disconnect', () => {
    const user = userLeaves(socket.id);

    if (user) {
      io.to(user.room).emit(
        'message',
        formatMessage(botName, `${user.username} has left the chat!`)
      );

      // Sends users and room info
      io.to(user.room).emit('roomUsers', {
        room: user.room,
        users: getRoomUsers(user.room)
      });
    }
  });
});

middleware(app);

server.listen(PORT, () => {
  logger.info(`APP is running on port ${PORT}`);
});
