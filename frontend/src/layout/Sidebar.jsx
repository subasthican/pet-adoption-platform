import { NavLink } from "react-router-dom";

const navItems = [
  { name: "Dashboard", path: "/" },
  { name: "Pets", path: "/pets" },
  { name: "Adoptions", path: "/adoptions" },
];

const Sidebar = () => {
  return (
    <aside className="min-h-screen w-64 bg-slate-900 p-5 text-white">
      <div className="mb-8 border-b border-slate-700 pb-5">
        <h2 className="text-2xl font-bold">Pet Admin</h2>
        <p className="mt-1 text-sm text-slate-300">Virtual Pet Adoption Center</p>
      </div>

      <nav className="space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === "/"}
            className={({ isActive }) =>
              `block rounded-xl px-4 py-3 text-sm font-medium transition ${
                isActive
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-200 hover:bg-slate-800"
              }`
            }
          >
            {item.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;