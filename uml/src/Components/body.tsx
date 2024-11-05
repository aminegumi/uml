import React from "react";

const Body = () => {
  return (
    <div
      className="body"
      style={{
        flexGrow: 1,
        backgroundColor: "#ffffff",
        padding: "16px",
        overflow: "auto",
      }}
    >
      <h4>Canvas Area</h4>
      {/* Add your diagram area here */}
      <div
        style={{
          width: "100%",
          height: "calc(100% - 40px)", // Adjust height if needed
          border: "1px solid #ccc",
          borderRadius: "4px",
          backgroundColor: "#f9f9f9",
          position: "relative",
        }}
      >
        <p style={{ textAlign: "center", paddingTop: "20px", color: "#999" }}>
          Your diagrams will appear here
        </p>
      </div>
    </div>
  );
};

export default Body;
