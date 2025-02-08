import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import mongoDBURL from './config/dbConfig.js';
import postsRouter from './routes/postsRoutes.js';
import commentsRouter from './routes/commentsRoutes.js';
import passport from 'passport';
import passportStrategy from '../server/utils/passportConfig.js';
import { cloudinaryConfig } from './config/cloudinary.js';
import usersRouter from './routes/usersRoutes.js';
import { initWebSocket } from './utils/websocket.js';
import http from 'http';
const app = express();
const server = http.createServer(app);
initWebSocket(server);

const addMiddlewares = () => {
  app.use(
    cors({
      origin: ['http://localhost:5175', 'https://instclone-client.vercel.app'],
      credentials: true,
    })
  );

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  cloudinaryConfig();
  app.use(passport.initialize());
  passport.use(passportStrategy);
};

const addRoutes = () => {
  app.use('/users', usersRouter);
  app.use('/posts', postsRouter);
  app.use('/comments', commentsRouter);
};

const startServer = () => {
  const PORT = process.env.PORT || 5001;
  server.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
  });
};

const connectMongoDB = async () => {
  try {
    await mongoose.connect(mongoDBURL);
    console.log('MongoDB is running');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

(async function () {
  addMiddlewares();
  await connectMongoDB();
  addRoutes();
  startServer();
})();
