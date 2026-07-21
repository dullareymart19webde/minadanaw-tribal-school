import React from 'react';

const Card = ({ children, className, style, ...props }) => {
  return (
    <div 
      className={`glass-card ${className || ''}`} 
      style={{ padding: '1.5rem', ...style }} 
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
