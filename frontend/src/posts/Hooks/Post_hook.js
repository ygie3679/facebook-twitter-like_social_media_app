import axios from "axios";

const API_URL = "http://localhost:8000/posts"
const api = axios.create({withCredentials: true})

export const createPost = async (content, userId) => {
  const response = await api.post(`${API_URL}`, {content, userId})
  return response.data
}

export const getAllPosts = async () => {
  const response = await api.get(`${API_URL}`);
  console.log("All posts: " + response.data);
  console.log(response.data);
  return response.data
}

export const deletePost = async (postId) => {
  const response = await api.delete(`${API_URL}/${postId}`);
  return response.data
}

export const editPost = async (postId, content) => {
  const response = await api.put(`${API_URL}/${postId}`, {content});
  return response.data
}

export const getPostsbyUserId = async (userId) => {
  const response = await api.get(`${API_URL}/user/${userId}`);
  return response.data;
}