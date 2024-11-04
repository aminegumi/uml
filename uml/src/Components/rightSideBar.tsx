import React from "react";

const RightSideBar = () => {
  return (
    <div
      className="right-sidebar"
      style={{
        width: "200px",
        backgroundColor: "#f8f9fa",
        padding: "16px",
        borderLeft: "1px solid #ccc",
      }}
    >
      <h4>Palette</h4>
      {/* Add your palette content here */}
      <div>
        <button
          style={{
            display: "block",
            margin: "5px 0",
            padding: "10px",
            width: "100%",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
          }}
        >
          Add Class
        </button>
        <button
          style={{
            display: "block",
            margin: "5px 0",
            padding: "10px",
            width: "100%",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
          }}
        >
          Add Relationship
        </button>
      </div>
    </div>
  );
};

export default RightSideBar;
