import React from "react";

const Search = ({ onChangeSearch, setSearchValue, resetInputField }) => {
  return (
    <div className="flex items-center justify-center space-x-4">
      <input
        type="text"
        placeholder="search"
        className="w-64 h-12 border p-2"
        onChange={(e) => onChangeSearch(e.target.value)}
        value={setSearchValue}
      />
      <button className="text-cyan-500 uppercase" onClick={resetInputField}>
        clear
      </button>
    </div>
  );
};

export default Search;
