import {
  ArrowRightLeft,
  Shield,
  BookOpen,
  ArrowLeftRightIcon,
  Users,
  UserIcon,
  Plus,
  Settings,
  LineChartIcon,
  AlertTriangleIcon,
} from "lucide-react";
import StatsCard from "./StatsCard";
import QuickActionCard from "./QuickActionCard";
import { useEffect } from "react";
import useDashboardStore from "@/store/useDashboardStore";
import { useAuthStore } from "@/store/useAuthStore";
import DashboardHead from "./DashboardHead";

export default function Dashboard() {
  const {
    fetchDashboardData,
    totalBooks,
    totalMembers,
    totalBorrows,
    overdueBooks,
    recentActivities,
    isLoading,
    error,
  } = useDashboardStore();
  const user = useAuthStore((state) => state.user);

  const role = user?.role;

  useEffect(() => {
    const loadData = async () => {
      if (!role) return;
      const data = await fetchDashboardData(role);
    };
    loadData();
  }, []);

  const statsData = [
    {
      title: "Total Books",
      stats: totalBooks,
      subtitle: "All books in system",
      Icon: BookOpen,
    },
    {
      title: "Total Members",
      stats: totalMembers,
      subtitle: "",
      Icon: Users,
    },
    {
      title: "Active Borrows",
      stats: totalBorrows,
      subtitle: "",
      Icon: ArrowLeftRightIcon,
    },
    {
      title: "Overdue Books",
      stats: overdueBooks,
      subtitle: "",
      Icon: AlertTriangleIcon,
    },
  ];

  const quickActions = [
    {
      title: "Borrow Book",
      link: "/borrow-return",
      Icon: ArrowRightLeft,
      style: "bg-black hover:bg-gray-800 text-white",
    },
    {
      title: "Return Book",
      link: "/borrow-return",
      Icon: ArrowRightLeft,
      style: "border-gray-200 hover:bg-gray-50",
    },
    {
      title: "Add Member",
      link: "/members",
      Icon: Plus,
      style: "border-gray-200 hover:bg-gray-50",
    },
    {
      title: "Add Book",
      link: "/books",
      Icon: Plus,
      style: "border-gray-200 hover:bg-gray-50",
    },
    {
      title: "Manage Genres",
      link: "/genres",
      Icon: Settings,
      style: "border-red-200 bg-red-50 hover:bg-red-100 text-red-800",
      allowedRoles: "admin",
    },
    {
      title: "Admin Reports",
      link: "/reports",
      Icon: LineChartIcon,
      style: "border-red-200 bg-red-50 hover:bg-red-100 text-red-800",
      allowedRoles: "admin",
    },
  ];

  const visibleActions = quickActions.filter((action) => {
    if (!action.allowedRoles) return true;
    return action.allowedRoles.includes(role);
  });

  return (
    <div>
      {role === "admin" && (
        <DashboardHead
          heading="Admin Dashboard"
          sup="ADMINISTRATOR"
          Icon={Shield}
          subtitle="Full system access - Manage all library operations"
          title="Administrator Access"
          access_description="You have full system privileges including delete operations,
                genre management, and staff administration."
          role={role}
        />
      )}

      {role === "librarian" && (
        <DashboardHead
          heading="Librarian Dashboard"
          sup="Librarian"
          Icon={UserIcon}
          subtitle="Standard library operations - Books, members, and borrowing"
          title="Librarian Access"
          access_description="You can manage books and members, handle borrowing operations,
                and view reports. Contact admin for advanced operations."
          role={role}
        />
      )}

      {!error ? (
        isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-100 rounded animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            {statsData.map((data, i) => (
              <StatsCard
                key={i}
                title={data.title}
                stats={data.stats}
                description={data.subtitle}
                Icon={data.Icon}
              />
            ))}
          </div>
        )
      ) : (
        <div className="bg-red-100 text-red-800 p-3 rounded my-4">
          Failed to load dashboard data. Please refresh or try again later.
        </div>
      )}

      {!error &&
        (isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-100 rounded animate-pulse" />
            ))}
          </div>
        ) : (
          <>
            <div className="flex flex-col bg-white rounded-lg shadow-md shadow-gray-200 mt-6 p-6 border border-gray-200">
              <span className="text-left text-2xl font-semibold">
                Quick Actions
              </span>
              <span className="text-left text-gray-600 mb-4">
                Administrative and library operations
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {visibleActions.map((item, index) => (
                  <QuickActionCard
                    key={index}
                    title={item.title}
                    link={item.link}
                    Icon={item.Icon}
                    style={item.style}
                  />
                ))}
              </div>
            </div>

            <div className="flex flex-col bg-white rounded-lg shadow-md shadow-gray-200 mt-6 p-6 border border-gray-200">
              <span className="text-left text-2xl font-semibold">
                Recent Activity
              </span>
              <span className="text-left text-gray-600 mb-4">
                System-wide borrow and return operations
              </span>

              <div className="flex flex-col gap-6">
                {recentActivities.map((record) => {
                  const isReturn = !!record.return_date;
                  const actionLabel = isReturn ? "Returned" : "Borrowed";
                  const iconColor = isReturn
                    ? "bg-green-100 text-green-600"
                    : "bg-blue-100 text-blue-600";
                  const activityDate = record.return_date || record.borrow_date;

                  return (
                    <div
                      key={record.id}
                      className="flex text-left items-center gap-4 bg-gray-50 p-2 rounded-md "
                    >
                      <div className={`p-2 rounded-full ${iconColor}`}>
                        <ArrowRightLeft className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-semibold">
                          {actionLabel}: {record.book?.title || "Unknown Book"}
                        </p>
                        <p className="text-sm text-gray-600">
                          Member: {record.member?.name || "Unknown"} •{" "}
                          {new Date(activityDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        ))}
    </div>
  );
}
