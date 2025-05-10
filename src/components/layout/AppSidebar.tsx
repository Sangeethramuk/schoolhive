import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Home, Users, BookOpen, UserCog } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/layout/ThemeToggle";

export function AppSidebar() {
  const { collapsed } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;

  // Define navigation items
  const navItems = [
    { title: "Home", path: "/", icon: Home },
    { 
      title: "Staff Management", 
      path: "/staff", 
      icon: UserCog,
      subItems: [
        { title: "Teachers", path: "/staff/teachers" },
        { title: "Other Staffs", path: "/staff/other" },
      ]
    },
    { title: "Students", path: "/students", icon: Users },
  ];

  // Helper to determine if a path is active
  const isActive = (path: string) => {
    if (path === "/" && currentPath === "/") return true;
    if (path !== "/" && currentPath.startsWith(path)) return true;
    return false;
  };

  // Keep staff management expanded if we're on a staff page
  const isStaffExpanded = navItems
    .find(item => item.path === "/staff")
    ?.subItems?.some(subItem => currentPath.startsWith(subItem.path)) || isActive("/staff");

  return (
    <Sidebar
      className={cn(
        "border-r border-border bg-sidebar",
        collapsed ? "w-16" : "w-64"
      )}
      collapsible
    >
      {/* App Logo */}
      <div className={cn(
        "flex h-16 items-center border-b border-border px-4",
        collapsed ? "justify-center" : "justify-between"
      )}>
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded bg-purple-default">
            <BookOpen className="h-5 w-5 text-white" />
          </div>
          {!collapsed && (
            <div className="flex flex-col">
              <span className="font-bold text-foreground">Documentation</span>
              <span className="text-xs text-muted-foreground">v1.0.0</span>
            </div>
          )}
        </div>
        {!collapsed && <SidebarTrigger />}
      </div>

      <SidebarContent className="p-2">
        {/* Main Navigation */}
        <SidebarMenu>
          {navItems.map((item) => 
            item.subItems ? (
              <SidebarGroup 
                key={item.path}
                defaultOpen={isStaffExpanded}
              >
                <div className={cn(
                  "flex items-center p-2",
                  isActive(item.path) && !collapsed ? "text-purple-default font-medium" : ""
                )}>
                  <item.icon className="h-5 w-5 mr-2" />
                  {!collapsed && <span>{item.title}</span>}
                </div>
                
                <SidebarGroupContent>
                  {!collapsed && item.subItems.map((subItem) => (
                    <SidebarMenuItem key={subItem.path}>
                      <SidebarMenuButton asChild>
                        <NavLink
                          to={subItem.path}
                          className={({ isActive }) =>
                            cn("flex items-center py-1.5 px-2 pl-9 rounded-md text-sm", {
                              "bg-accent text-accent-foreground": isActive,
                              "hover:bg-accent/50": !isActive,
                            })
                          }
                        >
                          {subItem.title}
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarGroupContent>
              </SidebarGroup>
            ) : (
              <SidebarMenuItem key={item.path}>
                <SidebarMenuButton asChild>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      cn("flex items-center p-2 rounded-md", {
                        "bg-accent text-purple-default font-medium": isActive,
                        "hover:bg-accent/50": !isActive,
                      })
                    }
                  >
                    <item.icon className="h-5 w-5 mr-2" />
                    {!collapsed && <span>{item.title}</span>}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          )}
        </SidebarMenu>

        {/* Theme Toggle & Collapse Button */}
        <div className="mt-auto flex items-center justify-between pt-4">
          <ThemeToggle />
          {collapsed && <SidebarTrigger />}
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
