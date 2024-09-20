import React from 'react';

const Filters = ({ onGroupingChange, onSortingChange }) => {
  const handleGroupingChange = (e) => {
    onGroupingChange(e.target.value);
  };

  const handleSortingChange = (e) => {
    onSortingChange(e.target.value);
  };

  return (
    <div className="filters">
      <label>
        Group by:
        <select onChange={handleGroupingChange}>
          <option value="status">Status</option>
          <option value="user">User</option>
          <option value="priority">Priority</option>
        </select>
      </label>
      <label>
        Sort by:
        <select onChange={handleSortingChange}>
          <option value="">None</option>
          <option value="priority">Priority</option>
          <option value="title">Title</option>
        </select>
      </label>
    </div>
  );
};

export default Filters;
