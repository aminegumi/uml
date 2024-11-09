import { useState, useEffect } from "react";
import "./App.css";
import Heading from "./components/navBar";
import "bootstrap/dist/css/bootstrap.min.css";
import AnimatedExample from "./components/progressBar";
import Body from "./components/body";
import LeftSideBar from "./components/leftSideBar";
import RightSideBar from "./components/rightSideBar";
import { SidebarProvider } from "./components/ui/sidebar";
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
