import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { createClient } from "@supabase/supabase-js";
import { supabaseConfig } from "@/config/supabase";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEffect, useState } from "react";
const supabase = createClient(supabaseConfig.url, supabaseConfig.anonKey);
interface User {
  email?: string;
  user_metadata?: {
    full_name?: string;
  };
}
export function ApplicationHeader() {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const getUser = async () => {
      const {
        data: {
          user
        }
      } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();
  }, []);
  const userInitials = user?.user_metadata?.full_name ? user.user_metadata.full_name.split(' ').map(n => n[0]).join('') : user?.email?.[0].toUpperCase() || '?';
  return <header className="fixed top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between w-full px-4">
        <div className="flex items-center">
          <SidebarTrigger>
            <Button variant="ghost" size="sm">
              <Menu className="h-4 w-4" />
            </Button>
          </SidebarTrigger>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium">
            {user?.user_metadata?.full_name || user?.email}
          </span>
          <Avatar className="h-8 w-8">
            <AvatarFallback>{userInitials}</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>;
}