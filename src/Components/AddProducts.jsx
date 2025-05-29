import  { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddProducts() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    productName: "",
    productQuantity: "",
    productPrice: "",
    productCategory: "",
    productDescription: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "https://ims-server-r467.onrender.com/products",
        formData
      );
      alert("Product added successfully!");
      setFormData({
        productName: "",
        productQuantity: "",
        productPrice: "",
        productCategory: "",
        productDescription: "",
      });
      navigate("/list");
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-20 px-4">
      <div className="w-full max-w-xl bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-red-600 mb-6">
          Add Product
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Product Name */}
          <div>
            <label
              htmlFor="productName"
              className="block text-gray-700 font-medium mb-1"
            >
              Product Name
            </label>
            <input
              type="text"
              id="productName"
              name="productName"
              value={formData.productName}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          {/* Quantity */}
          <div>
            <label
              htmlFor="productQuantity"
              className="block text-gray-700 font-medium mb-1"
            >
              Quantity
            </label>
            <input
              type="number"
              id="productQuantity"
              name="productQuantity"
              value={formData.productQuantity}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          {/* Price */}
          <div>
            <label
              htmlFor="productPrice"
              className="block text-gray-700 font-medium mb-1"
            >
              Price
            </label>
            <input
              type="number"
              id="productPrice"
              name="productPrice"
              value={formData.productPrice}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          {/* Category */}
          <div>
            <label
              htmlFor="productCategory"
              className="block text-gray-700 font-medium mb-1"
            >
              Category
            </label>
            <input
              type="text"
              id="productCategory"
              name="productCategory"
              value={formData.productCategory}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="productDescription"
              className="block text-gray-700 font-medium mb-1"
            >
              Description
            </label>
            <textarea
              id="productDescription"
              name="productDescription"
              value={formData.productDescription}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              rows="3"
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="px-6 py-2 bg-red-600 text-white font-semibold rounded hover:bg-red-700 transition duration-200"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddProducts;
