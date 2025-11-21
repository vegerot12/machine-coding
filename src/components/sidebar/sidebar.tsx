import React, { useState } from "react";
import "./sidebar.css";
import {Menu} from "lucide-react";

function Sidebar() {
    const [isOpen, setIsOpen ]  = useState(false);
  return (
    <div data-testid="sidebar-container" className={`sidebar ${isOpen ? "open" : "close"}`}>
      <button  className="toggle-btn" data-testid="toggle-btn" onClick={()=>setIsOpen(prev => !prev)}>
        <Menu size={24} data-testid="icon-menu"/>
      </button>

      {isOpen && <nav className="nav-menu">
        <ul className="nav-list">
          <li className="nav-item" data-testid="nav-item-home">Home</li>
          <li className="nav-item" data-testid="nav-item-about">About</li>
          <li className="nav-item" data-testid="nav-item-services">Services</li>
          <li className="nav-item" data-testid="nav-item-contact">Contact</li>
        </ul>
      </nav>}
    </div>
  );
}

export default Sidebar;
