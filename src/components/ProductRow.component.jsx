import { useState, useEffect } from "react";
import { FaEye, FaRegEdit, FaEuroSign } from "react-icons/fa";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { GoDotFill } from "react-icons/go";
const ProductRow = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const storedProducts = localStorage.getItem("products");
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    } else {
      // fetch("https://fakestoreapi.com/products")
      //   .then((response) => response.json())
      //   .then((data) => {
      //     setProducts(data);
      //     localStorage.setItem("products", JSON.stringify(data));
      //   })
      //   .catch((error) => console.error("API call error:", error));
      const fetchProducts = async () => {
        try {
          const response = await fetch("https://fakestoreapi.com/products");
          const data = await response.json();
          setProducts(data);
          localStorage.setItem("products", JSON.stringify(data));
        } catch (error) {
          console.error("API call error:", error);
        }
      };
      fetchProducts();
    }
  }, []);

  const handleDelete = (productId) => {
    const updatedProducts = products.filter(
      (product) => product.id !== productId
    );
    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
  };

  return (
    <div>
      <hr />
      <ul>
        <li>#</li>
        <li>Title</li>
        <li>Category</li>
        <li>Price</li>
        <li>Image</li>
        <li>Check</li>
        <li>Update</li>
        <li>Delete</li>
      </ul>
      <hr />

      {products.map((product) => (
        <ProductItem
          key={product.id}
          product={product}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
};

function ProductItem({ product, onDelete }) {
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  const openOverlay = () => {
    setIsOverlayOpen(true);
  };

  const closeOverlay = () => {
    setIsOverlayOpen(false);
  };

  return (
    <>
      <div className="row-items">
        <div className="row">
          <li>{product.id}</li>
          <li className="title-pro">{product.title}</li>
          <li className="category">{product.category}</li>
          <li className="price-pro">
            {product.price}
            {/* <FaEuroSign /> */}
          </li>
          <li>
            <img className="api-img" src={product.image} alt="" />
          </li>
          <li className="check-eye">
            <FaEye className="eyeBtn" onClick={openOverlay} />
          </li>
          <li className="update">
            <FaRegEdit className="editBtn" />
          </li>
          <li className="delete-pro">
            <RiDeleteBin5Fill
              className="deleteBtn"
              onClick={() => onDelete(product.id)}
            />
          </li>
        </div>

        <hr className="lineDiv" />

        {isOverlayOpen && (
          <div className="overlay">
            <div className="overlay-content">
              <h2 className="overlay-title">{product.title}</h2>
              <br />
              <hr />
              <br />
              <img className="overlay-img" src={product.image} alt="" />
              <br />
              <p className="desc">{product.description}</p>
              <br />
              <p>Category: {product.category}</p>
              <br />
              <p>Price: {product.price}</p>
              <br />
              <div className="stock-row">
                <p>In Stock</p>
                <GoDotFill className="stock" />
              </div>

              <br />
              <div className="btn-close-container">
                <button className="close-btn" onClick={closeOverlay}>
                  Return
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default ProductRow;
