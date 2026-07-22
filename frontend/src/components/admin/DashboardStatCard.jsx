function DashboardStatCard({
  title,
  value,
  color = "bg-zinc-900",
}) {
  return (
    <div
      className={`${color} rounded-xl p-6 border border-zinc-800`}
    >
      <p className="text-zinc-400 text-sm">
        {title}
      </p>

      <h2 className="text-3xl font-bold mt-3">
        {value}
      </h2>
    </div>
  );
}

export default DashboardStatCard;