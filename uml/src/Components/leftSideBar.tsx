import React from "react";

const LeftSideBar = () => {
  return (
    <div
      className="left-sidebar"
      style={{
        width: "200px",
        backgroundColor: "#f8f9fa",
        padding: "16px",
        borderRight: "1px solid #ccc",
      }}
    >
      <h4>Hierarchy</h4>
      {/* Add your hierarchy content here */}
      <ul style={{ listStyleType: "none", padding: 0 }}>
        <li>Class 1</li>
        <li>Class 2</li>
        <li>Class 3</li>
      </ul>
    </div>
  );
};

export default LeftSideBar;
