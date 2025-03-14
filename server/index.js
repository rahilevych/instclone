import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import mongoDBURL from './config/dbConfig.js';
import postsRouter from './routes/postsRoutes.js';
import passport from 'passport';
import passportStrategy from '../server/utils/passportConfig.js';
import { cloudinaryConfig } from './config/cloudinary.js';
import usersRouter from './routes/usersRoutes.js';
import http from 'http';
import { initSocketServer } from './sockets/socketServer.js';

const app = express();
const server = http.createServer(app);

app.use(
  cors({
    origin: ['http://localhost:3000', 'https://instclone-client.onrender.com'],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

cloudinaryConfig();
app.use(passport.initialize());
passport.use(passportStrategy);

app.use('/users', usersRouter);
app.use('/posts', postsRouter);

mongoose
  .connect(mongoDBURL)
  .then(() => console.log('MongoDB is connected'))
  .catch((error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  });

initSocketServer(server);

const port = process.env.PORT || 5001;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
