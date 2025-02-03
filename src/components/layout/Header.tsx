import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { supabaseConfig } from "@/config/supabase";

const supabase = createClient(supabaseConfig.url, supabaseConfig.anonKey);

interface HeaderProps {
  onFeaturesClick?: () => void;
  onPricingClick?: () => void;
}

export function Header({ onFeaturesClick, onPricingClick }: HeaderProps) {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      console.log("Header - Current user:", user);
    };

    getUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      console.log("Header - Auth state changed, user:", session?.user);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <header className="fixed top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <Link to="/" className="flex items-center space-x-2">
          <span className="font-bold">TaskFlow</span>
        </Link>
        <nav className="flex flex-1 items-center justify-end space-x-6">
          <Button variant="ghost" onClick={onFeaturesClick}>Features</Button>
          <Button variant="ghost" onClick={onPricingClick}>Pricing</Button>
          {user ? (
            <Button variant="ghost" asChild>
              <Link to="/account">Account</Link>
            </Button>
          ) : (
            <>
              <Button variant="ghost" asChild>
                <Link to="/login">Login</Link>
              </Button>
              <Button asChild>
                <Link to="/signup">Sign Up</Link>
              </Button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}