import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { supabaseConfig } from "@/config/supabase";
import { Header } from "@/components/layout/Header";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";

const supabase = createClient(supabaseConfig.url, supabaseConfig.anonKey);

interface Company {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  sales_tax: number;
  website: string;
}

const Account = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [updating, setUpdating] = useState(false);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newCompany, setNewCompany] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
    sales_tax: 0,
    website: ""
  });

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
        fetchCompanies(user.id);
      } catch (error) {
        console.error('Error fetching user:', error);
        toast.error('Error loading user data');
      } finally {
        setLoading(false);
      }
    };

    getUser();
  }, [navigate]);

  const fetchCompanies = async (userId: string) => {
    try {
      console.log("Fetching companies for user:", userId);
      
      // First, let's check if we can access the database at all
      const { data: tables, error: tablesError } = await supabase
        .from('companies')
        .select('*')
        .limit(1);
      
      console.log("Tables response:", { tables, tablesError });

      if (tablesError) {
        console.error("Error accessing companies table:", tablesError);
        toast.error('Error accessing database');
        return;
      }

      // Now try to fetch the actual companies
      const { data, error } = await supabase
        .from('companies')
        .select('*')
        .eq('user_id', userId);

      console.log("Companies query response:", { data, error });

      if (error) {
        console.error('Error fetching companies:', error);
        toast.error('Error loading companies');
        return;
      }

      setCompanies(data || []);
    } catch (error) {
      console.error('Unexpected error fetching companies:', error);
      toast.error('Error loading companies');
    }
  };

  const handleCreateCompany = async () => {
    try {
      const { data, error } = await supabase
        .from('companies')
        .insert([
          {
            ...newCompany,
            user_id: user.id
          }
        ])
        .select()
        .single();

      if (error) throw error;

      setCompanies([...companies, data]);
      setIsDialogOpen(false);
      setNewCompany({
        name: "",
        address: "",
        phone: "",
        email: "",
        sales_tax: 0,
        website: ""
      });
      toast.success('Company created successfully');
      navigate(`/application/${data.id}`);
    } catch (error) {
      console.error('Error creating company:', error);
      toast.error('Error creating company');
    }
  };

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
        <div className="max-w-4xl mx-auto space-y-8">
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
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Companies</h2>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Company
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Company</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label>Company Name</Label>
                        <Input
                          value={newCompany.name}
                          onChange={(e) => setNewCompany({ ...newCompany, name: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Address</Label>
                        <Input
                          value={newCompany.address}
                          onChange={(e) => setNewCompany({ ...newCompany, address: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Phone</Label>
                        <Input
                          value={newCompany.phone}
                          onChange={(e) => setNewCompany({ ...newCompany, phone: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Email</Label>
                        <Input
                          type="email"
                          value={newCompany.email}
                          onChange={(e) => setNewCompany({ ...newCompany, email: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Sales Tax %</Label>
                        <Input
                          type="number"
                          value={newCompany.sales_tax}
                          onChange={(e) => setNewCompany({ ...newCompany, sales_tax: parseFloat(e.target.value) })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Website</Label>
                        <Input
                          value={newCompany.website}
                          onChange={(e) => setNewCompany({ ...newCompany, website: e.target.value })}
                        />
                      </div>
                      <Button onClick={handleCreateCompany} className="w-full">
                        Create Company
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                {companies.map((company) => (
                  <Card key={company.id} className="cursor-pointer hover:bg-accent/50 transition-colors" onClick={() => navigate(`/application/${company.id}`)}>
                    <CardHeader>
                      <CardTitle>{company.name}</CardTitle>
                      <CardDescription>{company.email}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{company.address}</p>
                      <p className="text-sm text-muted-foreground">{company.phone}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
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
