import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function Profile() {
  const navigate = useNavigate();

  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="max-w-5xl mx-auto py-16 px-6">
      <h1 className="text-4xl font-bold mb-10">
        My Profile
      </h1>

      <div className="bg-zinc-900 rounded-2xl p-8 space-y-8">
        <div>
          <p className="text-gray-400">
            Name
          </p>

          <h2 className="text-2xl font-semibold">
            {user?.name}
          </h2>
        </div>

        <div>
          <p className="text-gray-400">
            Email
          </p>

          <h2 className="text-xl">
            {user?.email}
          </h2>
        </div>

        <div>
          <p className="text-gray-400">
            Role
          </p>

          <h2 className="capitalize">
            {user?.role}
          </h2>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <button
            onClick={() => navigate("/my-orders")}
            className="bg-white text-black px-8 py-3 rounded-xl font-semibold hover:bg-zinc-200 transition"
          >
            My Orders
          </button>

          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 px-8 py-3 rounded-xl font-semibold transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;