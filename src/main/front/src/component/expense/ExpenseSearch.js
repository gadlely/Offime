import React, { useState } from "react";

const ExpenseSearch = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    onSearch(searchTerm);
  };

  return (
    <div className="">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="검색어"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input input-max input-txt fs_md mb_md mt_sm"
          style={{borderRadius:"8px"}}
        />
        <button className="display_none">검색</button>
      </form>
    </div>
  );
};

export default ExpenseSearch;
