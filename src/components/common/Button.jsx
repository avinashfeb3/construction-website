import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Buttons = ({ 
  primaryText = "Contact Now", 
  secondaryText = "View Projects", 
  onPrimaryClick, 
  onSecondaryClick 
}) => {
  return (
    <div className="mt-4">
      <Link to="/contact">
        <Button variant="primary" className="large" onClick={onPrimaryClick}>
          {primaryText}
        </Button>
      </Link>
      <Link to="/projects">
        <Button variant="secondary" className="ms-2 large" onClick={onSecondaryClick}>
          {secondaryText}
      </Button>
      </Link>
    </div>
  );
};

export default Buttons;
