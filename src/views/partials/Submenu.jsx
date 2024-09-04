import React from 'react';
import SearchBar from './SearchBar';
import Toggle from './Toggle';
import Sublink from './Sublink';
import Filter from './Filter';

const Submenu = ({ isNightMode, onToggle, onFilterChange, showFilterMenu = false }) => {
  return (
    <div className="submenu">
      <Toggle isNightMode={isNightMode} onToggle={onToggle} />
      <Sublink />
      {showFilterMenu ? <Filter onFilterChange={onFilterChange} /> : <SearchBar />}
    </div>
  );
};

export default Submenu;
