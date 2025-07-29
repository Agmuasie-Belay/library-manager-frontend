import { create } from "zustand";
import {
  getStaff,
  createStaff,
  updateStaff,
  deleteStaff,
} from "@/api/staff";
import { toast } from "react-hot-toast";
export const useStaffStore = create((set) => ({
  staff: {users:[]},
  isLoading:false,
  error:null,

  loadStaff: async () => {
    set({isLoading:true})
    try {
      const data = await getStaff();
      set({ staff: data, isLoading:false });
    } catch (err) {
      set({isLoading:false, error:err.message})
      console.error("Failed to fetch staffs:", err);
    }
  },

  addStaff: async (staffData) => {
    try {
      await createStaff(staffData);
      toast.success( "Staff added successfully" );
    } catch (err) {
      console.error("Add staff failed:", err);
      toast.error( "Failed to add staff" );
    }
  },

  updateStaffById: async (id, updatedData) => {
    try {
      await updateStaff(id, updatedData);
      toast.success( "Staff updated successfully" );
    } catch (err) {
      console.error("Update failed:", err);
      toast.error( "Failed to update staff" );
    }
  },

  removeStaff: async (id) => {
    try {
      await deleteStaff(id);
      set((state) => ({
        staff: state.staff.filter((s) => s.id !== id),
        
      }));
      toast.success("Staff deleted successfully")
    } catch (err) {
      console.error("Delete failed:", err);
      toast.error( "Failed to delete staff" );
    }
  },
}));
