import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface HeaderProps {
  onFeaturesClick?: () => void;
  onPricingClick?: () => void;
}

export function Header({ onFeaturesClick, onPricingClick }: HeaderProps) {
  return (
    <header className="fixed top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <Link to="/" className="flex items-center space-x-2">
          <span className="font-bold">TaskFlow</span>
        </Link>
        <nav className="flex flex-1 items-center justify-end space-x-6">
          <Button variant="ghost" onClick={onFeaturesClick}>Features</Button>
          <Button variant="ghost" onClick={onPricingClick}>Pricing</Button>
          <Button variant="ghost" asChild>
            <Link to="/login">Login</Link>
          </Button>
          <Button asChild>
            <Link to="/signup">Sign Up</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}