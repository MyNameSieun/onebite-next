import Link from "next/link";

const Layout = ({
  children,
  analytics,
  team,
}: {
  children: React.ReactNode;
  analytics: React.ReactNode;
  team: React.ReactNode;
}) => {
  return (
    <div className="flex flex-col gap-3">
      <div>
        <Link href={"/parallel"} className="mr-6 border-b">
          /parallel ↗️
        </Link>
        <Link href={"/parallel/views"} className="border-b">
          /parallel/views ↗️
        </Link>
      </div>

      {children}
      {analytics}
      {team}
    </div>
  );
};

export default Layout;
