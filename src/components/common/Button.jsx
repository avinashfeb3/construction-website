import React from 'react';
import { Button } from 'react-bootstrap';

const Buttons = ({ 
  primaryText = "Contact Now", 
  secondaryText = "View Projects", 
  onPrimaryClick, 
  onSecondaryClick 
}) => {
  return (
    <div className="mt-4">
      <Button variant="primary" className="large" onClick={onPrimaryClick}>
        {primaryText}
      </Button>
      <Button variant="secondary" className="ms-2 large" onClick={onSecondaryClick}>
        {secondaryText}
      </Button>
    </div>
  );
};

export default Buttons;
