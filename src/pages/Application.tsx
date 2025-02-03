import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";
import { supabaseConfig } from "@/config/supabase";
import { Header } from "@/components/layout/Header";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Home, Settings, Users, FileText, DollarSign } from "lucide-react";
import { toast } from "sonner";

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

const menuItems = [
  { title: "Dashboard", icon: Home, path: "dashboard" },
  { title: "Customers", icon: Users, path: "customers" },
  { title: "Invoices", icon: FileText, path: "invoices" },
  { title: "Payments", icon: DollarSign, path: "payments" },
  { title: "Settings", icon: Settings, path: "settings" },
];

const Application = () => {
  const navigate = useNavigate();
  const { companyId } = useParams();
  const [company, setCompany] = useState<Company | null>(null);
  const [activeTab, setActiveTab] = useState("dashboard");

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          navigate('/login');
          return;
        }

        const { data, error } = await supabase
          .from('companies')
          .select('*')
          .eq('id', companyId)
          .single();

        if (error) throw error;
        if (!data) {
          navigate('/account');
          return;
        }

        setCompany(data);
        console.log("Application - Loaded company:", data);
      } catch (error) {
        console.error('Error fetching company:', error);
        toast.error('Error loading company data');
        navigate('/account');
      }
    };

    fetchCompany();
  }, [companyId, navigate]);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <Sidebar>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>{company?.name || 'Loading...'}</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {menuItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        onClick={() => setActiveTab(item.path)}
                        className={activeTab === item.path ? "bg-accent" : ""}
                      >
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        <div className="flex-1">
          <Header />
          <main className="container pt-20">
            <div className="p-6">
              <h1 className="text-2xl font-bold mb-6">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h1>
              {/* Content for each tab will be implemented later */}
              <p>Content for {activeTab} will be displayed here</p>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Application;