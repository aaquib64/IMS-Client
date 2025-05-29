import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function WishList() {
  const [wishlist, setWishlist] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login"); // redirect to login
    }
    axios
      .get("https://ims-server-r467.onrender.com/wishlist", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setWishlist(res.data))
      .catch((err) => console.error("Failed to load wishlist:", err));
  }, [navigate]);

  const removeFromWishlist = async (productId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `https://ims-server-r467.onrender.com/remove/${productId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setWishlist(wishlist.filter((p) => p._id !== productId));
    } catch (err) {
      console.error("Failed to remove from wishlist:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10 mt-10">
      <div className="max-w-6xl mx-auto bg-white shadow-md rounded-lg p-6">
        <div className="flex items-center justify-between mb-4 mt-4">
          <h2 className="text-2xl font-bold text-red-600">My Wishlist</h2>
          <button
            onClick={() => navigate("/list")}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
          >
            Product List
          </button>
        </div>

        {wishlist.length === 0 ? (
          <p className="text-gray-500">No items in wishlist.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border-collapse border border-gray-200">
              <thead className="bg-red-100 text-gray-700">
                <tr>
                  <th className="border px-4 py-2">#</th>
                  <th className="border px-4 py-2 text-left">Name</th>
                  <th className="border px-4 py-2 text-left">Quantity</th>
                  <th className="border px-4 py-2 text-left">Price</th>
                  <th className="border px-4 py-2 text-left">Category</th>
                  <th className="border px-4 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {wishlist.map((item, index) => (
                  <tr key={item._id} className="text-center hover:bg-gray-50">
                    <td className="border px-4 py-2">{index + 1}</td>
                    <td className="border px-4 py-2 text-left">
                      {item.productName}
                    </td>
                    <td className="border px-4 py-2 text-left">
                      {item.productQuantity}
                    </td>
                    <td className="border px-4 py-2 text-left">
                      ₹{item.productPrice}
                    </td>
                    <td className="border px-4 py-2 text-left">
                      {item.productCategory}
                    </td>
                    <td className="border px-4 py-2">
                      <button
                        onClick={() => removeFromWishlist(item._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default WishList;
