import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000/api/memories", // Replace with your backend URL
});

// Create a new memory
export const createMemory = (formData) => {
  return API.post("/", formData);
};

// Get memory by shortId
export const getMemory = (shortId) => {
  return API.get(`/memory/${shortId}`);
};

// Update an existing memory
export const editMemory = (id, formData) => {
  return API.put(`/memory/${id}`, formData);
};

// Verify password (you may still use this if needed elsewhere)
export const verifyPassword = (shortId, password) => {
  return API.post(`/memory/${shortId}/verify`, { password });
};

// Delete a memory (requires memory ID and password)
export const deleteMemory = (id, password) => {
  return API.delete(`/memory/${id}`, {
    data: { password }, // DELETE needs payload in `data`
  });
};