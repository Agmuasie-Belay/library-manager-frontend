export default function CustomOption (props) {
  const { data, innerRef, innerProps } = props;
  return (
    <div ref={innerRef} {...innerProps} className="m-1 p-2  text-left hover:bg-gray-100 hover:rounded-md">
      <div className="font-medium">{data.label}</div>
      {data.opt === "borrow-book" && <div className="text-sm text-gray-500">{data.sublabel} copies available</div>}
      {data.opt === "borrow-member" && <div className="text-sm text-gray-500">{data.sublabel} </div>}
      {data.opt === "return-book" && <div className="text-sm text-gray-500">By: {data.author}<span className="text-xl"> &bull;</span> Borrowed by: {data.sublabel}</div>}
      {data.opt === "return-book" && <div className="text-sm text-gray-500">Due:{" "}{data.duedate} </div>}
    </div>
  );
};
