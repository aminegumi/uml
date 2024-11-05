import * as go from "gojs";
import React from "react";
import { ReactDiagram } from "gojs-react";

// Initialize the diagram
function initDiagram(): go.Diagram {
  const $ = go.GraphObject.make;
  const diagram = $(go.Diagram, {
    "undoManager.isEnabled": true,
    "clickCreatingTool.archetypeNodeData": {
      text: "new node",
      color: "lightblue",
    },
    model: new go.GraphLinksModel({
      nodeKeyProperty: "id",
      linkKeyProperty: "key",
    }),
  });

  // Define the node template
  diagram.nodeTemplate = $(
    go.Node,
    "Auto",
    $(
      go.Shape,
      "RoundedRectangle",
      {
        fill: "white",
        portId: "",
        fromLinkable: true,
        toLinkable: true,
        cursor: "pointer",
      },
      new go.Binding("fill", "color")
    ),
    $(go.TextBlock, { margin: 5 }, new go.Binding("text", "color"))
  );

  return diagram;
}

// Define interfaces for our data structures
interface DiagramNodeData {
  id: number;
  color: string;
}

interface DiagramLinkData {
  key: number;
  from: number;
  to: number;
}

interface DiagramModel {
  nodeDataArray: DiagramNodeData[];
  linkDataArray: DiagramLinkData[];
}

const DiagramComponent: React.FC = () => {
  // Create state for the diagram
  const [state, setState] = React.useState<DiagramModel>({
    nodeDataArray: [
      { id: 1, color: "lightblue" },
      { id: 2, color: "lightgreen" },
      { id: 3, color: "lightred" },
    ],
    linkDataArray: [{ key: -1, from: 1, to: 2 }],
  });

  // Create a reference to the Diagram component
  const diagramRef = React.useRef<go.Diagram>();

  // Callback for when the diagram is initialized
  const handleDiagramInit = (diagram: go.Diagram) => {
    diagramRef.current = diagram;
    return diagram;
  };

  // Handle model changes
  const handleModelChange = (changes: go.IncrementalData) => {
    if (!diagramRef.current) return;

    setState({
      nodeDataArray: diagramRef.current.model
        .nodeDataArray as DiagramNodeData[],
      linkDataArray: (diagramRef.current.model as go.GraphLinksModel)
        .linkDataArray as DiagramLinkData[],
    });
  };

  return (
    <div
      className="diagram-wrapper"
      style={{ width: "100%", height: "500px", border: "1px solid black" }}
    >
      <ReactDiagram
        ref={(ref: any) => (diagramRef.current = ref?.getDiagram())}
        initDiagram={initDiagram}
        divClassName="diagram-component"
        nodeDataArray={state.nodeDataArray}
        linkDataArray={state.linkDataArray}
        onModelChange={handleModelChange}
      />
    </div>
  );
};

export default DiagramComponent;
