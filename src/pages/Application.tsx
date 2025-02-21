
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";
import { supabaseConfig } from "@/config/supabase";
import { ApplicationHeader } from "@/components/layout/ApplicationHeader";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider } from "@/components/ui/sidebar";
import { 
  LayoutDashboard, Users, Calendar, Map, FileText, Settings,
  UserPlus, Phone, FileSpreadsheet, Briefcase, CheckSquare,
  Sliders, Package2, DollarSign, CreditCard
} from "lucide-react";
import { toast } from "sonner";
import { EstimatesView } from "./estimates/EstimatesView";

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

const dashboardItems = [
  { title: "Overview", icon: LayoutDashboard, path: "overview" },
  { title: "Customers", icon: Users, path: "customers" },
  { title: "Calendar", icon: Calendar, path: "calendar" },
  { title: "Map", icon: Map, path: "map" },
  { title: "Files", icon: FileText, path: "files" },
  { title: "Settings", icon: Settings, path: "settings" },
];

const mainItems = [
  { title: "Leads", icon: UserPlus, path: "leads" },
  { title: "Sales Calls", icon: Phone, path: "sales-calls" },
  { title: "Estimates", icon: FileSpreadsheet, path: "estimates" },
  { title: "Active Projects", icon: Briefcase, path: "active-projects" },
  { title: "Completed Projects", icon: CheckSquare, path: "completed-projects" },
];

const dataItems = [
  { title: "Presets", icon: Sliders, path: "presets" },
  { title: "Materials", icon: Package2, path: "materials" },
  { title: "Money In", icon: DollarSign, path: "money-in" },
  { title: "Money Out", icon: CreditCard, path: "money-out" },
];

const Application = () => {
  const navigate = useNavigate();
  const { companyId } = useParams();
  const [company, setCompany] = useState<Company | null>(null);
  const [activeTab, setActiveTab] = useState("overview");

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

  const renderContent = () => {
    switch (activeTab) {
      case "estimates":
        return <EstimatesView companyId={companyId!} />;
      default:
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1).replace("-", " ")}
            </h1>
            <p>Content for {activeTab} will be displayed here</p>
          </div>
        );
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <Sidebar>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>{company?.name || 'Loading...'}</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarGroup>
                  <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      {dashboardItems.map((item) => (
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

                <SidebarGroup>
                  <SidebarGroupLabel>Main</SidebarGroupLabel>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      {mainItems.map((item) => (
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

                <SidebarGroup>
                  <SidebarGroupLabel>Data</SidebarGroupLabel>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      {dataItems.map((item) => (
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
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        <div className="flex-1">
          <ApplicationHeader />
          <main className="container w-full max-w-full px-4 pt-20">
            {renderContent()}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Application;
