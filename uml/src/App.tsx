import { useState, useEffect } from "react";
import "./App.css";
import Heading from "./Components/navBar";
import "bootstrap/dist/css/bootstrap.min.css";
import AnimatedExample from "./Components/progressBar";
import Body from "./Components/body";
import LeftSideBar from "./Components/leftSideBar";
import RightSideBar from "./Components/rightSideBar";
import { SidebarProvider } from "./Components/ui/sidebar";
import { Container, Row } from "react-bootstrap";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading ? (
        <AnimatedExample />
      ) : (
        <Container fluid className="p-0">
          <Heading />
          <Row className="layout-container g-0">
            <SidebarProvider>
              <div className="sidebar-wrapper">
                <LeftSideBar />
              </div>
              <main className="main-content">
                <Body />
              </main>
              <div className="sidebar-wrapper">
                <RightSideBar />
              </div>
            </SidebarProvider>
          </Row>
        </Container>
      )}
    </>

  );
}

export default App;