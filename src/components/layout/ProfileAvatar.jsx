import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/useAuthStore";
import { LogOut, User}from "lucide-react";
export default function ProfileAvatar({ name = "User", imageUrl = "" }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const user = useAuthStore((state) => state.user);

  const role = user?.role;

  const toggleDropdown = () => setIsOpen(!isOpen);

  const firstLetter = name ? name.charAt(0).toUpperCase() : "G";

  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      <button
        onClick={toggleDropdown}
        className={`w-10 h-10 rounded-full ${
          role === "admin"
            ? "bg-red-200 text-red-900"
            : "bg-green-200 text-green-900"
        } font-bold text-lg flex items-center justify-center overflow-hidden`}
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="Profile"
            className="w-full h-full object-cover rounded-full"
          />
        ) : (
          firstLetter
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-0 w-60 bg-white border border-gray-200 rounded shadow-md z-50">
          <div className=" text-gray-800 border-b border-gray-200 text-left p-2 font-semibold">
            {name}<br/><p className="text-gray-600 font-normal text-sm">{name}</p>
          </div>
          <button
            className="block w-full text-left p-1 text-sm text-gray-700 "
            onClick={() => {navigate("/profile"); setIsOpen(!isOpen)}}

          >
           <div className="flex flex-row p-1 rounded-md gap-x-1 hover:bg-gray-100"><User size={18} className="mt-0.5"/>Profile</div> 
          </button>
          <button
            className="block w-full text-left p-1   text-sm text-red-800 "
            onClick={() => {
              localStorage.removeItem("accessToken");
              navigate("/login");
            }}
          >
            <div className="flex flex-row p-1 rounded-md gap-x-1 hover:bg-gray-100"><LogOut size={18} className="mt-0.5"/>{" "}Logout</div>
          </button>
        </div>
      )}
    </div>
  );
}
