// body.tsx
import React, { useEffect, useRef, useState } from "react";
import * as go from "gojs";
import ClassEditorDialog from "./classEditor";

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

const Body: React.FC = () => {
  const diagramRef = useRef<go.Diagram | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentNodeData, setCurrentNodeData] = useState<any>(null);

  useEffect(() => {
    // Initialize GoJS diagram
    const $ = go.GraphObject.make;

    const diagram = new go.Diagram("myDiagramDiv", {
      "undoManager.isEnabled": true,
      layout: new go.GridLayout({
        // alignment: go.GridLayout.Position, // Align nodes at the center of each grid cell (to see another time)
        cellSize: new go.Size(100, 100), // Set size of each grid cell
        spacing: new go.Size(20, 20), // Space between grid cells
        wrappingWidth: Infinity,
      }),
    });

    // Class node template
    diagram.nodeTemplate = $(
      go.Node,
      "Auto",
      {
        locationSpot: go.Spot.Center,
        fromSpot: go.Spot.AllSides,
        toSpot: go.Spot.AllSides,
      },
      $(
        go.Shape,
        "Rectangle",
        { fill: "white" },
        new go.Binding("fill", "isHighlighted", (h) => (h ? "lightblue" : "white")).ofObject()
      ),
      $(
        go.Panel,
        "Table",
        { defaultAlignment: go.Spot.Left, margin: 4 },
        $(go.RowColumnDefinition, { row: 0, background: "#F0F0F0" }),
        // Class name
        $(
          go.TextBlock,
          { row: 0, margin: 3, font: "bold 12px sans-serif" },
          new go.Binding("text", "name")
        ),
        // Attributes
        $(
          go.Panel,
          "Vertical",
          { row: 1, margin: 3 },
          new go.Binding("itemArray", "attributes"),
          {
            itemTemplate: $(
              go.Panel,
              "Auto",
              $(
                go.TextBlock,
                { margin: new go.Margin(0, 0, 0, 0) },
                new go.Binding(
                  "text",
                  "",
                  (data) => `${data.visibility} ${data.name}: ${data.type}`
                )
              )
            ),
          }
        ),
        // Separator line
        $(
          go.Shape,
          "LineH",
          { row: 2, stroke: "black", strokeWidth: 1, stretch: go.GraphObject.Horizontal }
        ),
        // Methods
        $(
          go.Panel,
          "Vertical",
          { row: 3, margin: 3 },
          new go.Binding("itemArray", "methods"),
          {
            itemTemplate: $(
              go.Panel,
              "Auto",
              $(
                go.TextBlock,
                { margin: new go.Margin(0, 0, 0, 0) },
                new go.Binding(
                  "text",
                  "",
                  (data) => `${data.visibility} ${data.name}(): ${data.returnType}`
                )
              )
            ),
          }
        )
      )
    );
    

    // Link template
    diagram.linkTemplate = $(
      go.Link,
      { routing: go.Link.AvoidsNodes },
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

    if (diagram && elementType === "class") {
      const canvasPoint = diagram.transformViewToDoc(
        new go.Point(event.clientX, event.clientY)
      );
      setCurrentNodeData({
        key: Date.now(),
        loc: `${canvasPoint.x} ${canvasPoint.y}`,
      });
      setIsDialogOpen(true);
    }
  };

  const handleDialogSubmit = (classData: ClassAttributes) => {
    const diagram = diagramRef.current;
    if (diagram && currentNodeData) {
      const nodeData = {
        ...currentNodeData,
        name: classData.name,
        attributes: classData.attributes,
        methods: classData.methods,
        category: "class",
      };
      diagram.model.addNodeData(nodeData);
      diagram.commitTransaction("added node");
    }
  };

  return (
    <div className="body">
      <div
        id="myDiagramDiv"
        className="diagram-component"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      />
      <ClassEditorDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSubmit={handleDialogSubmit}
      />
    </div>
  );
};

export default Body;

