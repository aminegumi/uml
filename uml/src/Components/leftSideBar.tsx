// import React from "react";
// import { Container, Row, Col } from "react-bootstrap";
// import { Boxes, Box, Code2, FileJson, CodeSquare, Terminal } from "lucide-react";

// const LeftSideBar = () => {
//   return (
//     <Col xs={2} className="bg-gray-100 border-right p-4 position-fixed top-10 bottom-0 start-0 overflow-auto">
//       <h4>Hierarchy</h4>
//       <ul className="list-unstyled">
//         <li>Class 1</li>
//         <li>Class 2</li>
//         <li>Class 3</li>
//       </ul>
//     </Col>
//   );
// };

import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/Components/ui/sidebar";

// Menu items.
const items = [
  {
    title: "Home",
    url: "#",
    icon: Home,
  },
  {
    title: "Inbox",
    url: "#",
    icon: Inbox,
  },
  {
    title: "Calendar",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Search",
    url: "#",
    icon: Search,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
];

const LeftSideBar = () => {
  return (
    <Sidebar side="left" variant="floating" className="my-14">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default LeftSideBar;
