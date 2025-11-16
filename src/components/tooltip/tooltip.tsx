import  { Component } from 'react';
import './tooltip.css'; 

class Tooltip extends Component {
  
  render() {
    const icons = [
      { emoji: '🏠', label: 'Home' },
      { emoji: '📧', label: 'Email' },
      { emoji: '⚙️', label: 'Settings' }
    ];

    return (
      <div className="tooltip-container">

        {icons.map((icon, index) => (
             
          <div
            key={index}
            className="tooltip-item"
          >
           <div className='tooltip'>{icon.label}</div>
            <span>{icon.emoji}</span>
           
          </div>
        ))}
      </div>
    );
  }
}

export default Tooltip;
