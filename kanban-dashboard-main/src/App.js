import React, { useState, useEffect } from 'react';
import KanbanBoard from './components/KanbanBoard';
import display from "./assets/Display.svg";
import './App.css';

const App = () => {
  const [tickets, setTickets] = useState([]);
  const [grouping, setGrouping] = useState('status'); // Default grouping
  const [sorting, setSorting] = useState('priority'); // Default sorting
  const [users, setUsers] = useState([]);
  const [dropdownVisible, setDropdownVisible] = useState(false); // State for dropdown visibility

  useEffect(() => {
    fetch('https://api.quicksell.co/v1/internal/frontend-assignment')
      .then(response => response.json())
      .then(data => {
        setTickets(data.tickets);
        setUsers(data.users);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleGroupingChange = (event) => {
    setGrouping(event.target.value);
    setDropdownVisible(false); // Hide dropdown after selection
  };

  const handleSortingChange = (event) => {
    setSorting(event.target.value);
    setDropdownVisible(false); // Hide dropdown after selection
  };

  const toggleDropdown = () => {
    setDropdownVisible(prev => !prev); // Toggle dropdown visibility
  };

  return (
    <div className="App">
      <header style={{ position: 'relative' }}>
        <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #ccc', padding: '5px', borderRadius: '4px' }}>
          <img src={display} alt="Display" style={{ marginRight: '10px' }} />
          <div className='cursor-pointer' onClick={toggleDropdown}>
            Display Board
          </div>
        </div>
        {dropdownVisible && (
          <div className="controls" style={{ border: '1px solid #ccc', padding: '10px', position: 'absolute', zIndex: 1 }}>
            <div style={{ display: 'flex' }}>
              <label style={{ display: 'block', marginRight: '90px', marginTop: "2px" }}>Grouping:</label>
              <select onChange={handleGroupingChange} value={grouping}>
                <option value="status">Status</option>
                <option value="userId">User</option>
                <option value="priority">Priority</option>
              </select>
            </div>
            <div style={{ marginTop: '10px', display: 'flex' }}>
              <label style={{ display: 'block', marginRight: '90px', marginTop: "2px" }}>Ordering:</label>
              <select onChange={handleSortingChange} value={sorting}>
                <option value="priority">Priority</option>
                <option value="title">Title</option>
              </select>
            </div>
          </div>
        )}
      </header>
      <KanbanBoard tickets={tickets} grouping={grouping} sorting={sorting} users={users} />
    </div>
  );
};

export default App;
