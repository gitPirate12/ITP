import { useState } from "react";

const SearchFilter = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search by name or category"
        value={searchTerm}
        onChange={handleSearchChange}
      />
    </div>
  );
};

export default SearchFilter;
