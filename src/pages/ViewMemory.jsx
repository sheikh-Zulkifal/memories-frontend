import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMemory, editMemory, deleteMemory } from "../api/memoryApi";
import PasswordModal from "../comp/PasswordModal";

const ViewMemory = () => {
  const { shortId } = useParams();
  const navigate = useNavigate();

  const [memory, setMemory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [actionType, setActionType] = useState(null); // "edit" or "delete"

  const [editTitle, setEditTitle] = useState("");
  const [editImages, setEditImages] = useState([]);

  useEffect(() => {
    const fetchMemory = async () => {
      try {
        setLoading(true);
        const response = await getMemory(shortId);
        setMemory(response.data);
        setEditTitle(response.data.title);
        setLoading(false);
      } catch (err) {
        setError("Failed to load memory");
        setLoading(false);
      }
    };

    fetchMemory();
  }, [shortId]);

  const handleOpenModal = (type) => {
    setActionType(type);
    setShowPasswordModal(true);
  };

  const handlePasswordSubmit = async (password) => {
    try {
      if (actionType === "delete") {
        await deleteMemory(memory._id, password);
        alert("Memory deleted successfully");
        navigate("/"); // redirect home after deletion
      } else if (actionType === "edit") {
        const formData = new FormData();
        formData.append("title", editTitle);
        if (editImages.length > 0) {
          editImages.forEach((file) => formData.append("images", file));
        }
        formData.append("password", password);

        const response = await editMemory(memory._id, formData);
        setMemory(response.data.memory);
        alert("Memory updated successfully");
      }
    } catch (err) {
      alert("Password incorrect or action failed");
    } finally {
      setShowPasswordModal(false);
      setActionType(null);
      setEditImages([]);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!memory) return <p>Memory not found</p>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{memory.title}</h1>
      <p className="mb-2">Views: {memory.viewCount}</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {memory.images && memory.images.length > 0 ? (
          memory.images.map((img, i) => (
            <img
              key={i}
              src={img.startsWith("http") ? img : `/${img}`}
              alt={`Memory image ${i + 1}`}
              className="w-full h-48 object-cover rounded"
            />
          ))
        ) : (
          <p>No images available</p>
        )}
      </div>

      {/* Edit Section */}
      <div className="mb-4">
        <label className="block mb-1 font-semibold">Edit Title</label>
        <input
          type="text"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          className="border p-2 rounded w-full mb-2"
        />

        <label className="block mb-1 font-semibold">Add Images</label>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => setEditImages(Array.from(e.target.files))}
          className="mb-2"
        />
      </div>

      <div className="flex space-x-4">
        <button
          onClick={() => handleOpenModal("edit")}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Edit Memory
        </button>

        <button
          onClick={() => handleOpenModal("delete")}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Delete Memory
        </button>
      </div>

      {/* Password Modal */}
      {showPasswordModal && (
        <PasswordModal
          onClose={() => setShowPasswordModal(false)}
          onSubmit={handlePasswordSubmit}
          action={actionType}
        />
      )}
    </div>
  );
};

export default ViewMemory;
