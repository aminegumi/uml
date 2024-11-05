import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import {
  Moon,
  Sun,
  Globe,
  HelpCircle,
  Boxes,
  Box,
  Code2,
  FileJson,
  CodeSquare,
  Terminal,
} from "lucide-react";

function Heading() {
  return (
    <>
      <Navbar bg="white" className="shadow-sm fixed-top">
        <Container fluid className="px-4">
          <Navbar.Brand href="#" className="text-primary font-semibold mx-auto">
            UML Designer
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="justify-content-center"
          >
            <div className="d-flex justify-content-center w-100">
              <Nav className="d-flex gap-4">
                <NavDropdown title="Diagram" id="diagram-dropdown">
                  <div className="p-3 border-b border-gray-200 min-w-[240px]">
                    <p className="text-sm text-gray-500 mb-2 font-medium text-center">
                      Available Diagrams
                    </p>
                    <NavDropdown.Item
                      href="#class"
                      className="flex flex-col items-center p-2 rounded-lg hover:bg-gray-50"
                    >
                      <div className="flex items-center gap-2 justify-center">
                        <Boxes size={16} className="text-blue-500" />
                        <p className="text-sm font-medium mb-0">
                          Class Diagram
                        </p>
                      </div>
                      <p className="text-xs text-gray-500 mt-1 text-center">
                        Design object-oriented structures
                      </p>
                    </NavDropdown.Item>

                    <NavDropdown.Item
                      href="#others"
                      className="flex flex-col items-center p-2 rounded-lg hover:bg-gray-50 mt-2"
                    >
                      <div className="flex items-center gap-2 justify-center">
                        <Box size={16} className="text-purple-500" />
                        <p className="text-sm font-medium mb-0">
                          Other Diagrams
                        </p>
                      </div>
                      <p className="text-xs text-gray-500 mt-1 text-center">
                        Sequence, Activity, Use Case
                      </p>
                    </NavDropdown.Item>
                  </div>
                </NavDropdown>

                <NavDropdown title="View" id="view-dropdown">
                  <div className="p-3 border-b border-gray-200 min-w-[200px]">
                    <p className="text-sm text-gray-500 mb-2 font-medium text-center">
                      Theme
                    </p>
                    <div className="d-flex justify-center gap-2 mb-2">
                      <button className="d-flex align-items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-50 hover:bg-gray-100 text-sm font-medium">
                        <Sun size={16} className="text-yellow-500" /> Light
                      </button>
                      <button className="d-flex align-items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-50 hover:bg-gray-100 text-sm font-medium">
                        <Moon size={16} className="text-blue-500" /> Dark
                      </button>
                    </div>
                  </div>

                  <NavDropdown.Item className="d-flex justify-center align-items-center gap-2 p-2 hover:bg-gray-50 mt-2">
                    <Globe size={16} className="text-green-500" />
                    <span className="text-sm font-medium">Language</span>
                  </NavDropdown.Item>

                  <NavDropdown.Divider />

                  <NavDropdown.Item className="d-flex justify-center align-items-center gap-2 p-2 hover:bg-gray-50">
                    <HelpCircle size={16} className="text-blue-500" />
                    <span className="text-sm font-medium">Help</span>
                  </NavDropdown.Item>
                </NavDropdown>

                <NavDropdown title="Code Generation" id="code-dropdown">
                  <div className="p-3 border-b border-gray-200 min-w-[240px]">
                    <p className="text-sm text-gray-500 mb-2 font-medium text-center">
                      Generate Code
                    </p>

                    <NavDropdown.Item
                      href="#python"
                      className="flex flex-col items-center gap-2 p-2 rounded-lg hover:bg-gray-50"
                    >
                      <div className="flex items-center justify-center gap-2">
                        <Terminal size={16} className="text-blue-500" />
                        <p className="text-sm font-medium mb-0">Python</p>
                      </div>
                      <p className="text-xs text-gray-500 mt-1 text-center">
                        Generate Python classes
                      </p>
                    </NavDropdown.Item>

                    <NavDropdown.Item
                      href="#java"
                      className="flex flex-col items-center gap-2 p-2 rounded-lg hover:bg-gray-50 mt-2"
                    >
                      <div className="flex items-center justify-center gap-2">
                        <CodeSquare size={16} className="text-red-500" />
                        <p className="text-sm font-medium mb-0">Java</p>
                      </div>
                      <p className="text-xs text-gray-500 mt-1 text-center">
                        Generate Java classes
                      </p>
                    </NavDropdown.Item>

                    <NavDropdown.Item
                      href="#php"
                      className="flex flex-col items-center gap-2 p-2 rounded-lg hover:bg-gray-50 mt-2"
                    >
                      <div className="flex items-center justify-center gap-2">
                        <FileJson size={16} className="text-purple-500" />
                        <p className="text-sm font-medium mb-0">PHP</p>
                      </div>
                      <p className="text-xs text-gray-500 mt-1 text-center">
                        Generate PHP classes
                      </p>
                    </NavDropdown.Item>
                  </div>

                  <div className="p-3">
                    <NavDropdown.Item
                      href="#settings"
                      className="flex flex-col items-center gap-2 p-2 rounded-lg hover:bg-gray-50"
                    >
                      <div className="flex items-center justify-center gap-2">
                        <Code2 size={16} className="text-gray-500" />
                        <span className="text-sm font-medium mb-0 text-center">
                          Generation Settings
                        </span>
                      </div>
                    </NavDropdown.Item>
                  </div>
                </NavDropdown>
              </Nav>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className="h-16"></div>
    </>
  );
}

export default Heading;
