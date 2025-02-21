
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { X, Plus } from "lucide-react";

interface LineItem {
  id: string;
  description: string;
  quantity: number;
  unit_price: number;
  total: number;
}

interface EstimateFormProps {
  onSubmit: (data: {
    name: string;
    description: string;
    line_items: LineItem[];
    status: string;
  }) => void;
  initialData?: {
    name: string;
    description: string;
    line_items: LineItem[];
    status: string;
  };
}

export function EstimateForm({ onSubmit, initialData }: EstimateFormProps) {
  const [name, setName] = useState(initialData?.name || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [lineItems, setLineItems] = useState<LineItem[]>(
    initialData?.line_items || []
  );

  const addLineItem = () => {
    setLineItems([
      ...lineItems,
      {
        id: crypto.randomUUID(),
        description: "",
        quantity: 1,
        unit_price: 0,
        total: 0,
      },
    ]);
  };

  const updateLineItem = (id: string, field: keyof LineItem, value: any) => {
    setLineItems(
      lineItems.map((item) => {
        if (item.id === id) {
          const updatedItem = { ...item, [field]: value };
          if (field === "quantity" || field === "unit_price") {
            updatedItem.total = updatedItem.quantity * updatedItem.unit_price;
          }
          return updatedItem;
        }
        return item;
      })
    );
  };

  const removeLineItem = (id: string) => {
    setLineItems(lineItems.filter((item) => item.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      name,
      description,
      line_items: lineItems,
      status: initialData?.status || "draft",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">Estimate Name</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
        />
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <Label>Line Items</Label>
          <Button type="button" variant="outline" size="sm" onClick={addLineItem}>
            <Plus className="h-4 w-4 mr-2" />
            Add Item
          </Button>
        </div>

        <div className="space-y-4">
          {lineItems.map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-12 gap-4 items-start border p-4 rounded-lg relative"
            >
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute top-2 right-2"
                onClick={() => removeLineItem(item.id)}
              >
                <X className="h-4 w-4" />
              </Button>

              <div className="col-span-6">
                <Label>Description</Label>
                <Input
                  value={item.description}
                  onChange={(e) =>
                    updateLineItem(item.id, "description", e.target.value)
                  }
                  required
                />
              </div>

              <div className="col-span-2">
                <Label>Quantity</Label>
                <Input
                  type="number"
                  min="1"
                  step="1"
                  value={item.quantity}
                  onChange={(e) =>
                    updateLineItem(item.id, "quantity", Number(e.target.value))
                  }
                  required
                />
              </div>

              <div className="col-span-2">
                <Label>Unit Price</Label>
                <Input
                  type="number"
                  min="0"
                  step="0.01"
                  value={item.unit_price}
                  onChange={(e) =>
                    updateLineItem(item.id, "unit_price", Number(e.target.value))
                  }
                  required
                />
              </div>

              <div className="col-span-2">
                <Label>Total</Label>
                <Input
                  type="number"
                  value={item.total}
                  readOnly
                  className="bg-muted"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <Button type="submit">
          {initialData ? "Update Estimate" : "Create Estimate"}
        </Button>
      </div>
    </form>
  );
}
