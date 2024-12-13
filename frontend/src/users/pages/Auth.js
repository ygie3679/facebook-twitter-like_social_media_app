import "./Auth.css";

import axios from "axios";

const API_URL = "http://localhost:8000/users"
const api = axios.create({withCredentials: true})

export const signup = async (email, password) => {
  const response = await api.post(`${API_URL}/signup`, {email, password})
  return response.data
}

export const signin = async (email, password) => {
  const response = await api.post(`${API_URL}/signin`,
      {email, password})
  return response.data
}

export const account = async (email, password) => {
  const response = await api.post(`${API_URL}/account`,
      {email, password})
  return response.data
}

export const logout = async () => {
  const response = await api.post(`${API_URL}/logout`)
  return response.data
}