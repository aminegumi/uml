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
      <Navbar bg="white" className="shadow-sm fixed top-0 left-0 right-0 z-100" fixed="top">
        <Container fluid className="px-4">
          <Navbar.Brand href="#" className="text-primary font-semibold">
            UML Designer
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-4">
              <NavDropdown
                title="Diagram"
                id="diagram-dropdown"
                className="mx-2"
              >
                <div className="p-3 border-b border-gray-200 min-w-[240px]">
                  <p className="text-sm text-gray-500 mb-2 font-medium">
                    Available Diagrams
                  </p>
                  <NavDropdown.Item
                    href="#class"
                    className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50"
                  >
                    <Boxes size={16} className="text-blue-500" />
                    <div>
                      <p className="text-sm font-medium">Class Diagram</p>
                      <p className="text-xs text-gray-500">
                        Design object-oriented structures
                      </p>
                    </div>
                  </NavDropdown.Item>

                  <NavDropdown.Item
                    href="#others"
                    className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 mt-2"
                  >
                    <Box size={16} className="text-purple-500" />
                    <div>
                      <p className="text-sm font-medium">Other Diagrams</p>
                      <p className="text-xs text-gray-500">
                        Sequence, Activity, Use Case
                      </p>
                    </div>
                  </NavDropdown.Item>
                </div>
              </NavDropdown>

              <NavDropdown title="View" id="view-dropdown" className="mx-2">
                <div className="p-3 border-b border-gray-200 min-w-[200px]">
                  <p className="text-sm text-gray-500 mb-2 font-medium">
                    Theme
                  </p>
                  <div className="flex gap-2 mb-2">
                    <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-50 hover:bg-gray-100 text-sm font-medium">
                      <Sun size={16} className="text-yellow-500" /> Light
                    </button>
                    <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-50 hover:bg-gray-100 text-sm font-medium">
                      <Moon size={16} className="text-blue-500" /> Dark
                    </button>
                  </div>
                </div>

                <NavDropdown.Item className="flex items-center gap-2 p-2 hover:bg-gray-50 mt-2">
                  <Globe size={16} className="text-green-500" />
                  <span className="text-sm font-medium">Language</span>
                </NavDropdown.Item>

                <NavDropdown.Divider />

                <NavDropdown.Item className="flex items-center gap-2 p-2 hover:bg-gray-50">
                  <HelpCircle size={16} className="text-blue-500" />
                  <span className="text-sm font-medium">Help</span>
                </NavDropdown.Item>
              </NavDropdown>

              <NavDropdown
                title="Code Generation"
                id="code-dropdown"
                className="mx-2"
              >
                <div className="p-3 border-b border-gray-200 min-w-[240px]">
                  <p className="text-sm text-gray-500 mb-2 font-medium">
                    Generate Code
                  </p>
                  <NavDropdown.Item
                    href="#python"
                    className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50"
                  >
                    <Terminal size={16} className="text-blue-500" />
                    <div>
                      <p className="text-sm font-medium">Python</p>
                      <p className="text-xs text-gray-500">
                        Generate Python classes
                      </p>
                    </div>
                  </NavDropdown.Item>

                  <NavDropdown.Item
                    href="#java"
                    className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 mt-2"
                  >
                    <CodeSquare size={16} className="text-red-500" />
                    <div>
                      <p className="text-sm font-medium">Java</p>
                      <p className="text-xs text-gray-500">
                        Generate Java classes
                      </p>
                    </div>
                  </NavDropdown.Item>

                  <NavDropdown.Item
                    href="#php"
                    className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 mt-2"
                  >
                    <FileJson size={16} className="text-purple-500" />
                    <div>
                      <p className="text-sm font-medium">PHP</p>
                      <p className="text-xs text-gray-500">
                        Generate PHP classes
                      </p>
                    </div>
                  </NavDropdown.Item>
                </div>

                <div className="p-3">
                  <NavDropdown.Item
                    href="#settings"
                    className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50"
                  >
                    <Code2 size={16} className="text-gray-500" />
                    <span className="text-sm font-medium">
                      Generation Settings
                    </span>
                  </NavDropdown.Item>
                </div>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className="h-16"></div>
    </>
  );
}

export default Heading;
