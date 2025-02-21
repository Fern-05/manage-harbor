
import { createClient } from "@supabase/supabase-js";
import { useQuery } from "@tanstack/react-query";
import { supabaseConfig } from "@/config/supabase";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDistanceToNow } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";

const supabase = createClient(supabaseConfig.url, supabaseConfig.anonKey);

interface EstimatesListProps {
  companyId: string;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export function EstimatesList({ companyId, onEdit, onDelete }: EstimatesListProps) {
  const { data: estimates, isLoading } = useQuery({
    queryKey: ["estimates", companyId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("estimates")
        .select("*")
        .eq("company_id", companyId)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return <div>Loading estimates...</div>;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Total Amount</TableHead>
          <TableHead>Created</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {estimates?.map((estimate) => (
          <TableRow key={estimate.id}>
            <TableCell>{estimate.name}</TableCell>
            <TableCell>
              <Badge
                variant={
                  estimate.status === "draft"
                    ? "secondary"
                    : estimate.status === "sent"
                    ? "default"
                    : estimate.status === "accepted"
                    ? "success"
                    : "destructive"
                }
              >
                {estimate.status}
              </Badge>
            </TableCell>
            <TableCell>${estimate.total_amount.toFixed(2)}</TableCell>
            <TableCell>
              {formatDistanceToNow(new Date(estimate.created_at), {
                addSuffix: true,
              })}
            </TableCell>
            <TableCell>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onEdit(estimate.id)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDelete(estimate.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
