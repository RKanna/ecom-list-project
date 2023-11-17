import { useState, useEffect } from "react";
import { FaEye, FaRegEdit, FaEuroSign } from "react-icons/fa";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { GoDotFill } from "react-icons/go";
import { IoMdClose } from "react-icons/io";
const ProductRow = ({ products, setProducts }) => {
  useEffect(() => {
    const storedProducts = localStorage.getItem("products");
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    } else {
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
          onUpdate={(updatedProduct) => {
            const updatedProducts = products.map((p) =>
              p.id === updatedProduct.id ? updatedProduct : p
            );
            setProducts(updatedProducts);
            localStorage.setItem("products", JSON.stringify(updatedProducts));
          }}
        />
      ))}
    </div>
  );
};

function ProductItem({ product, onDelete, onUpdate }) {
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [isUpdateOverlayOpen, setIsUpdateOverlayOpen] = useState(false);

  const openUpdateOverlay = () => {
    setIsUpdateOverlayOpen(true);
  };

  const closeUpdateOverlay = () => {
    setIsUpdateOverlayOpen(false);
  };

  const openOverlay = () => {
    setIsOverlayOpen(true);
  };

  const closeOverlay = () => {
    setIsOverlayOpen(false);
  };

  const [updatedProduct, setUpdatedProduct] = useState({
    id: product.id,
    title: product.title,
    description: product.description,
    category: product.category,
    price: product.price,
    image: product.image,
  });

  const updateProduct = () => {
    onUpdate(updatedProduct);
    closeUpdateOverlay();
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
            {/* <FaEuroSign /> */} €
          </li>
          <li>
            <img className="api-img" src={product.image} alt="" />
          </li>
          <li className="check-eye">
            <FaEye className="eyeBtn" onClick={openOverlay} />
          </li>
          <li className="update">
            <FaRegEdit className="editBtn" onClick={openUpdateOverlay} />
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

        {/* for update overlay */}
        {isUpdateOverlayOpen && (
          <div className="overlay">
            <div className="overlay-content">
              <div className="for-close-icon">
                <IoMdClose
                  className="close-icon"
                  onClick={closeUpdateOverlay}
                />
              </div>

              <textarea
                name=""
                id=""
                cols="20"
                rows="5"
                // value={product.title}
                value={updatedProduct.title}
                onChange={(e) =>
                  setUpdatedProduct({
                    ...updatedProduct,
                    title: e.target.value,
                  })
                }
              ></textarea>
              <br />
              <textarea
                name=""
                id=""
                cols="20"
                rows="5"
                // value={product.description}
                value={updatedProduct.description}
                onChange={(e) =>
                  setUpdatedProduct({
                    ...updatedProduct,
                    description: e.target.value,
                  })
                }
              ></textarea>

              <br />
              <input
                type="text"
                // value={product.category}
                value={updatedProduct.category}
                onChange={(e) =>
                  setUpdatedProduct({
                    ...updatedProduct,
                    category: e.target.value,
                  })
                }
              />
              <br />
              <input
                type="text"
                // value={product.price}
                value={updatedProduct.price}
                onChange={(e) =>
                  setUpdatedProduct({
                    ...updatedProduct,
                    price: e.target.value,
                  })
                }
              />
              <br />
              <input
                type="text"
                //  value={product.image}
                value={updatedProduct.image}
                onChange={(e) =>
                  setUpdatedProduct({
                    ...updatedProduct,
                    image: e.target.value,
                  })
                }
              />
              <br />
              <p className="desc"></p>
              <br />

              <br />

              <br />

              <br />
              <div className=" for-update-overlay">
                <button
                  className="update-btn close-btn"
                  onClick={updateProduct}
                >
                  Update Product
                </button>
                {/* <button className="close-btn" onClick={closeUpdateOverlay}>
                  Return
                </button> */}
              </div>
            </div>
          </div>
        )}
        {/* end of update overlay */}
      </div>
    </>
  );
}

export default ProductRow;
