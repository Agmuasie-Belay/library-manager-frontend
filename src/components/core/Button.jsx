export default function Button({
  action = "submit",
  className = "",
  text,
  type = "button",
  ...props
}) {
  const baseStyles =
    "px-4 py-2 rounded focus:outline-none transition-colors cursor-pointer";
  const actionStyles = {
    cancel: "bg-gray-200 text-black hover:bg-gray-300",
    submit: "bg-blue-600 text-white hover:bg-blue-700",
    delete: "bg-red-500 text-white hover:bg-red-600",
    close: "bg-zinc-500 text-white hover:bg-zing-600",
    generic: "bg-black text-white hover:bg-gray-700",
  };
  const combined = `${baseStyles} ${actionStyles[action] || ""} ${className}`;
  return (
    <button className={combined} type={type} {...props}>
      {" "}
      {text}
    </button>
  );
}
