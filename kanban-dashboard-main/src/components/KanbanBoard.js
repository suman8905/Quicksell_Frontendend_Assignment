import React from 'react';
import TicketCard from './TicketCard';
import dot3 from "../assets/dots.svg";
import add from "../assets/add.svg";
import urgentPriority from "../assets/SVG - Urgent Priority colour.svg";
import highPriority from "../assets/Img - High Priority.svg";
import mediumPriority from "../assets/Img - Medium Priority.svg";
import lowPriority from "../assets/Img - Low Priority.svg";
import noPriority from "../assets/No-priority.svg";
import todo from "../assets/To-do.svg";
import inprogress from "../assets/in-progress.svg";
import backlog from "../assets/Backlog.svg";

const groupTickets = (tickets, grouping) => {
  if (!Array.isArray(tickets)) {
    console.error('Expected tickets to be an array');
    return {};
  }

  return tickets.reduce((acc, ticket) => {
    const key = ticket[grouping] || 'No Group';
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(ticket);
    return acc;
  }, {});
};

const sortTickets = (tickets, sorting) => {
  if (!Array.isArray(tickets)) return tickets;

  if (sorting === 'priority') {
    return tickets.sort((a, b) => b.priority - a.priority);
  } else if (sorting === 'title') {
    return tickets.sort((a, b) => a.title.localeCompare(b.title));
  }
  return tickets;
};

// Function to map priority levels to labels and images
const getPriorityData = (priority) => {
  switch (priority) {
    case '4':
      return { label: 'Urgent', image: urgentPriority };
    case '3':
      return { label: 'High', image: highPriority };
    case '2':
      return { label: 'Medium', image: mediumPriority };
    case '1':
      return { label: 'Low', image: lowPriority };
    default:
      return { label: 'No Priority', image: noPriority };
  }
};

// Function to map status to labels and images
const getStatusData = (status) => {
  switch (status) {
    case 'Todo':
      return { label: 'To Do', image: todo };
    case 'In progress':
      return { label: 'In Progress', image: inprogress };
    case 'Backlog':
      return { label: 'Backlog', image: backlog };
    default:
      return { label: 'Unknown Status', image: null };
  }
};

const getUserName = (userId, users) => {
  const user = users.find(user => user.id === userId);
  return user ? user.name : 'Unknown User';
};

const KanbanBoard = ({ tickets, grouping, sorting, users }) => {
  const groupedTickets = groupTickets(tickets, grouping);
  const sortedGroupedTickets = Object.keys(groupedTickets).reduce((acc, group) => {
    acc[group] = sortTickets(groupedTickets[group], sorting);
    return acc;
  }, {});

  return (
    <div className="kanban-board">
      {Object.keys(sortedGroupedTickets).map((group) => (
        <div key={group} className="column">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center',margin:"30px" }}>
            <h3>
              {grouping === 'userId' 
                ? getUserName(group, users) 
                : grouping === 'priority'
                ? (
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img 
                      src={getPriorityData(group).image} 
                      alt={getPriorityData(group).label} 
                      style={{ marginRight: '5px' }} 
                    />
                    <span>{`${getPriorityData(group).label} ${group}`}</span>
                  </div>
                ) 
                : grouping === 'status'
                ? (
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img 
                      src={getStatusData(group).image} 
                      alt={getStatusData(group).label} 
                      style={{ marginRight: '5px' }} 
                    />
                    <span>{`${getStatusData(group).label} ${group} (${groupedTickets[group].length})`}</span>
                  </div>
                )
                : group}
            </h3>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img src={add} alt='add' style={{ marginRight: '10px' }} />
              <img src={dot3} alt='done' />
            </div>
          </div>

          {sortedGroupedTickets[group].map((ticket) => (
            <TicketCard key={ticket.id} ticket={ticket} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default KanbanBoard;
