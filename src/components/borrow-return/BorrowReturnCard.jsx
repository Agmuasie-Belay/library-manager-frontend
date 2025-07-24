import { BookOpen, User, Calendar } from "lucide-react";

export default function BorrowReturnCard({
  title,
  member,
  borrow_date,
  due_date,
  status,
  return_date,
  onReturnClick,
}) {
  
  let style = "";
  if (status === "ACTIVE") style = "bg-blue-600";
  else if (status === "RETURNED") style = "bg-gray-600";
  else if (status === "OVERDUE") style = "bg-red-700";
  else style;
  return (
    <div className="bg-white flex flex-col rounded-md border border-gray-200 shadow-sm p-6">
      <div className="flex justify-between items-start">
        <div className="inline-flex gap-2 text-[1.25rem] font-semibold">
          <BookOpen size={22} className="mt-1" /> {title}
        </div>
        <span
          className={`text-[12px] py-0.5 px-2 rounded-2xl bg-black -mt-2 text-white font-semibold whitespace-nowrap ${style}`}
        >
          {status}
        </span>
      </div>
      <div className="inline-flex text-gray-600 gap-2 text-[1rem] ">
        <User size={18} className="mt-1" /> {member}
      </div>
      <div className="flex mt-4 gap-4 md:gap-x-24 flex-col md:flex-row text-gray-600  text-[1rem] ">
        <span className="inline-flex gap-2">
          <Calendar size={18} className="mt-3" />
          <div className="flex flex-col">
            <span className="text-left font-semibold">Borrowed:</span>
            <span>{borrow_date}</span>
          </div>
        </span>
        <span className="inline-flex gap-2">
          <Calendar size={18} className="mt-3" />
          <div className="flex flex-col">
            <span className="text-left font-semibold">Due:</span>
            <span>{due_date}</span>
          </div>
        </span>
        {return_date && (
          <span className="inline-flex gap-2">
            <Calendar size={18} className="mt-3" />
            <div className="flex flex-col">
              <span className="text-left font-semibold">Returned:</span>
              <span>{return_date}</span>
            </div>
          </span>
        )}
      </div>
      {(status === "ACTIVE" || status === "OVERDUE") && (
        <button
          className="bg-black text-white p-2 rounded-md hover:bg-gray-700 w-fit mt-4"
          onClick={onReturnClick}
        >
          Mark as Returned
        </button>
      )}
    </div>
  );
}
