import { useState } from "react";
import "./App.css";
import Heading from "./components/Heading.component";
import Search from "./components/Search.component";
import AddProduct from "./components/Add.btn.component";
import Total from "./components/Total.component";
import ProductRow from "./components/ProductRow.component";

function App() {
  const [products, setProducts] = useState([]);
  const [searchText, setSearchText] = useState("");

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <>
      <main>
        <Heading />
        <Search searchText={searchText} setSearchText={setSearchText} />
        <AddProduct products={products} setProducts={setProducts} />
        <Total products={products} />
        <ProductRow products={filteredProducts} setProducts={setProducts} />
      </main>
    </>
  );
}

export default App;
