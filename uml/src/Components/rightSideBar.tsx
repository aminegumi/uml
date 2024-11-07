import {
  Box,
  Boxes,
  GitFork,
  Diamond,
  ArrowRight,
  ArrowLeftRight,
  Component,
  Circle,
  Square,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";

// Menu items.
const paletteItems = [
  {
    category: "Class Elements",
    items: [
      { type: "class", icon: Box, label: "Class" },
      { type: "interface", icon: Boxes, label: "Interface" },
      { type: "abstract", icon: Component, label: "Abstract Class" },
      { type: "enum", icon: Square, label: "Enumeration" },
    ],
  },
  {
    category: "Relationships",
    items: [
      { type: "inheritance", icon: GitFork, label: "Inheritance" },
      { type: "implementation", icon: ArrowRight, label: "Implementation" },
      { type: "association", icon: ArrowLeftRight, label: "Association" },
      { type: "aggregation", icon: Diamond, label: "Aggregation" },
      { type: "composition", icon: Circle, label: "Composition" },
    ],
  },
];

const RightSideBar = () => {
  const handleDragStart = (event: React.DragEvent, elementType: string) => {
    event.dataTransfer.setData("elementType", elementType);
  };

  // Menu items.
  const paletteItems = [
    {
      category: "Class Elements",
      items: [
        { type: "class", icon: Box, label: "Class" },
        { type: "interface", icon: Boxes, label: "Interface" },
        { type: "abstract", icon: Component, label: "Abstract Class" },
        { type: "enum", icon: Square, label: "Enumeration" },
      ],
    },
    {
      category: "Relationships",
      items: [
        { type: "inheritance", icon: GitFork, label: "Inheritance" },
        { type: "implementation", icon: ArrowRight, label: "Implementation" },
        { type: "association", icon: ArrowLeftRight, label: "Association" },
        { type: "aggregation", icon: Diamond, label: "Aggregation" },
        { type: "composition", icon: Circle, label: "Composition" },
      ],
    },
  ];

  return (
    <Sidebar side="right" variant="floating" className="my-14">
      <SidebarContent>
        {paletteItems.map((category) => (
          <SidebarGroup key={category.category}>
            <SidebarGroupLabel>{category.category}</SidebarGroupLabel>
            <SidebarGroupContent>
              <div className="grid grid-cols-1 gap-2">
                {category.items.map((item) => (
                  <div
                    key={item.type}
                    draggable
                    onDragStart={(e) => handleDragStart(e, item.type)}
                    className="flex items-center gap-2 rounded-lg cursor-move hover:bg-gray-100 transition-colors"
                  >
                    <div className="p-2 bg-white rounded shadow-sm">
                      <item.icon className="w-6 h-6" />
                    </div>
                    <span className="text-sm font-medium">{item.label}</span>
                  </div>
                ))}
              </div>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  );
};

export default RightSideBar;
