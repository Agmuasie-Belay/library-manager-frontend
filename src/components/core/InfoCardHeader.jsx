export default function InfoCardHeader({
  title,
  subtitle,
  subtitlePrefix = "",
  status = [],
}) {
  return (
    <>
      <div className="flex flex-1 justify-between  rounded-md">
        <div className="flex flex-col flex-1 truncate">
          <h3
            className=" font-bold text-left text-lg truncate "
            title={title}
          >
            {title}
          </h3>
          <div className="text-gray-600 text-[14px] text-left  mb-4 ">
            {subtitle && (
              <p title={subtitle}>
                {subtitlePrefix}
                {subtitle}
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-1  h-fit">
          {status.map((stat, i) => (
            <div
              key={i}
              className={`text-[12px]  px-2 rounded-2xl font-semibold whitespace-nowrap ${stat.className}`}
            >
              {stat.text}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
