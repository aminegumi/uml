import React, { useState, useEffect } from "react";
import "./App.css";
import Heading from "./Components/navBar";
import "bootstrap/dist/css/bootstrap.min.css";
import AnimatedExample from "./Components/progressBar";
import Body from "./Components/body"; // Import the Body component
import LeftSideBar from "./Components/leftSideBar"; // Import the LeftSideBar component
import RightSideBar from "./Components/rightSideBar"; // Import the RightSideBar component

function App() {
  // State to track loading status
  const [loading, setLoading] = useState(true);

  // Simulate loading process
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); // Hide the progress bar after 2 seconds
    }, 2000);

    return () => clearTimeout(timer); // Cleanup the timer on unmount
  }, []);

  return (
    <>
      {loading ? (
        <AnimatedExample /> // Show progress bar while loading
      ) : (
        <>
          <Heading />
          <div style={{ display: "flex", height: "calc(100vh - 56px)" }}>
            {" "}
            {/* Adjust height based on Navbar */}
            <LeftSideBar />
            <Body />
            <RightSideBar />
          </div>
        </>
      )}
    </>
  );
}

export default App;
