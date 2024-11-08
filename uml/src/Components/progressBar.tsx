import ProgressBar from "react-bootstrap/ProgressBar";
// Remove this line
// import "./progressBar.css";

function AnimatedExample() {
  return (
    <div className="progress-overlay">
      <div className="progress-container">
        <h2 className="brand-text">UML Designer</h2>
        <p className="loading-text">Loading Application...</p>
        <ProgressBar animated now={75} variant="info" />
      </div>
    </div>
  );
}

export default AnimatedExample;


// import React from "react";
// import ProgressBar from "react-bootstrap/ProgressBar";

// function AnimatedExample() {
//   return (
//     <div
//       className="progress-overlay"
//       style={{
//         position: "fixed",
//         top: 0,
//         left: 0,
//         right: 0,
//         bottom: 0,
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         backgroundColor: "rgba(255, 255, 255, 0.8)",
//         zIndex: 1000,
//       }}
//     >
//       <div style={{ textAlign: "center" }}>
//         <h4>Loading...</h4>
//         <ProgressBar
//           animated
//           now={45}
//           style={{ width: "300px", margin: "10px 0" }}
//         />
//       </div>
//     </div>
//   );
// }

// export default AnimatedExample;
