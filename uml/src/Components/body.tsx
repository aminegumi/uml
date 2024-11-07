import React, { useEffect, useRef } from "react";
import * as go from "gojs";

const Body: React.FC = () => {
  const diagramRef = useRef<go.Diagram | null>(null);

  useEffect(() => {
    // Initialize GoJS diagram
    const $ = go.GraphObject.make;
    
    const diagram = new go.Diagram("myDiagramDiv", {
      "undoManager.isEnabled": true,
      layout: new go.TreeLayout({
        angle: 90,
        path: go.TreePath.Source,
        setsPortSpot: false,
        setsChildPortSpot: false,
        arrangement: go.TreeArrangement.Horizontal,
      }),
    });

    // Class node template
    diagram.nodeTemplate = $(go.Node, "Auto",
      {
        locationSpot: go.Spot.Center,
        fromSpot: go.Spot.AllSides,
        toSpot: go.Spot.AllSides
      },
      $(go.Shape, "Rectangle",
        { fill: "white" },
        new go.Binding("fill", "isHighlighted", h => h ? "lightblue" : "white").ofObject()),
      $(go.Panel, "Table",
        { defaultAlignment: go.Spot.Left, margin: 4 },
        // Class name
        $(go.RowColumnDefinition, { row: 0, background: "#F0F0F0" }),
        $(go.TextBlock,
          { row: 0, margin: 3, font: "bold 12px sans-serif" },
          new go.Binding("text", "name")),
        // Properties
        $(go.Panel, "Vertical",
          { row: 1, margin: 3 },
          new go.Binding("itemArray", "properties"),
          {
            itemTemplate: $(go.Panel, "Auto",
              $(go.TextBlock,
                { margin: new go.Margin(0, 0, 0, 0) },
                new go.Binding("text", "name"))
            )
          }
        ),
        // Methods
        $(go.Panel, "Vertical",
          { row: 2, margin: 3 },
          new go.Binding("itemArray", "methods"),
          {
            itemTemplate: $(go.Panel, "Auto",
              $(go.TextBlock,
                { margin: new go.Margin(0, 0, 0, 0) },
                new go.Binding("text", "name"))
            )
          }
        )
      )
    );

    // Link template
    diagram.linkTemplate = $(go.Link,
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
    
    if (diagram) {
      const canvasPoint = diagram.transformViewToDoc(
        new go.Point(event.clientX, event.clientY)
      );

      let nodeData: go.ObjectData | null = null;
      
      switch (elementType) {
        case "class":
          nodeData = {
            key: Date.now(),
            name: "NewClass",
            properties: [{ name: "property1: Type" }],
            methods: [{ name: "method1(): ReturnType" }],
            category: "class",
            loc: `${canvasPoint.x} ${canvasPoint.y}`
          };
          break;
        case "interface":
          nodeData = {
            key: Date.now(),
            name: "NewInterface",
            properties: [],
            methods: [{ name: "method1(): ReturnType" }],
            category: "interface",
            loc: `${canvasPoint.x} ${canvasPoint.y}`
          };
          break;
        case "abstract":
          nodeData = {
            key: Date.now(),
            name: "AbstractClass",
            properties: [],
            methods: [{ name: "abstractMethod(): void" }],
            category: "abstract",
            loc: `${canvasPoint.x} ${canvasPoint.y}`
          };
          break;
        case "enum":
          nodeData = {
            ket: Date.now(),
            name: "Enumeration",
            properties: [{ name: "enum1: Type" }, {name: "enum2: Type" }],
            category: "enum",
            loc: `${canvasPoint.x} ${canvasPoint.y}`
          };
      }

      if (nodeData) {
        // Add the node data to the model
        diagram.model.addNodeData(nodeData);
        // Commit the transaction
        diagram.commitTransaction("added node");
      }
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
    </div>
  );
};

export default Body;