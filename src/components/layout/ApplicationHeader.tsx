
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";

export function ApplicationHeader() {
  return (
    <header className="fixed top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center w-full px-4">
        <SidebarTrigger>
          <Button variant="ghost" size="sm">
            <Menu className="h-4 w-4" />
          </Button>
        </SidebarTrigger>
      </div>
    </header>
  );
}
