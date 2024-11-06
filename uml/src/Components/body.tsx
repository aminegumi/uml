import React, { useEffect } from "react";
import * as go from "gojs"; // Import GoJS

const Body: React.FC = () => {
  useEffect(() => {
    // Initialize GoJS diagram after component mounts
    const init = () => {
      const myDiagram = new go.Diagram("myDiagramDiv", {
        "undoManager.isEnabled": true,
        layout: new go.TreeLayout({
          angle: 90,
          path: go.TreePath.Source,
          setsPortSpot: false,
          setsChildPortSpot: false,
          arrangement: go.TreeArrangement.Horizontal,
        }),
      });

      // Code to define the nodeTemplate, linkTemplate, etc.

      // Define example data
      const nodedata = [
        {
          key: 1,
          name: "BankAccount",
          properties: [
            { name: "owner", type: "String", visibility: "public" },
            {
              name: "balance",
              type: "Currency",
              visibility: "public",
              default: "0",
            },
          ],
          methods: [
            {
              name: "deposit",
              parameters: [{ name: "amount", type: "Currency" }],
              visibility: "public",
            },
            {
              name: "withdraw",
              parameters: [{ name: "amount", type: "Currency" }],
              visibility: "public",
            },
          ],
        },
        // Add other nodes here
      ];

      const linkdata = [
        { from: 12, to: 11 },
        { from: 13, to: 11 },
        { from: 14, to: 13, relationship: "Association" },
      ];

      myDiagram.model = new go.GraphLinksModel({
        copiesArrays: true,
        copiesArrayObjects: true,
        linkCategoryProperty: "relationship",
        nodeDataArray: nodedata,
        linkDataArray: linkdata,
      });
    };

    window.addEventListener("DOMContentLoaded", init);

    return () => {
      window.removeEventListener("DOMContentLoaded", init);
    };
  }, []); // Empty dependency array to run only once when the component mounts

  return (
    <div className="body">
      <div
        id="myDiagramDiv"
        className="diagram-component"
        style={{ width: "100%", height: "600px" }}
      ></div>
    </div>
  );
};

export default Body;
