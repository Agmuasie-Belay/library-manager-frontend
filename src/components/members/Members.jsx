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
import AddMemberModal from "./AddMemberModal";
import EditMemberModal from "./EditMemberModal";
import ViewMemberDetailsModal from "./ViewMemberDetailsModal";
import { useBorrowStore } from "@/store/useBorrowStore";

import { Edit, Eye, Trash2Icon, TimerReset } from "lucide-react";
import { useMemberStore } from "@/store/useMemberStore";
import { useAuthStore } from "@/store/useAuthStore";

export default function MemberList() {
  const { members, loadMembers, addMember, removeMember, isLoading, error } =
    useMemberStore();

  const user = useAuthStore((state) => state.user);
  const role = useAuthStore((state) => state.role);

  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [editingMember, setEditingMember] = useState({});
  const [showEditModal, setShowEditModal] = useState(false);
  const [memberToDelete, setMemberToDelete] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const style1 = "bg-blue-600 text-white";
  const style2 = "bg-gray-700 text-white";
  useEffect(() => {
    if (user) {
      loadMembers();
    }
  }, [role]);

  const handleClose = () => setShowForm(false);

  const handleEditClose = async () => {
    setShowEditModal(false);
    setEditingMember(null);
    await loadMembers();
  };

  const handleSubmit = async (memberData) => {
    await addMember(memberData);
    await loadMembers();
    setShowForm(false);
  };

  const handleDeleteConfirmed = async () => {
    if (memberToDelete) {
      await removeMember(memberToDelete.id);
      setShowConfirmModal(false);
      setMemberToDelete(null);
    }
  };

  useEffect(() => {
    loadBorrowRecords();
  }, []);
  useEffect(() => {
    loadBorrowRecords();
  }, []);

  const { loadBorrowRecords, borrows } = useBorrowStore();

  const activeBorrowsCount = borrows.reduce((acc, borrow) => {
    if (borrow.status !== "RETURNED") {
      acc[borrow.member_name] = (acc[borrow.member_name] || 0) + 1;
    }
    return acc;
  }, {});

  const membersWithActiveBorrowCount = members.map((member) => ({
    ...member,
    activeBorrowCount: activeBorrowsCount[member.name] || 0,
  }));

  const membersFiltered = membersWithActiveBorrowCount.filter((member) => {
    const term = searchTerm.toLowerCase().trim();
    return (
      member.name?.toLowerCase().includes(term) ||
      member.email?.toLowerCase().includes(term) ||
      member.phone?.toLowerCase().includes(term)
    );
  });

  return (
    <div>
      <div className="flex flex-row justify-between">
        <Header
          title="Members"
          description="Manage your library's registered members"
        />
        <Button
          text="+ Add Member"
          action="generic"
          onClick={() => setShowForm(true)}
          className="h-10"
        />
      </div>

      <SearchBar
        searchTerm={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search members by name, email, or phone..."
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
            {membersFiltered.length > 0 ? (
              membersFiltered.map((member, i) => (
                <InfoCard key={i}>
                  <InfoCardHeader
                    title={member.name}
                    subtitle={member.email}
                    subtitlePrefix="Email: "
                    status={[
                      {
                        text: `${member.activeBorrowCount} active` || 0,
                        className: `${
                          member.activeBorrowCount !== 0 ? style1 : style2
                        }`,
                      },
                    ]}
                  />
                  <InfoCardBody
                    metaRows={[
                      { label: "Phone", value: member.phone },
                      { label: "Joined", value: member.join_date },
                      {
                        label: "Active borrows",
                        value: member.activeBorrowCount,
                      },
                    ]}
                  />
                  <InfoCardAction
                    actions={[
                      <ActionButton
                        action="view"
                        onClick={() => setSelectedMember(member)}
                        icon={<Eye size={18} />}
                      />,
                      <ActionButton
                        action="close"
                        icon={<TimerReset size={18} />}
                        // onClick={() => {
                        //   setMemberToDelete(member);
                        //   setShowConfirmModal(true);
                        // }}
                      />,
                      <ActionButton
                        action="edit"
                        icon={<Edit size={18} />}
                        onClick={() => {
                          setEditingMember(member);
                          setShowEditModal(true);
                        }}
                      />,
                      <ActionButton
                        action="delete"
                        icon={<Trash2Icon size={18} />}
                        onClick={() => {
                          setMemberToDelete(member);
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
                    No members match your search.
                  </div>
                )}
              </>
            )}
          </div>
        )
      ) : (
        <div className="bg-red-100 text-red-800 p-3 rounded my-4">
          Failed to load members data. Please refresh or try again later.
        </div>
      )}

      <AddMemberModal
        showForm={showForm}
        handleClose={handleClose}
        onSubmit={handleSubmit}
      />

      <ViewMemberDetailsModal
        show={!!selectedMember}
        onClose={() => setSelectedMember(null)}
        member={selectedMember}
        activeBorrow={membersWithActiveBorrowCount}
      />

      <EditMemberModal
        memberId={editingMember?.id}
        editingMember={editingMember}
        show={showEditModal}
        onClose={handleEditClose}
      />

      <ConfirmModal
        show={showConfirmModal}
        title="Delete Member"
        message={`Are you sure you want to delete "${memberToDelete?.name}"? This action cannot be undone.`}
        onConfirm={handleDeleteConfirmed}
        onCancel={() => {
          setShowConfirmModal(false);
          setMemberToDelete(null);
        }}
      />
    </div>
  );
}
