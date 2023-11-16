import { useState, useEffect } from "react";
import ProductRow from "./ProductRow.component";
const AddProduct = ({ products, setProducts }) => {
  const [isAddProductOverlayOpen, setIsAddProductOverlayOpen] = useState(false);

  const openProductOverlay = () => {
    setIsAddProductOverlayOpen(true);
  };
  const closeProductOverlay = () => {
    setIsAddProductOverlayOpen(false);
  };

  const [newProduct, setNewProduct] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
    image: "",
  });

  useEffect(() => {
    //When state changes then it will also change ID
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      id: Math.floor(Math.random() * 900) + 100,
    }));
  }, [
    newProduct.title,
    newProduct.description,
    newProduct.category,
    newProduct.price,
    newProduct.image,
  ]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleAddProduct = () => {
    const updatedProducts = [...products, newProduct];
    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
    setNewProduct({
      title: "",
      description: "",
      category: "",
      price: "",
      image: "",
    });
    closeProductOverlay();
  };

  return (
    <div>
      <button className="add-product" onClick={openProductOverlay}>
        Add Product
      </button>

      {isAddProductOverlayOpen && (
        <div className="overlay">
          <div className="overlay-content">
            <h2 className="overlay-title">Add Product</h2>
            <br />
            <hr />
            <br />
            <input
              type="text"
              placeholder="Title"
              name="title"
              value={newProduct.title}
              onChange={handleInputChange}
            />
            <br />
            <input
              type="text"
              placeholder="Description"
              name="description"
              value={newProduct.description}
              onChange={handleInputChange}
            />
            <br />
            <input
              type="text"
              placeholder="Category"
              name="category"
              value={newProduct.category}
              onChange={handleInputChange}
            />
            <br />
            <input
              type="text"
              placeholder="Price"
              name="price"
              value={newProduct.price}
              onChange={handleInputChange}
            />
            <br />
            <input
              type="text"
              placeholder="Image URL"
              name="image"
              value={newProduct.image}
              onChange={handleInputChange}
            />

            <br />
            <div className="product-add-container">
              <button className="add-item close-btn" onClick={handleAddProduct}>
                Add Item
              </button>
              <button className="close-btn" onClick={closeProductOverlay}>
                Back to Inventory
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddProduct;
