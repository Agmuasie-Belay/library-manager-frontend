export default function Header({ title, description }) {
  return (
    <div className="flex flex-col text-left">
      <span className="text-3xl font-bold">{title}</span>
      <span className="text-gray-600 mb-4">{description}</span>
    </div>
  );
}
