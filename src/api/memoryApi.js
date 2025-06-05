import axios from "axios"; 

const API = axios.create({
  baseURL: "http://localhost:3000/api/memories", // Base URL for your backend memories API
});

// Create a new memory (POST /create)
export const createMemory = (formData) => {
  return API.post("/create", formData);
};

// Get all memories (GET /)
export const getAllMemories = () => {
  return API.get("/");
};

// Get memory by shortId (GET /:shortId)
export const getMemory = (shortId) => {
  return API.get(`/memory/${shortId}`);
};

// Update an existing memory by id (PUT /update/:id)
export const editMemory = (id, formData) => {
  return API.put(`/update/${id}`, formData);
};

// Verify password (optional, depending on backend implementation)
export const verifyPassword = (id, password) => {
  return API.post(`/verify/${id}`, { password });
};

// Delete a memory by id with password (DELETE /:id)
export const deleteMemory = (id, password) => {
  return API.delete(`/${id}`, {
    data: { password }, // DELETE requires payload in `data`
  });
};
