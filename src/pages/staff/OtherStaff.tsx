
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function OtherStaff() {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Other Staff</h1>
        <Button 
          className="bg-purple-default hover:bg-purple-dark text-white"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Staff Member
        </Button>
      </div>
      <div className="rounded-md border p-8 text-center">
        <p className="text-muted-foreground">No staff members added yet</p>
      </div>
    </div>
  );
}
