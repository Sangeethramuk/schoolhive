
import { useState } from "react";
import { 
  Edit, 
  Trash2, 
  UserCog, 
  Plus
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

// Mock data for staff categories
interface StaffCategory {
  id: number;
  name: string;
  description: string;
}

const initialCategories: StaffCategory[] = [
  {
    id: 1,
    name: "Teaching Staff",
    description: "Handles academic instruction",
  },
  {
    id: 2,
    name: "Administrative",
    description: "Handles school admin tasks",
  },
];

export default function StaffCategories() {
  const [categories, setCategories] = useState<StaffCategory[]>(initialCategories);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState<boolean>(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState<boolean>(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const [currentCategory, setCurrentCategory] = useState<StaffCategory | null>(null);
  const [newCategory, setNewCategory] = useState<{ name: string; description: string }>({
    name: "",
    description: "",
  });

  const handleAddCategory = () => {
    if (!newCategory.name.trim()) {
      toast.error("Category name is required");
      return;
    }
    
    const newId = Math.max(0, ...categories.map(c => c.id)) + 1;
    setCategories([...categories, { id: newId, ...newCategory }]);
    setNewCategory({ name: "", description: "" });
    setIsAddDialogOpen(false);
    toast.success("Category added successfully");
  };

  const handleEditCategory = () => {
    if (!currentCategory || !currentCategory.name.trim()) {
      toast.error("Category name is required");
      return;
    }
    
    setCategories(
      categories.map((c) => (c.id === currentCategory.id ? currentCategory : c))
    );
    setIsEditDialogOpen(false);
    toast.success("Category updated successfully");
  };

  const handleDeleteCategory = () => {
    if (!currentCategory) return;
    
    setCategories(categories.filter((c) => c.id !== currentCategory.id));
    setIsDeleteDialogOpen(false);
    toast.success("Category deleted successfully");
  };

  const openEditDialog = (category: StaffCategory) => {
    setCurrentCategory({ ...category });
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (category: StaffCategory) => {
    setCurrentCategory(category);
    setIsDeleteDialogOpen(true);
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Staff Categories</h1>
        <Button 
          onClick={() => setIsAddDialogOpen(true)}
          className="bg-purple-default hover:bg-purple-dark text-white"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Category
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[300px]">Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.map((category) => (
              <TableRow key={category.id}>
                <TableCell>{category.name}</TableCell>
                <TableCell>{category.description}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => openEditDialog(category)}
                      className="bg-purple-default hover:bg-purple-dark text-white border-purple-dark"
                    >
                      <Edit className="h-4 w-4" />
                      <span className="ml-2">Edit</span>
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => openDeleteDialog(category)}
                      className="bg-red-800 hover:bg-red-900 text-white border-red-900"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="ml-2">Delete</span>
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="bg-gray-800 hover:bg-gray-900 text-white border-gray-900"
                    >
                      <UserCog className="h-4 w-4" />
                      <span className="ml-2">Roles</span>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Add Category Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Category</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={newCategory.name}
                onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                placeholder="Enter category name"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                value={newCategory.description}
                onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                placeholder="Enter category description"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleAddCategory}
              className="bg-purple-default hover:bg-purple-dark"
            >
              Add Category
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Category Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Category</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-name">Name</Label>
              <Input
                id="edit-name"
                value={currentCategory?.name || ""}
                onChange={(e) =>
                  setCurrentCategory(
                    currentCategory
                      ? { ...currentCategory, name: e.target.value }
                      : null
                  )
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-description">Description</Label>
              <Input
                id="edit-description"
                value={currentCategory?.description || ""}
                onChange={(e) =>
                  setCurrentCategory(
                    currentCategory
                      ? { ...currentCategory, description: e.target.value }
                      : null
                  )
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleEditCategory}
              className="bg-purple-default hover:bg-purple-dark"
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p>
              Are you sure you want to delete the category "{currentCategory?.name}"? 
              This action cannot be undone.
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleDeleteCategory}
              className="bg-red-800 hover:bg-red-900"
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
