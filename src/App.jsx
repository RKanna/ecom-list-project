import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Heading from "./components/Heading.component";
import Search from "./components/Search.component";
import AddProduct from "./components/Add.btn.component";
import Total from "./components/Total.component";
import ProductRow from "./components/ProductRow.component";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <main>
        <Heading />
        <Search />
        <AddProduct />
        <Total />
        <ProductRow />
      </main>
    </>
  );
}

export default App;
