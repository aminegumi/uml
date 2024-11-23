import React, { useEffect, useRef, useState } from "react";
import * as go from "gojs";
import ClassEditorDialog from "./classEditor";
import InterfaceEditorDialog from "./interfaceEditor";
import EnumEditorDialog from "./enumEditor";
import AbstracClassEditorDialog from "./AbstractClassEditor";

interface AbstractClassAttributes {
  label: "<<abstract>>";
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

interface EnumAttributes {
  label: "<<enumeration>>";
  name: string;
  attributes: Array<{
    id: number;
    name: string;
    type: string;
    visibility: string;
  }>;
}

interface InterfaceAttributes {
  label: "<<Interface>>";
  name: string;
  methods: Array<{
    id: number;
    name: string;
    properties: { name: string; type: string }[];
    returnType: string;
  }>;
  extends?: string;
}

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
  const [isClassDialogOpen, setIsClassDialogOpen] = useState(false);
  const [isInterfaceDialogOpen, setIsInterfaceDialogOpen] = useState(false);
  const [isEnumDialogOpen, setIsEnumDialogOpen] = useState(false);
  const [isAbstractClassDialogOpen, setIsAbstractClassDialogOpen] =
    useState(false);
  const [currentNodeData, setCurrentNodeData] = useState<any>(null);
  const [editingNode, setEditingNode] = useState<go.Node | null>(null);

  //added selectedRelationType
  const [selectedRelationType, setSelectedRelationType] = useState<string | null>(null);


