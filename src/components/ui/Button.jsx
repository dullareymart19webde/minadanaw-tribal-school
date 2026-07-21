import React from 'react';
import { Loader2 } from 'lucide-react';

const Button = ({ children, isLoading, className, style, ...props }) => {
  return (
    <button 
      className={`auth-btn ${className || ''}`} 
      disabled={isLoading || props.disabled}
      style={style}
      {...props}
    >
      {isLoading ? (
        <Loader2 size={20} style={{ animation: 'spin 1s linear infinite' }} />
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
