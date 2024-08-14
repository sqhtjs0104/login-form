export default function Divider({
  orientation,
  className
}: {
  orientation?: "horizontal" | "vertical";
  className: string;
}) {
  const isVertical = orientation === "vertical";

  return (
    <div
      className={`flex rounded-xl border ${isVertical
        ? "flex-col border-r-slate-100 h-full"
        : "flex-row border-b-slate-100 w-full"
        }
      ${className}`}
    />
  );
}