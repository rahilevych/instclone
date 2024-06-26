import { User } from '../models/userModel.js';
import bcrypt from 'bcrypt';
import { encryptPass } from '../utils/passServices.js';
import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import { secret } from '../config/token.js';
// export const addUser = async (request, response) => {
//   try {
//     const newUser = {
//       username: request.body.username,
//       email: request.body.email,
//       password: request.body.password,
//       userImg: request.body.user_img,
//       bio: request.body.bio,
//       following: request.body.following,
//       followers: request.body.followers,
//       posts: request.body.posts,
//       savedPosts: request.body.saved_posts,
//     };
//     const user = await User.create(newUser);
//     return response.status(201).send(user);
//   } catch (error) {
//     console.log(error.message);
//     response.status(500).send({ message: error.message });
//   }
// };
export const registration = async (request, response) => {
  try {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response
        .status(400)
        .json({ message: 'Error during registration', errors });
    }
    const { username, password } = request.body;
    const candidate = await User.findOne({ username });
    if (candidate) {
      return response.status(400).json({ message: 'User exist' });
    }
    const hashedPass = await encryptPass(password);
    const newUser = new User({
      username: request.body.username,
      password: hashedPass,
      // email: request.body.email,

      // userImg: request.body.user_img,
      // bio: request.body.bio,
      // following: request.body.following,
      // followers: request.body.followers,
      // posts: request.body.posts,
      // savedPosts: request.body.saved_posts,
    });

    await newUser.save();
    return response.json({ message: 'user was signed up' });
  } catch (error) {
    console.log(error);
    response.status(400).json;
  }
};
const generateAccessToken = (id) => {
  const payload = {
    id,
  };
  return jwt.sign(payload, secret, { expiresIn: '24h' });
};

export const login = async (request, response) => {
  const { username, password } = request.body;
  const user = await User.findOne({ username });
  if (!user) {
    return response.status(400).json({ massage: `user ${username} not found` });
  }
  const validPassword = bcrypt.compareSync(password, user.password);
  if (!validPassword) {
    return response.status(400).json({ massage: `Incorrect password` });
  }
  const token = generateAccessToken(user._id);
  return response.json({ token });
};

export const getUserProfile = async (request, response) => {
  console.log('userprofile');
  console.log(request.user);
  if (request.user) {
    response.status(200).json({
      message: 'user profile information',
      user: {
        email: request.user.email,
        username: request.user.username,
      },
    });
  }
};

export const getAllUsers = async (request, response) => {
  try {
    const users = await User.find({});

    return response.status(200).json({ data: users });
  } catch (error) {
    console.log(error.message);
  }
};

// export const getUserById = async (request, response) => {
//   try {
//     const { id } = request.params;
//     console.log(`Fetching user with id: ${id}`);
//     const user = await User.findById(id).populate([
//       'posts',
//       'following',
//       'followers',
//     ]);
//     if (!user) {
//       console.log(`User with id: ${id} not found`);
//       return response.status(404).json({ message: 'User not found' });
//     }
//     console.log(`User with id: ${id} found`);
//     return response.status(200).json(user);
//   } catch (error) {
//     console.log(`Error fetching user with id: ${id} - ${error.message}`);
//     response.status(500).send({ message: error.message });
//   }
// };
// export const updateUserById = async (request, response) => {
//   try {
//     const { id } = request.params;
//     const result = await User.findByIdAndUpdate(id, request.body);
//     if (!result) {
//       response.status(404).json({ message: 'Book not find' });
//     }
//     return response.status(200).send({ message: 'Book updeteed successfully' });
//   } catch (error) {
//     console.log(error.message);
//   }
// };
// export const deleteUserById = async (request, response) => {
//   try {
//     const { id } = request.params;
//     const result = await User.findByIdAndDelete(id);
//     if (!result) {
//       response.status(404).json({ message: 'User not find' });
//     }
//     return response.status(200).send({ message: 'User deleted successfully' });
//   } catch (error) {
//     console.log(error.massege);
//     response.status(500).send({ message: error.message });
//   }
// };
