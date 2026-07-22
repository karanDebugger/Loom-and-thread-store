import { NavLink } from "react-router-dom";

const links = [
  { name: "Home", path: "/" },
  { name: "Shop", path: "/shop" },
  { name: "Men", path: "/men" },
  { name: "Women", path: "/women" },
  { name: "Collections", path: "/collections" },
  { name: "New", path: "/new" },
  { name: "About", path: "/about" },
];

function NavbarLinks() {
  return (
    <div className="hidden lg:flex items-center gap-8">

      {links.map((link) => (
        <NavLink
          key={link.name}
          to={link.path}
          className={({ isActive }) =>
            `transition hover:text-gray-300 ${
              isActive ? "text-white font-semibold" : "text-gray-400"
            }`
          }
        >
          {link.name}
        </NavLink>
      ))}

    </div>
  );
}

export default NavbarLinks; 