import ProgressBar from "react-bootstrap/ProgressBar";

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
