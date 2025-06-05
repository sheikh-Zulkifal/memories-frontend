import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getMemory,
  editMemory,
 verifyPassword,
  deleteMemory,
} from "../api/memoryApi";

const ViewMemory = () => {
  const { shortId } = useParams();
  const navigate = useNavigate();

  const [memory, setMemory] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState("");
  const [newImages, setNewImages] = useState([]);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [editSuccess, setEditSuccess] = useState(false);

  useEffect(() => {
    fetchMemory();
  }, [shortId]);

  const fetchMemory = async () => {
    try {
      const res = await getMemory(shortId);
      setMemory(res.data);
      setTitle(res.data.title);
    } catch (err) {
      console.error(err);
      setError("Memory not found");
    }
  };

  const handleImageChange = (e) => {
    setNewImages([...e.target.files]);
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    if (!password) return setError("Password is required to edit.");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("password", password);
    newImages.forEach((file) => formData.append("images", file));

    try {
      const res = await editMemory(memory._id, formData);
      setEditMode(false);
      setNewImages([]);
      setEditSuccess(true);
      fetchMemory(); // refresh
    } catch (err) {
      setError(err.response?.data?.message || "Failed to edit");
    }
  };

  const handleDelete = async () => {
    const confirmPassword = prompt("Enter password to delete:");
    if (!confirmPassword) return;

    try {
      await deleteMemory(memory._id, confirmPassword);
      alert("Memory deleted.");
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete");
    }
  };

  if (!memory) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-900 text-white">
        <p>Loading memory...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-4xl mx-auto bg-gray-800 p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-2">{memory.title}</h2>
        <p className="mb-4 text-sm text-gray-400">
          Views: {memory.viewCount}
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          {memory.images.map((img, idx) => (
            <img
              key={idx}
              src={`http://localhost:5000/${img}`}
              alt="memory"
              className="w-full h-40 object-cover rounded"
            />
          ))}
        </div>

        {!editMode ? (
          <>
            <button
              className="bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded mr-2"
              onClick={() => setEditMode(true)}
            >
              Edit Memory
            </button>
            <button
              className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
              onClick={handleDelete}
            >
              Delete Memory
            </button>
          </>
        ) : (
          <form onSubmit={handleEdit} className="space-y-4 mt-4">
            <h3 className="text-lg font-semibold">Edit Memory</h3>

            <div>
              <label>Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2 mt-1 bg-gray-700 rounded"
              />
            </div>

            <div>
              <label>New Images (optional)</label>
              <input
                type="file"
                multiple
                onChange={handleImageChange}
                className="w-full mt-1"
              />
            </div>

            <div>
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 mt-1 bg-gray-700 rounded"
              />
            </div>

            <div className="flex gap-2">
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => setEditMode(false)}
                className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {editSuccess && (
          <p className="text-green-400 mt-3">Memory updated successfully.</p>
        )}
        {error && <p className="text-red-400 mt-3">{error}</p>}
      </div>
    </div>
  );
};

export default ViewMemory;
