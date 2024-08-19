import React from 'react';
import SearchBar from './SearchBar';
import Toggle from './Toggle';
import Sublink from './Sublink';

const Submenu = ({ isNightMode, onToggle }) => {
  return (
    <div className="submenu">
      <Toggle isNightMode={isNightMode} onToggle={onToggle} />
      <Sublink />
      <SearchBar />
    </div>
  );
};

export default Submenu;
