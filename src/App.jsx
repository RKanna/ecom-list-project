import { useState } from "react";
import "./App.css";
import Heading from "./components/Heading.component";
import Search from "./components/Search.component";
import AddProduct from "./components/Add.btn.component";
import Total from "./components/Total.component";
import ProductRow from "./components/ProductRow.component";

function App() {
  const [count, setCount] = useState(0);
  const [products, setProducts] = useState([]);

  return (
    <>
      <main>
        <Heading />
        <Search />
        <AddProduct products={products} setProducts={setProducts} />
        <Total products={products} />
        <ProductRow products={products} setProducts={setProducts} />
      </main>
    </>
  );
}

export default App;
