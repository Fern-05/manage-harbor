import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

export function Header() {
  const { toast } = useToast();

  return (
    <header className="fixed top-0 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link to="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold">TaskFlow</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link to="/features" className="transition-colors hover:text-foreground/80">Features</Link>
            <Link to="/pricing" className="transition-colors hover:text-foreground/80">Pricing</Link>
            <Link to="/about" className="transition-colors hover:text-foreground/80">About</Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            <Button variant="ghost" asChild>
              <Link to="/login">Login</Link>
            </Button>
            <Button asChild>
              <Link to="/signup">Get Started</Link>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}