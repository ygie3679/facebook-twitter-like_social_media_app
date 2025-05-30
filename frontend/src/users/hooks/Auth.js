
import axios from "axios";

const API_URL = "http://localhost:8000/users"
const api = axios.create({withCredentials: true})

export const signup = async (email, username, password) => {
  const response = await api.post(`${API_URL}/signup`, {email, username, password})
  return response.data
}

export const signin = async (email, password) => {
  const response = await api.post(`${API_URL}/login`,
      {email, password})
  return response;
}

export const account = async (userId) => {
  // const response = await api.get(`${API_URL}/${userId}`)
  const response = await api.get(`${API_URL}/account`)

  return response.data;
}

export const logout = async () => {
  const response = await api.get(`${API_URL}/logout`)
  return response.data
}

export const getUserById = async (userId) => {
  const response = await api.get(`${API_URL}/${userId}`)
  return response.data
}

export const putUserDescription = async (description, userId) => {
  const response = await api.put(`${API_URL}/${userId}`, {description})
  return response.data
}