
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function Teachers() {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Teachers</h1>
        <Button 
          className="bg-purple-default hover:bg-purple-dark text-white"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Teacher
        </Button>
      </div>
      <div className="rounded-md border p-8 text-center">
        <p className="text-muted-foreground">No teachers added yet</p>
      </div>
    </div>
  );
}
