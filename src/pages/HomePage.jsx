import React, { useEffect, useState } from "react";
import { getAllMemories } from "../api/memoryApi";
import MemoryCard from "../comp/MemoryCard";

const HomePage = () => {
  const [memories, setMemories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMemories = async () => {
      try {
        const res = await getAllMemories();
        setMemories(res.data);
      } catch (err) {
        setError("Failed to load memories");
      } finally {
        setLoading(false);
      }
    };

    fetchMemories();
  }, []);

  return (
    <div className="max-w-3xl mx-auto mt-10 px-4">
      <h1 className="text-2xl font-bold mb-6 text-center">All Memories</h1>

      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {memories.map((memory) => (
          <MemoryCard key={memory._id} memory={memory} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
