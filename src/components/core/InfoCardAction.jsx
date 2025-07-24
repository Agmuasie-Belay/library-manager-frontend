export default function InfoCardAction({ actions = [] }) {
  return (
    <div>
      {actions.length > 0 && (
        <div className="mt-4 flex flex-wrap justify-end gap-2">
          {actions.map((icon, i) => (
            <span key={i}>{icon}</span>
          ))}
        </div>
      )}
    </div>
  );
}
