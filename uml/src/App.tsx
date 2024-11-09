// App.tsx
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
import ClassEditorDialog from "./Components/classEditor";
import ClassAbstractEditorDialog from "./Components/abstractClassEditor";
import InterfaceEditorDialog from "./Components/interfaceEditor";
import EnumerationEditorDialog from "./Components/enumerationEditor";

function App() {
  const [loading, setLoading] = useState(true);
  const [isClassEditorOpen, setIsClassEditorOpen] = useState(false);
  const [isClassAbstractEditorOpen, setIsClassAbstractEditorOpen] = useState(false);
  const [isInterfaceEditorOpen, setIsInterfaceEditorOpen] = useState(false);
  const [isEnumerationEditorOpen, setIsEnumerationEditorOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handleOpenClassEditor = () => {
    setIsClassEditorOpen(true);
  };

  const handleOpenClassAbstractEditor = () => {
    setIsClassAbstractEditorOpen(true);
  };

  const handleOpenInterfaceEditor = () => {
    setIsInterfaceEditorOpen(true);
  };

  const handleOpenEnumerationEditor = () => {
    setIsEnumerationEditorOpen(true);
  };

  const handleEditorSubmit = (data: any) => {
    console.log("Editor data submitted:", data);
    setIsClassEditorOpen(false);
    setIsClassAbstractEditorOpen(false);
    setIsInterfaceEditorOpen(false);
    setIsEnumerationEditorOpen(false);
  };

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
                <RightSideBar
                  onClassClick={handleOpenClassEditor}
                  onClassAbstractClick={handleOpenClassAbstractEditor}
                  onInterfaceClick={handleOpenInterfaceEditor}
                  onEnumerationClick={handleOpenEnumerationEditor}
                />
              </div>
            </SidebarProvider>
          </Row>
        </Container>
      )}

      {/* Class Editor Dialog */}
      <ClassEditorDialog
        isOpen={isClassEditorOpen}
        onClose={() => setIsClassEditorOpen(false)}
        onSubmit={handleEditorSubmit}
      />

      {/* Class Abstract Editor Dialog */}
      <ClassAbstractEditorDialog
        isOpen={isClassAbstractEditorOpen}
        onClose={() => setIsClassAbstractEditorOpen(false)}
        onSubmit={handleEditorSubmit}
      />

      {/* Interface Editor Dialog */}
      <InterfaceEditorDialog
        isOpen={isInterfaceEditorOpen}
        onClose={() => setIsInterfaceEditorOpen(false)}
        onSubmit={handleEditorSubmit}
      />

      {/* Enumeration Editor Dialog */}
      <EnumerationEditorDialog
        isOpen={isEnumerationEditorOpen}
        onClose={() => setIsEnumerationEditorOpen(false)}
        onSubmit={handleEditorSubmit}
      />
    </>
  );
}

export default App;
