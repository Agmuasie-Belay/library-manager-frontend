export default function InfoCardBody({ metaRows = [] }) {
  return (
    <div>
      {metaRows.map(({ label, value }, i) => (
        <p key={i} className="text-gray-600 mt-2 text-left text-sm truncate">
          <span className="font-semibold">{label}:</span> {value}
        </p>
      ))}
    </div>
  );
}
