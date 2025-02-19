import { useState } from "react";
import { subCats } from "../../../utils/staticSubCats";
import { categoryData } from "../../Home/categories/Categories";
import AddProductForm from "./Forms/AddProductForm";

const ManageProducts = () => {
  const [selectedCat, setSelectedCat] = useState("");
  const [selectedSubCat, setSelectedSubCat] = useState("");
  const [formData, setFormData] = useState({
    productName: "",
    productImage: null,
    price: "",
    description: "",
    averageRating: "",
    keyFeatures: ["", "", ""], // Fixed 3 fields for key features
  });

  // Handle category selection change
  const handleCategoryChange = (e) => {
    let selectedPath = e.target.value;
    if (selectedPath && selectedPath === "Sunnah") {
      selectedPath = "Sunnah Products";
    }
    setSelectedCat(selectedPath);
    setSelectedSubCat(""); // prevented showing form while another cat's sub-cat is selected
    console.log(selectedPath);
  };

  // Handle sub-category selection change
  const handleSubCategoryChange = (e) => {
    let sc = e.target.value;
    setSelectedSubCat(sc);
    console.log(sc);
  };

  const subCategories = subCats[selectedCat] || []; // Get the subcategories for the selected category

  return (
    <div className="max-w-5xl mx-auto bg-gray-100 shadow-lg rounded-lg p-8 mt-10">
      <h2 className={`text-2xl font-semibold text-primary text-center mb-6`}>
        Add New Product
      </h2>
      {/* Category Dropdown */}

      <div className="relative">
        <label
          htmlFor="price"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Category
        </label>
        <select
          id="categories"
          className="block w-full px-4 py-2 text-sm border rounded-lg shadow-sm bg-white border-gray-300 text-gray-700 focus:outline-none"
          onChange={handleCategoryChange}
          value={selectedCat}
        >
          <option value="">Select Category</option>
          {categoryData.map((category) => (
            <option key={category.catName} value={category.catName}>
              {category?.catName === "Sunnah"
                ? "Sunnah Products"
                : category?.catName}
            </option>
          ))}
        </select>
      </div>

      {/* Sub-Category Dropdown */}

      {subCategories.length > 0 && (
        <div className="relative mt-4">
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Sub-Category
          </label>
          <select
            className="block w-full px-4 py-2 text-sm border rounded-lg shadow-sm bg-white border-gray-300 text-gray-700 focus:outline-none"
            onChange={handleSubCategoryChange}
            value={selectedSubCat}
          >
            <option value="">Select Sub-Category</option>
            {subCategories.map((scat) => (
              <option key={scat} value={scat}>
                {scat}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Add Product Form or Placeholder */}
      <div className="mt-8">
        {selectedCat ? (
          subCategories.length > 0 && !selectedSubCat ? (
            // Sub-category required but not selected
            <div className="flex flex-col items-center justify-center h-40 bg-gray-50 border border-gray-300 rounded-lg shadow-sm">
              <p className="text-gray-600 text-lg">
                Please select a{" "}
                <span className="text-orange-400">sub-category</span> to
                continue adding a product.
              </p>
            </div>
          ) : (
            // Both category and sub-category validated
            <AddProductForm formData={formData} setFormData={setFormData} />
          )
        ) : (
          // Category not selected
          <div className="flex flex-col items-center justify-center h-40 bg-gray-50 border border-gray-300 rounded-lg shadow-sm">
            <p className="text-gray-600 text-lg">
              Please select a <span className="text-red-400">category</span> to
              continue adding a product.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageProducts;
