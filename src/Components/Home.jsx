
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-white via-red-50 to-white flex items-center justify-center px-4 py-10">
      <div className="max-w-3xl mx-auto text-center bg-white p-10 rounded-xl shadow-xl border border-red-100">
        <h1 className="text-5xl font-extrabold text-red-600 mb-6">
          Inventory Management System
        </h1>
        <p className="text-lg text-gray-700 mb-8 text-center">
          <span className="font-semibold text-red-500">InVento</span> – The
          easier way to manage your stock, fast and stress-free.
        </p>

        <Link
          to="/register"
          className="inline-block bg-red-600 text-white px-6 py-3 rounded-full text-lg hover:bg-red-700 transition shadow-lg"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
}

export default Home;
