import React from "react";
import { Link } from "react-router-dom";

const MemoryCard = ({ memory }) => {
  const shortUrl = `${window.location.origin}/memory/${memory.shortCode}`;

  // Show only shortCode in UI to keep it clean
  const displayUrl = `${window.location.origin}/…${memory.shortCode}`;

  return (
    <div className="border rounded p-4 shadow mb-4 break-words">
      <h3 className="text-xl font-semibold mb-2">{memory.title}</h3>
      <p>
        URL:{" "}
        <Link
          to={`/memory/${memory.shortCode}`}
          className="text-blue-600 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
          title={shortUrl} // full url on hover
        >
          {displayUrl}
        </Link>
      </p>
    </div>
  );
};

export default MemoryCard;
