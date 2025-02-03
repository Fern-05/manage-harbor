import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { supabaseConfig } from "@/config/supabase";
import { Header } from "@/components/layout/Header";

const supabase = createClient(supabaseConfig.url, supabaseConfig.anonKey);

const Account = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          navigate('/login');
          return;
        }
        setUser(user);
        setEmail(user.email || "");
      } catch (error) {
        console.error('Error fetching user:', error);
        toast.error('Error loading user data');
      } finally {
        setLoading(false);
      }
    };

    getUser();
  }, [navigate]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdating(true);
    
    try {
      const { error } = await supabase.auth.updateUser({ email });
      
      if (error) throw error;
      toast.success('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Error updating profile');
    } finally {
      setUpdating(false);
    }
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password || !newPassword) {
      toast.error('Please fill in all password fields');
      return;
    }
    
    setUpdating(true);
    try {
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      
      if (error) throw error;
      
      toast.success('Password updated successfully');
      setPassword("");
      setNewPassword("");
    } catch (error) {
      console.error('Error updating password:', error);
      toast.error('Error updating password');
    } finally {
      setUpdating(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      toast.success('Signed out successfully');
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
      toast.error('Error signing out');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container pt-20">
        <div className="max-w-2xl mx-auto space-y-8">
          <div className="bg-card rounded-lg shadow-lg p-6">
            <h1 className="text-2xl font-bold mb-6">Account Details</h1>
            
            <form onSubmit={handleUpdateProfile} className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Email</label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1"
                />
              </div>
              
              <Button type="submit" disabled={updating}>
                Update Profile
              </Button>
            </form>

            <div className="mt-8 pt-8 border-t">
              <h2 className="text-xl font-bold mb-4">Change Password</h2>
              <form onSubmit={handleUpdatePassword} className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Current Password</label>
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">New Password</label>
                  <Input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="mt-1"
                  />
                </div>
                <Button type="submit" disabled={updating}>
                  Update Password
                </Button>
              </form>
            </div>

            <div className="mt-8 pt-8 border-t">
              <Button
                variant="destructive"
                onClick={handleSignOut}
              >
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;