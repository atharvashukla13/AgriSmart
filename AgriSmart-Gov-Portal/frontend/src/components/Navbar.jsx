import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded bg-[#4a944e]" />
          <span className="font-semibold">Agri Smart</span>
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          <Link to="/dashboard" className="text-sm hover:text-[#4a944e]">
            Dashboard
          </Link>
          <Link to="/farmers" className="text-sm hover:text-[#4a944e]">
            Farmers
          </Link>
          <Link to="/reports" className="text-sm hover:text-[#4a944e]">
            Reports
          </Link>
          <Link to="/alerts" className="text-sm hover:text-[#4a944e]">
            Alerts
          </Link>
          <Link to="/settings" className="text-sm hover:text-[#4a944e]">
            Settings
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;

