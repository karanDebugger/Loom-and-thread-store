import {
  Search,
  Heart,
  ShoppingBag,
  User,
  LogOut,
} from "lucide-react";

import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../hooks/useCart";
import { useAuth } from "../../hooks/useAuth";

function NavbarIcons() {
  const navigate = useNavigate();

  const { totalItems } = useCart();

  const {
    isAuthenticated,
    logout,
  } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex items-center gap-6">

      <Search
        className="cursor-pointer hover:text-gray-300"
        size={22}
      />

      <Heart
        className="cursor-pointer hover:text-red-500"
        size={22}
      />

      <Link
        to="/cart"
        className="relative"
      >
        <ShoppingBag size={24} />

        {totalItems > 0 && (
          <span
            className="
            absolute
            -top-2
            -right-2
            bg-red-600
            text-xs
            rounded-full
            w-5
            h-5
            flex
            items-center
            justify-center"
          >
            {totalItems}
          </span>
        )}
      </Link>

      {!isAuthenticated ? (
        <Link to="/login">
          <User
            size={22}
            className="cursor-pointer hover:text-gray-300"
          />
        </Link>
      ) : (
        <div className="flex items-center gap-4">

          <Link to="/profile">
            <User
              size={22}
              className="cursor-pointer hover:text-gray-300"
            />
          </Link>

          <button
            onClick={handleLogout}
            className="hover:text-red-500"
          >
            <LogOut size={22} />
          </button>

        </div>
      )}

    </div>
  );
}

export default NavbarIcons; 