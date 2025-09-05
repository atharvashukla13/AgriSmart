import { Link, useLocation } from "react-router-dom";

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: "dashboard" },
  { to: "/farmers", label: "Farmer Management", icon: "people" },
  { to: "/reports", label: "Analytics & Reports", icon: "analytics" },
  { to: "/alerts", label: "Alerts & Notifications", icon: "notifications" },
  { to: "/settings", label: "Settings", icon: "settings" },
];

function Sidebar() {
  const { pathname } = useLocation();
  return (
    <div className="sidebar">
      <div className="mb-8 flex flex-col justify-center items-center">
        <img
          src="../../public/assets/leaf.svg"
          alt="Government Agriculture Department logo"
          style={{ width: "100px", height: "100px" }}
        />
        <h1 className="text-2xl text-[#4a944e] font-family-poppins font-bold">AgriSmart</h1>
      </div>

      <div className="nav-items">
        {navItems.map((item) => {
          const active = pathname.startsWith(item.to);
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`nav-item ${active ? "bg-[#4a944e] text-white" : ""}`}
            >
              <span className="material-icons mr-3">{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Sidebar;
