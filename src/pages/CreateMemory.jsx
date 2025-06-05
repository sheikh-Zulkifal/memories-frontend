import React, { useState } from "react";
import { createMemory } from "../api/memoryApi";
import { useNavigate } from "react-router-dom";

const CreateMemory = () => {
  const [title, setTitle] = useState("");
  const [images, setImages] = useState([]);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    setImages([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || images.length === 0 || !password) {
      setError("All fields are required.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("password", password);
    images.forEach((img) => formData.append("images", img));

    try {
      setLoading(true);
      const res = await createMemory(formData);
      alert("Memory created successfully!");
      navigate(`/memory/${res.data.shortURL.split("/").pop()}`);
    } catch (err) {
      console.error("Error:", err);
      setError(err.response?.data?.message || "Failed to create memory.");
    } finally {
      setLoading(false);
    }
  };

    return (
    <div className="min-h-screen bg-gray-900 text-white flex justify-center items-center px-4">
      <div className="w-full max-w-lg bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Create a Memory</h2>
        {error && <p className="text-red-400 mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Title</label>
            <input
              type="text"
              className="w-full p-2 rounded bg-gray-700 border border-gray-600"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Your memory title..."
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Images</label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageChange}
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Password</label>
            <input
              type="password"
              className="w-full p-2 rounded bg-gray-700 border border-gray-600"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Set a password for editing/deleting"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded font-semibold"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Memory"}
          </button>
        </form>
      </div>
    </div>
  );


}




  

export default CreateMemory;