import React from 'react';
import dot3 from "../assets/dots.svg";
import urgentPriority from "../assets/SVG - Urgent Priority colour.svg";
import highPriority from "../assets/Img - High Priority.svg";
import mediumPriority from "../assets/Img - Medium Priority.svg";
import lowPriority from "../assets/Img - Low Priority.svg";
import noPriority from "../assets/No-priority.svg";

const getPriorityImage = (priority) => {
  switch (priority) {
    case '4':
      return urgentPriority;
    case '3':
      return highPriority;
    case '2':
      return mediumPriority;
    case '1':
      return lowPriority;
    default:
      return noPriority;
  }
};

const TicketCard = ({ ticket }) => {
  return (
    <div className="ticket-card">
      <h4>{ticket.id}</h4>
      <p>{ticket.title}</p>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img 
          src={getPriorityImage(ticket.priority)} // Display the priority image outside the border
          alt='priority' 
          style={{ 
            marginRight: '5px' // Add some space to the right
          }} 
        />
        <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            border: '1px solid #ccc', 
            borderRadius: '4px', 
            padding: '5px', 
            maxWidth: 'fit-content' 
          }}>
          <img 
            src={dot3} 
            alt='dot' 
            style={{ 
              marginRight: '5px', 
            
            }} 
          />
          <p style={{ margin: 0 }}> {ticket.tag}</p> 
        </div>
      </div>
    </div>
  );
};

export default TicketCard;
