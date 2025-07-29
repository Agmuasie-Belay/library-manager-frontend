import { Search } from "lucide-react";

export default function SearchBar({
  searchTerm,
  onChange,
  placeholder = "Search...",
}) {
  return (
    <div className="relative w-full ">
      <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
        <Search size={18} />
      </span>
      <input
        type="text"
        name="search"
        value={searchTerm}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 bg-white/80 text-sm focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-1"
      />
    </div>
  );
}
