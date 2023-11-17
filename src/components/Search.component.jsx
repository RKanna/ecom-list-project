import { IoIosSearch } from "react-icons/io";
const Search = ({ searchText, setSearchText }) => {
  return (
    <div className="search-main">
      <button className="search-btn">
        <IoIosSearch />
      </button>
      <input
        className="searchBar"
        type="text"
        placeholder="Search for title"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
    </div>
  );
};

export default Search;
