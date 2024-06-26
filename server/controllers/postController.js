import { Post } from '../models/postModel.js';

export const addPost = async (request, response) => {
  try {
    const newPost = {
      user_id: request.body.user_id,
      image_url: request.body.image_url,
      caption: request.body.caption,
      likes: request.body.likes,
    };
    const post = await Post.create(newPost);
    return response.status(201).send(post);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
};

export const getAllPosts = async (request, response) => {
  try {
    const posts = await Post.find({});

    return response.status(200).json({ data: posts });
  } catch (error) {
    console.log(error.message);
  }
};

export const getPostById = async (request, response) => {
  try {
    const { id } = request.params;
    console.log(`Fetching post with id: ${id}`);
    const post = await Post.findById(id);
    if (!post) {
      console.log(`Post with id: ${id} not found`);
      return response.status(404).json({ message: 'Post not found' });
    }
    console.log(`Post with id: ${id} found`);
    return response.status(200).json(post);
  } catch (error) {
    console.log(`Error fetching user with id: ${id} - ${error.message}`);
    response.status(500).send({ message: error.message });
  }
};

export const updatePostById = async (request, response) => {
  try {
    const { id } = request.params;
    const result = await Post.findByIdAndUpdate(id, request.body);
    if (!result) {
      response.status(404).json({ message: 'Post not find' });
    }
    return response.status(200).send({ message: 'Post updated successfully' });
  } catch (error) {
    console.log(error.message);
  }
};

export const deletePostById = async (request, response) => {
  try {
    const { id } = request.params;
    const result = await Post.findByIdAndDelete(id);
    if (!result) {
      response.status(404).json({ message: 'Post not find' });
    }
    return response.status(200).send({ message: 'Post deleted successfully' });
  } catch (error) {
    console.log(error.massege);
    response.status(500).send({ message: error.message });
  }
};
