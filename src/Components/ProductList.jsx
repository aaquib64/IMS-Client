import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

function ViewProducts() {
  const [products, setProducts] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  // const [error, setError] = useState(null);
  // const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  // const { _id } = useParams();

  const token = localStorage.getItem("token");

  const handleDelete = async (_id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        const res = await axios.delete(
          `https://ims-server-r467.onrender.com/delete/${_id}`
        );
        console.log(res.data);
        setProducts(products.filter((p) => p._id !== _id));
        alert("Deleted successfully");
        navigate("/list");
      } catch (err) {
        console.error("Failed to delete product:", err);
        alert("Delete failed");
      }
    }
  };

  const handleEdit = (product) => {
    const newName = prompt("Enter new product name:", product.productName);
    if (newName) {
      axios
        .put(`https://ims-server-r467.onrender.com/products/${product._id}`, {
          ...product,
          productName: newName,
        })
        .then((res) => {
          setProducts(
            products.map((p) => (p._id === product._id ? res.data : p))
          );
        })
        .catch((err) => console.error("Failed to update product:", err));
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token"); // or use cookies/session
    if (!token) {
      navigate("/login"); // redirect to login
    }
    axios
      .get("https://ims-server-r467.onrender.com/list")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Failed to fetch products:", err));
  }, []);

  // Fetch wishlist on load
  // useEffect(() => {
  //   const fetchWishlist = async () => {
  //     try {
  //       const res = await axios.get("http://localhost:5100/wishlist", {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });
  //       setWishlist(res.data.map((item) => item._id)); // only IDs
  //     } catch (err) {
  //       console.error("Failed to fetch wishlist:", err);
  //     }
  //   };

  //   fetchWishlist();
  // }, []);

  // Add to wishlist
  const addToWishlist = async (_id) => {
    try {
      await axios.post(
        `https://ims-server-r467.onrender.com/add/${_id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setWishlist([...wishlist, _id]);
      alert("Added to wishlist");
    } catch (err) {
      console.error("Failed to add to wishlist:", err);
    }
  };

  // Remove from wishlist
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
          <h2 className="text-2xl font-bold text-red-600">Product List</h2>
          <button
            onClick={() => navigate("/products")}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
          >
            + Add Product
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse border border-gray-200">
            <thead className="bg-red-100 text-gray-700">
              <tr>
                <th className="border px-4 py-2">#</th>
                <th className="border px-4 py-2">Name</th>
                <th className="border px-4 py-2">Description</th>
                <th className="border px-4 py-2">Quantity</th>
                <th className="border px-4 py-2">Price</th>
                <th className="border px-4 py-2">Category</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={product._id} className="text-center hover:bg-gray-50">
                  <td className="border px-4 py-2">{index + 1}</td>
                  <td className="border px-4 py-2">{product.productName}</td>
                  <td className="border px-4 py-2">
                    {product.productDescription}
                  </td>
                  <td className="border px-4 py-2">
                    {product.productQuantity}
                  </td>
                  <td className="border px-4 py-2">₹{product.productPrice}</td>
                  <td className="border px-4 py-2">
                    {product.productCategory}
                  </td>
                  <td className="border px-4 py-2 space-x-2">
                    <button
                      // onClick={() => handleEdit(product._id)}
                      // onClick={() => navigate(`/Update/${product._id}`)}
                      className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                    >
                      <Link to={`/update/${product._id}`}> Edit</Link>
                    </button>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Delete
                    </button>

                    {wishlist.includes(product._id) ? (
                      <button
                        onClick={() => removeFromWishlist(product._id)}
                        className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                      >
                        Remove
                        {/* <Link to="/wishlist">Added</Link> */}
                      </button>
                    ) : (
                      <button
                        onClick={() => addToWishlist(product._id)}
                        className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                      >
                        Add to Wishlist
                      </button>
                    )}
                  </td>
                </tr>
              ))}
              {products.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center py-4 text-gray-500">
                    No products available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ViewProducts;
