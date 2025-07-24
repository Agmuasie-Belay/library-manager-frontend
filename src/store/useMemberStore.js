import { create } from "zustand";
import toast from "react-hot-toast";
import {
  getMembers,
  createMember,
  updateMember,
  deleteMember,
} from "@/api/members";

export const useMemberStore = create((set) => ({
  members: [],
  isLoading: false,
  error: null,

  loadMembers: async () => {
    set({ isLoading: true });
    try {
      const data = await getMembers();
      set({ members: data , isLoading:false});
    } catch (err) {
      console.error("Failed to fetch members:", err);
      set({error:err.message, isLoading:false})
    }
  },

  addMember: async (memberData) => {
    try {
      await createMember(memberData);
      toast.success( "Member added successfully" );
    } catch (err) {
      console.error("Add member failed:", err);
      toast.error( "Failed to add member" );
    }
  },

  updateMemberById: async (id, updatedData) => {
    try {
      await updateMember(id, updatedData);
      toast.success( "Member updated successfully" );
    } catch (err) {
      console.error("Update failed:", err);
      toast.error("Failed to update member" );
    }
  },

  removeMember: async (id) => {
    try {
      await deleteMember(id);
      set((state) => ({
        members: state.members.filter((m) => m.id !== id),
       
      }));
      toast.success( "Member deleted successfully")
    } catch (err) {
      console.error("Delete failed:", err);
      toast.error("Failed to delete member")
    }
  },
}));
