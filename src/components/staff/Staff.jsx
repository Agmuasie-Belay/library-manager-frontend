import { useEffect, useState } from "react";
import InfoCard from "../core/InfoCard";
import InfoCardHeader from "../core/InfoCardHeader";
import InfoCardBody from "../core/InfoCardBody";
import InfoCardAction from "../core/InfoCardAction";
import ActionButton from "../core/ActionButton";
import Button from "../core/Button";
import SearchBar from "../core/SearchBar";
import Header from "../core/Header";
import ConfirmModal from "../core/ConfirmModal";
import AddStaffModal from "./AddStaffModal";
import EditStaffModal from "./EditStaffModal";
import ViewStaffDetailsModal from "./ViewStaffDetailsModal";

import { Edit, Eye, Trash2Icon, TimerReset } from "lucide-react";
import { useStaffStore } from "@/store/useStaffStore";
import { useAuthStore } from "@/store/useAuthStore";

export default function Staff() {
  const { staff, loadStaff, addStaff, removeStaff, isLoading, error } =
    useStaffStore();

  const user = useAuthStore((state) => state.user);
  const role = useAuthStore((state) => state.role);

  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [editingStaff, setEditingStaff] = useState({});
  const [showEditModal, setShowEditModal] = useState(false);
  const [staffToDelete, setStaffToDelete] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const style1 = "bg-red-600 text-white";
  const style2 = "bg-gray-700 text-white";
  const style3 = "bg-black text-white";
  useEffect(() => {
    if (user) {
      loadStaff();
    }
  }, [role]);

  const handleClose = () => setShowForm(false);

  const handleEditClose = async () => {
    setShowEditModal(false);
    setEditingStaff(null);
    await loadStaff();
  };

  const handleSubmit = async (staffData) => {
    await addStaff(staffData);
    await loadStaff();
    setShowForm(false);
  };

  const handleDeleteConfirmed = async () => {
    if (staffToDelete) {
      await removeStaff(staffToDelete.id);
      setShowConfirmModal(false);
      setStaffToDelete(null);
    }
  };

  const staffFiltered = staff.filter((s) => {
    const term = searchTerm.toLowerCase().trim();
    return (
      s.username?.toLowerCase().includes(term) ||
      s.email?.toLowerCase().includes(term) ||
      s.role?.toLowerCase().includes(term)
    );
  });
console.log(staffFiltered)

  return (
    <div>
      <div className="flex flex-row justify-between">
        <Header
          title="Staff"
          description="Manage your library's registered staff"
        />
        <Button
          text="+ Add Staff"
          action="generic"
          onClick={() => setShowForm(true)}
          className="h-10"
        />
      </div>

      <SearchBar
        searchTerm={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search staff by name, email, or role..."
      />

      {!error ? (
        isLoading ? (
          <div className="mt-6 w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-48 bg-gray-100 rounded animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="mt-6 w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {staffFiltered.length > 0 ? (
              staffFiltered.map((s, i) => (
                <InfoCard key={i}>
                  <InfoCardHeader
                    title={s.username}
                    subtitle={s.email}
                    subtitlePrefix="Email: "
                    status={[
                      {
                        text: `${s.role}`,
                        className: `${s.role === "admin" ? style1 : style2}`,
                      },
                      {
                        text: "Active",
                        className: `${style3} "bg-black"`,
                      },
                    ]}
                  />
                  <InfoCardBody
                    metaRows={[
                      { label: "Phone", value: s?.phone },
                      { label: "Created", value: s?.join_date },
                      { label: "Role", value: s?.role },
                    ]}
                  />
                  <InfoCardAction
                    actions={[
                      <ActionButton
                        action="view"
                        onClick={() => setSelectedStaff(s)}
                        icon={<Eye size={18} />}
                      />,
                      <ActionButton
                        action="close"
                        icon={<TimerReset size={18} />}
                      />,
                      <ActionButton
                        action="edit"
                        icon={<Edit size={18} />}
                        onClick={() => {
                          setEditingStaff(s);
                          setShowEditModal(true);
                        }}
                      />,
                      <ActionButton
                        action="delete"
                        icon={<Trash2Icon size={18} />}
                        onClick={() => {
                          setStaffToDelete(s);
                          setShowConfirmModal(true);
                        }}
                      />,
                    ]}
                  />
                </InfoCard>
              ))
            ) : (
              <>
                {searchTerm && (
                  <div className="grid col-span-full justify-center align-middle text-gray-500 py-8 mx-auto p-3 rounded my-4">
                    No staff match your search.
                  </div>
                )}
              </>
            )}
          </div>
        )
      ) : (
        <div className="bg-red-100 text-red-800 p-3 rounded my-4">
          Failed to load staff data. Please refresh or try again later.
        </div>
      )}

      <AddStaffModal
        showForm={showForm}
        handleClose={handleClose}
        onSubmit={handleSubmit}
      />

      <ViewStaffDetailsModal
        show={!!selectedStaff}
        onClose={() => setSelectedStaff(null)}
        staff={selectedStaff}
        // activeBorrow={staffWithActiveBorrowCount}
      />

      <EditStaffModal
        staffId={editingStaff?.id}
        editingStaff={editingStaff}
        show={showEditModal}
        onClose={handleEditClose}
      />

      <ConfirmModal
        show={showConfirmModal}
        title="Delete Staff"
        message={`Are you sure you want to delete "${staffToDelete?.username}"? This action cannot be undone.`}
        onConfirm={handleDeleteConfirmed}
        onCancel={() => {
          setShowConfirmModal(false);
          setStaffToDelete(null);
        }}
      />
    </div>
  );
}
