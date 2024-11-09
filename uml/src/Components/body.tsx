// body.tsx
import React, { useEffect, useRef, useState } from "react";
import * as go from "gojs";
import ClassEditorDialog from "./classEditor";
import InterfaceEditorDialog from "./interfaceEditor";

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
  const [editingNode, setEditingNode] = useState<go.Node | null>(null);

  useEffect(() => {
    const $ = go.GraphObject.make;

    const diagram = new go.Diagram("myDiagramDiv", {
      "undoManager.isEnabled": true,
      layout: new go.GridLayout({
        cellSize: new go.Size(100, 100),
        spacing: new go.Size(20, 20),
        wrappingWidth: Infinity,
      }),
    });

    // Add click handling to the node template
    diagram.nodeTemplate = $(
      go.Node,
      "Auto",
      {
        locationSpot: go.Spot.Center,
        fromSpot: go.Spot.AllSides,
        toSpot: go.Spot.AllSides,
        // Fixed click handler type
        click: function(e: go.InputEvent, obj: go.GraphObject) {
          const node = obj.part as go.Node;
          if (node) {
            setEditingNode(node);
            const nodeData = node.data;
            setCurrentNodeData({
              key: nodeData.key,
              loc: nodeData.loc,
              name: nodeData.name,
              attributes: nodeData.attributes || [],
              methods: nodeData.methods || [],
            });
            setIsDialogOpen(true);
          }
        }
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
        $(
          go.TextBlock,
          { row: 0, margin: 3, font: "bold 12px sans-serif" },
          new go.Binding("text", "name")
        ),
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
        $(
          go.Shape,
          "LineH",
          { row: 2, stroke: "black", strokeWidth: 1, stretch: go.GraphObject.Horizontal }
        ),
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
      // Reset currentNodeData with empty values for new class
      setCurrentNodeData({
        key: Date.now(),
        loc: `${canvasPoint.x} ${canvasPoint.y}`,
        name: "",
        attributes: [],
        methods: [],
      });
      setEditingNode(null); // Clear editing node as this is a new node
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

      if (editingNode) {
        // Update existing node
        diagram.model.setDataProperty(editingNode.data, "name", classData.name);
        diagram.model.setDataProperty(editingNode.data, "attributes", classData.attributes);
        diagram.model.setDataProperty(editingNode.data, "methods", classData.methods);
      } else {
        // Add new node
        diagram.model.addNodeData(nodeData);
      }
      
      diagram.commitTransaction("updated class");
    }
    setIsDialogOpen(false);
    setEditingNode(null);
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
        onClose={() => {
          setIsDialogOpen(false);
          setEditingNode(null);
        }}
        onSubmit={handleDialogSubmit}
        initialData={currentNodeData}
      />
    </div>
  );
};

export default Body;