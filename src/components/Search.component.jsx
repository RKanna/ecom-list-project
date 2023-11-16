import { IoIosSearch } from "react-icons/io";
const Search = () => {
  return (
    <div className="search-main">
      <button className="search-btn">
        <IoIosSearch />
      </button>
      <input className="searchBar" type="text" placeholder="Search for title" />
    </div>
  );
};

export default Search;
