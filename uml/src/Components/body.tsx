import React, { useEffect, useRef, useState } from "react";
import * as go from "gojs";
import ClassEditorDialog from "./classEditor";
import ClassAbstractEditorDialog from "./abstractClassEditor";
import InterfaceEditorDialog from "./interfaceEditor";
import EnumerationEditorDialog from "./enumerationEditor";

// Define ClassAttributes type
interface ClassAttributes {
  name: string;
  attributes: Array<{
    id: number;
    name: string;
    type: string;
    visibility: string;
  }>;
  methods: Array<{
    id: number;
    name: string;
    properties: Array<{ name: string; type: string }>;
    returnType: string;
    visibility: string;
  }>;
}

// Define other attributes for abstract, interface, and enumeration as necessary

const Body: React.FC = () => {
  const diagramRef = useRef<go.Diagram | null>(null);
  const [isClassEditorOpen, setIsClassEditorOpen] = useState(false);
  const [isAbstractEditorOpen, setIsAbstractEditorOpen] = useState(false);
  const [isInterfaceEditorOpen, setIsInterfaceEditorOpen] = useState(false);
  const [isEnumEditorOpen, setIsEnumEditorOpen] = useState(false);
  const [currentNodeData, setCurrentNodeData] = useState<any>(null);

  useEffect(() => {
    // Initialize GoJS diagram
    const $ = go.GraphObject.make;

    const diagram = new go.Diagram("myDiagramDiv", {
      "undoManager.isEnabled": true,
      layout: new go.GridLayout({
        cellSize: new go.Size(100, 100),
        spacing: new go.Size(20, 20),
        wrappingWidth: Infinity,
      }),
    });

    // Class node template
    diagram.nodeTemplate = $(go.Node, "Auto", {
      locationSpot: go.Spot.Center,
      fromSpot: go.Spot.AllSides,
      toSpot: go.Spot.AllSides,
    },
      $(go.Shape, "Rectangle", { fill: "white" }),
      $(go.Panel, "Table", { defaultAlignment: go.Spot.Left, margin: 4 },
        $(go.RowColumnDefinition, { row: 0, background: "#F0F0F0" }),
        $(go.TextBlock, { row: 0, margin: 3, font: "bold 12px sans-serif" }, new go.Binding("text", "name")),
        $(go.Panel, "Vertical", { row: 1, margin: 3 },
          new go.Binding("itemArray", "attributes"),
          {
            itemTemplate: $(go.Panel, "Auto", $(go.TextBlock, { margin: new go.Margin(0, 0, 0, 0) }, new go.Binding("text", "", (data) => `${data.visibility} ${data.name}: ${data.type}`))),
          }
        ),
        $(go.Shape, "LineH", { row: 2, stroke: "black", strokeWidth: 1, stretch: go.GraphObject.Horizontal }),
        $(go.Panel, "Vertical", { row: 3, margin: 3 },
          new go.Binding("itemArray", "methods"),
          {
            itemTemplate: $(go.Panel, "Auto", $(go.TextBlock, { margin: new go.Margin(0, 0, 0, 0) }, new go.Binding("text", "", (data) => `${data.visibility} ${data.name}(): ${data.returnType}`))),
          }
        )
      )
    );

    // Link template
    diagram.linkTemplate = $(go.Link, { routing: go.Link.AvoidsNodes },
      $(go.Shape),
      $(go.Shape, { toArrow: "Standard" })
    );

    diagramRef.current = diagram;

    return () => {
      diagram.div = null;
    };
  }, []);

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const elementType = event.dataTransfer.getData("elementType");
    const diagram = diagramRef.current;

    if (diagram) {
      const canvasPoint = diagram.transformViewToDoc(new go.Point(event.clientX, event.clientY));
      setCurrentNodeData({
        key: Date.now(),
        loc: `${canvasPoint.x} ${canvasPoint.y}`,
      });

      // Open the corresponding editor based on the element type
      switch (elementType) {
        case "class":
          setIsClassEditorOpen(true);
          break;
        case "abstract":
          setIsAbstractEditorOpen(true);
          break;
        case "interface":
          setIsInterfaceEditorOpen(true);
          break;
        case "enum":
          setIsEnumEditorOpen(true);
          break;
        default:
          break;
      }
    }
  };

  const handleDialogSubmit = (data: any) => {
    const diagram = diagramRef.current;
    if (diagram && currentNodeData) {
      const nodeData = {
        ...currentNodeData,
        name: data.name,
        attributes: data.attributes,
        methods: data.methods,
        category: data.category,
      };
      diagram.model.addNodeData(nodeData);
      diagram.commitTransaction("added node");
    }

    // Close the corresponding editor dialog
    setIsClassEditorOpen(false);
    setIsAbstractEditorOpen(false);
    setIsInterfaceEditorOpen(false);
    setIsEnumEditorOpen(false);
  };

  return (
    <div className="body">
      <div
        id="myDiagramDiv"
        className="diagram-component"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      />
      
      {/* Class Editor Dialog */}
      <ClassEditorDialog
        isOpen={isClassEditorOpen}
        onClose={() => setIsClassEditorOpen(false)}
        onSubmit={handleDialogSubmit}
      />

      {/* Abstract Class Editor Dialog */}
      <ClassAbstractEditorDialog
        isOpen={isAbstractEditorOpen}
        onClose={() => setIsAbstractEditorOpen(false)}
        onSubmit={handleDialogSubmit}
      />

      {/* Interface Editor Dialog */}
      <InterfaceEditorDialog
        isOpen={isInterfaceEditorOpen}
        onClose={() => setIsInterfaceEditorOpen(false)}
        onSubmit={handleDialogSubmit}
      />

      {/* Enumeration Editor Dialog */}
      <EnumerationEditorDialog
        isOpen={isEnumEditorOpen}
        onClose={() => setIsEnumEditorOpen(false)}
        onSubmit={handleDialogSubmit}
      />
    </div>
  );
};

export default Body;
