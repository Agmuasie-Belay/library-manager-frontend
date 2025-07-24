export default function InfoCard({ children }) {
  return (
    <div className="grid grid-cols-1 rounded-md border border-gray-200 shadow shadow-gray-200 bg-white p-4 hover:shadow-md">
      {children}
    </div>
  );
}
