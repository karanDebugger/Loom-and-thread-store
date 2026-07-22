import { Link } from "react-router-dom";

import NavbarLinks from "./navbar/NavbarLinks";
import NavbarIcons from "./navbar/NavbarIcons";

function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-black/90 backdrop-blur border-b border-zinc-800">

      <div className="max-w-7xl mx-auto h-20 px-6 flex items-center justify-between">

        <Link
          to="/"
          className="text-3xl font-bold tracking-wider"
        >
          Loom & Thread
        </Link>

        <NavbarLinks />

        <NavbarIcons />

      </div>

    </header>
  );
}

export default Navbar; 