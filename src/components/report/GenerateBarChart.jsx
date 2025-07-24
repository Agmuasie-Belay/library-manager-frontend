import React from "react";

export default function GenreBarChart({ data }) {
  const total = data.reduce((sum, item) => sum + item.borrow_count, 0);

  return (
    <div className="space-y-3">
      {data.map((item, i) => {
        const percent = ((item.borrow_count / total) * 100).toFixed(1);
        return (
          <div key={i}>
            <div className="flex text-sm justify-between ">
              <span className="text-sm">{item.genre_name}</span>
              <span className="text-gray-600">{percent}%</span>
            </div>
            <div className="w-full bg-red-100 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full"
                style={{ width: `${percent}%` }}
              ></div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
