export default function ActionButton({
  action = "view",
  className = "",
  icon,
  ...props
}) {
  const baseStyles =
    "p-2 w-9 h-9 rounded font-semibold focus:outline-none transition-colors cursor-pointer";
  const actionStyles = {
    view: "bg-green-50 text-green-700 hover:bg-green-100 border border-green-100",
    edit: "bg-gray-50 text-black hover:bg-gray-100 border border-gray-100",
    delete: "bg-red-50 text-red-700 hover:bg-red-100 border border-red-100",
    reset: "bg-zinc-50 text-zinc hover:bg-zinc-100 border border-zinc-100",
    close: "bg-gray-50 text-black hover:bg-gray-100 border border-gray-100",
  };
  const combined = `${baseStyles} ${actionStyles[action] || ""} ${className}`;
  return (
    <button className={combined} {...props}>
      {icon}
    </button>
  );
}