  useEffect(() => {
    const $ = go.GraphObject.make;

    const diagram = new go.Diagram("myDiagramDiv", {
      "undoManager.isEnabled": true,
      layout: new go.GridLayout({
        cellSize: new go.Size(100, 100),
        spacing: new go.Size(20, 20),
        wrappingWidth: Infinity,
      }),

      // added Customizing the diagram's appearance

      "linkingTool.direction": go.LinkingTool.ForwardsOnly,
      "linkingTool.portGravity": 20,
      "relinkingTool.fromHandleArchetype": $(go.Shape, "Diamond", {
        segmentIndex: 0,
        cursor: "pointer",
        desiredSize: new go.Size(8, 8),
        fill: "tomato",
        stroke: "darkred",
      }),

      // end of added Customizing the diagram's appearance
    });
    
    



    // Node template for classes
    diagram.nodeTemplate = $(
      go.Node,
      "Auto",
      {
        locationSpot: go.Spot.Center,
        fromSpot: go.Spot.AllSides,
        toSpot: go.Spot.AllSides,
        click: function (e: go.InputEvent, obj: go.GraphObject) {
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
              category: nodeData.category, // Add category to help determine which dialog to open
            });
            // Open the appropriate dialog based on the node category
            if (nodeData.category === "interface") {
              setIsInterfaceDialogOpen(true);
            } else if (nodeData.category === "enum") {
              setIsEnumDialogOpen(true);
            } else if (nodeData.category === "abstract") {
              setIsAbstractClassDialogOpen(true);
            } else {
              setIsClassDialogOpen(true);
            }
          }
        },
      },
      $(
        go.Shape,
        "Rectangle",
        { fill: "white" },
        new go.Binding("fill", "isHighlighted", (h) =>
          h ? "lightblue" : "white"
        ).ofObject()
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
            itemTemplate: $(go.Panel, "Auto", $(go.TextBlock, { margin: new go.Margin(0, 0, 0, 0) }, new go.Binding("text", "", (data) => {let visibilitySymbol = "";

          // Utilisation du switch pour gérer chaque cas de visibilité
          switch (data.visibility) {
            case "public":
              visibilitySymbol = "-";  // Pour public, afficher "-"
              break;
            case "private":
              visibilitySymbol = "+";  // Pour private, afficher "+"
              break;
            case "protected":
              visibilitySymbol = "#";  // Pour protected, afficher "#"
              break;
            case "package":
              visibilitySymbol = "~";  // Pour package, afficher "~"
              break;
            default:
              visibilitySymbol = data.visibility;  // Afficher le texte tel quel si c'est autre chose
              break;
          }

          // Retourne le texte formaté avec la visibilité et l'attribut
          return `${visibilitySymbol} ${data.name}: ${data.type}`;}))),
          }
        ),
        $(go.Shape, "LineH", {
          row: 2,
          stroke: "black",
          strokeWidth: 1,
          stretch: go.GraphObject.Horizontal,
        }),
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
                  (data) => { 
                    let visibilitySymbol = "";

          // Utilisation du switch pour gérer chaque cas de visibilité
          switch (data.visibility) {
            case "public":
              visibilitySymbol = "-";  // Pour public, afficher "-"
              break;
            case "private":
              visibilitySymbol = "+";  // Pour private, afficher "+"
              break;
            case "protected":
              visibilitySymbol = "#";  // Pour protected, afficher "#"
              break;
            case "package":
              visibilitySymbol = "~";  // Pour package, afficher "~"
              break;
            default:
              visibilitySymbol = data.visibility;  // Afficher le texte tel quel si c'est autre chose
              break;
          }

          // Retourne le texte formaté avec la visibilité et l'attribut
          return `${visibilitySymbol} ${data.name}: ${data.type}`;
                  }
                )
              )
            ),
          }
        )
      )
    );
    
    // Abstract Class Template
    diagram.nodeTemplateMap.add(
      "abstract",
      $(
        go.Node,
        "Auto",
        {
          locationSpot: go.Spot.Center,
          fromSpot: go.Spot.AllSides,
          toSpot: go.Spot.AllSides,
          click: function (e: go.InputEvent, obj: go.GraphObject) {
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
                category: "abstract", 
              });
              setIsAbstractClassDialogOpen(true);
            }
          },
        },
        $(
          go.Shape,
          "Rectangle",
          { fill: "white" },
          new go.Binding("fill", "isHighlighted", (h) =>
            h ? "lightblue" : "white"
          ).ofObject()
        ),
        $(
          go.Panel,
          "Vertical",
          { defaultAlignment: go.Spot.Left, margin: 4 },
          $(go.RowColumnDefinition, { row: 0, background: "#F0F0F0" }),
          $(go.TextBlock, { row: 0, margin: 3, font: "bold 12px sans-serif" },
      new go.Binding("text", "", () => "<<Abstract>>")
    ),
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
                    (data) => {
                      let visibilitySymbol = "";

          // Utilisation du switch pour gérer chaque cas de visibilité
          switch (data.visibility) {
            case "public":
              visibilitySymbol = "-";  // Pour public, afficher "-"
              break;
            case "private":
              visibilitySymbol = "+";  // Pour private, afficher "+"
              break;
            case "protected":
              visibilitySymbol = "#";  // Pour protected, afficher "#"
              break;
            case "package":
              visibilitySymbol = "~";  // Pour package, afficher "~"
              break;
            default:
              visibilitySymbol = data.visibility;  // Afficher le texte tel quel si c'est autre chose
              break;
          }

          // Retourne le texte formaté avec la visibilité et l'attribut
          return `${visibilitySymbol} ${data.name}: ${data.type}`;
                    }
                  )
                )
              ),
            }
          ),
          $(go.Shape, "LineH", {
            row: 2,
            stroke: "black",
            strokeWidth: 1,
            stretch: go.GraphObject.Horizontal,
          }),
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
                    (data) => { 
                      let visibilitySymbol = "";

          // Utilisation du switch pour gérer chaque cas de visibilité
          switch (data.visibility) {
            case "public":
              visibilitySymbol = "-";  // Pour public, afficher "-"
              break;
            case "private":
              visibilitySymbol = "+";  // Pour private, afficher "+"
              break;
            case "protected":
              visibilitySymbol = "#";  // Pour protected, afficher "#"
              break;
            case "package":
              visibilitySymbol = "~";  // Pour package, afficher "~"
              break;
            default:
              visibilitySymbol = data.visibility;  // Afficher le texte tel quel si c'est autre chose
              break;
          }

          // Retourne le texte formaté avec la visibilité et l'attribut
          return `${visibilitySymbol} ${data.name}: ${data.type}`;
                    }
                  )
                )
              ),
            }
          )
        )
      )
    );

    // Interface template
    diagram.nodeTemplateMap.add(
      "interface",
      $(
        go.Node,
        "Auto",
        {
          locationSpot: go.Spot.Center,
          fromSpot: go.Spot.AllSides,
          toSpot: go.Spot.AllSides,
          click: function (e: go.InputEvent, obj: go.GraphObject) {
            const node = obj.part as go.Node;
            if (node) {
              setEditingNode(node);
              const nodeData = node.data;
              setCurrentNodeData({
                key: nodeData.key,
                loc: nodeData.loc,
                name: nodeData.name,
                methods: nodeData.methods || [],
                extends: nodeData.extends,
                category: "interface",
              });
              setIsInterfaceDialogOpen(true);
            }
          },
        },
        $(
          go.Shape,
          "RoundedRectangle",
          { fill: "white" },
          new go.Binding("fill", "isHighlighted", (h) =>
            h ? "lightblue" : "white"
          ).ofObject()
        ),
        $(
          go.Panel,
          "Vertical",
          { defaultAlignment: go.Spot.Left, margin: 4 },
          $(go.RowColumnDefinition, { row: 0, background: "#F0F0F0" }),
          $(go.TextBlock, { row: 0, margin: 3, font: "bold 12px sans-serif" },
      new go.Binding("text", "", () => "<<Interface>>") // Affichage du tag pour l'interface
    ),
    // Affichage du nom de l'interface
    $(go.TextBlock, { row: 1, margin: 3, font: "bold 12px sans-serif" },
      new go.Binding("text", "name")
    ),
          $(
            go.Panel,
            "Vertical",
            { row: 1, margin: 3 },
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
                    (data) => `${data.name}(): ${data.returnType}`
                  )
                )
              ),
            }
          )
        )
      )
    );

    // Enumeration template
    diagram.nodeTemplateMap.add(
      "enum",
      $(
        go.Node,
        "Auto",
        {
          locationSpot: go.Spot.Center,
          fromSpot: go.Spot.AllSides,
          toSpot: go.Spot.AllSides,
          click: function (e: go.InputEvent, obj: go.GraphObject) {
            const node = obj.part as go.Node;
            if (node) {
              setEditingNode(node);
              const nodeData = node.data;
              setCurrentNodeData({
                key: nodeData.key,
                loc: nodeData.loc,
                name: nodeData.name,
                attributes: nodeData.attributes || [],
                category: "enum",
              });
              setIsEnumDialogOpen(true);
            }
          },
        },
        $(
          go.Shape,
          "RoundedRectangle",
          { fill: "white" },
          new go.Binding("fill", "isHighlighted", (h) =>
            h ? "lightblue" : "white"
          ).ofObject()
        ),
        $(
          go.Panel,
          "Vertical",
          { defaultAlignment: go.Spot.Left, margin: 4 },
          $(go.RowColumnDefinition, { row: 0, background: "#F0F0F0" }),
          $(go.TextBlock, { row: 0, margin: 3, font: "bold 12px sans-serif" },
      new go.Binding("text", "", () => "<<Enumeration>>")
    ),
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
                  new go.Binding("text", "", (data) => `${data.name}`)
                )
              ),
            }
          )
        )
      )
    );
    const inheritanceLinkTemplate = $(
      go.Link,
      { routing: go.Link.AvoidsNodes },
      $(go.Shape),
      $(go.Shape, { toArrow: "Triangle", fill: "white" })
    );

    const implementationLinkTemplate = $(
      go.Link,
      { routing: go.Link.AvoidsNodes },
      $(go.Shape, { strokeDashArray: [4, 2] }),
      $(go.Shape, { toArrow: "Triangle", fill: "white" })
    );

    const associationLinkTemplate = $(
      go.Link,
      { routing: go.Link.AvoidsNodes },
      $(go.Shape),
      $(go.Shape, { toArrow: "OpenTriangle" })
    );

    const aggregationLinkTemplate = $(
      go.Link,
      { routing: go.Link.AvoidsNodes },
      $(go.Shape),
      $(
        go.Shape,
        { toArrow: "Diamond", fill: "white", scale: 1.2 }
      )
    );

    const compositionLinkTemplate = $(
      go.Link,
      { routing: go.Link.AvoidsNodes },
      $(go.Shape),
      $(
        go.Shape,
        { toArrow: "Diamond", fill: "black", scale: 1.2 }
      )
    );

    // Add link templates to the diagram
    diagram.linkTemplateMap.add("inheritance", inheritanceLinkTemplate);
    diagram.linkTemplateMap.add("implementation", implementationLinkTemplate);
    diagram.linkTemplateMap.add("association", associationLinkTemplate);
    diagram.linkTemplateMap.add("aggregation", aggregationLinkTemplate);
    diagram.linkTemplateMap.add("composition", compositionLinkTemplate);




    diagram.linkTemplate = $(
      go.Link,
      { routing: go.Link.AvoidsNodes },
      $(go.Shape),
      $(go.Shape, { toArrow: "Standard" })
    );

    diagram.model = new go.GraphLinksModel([], []);
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

      if (["class", "interface", "enum", "abstract"].includes(elementType)) {
        setCurrentNodeData({
          key: Date.now(),
          loc: `${canvasPoint.x} ${canvasPoint.y}`,
          name: "",
          attributes: [],
          methods: [],
          category: "class",
        });
        setEditingNode(null);
        setIsClassDialogOpen(true);
      } else if ([
        "inheritance",
        "implementation",
        "association",
        "aggregation",
        "composition"
      ].includes(elementType)) {
        // Set the selected relationship type
        setSelectedRelationType(elementType);
        
        // Enable link drawing mode
        diagram.startTransaction("Start Link Drawing");
        diagram.toolManager.linkingTool.startObject = null;
        diagram.toolManager.linkingTool.direction = go.LinkingTool.ForwardsOnly;
        diagram.currentTool = diagram.toolManager.linkingTool;
        
        // Set the appropriate link template
        diagram.toolManager.linkingTool.temporaryLink.routing = go.Link.AvoidsNodes;
        diagram.toolManager.linkingTool.temporaryLink.category = elementType;
      }
    }
  };

  const handleLinkCreated = (from: go.Node, to: go.Node) => {
    const diagram = diagramRef.current;
    if (diagram && selectedRelationType) {
      const linkData = {
        from: from.key,
        to: to.key,
        category: selectedRelationType,
      };
      
      (diagram.model as go.GraphLinksModel).addLinkData(linkData);
      setSelectedRelationType(null);
    }
  };

  const handleClassDialogSubmit = (data: ClassAttributes) => {
    const diagram = diagramRef.current;
    if (diagram && currentNodeData) {
      const nodeData = {
        ...currentNodeData,
        name: data.name,
        attributes: data.attributes,
        methods: data.methods,
        category: "class",
      };

      if (editingNode) {
        diagram.model.setDataProperty(editingNode.data, "name", data.name);
        diagram.model.setDataProperty(
          editingNode.data,
          "attributes",
          data.attributes
        );
        diagram.model.setDataProperty(
          editingNode.data,
          "methods",
          data.methods
        );
      } else {
        diagram.model.addNodeData(nodeData);
      }
    }
    setIsClassDialogOpen(false);
    setEditingNode(null);
    setCurrentNodeData(null);
  };

  const handleInterfaceDialogSubmit = (data: InterfaceAttributes) => {
    const diagram = diagramRef.current;
    if (diagram && currentNodeData) {
      const nodeData = {
        ...currentNodeData,
        name: data.name,
        methods: data.methods,
        extends: data.extends,
        category: "interface",
      };

      if (editingNode) {
        diagram.model.setDataProperty(
          editingNode.data,
          "name",
          data.name
        );
        diagram.model.setDataProperty(
          editingNode.data,
          "methods",
          data.methods
        );
        diagram.model.setDataProperty(
          editingNode.data,
          "extends",
          data.extends
        );
      } else {
        diagram.model.addNodeData(nodeData);
      }
    }
    setIsInterfaceDialogOpen(false);
    setEditingNode(null);
    setCurrentNodeData(null);
  };

  const handleEnumDialogSubmit = (data: EnumAttributes) => {
    const diagram = diagramRef.current;
    if (diagram && currentNodeData) {
      const nodeData = {
        ...currentNodeData,
        name: data.name,
        attributes: data.attributes,
        category: "enum",
      };

      if (editingNode) {
        diagram.model.setDataProperty(editingNode.data, "name", data.name);
        diagram.model.setDataProperty(
          editingNode.data,
          "attributes",
          data.attributes
        );
      } else {
        diagram.model.addNodeData(nodeData);
      }
    }
    setIsEnumDialogOpen(false);
    setEditingNode(null);
    setCurrentNodeData(null);
  };


  const handleAbstractClassDialogSubmit = (data: AbstractClassAttributes) => {
    const diagram = diagramRef.current;
    if (diagram && currentNodeData) {
      const nodeData = {
        ...currentNodeData,
        name: data.name,
        attributes: data.attributes,
        methods: data.methods,
        category: "abstract",
      };

      if (editingNode) {
        diagram.model.setDataProperty(editingNode.data, "name", data.name);
        diagram.model.setDataProperty(
          editingNode.data,
          "attributes",
          data.attributes
        );
        diagram.model.setDataProperty(
          editingNode.data,
          "methods",
          data.methods
        );
      } else {
        diagram.model.addNodeData(nodeData);
      }
    }
    setIsAbstractClassDialogOpen(false);
    setEditingNode(null);
    setCurrentNodeData(null);
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
        isOpen={isClassDialogOpen}
        onClose={() => {
          setIsClassDialogOpen(false);
          setEditingNode(null);
          setCurrentNodeData(null);
        }}
        onSubmit={handleClassDialogSubmit}
        initialData={currentNodeData}
      />
      <InterfaceEditorDialog
        isOpen={isInterfaceDialogOpen}
        onClose={() => {
          setIsInterfaceDialogOpen(false);
          setEditingNode(null);
          setCurrentNodeData(null);
        }}
        onSubmit={handleInterfaceDialogSubmit}
        initialData={currentNodeData}
      />
      <EnumEditorDialog
        isOpen={isEnumDialogOpen}
        onClose={() => {
          setIsEnumDialogOpen(false);
          setEditingNode(null);
          setCurrentNodeData(null);
        }}
        onSubmit={handleEnumDialogSubmit}
        initialData={currentNodeData}
      />
      <AbstracClassEditorDialog 
      isOpen={isAbstractClassDialogOpen}
      onClose={() => {
        setIsAbstractClassDialogOpen(false);
        setEditingNode(null);
        setCurrentNodeData(null);
      }}
      onSubmit={handleAbstractClassDialogSubmit}
      initialData={currentNodeData}
      />
    </div>
  );
};

export default Body;
