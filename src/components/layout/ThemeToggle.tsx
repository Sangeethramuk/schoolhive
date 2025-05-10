import { Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";

export function ThemeToggle() {
  const { collapsed } = useSidebar();
  // In a real app, you would use a theme context here
  // For this demo, we'll keep it simple since dark mode is already set in CSS

  return (
    <Button variant="ghost" size="icon" className="h-9 w-9" aria-label="Toggle theme">
      <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
