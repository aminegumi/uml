import { useState, useEffect } from "react";
import "./App.css";
import Heading from "./Components/navBar";
import "bootstrap/dist/css/bootstrap.min.css";
import AnimatedExample from "./Components/progressBar";
import Body from "./Components/body";
import LeftSideBar from "./Components/leftSideBar";
import RightSideBar from "./Components/rightSideBar";
import { SidebarProvider } from "./Components/ui/sidebar";
import { Col, Container, Row } from "react-bootstrap";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading ? (
        <AnimatedExample />
      ) : (
        <Container fluid>
          <Heading />
          <Row className="h-100" style={{ overflow: "hidden" }}>
            <SidebarProvider>
              <Col className="col-2">
                <LeftSideBar />
              </Col>
              <Col xs={6} className="d-flex flex-column">
                <main className="flex-grow-1">
                  <Body />
                </main>
              </Col>
              <Col className="col-2">
                <RightSideBar />
              </Col>
            </SidebarProvider>
          </Row>
        </Container>
      )}
    </>
  );
}

export default App;
