import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // ✅ useNavigate added

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate(); // ✅ initialize navigate
  const isLoggedIn = !!localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login"); // ✅ redirect after logout
  };

  return (
    <nav className="fixed top-0 w-full bg-white shadow z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-2xl font-bold text-red-600">
            InVento
          </Link>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-gray-600 hover:text-gray-900 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {menuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            <Link
              to="/wishlist"
              className="px-4 py-1 border border-red-600 text-red-600 hover:bg-red-600 hover:text-white rounded"
            >
              My Wishlist
            </Link>

            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-white hover:text-red-600 border border-red-600 hover:border-red-600"
                >
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-md py-3 px-4 space-y-3">
          {/* <Link to="/about" className="block text-gray-700 hover:text-red-500">
            About Us
          </Link>
          <Link
            to="/contact"
            className="block text-gray-700 hover:text-red-500"
          >
            Contact Us
          </Link> */}
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="w-full bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Logout
            </button>
          ) : (
            <div className="flex flex-col space-y-2 mt-2">
              <Link to="/login">
                <button className="w-full text-center px-4 py-1 border border-red-600 text-red-600 hover:bg-red-600 hover:text-white rounded">
                  Login
                </button>
              </Link>
              {/* <Link to="/signup">
                <button className="w-full text-center px-4 py-1 border border-gray-400 text-gray-700 hover:bg-gray-100 rounded">
                  Register
                </button>
              </Link> */}
            </div>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
