
import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useQueryClient } from "@tanstack/react-query";
import { supabaseConfig } from "@/config/supabase";
import { Button } from "@/components/ui/button";
import { Plus, ArrowLeft } from "lucide-react";
import { EstimateForm } from "@/components/estimates/EstimateForm";
import { EstimatesList } from "@/components/estimates/EstimatesList";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

const supabase = createClient(supabaseConfig.url, supabaseConfig.anonKey);

interface EstimatesViewProps {
  companyId: string;
}

export function EstimatesView({ companyId }: EstimatesViewProps) {
  const queryClient = useQueryClient();
  const [showForm, setShowForm] = useState(false);
  const [editingEstimate, setEditingEstimate] = useState<any>(null);
  const [deleteEstimate, setDeleteEstimate] = useState<string | null>(null);

  const handleCreate = async (data: any) => {
    try {
      const { error } = await supabase.from("estimates").insert([
        {
          ...data,
          id: companyId, // Changed from company_id to id
          total_amount: data.line_items.reduce(
            (sum: number, item: any) => sum + item.total,
            0
          ),
        },
      ]);

      if (error) throw error;

      toast.success("Estimate created successfully");
      setShowForm(false);
      queryClient.invalidateQueries({ queryKey: ["estimates", companyId] });
    } catch (error) {
      console.error("Error creating estimate:", error);
      toast.error("Error creating estimate");
    }
  };

  const handleUpdate = async (data: any) => {
    try {
      const { error } = await supabase
        .from("estimates")
        .update({
          ...data,
          total_amount: data.line_items.reduce(
            (sum: number, item: any) => sum + item.total,
            0
          ),
        })
        .eq("id", editingEstimate.id);

      if (error) throw error;

      toast.success("Estimate updated successfully");
      setEditingEstimate(null);
      queryClient.invalidateQueries({ queryKey: ["estimates", companyId] });
    } catch (error) {
      console.error("Error updating estimate:", error);
      toast.error("Error updating estimate");
    }
  };

  const handleDelete = async () => {
    if (!deleteEstimate) return;

    try {
      const { error } = await supabase
        .from("estimates")
        .delete()
        .eq("id", deleteEstimate);

      if (error) throw error;

      toast.success("Estimate deleted successfully");
      setDeleteEstimate(null);
      queryClient.invalidateQueries({ queryKey: ["estimates", companyId] });
    } catch (error) {
      console.error("Error deleting estimate:", error);
      toast.error("Error deleting estimate");
    }
  };

  const handleEdit = async (id: string) => {
    try {
      const { data, error } = await supabase
        .from("estimates")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      setEditingEstimate(data);
    } catch (error) {
      console.error("Error fetching estimate:", error);
      toast.error("Error fetching estimate");
    }
  };

  if (showForm) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => setShowForm(false)}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Estimates
          </Button>
          <h2 className="text-2xl font-bold">New Estimate</h2>
        </div>
        <EstimateForm onSubmit={handleCreate} />
      </div>
    );
  }

  if (editingEstimate) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => setEditingEstimate(null)}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Estimates
          </Button>
          <h2 className="text-2xl font-bold">Edit Estimate</h2>
        </div>
        <EstimateForm
          initialData={editingEstimate}
          onSubmit={handleUpdate}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Estimates</h2>
        <Button onClick={() => setShowForm(true)}>
          <Plus className="h-4 w-4 mr-2" />
          New Estimate
        </Button>
      </div>

      <EstimatesList
        companyId={companyId}
        onEdit={handleEdit}
        onDelete={setDeleteEstimate}
      />

      <AlertDialog open={!!deleteEstimate} onOpenChange={() => setDeleteEstimate(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              estimate.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
