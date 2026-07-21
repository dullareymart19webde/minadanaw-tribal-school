import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

const Input = ({ label, icon: Icon, type = 'text', className, wrapperStyle, ...props }) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword && showPassword ? 'text' : type;

  return (
    <div className="auth-input-group">
      {label && <label>{label}</label>}
      <div className="auth-input-wrapper" style={wrapperStyle}>
        {Icon && <Icon size={18} className="auth-input-icon" />}
        <input 
          type={inputType} 
          className={`auth-input ${className || ''}`} 
          style={isPassword ? { paddingRight: '2.75rem' } : {}}
          {...props} 
        />
        {isPassword && (
          <button 
            type="button" 
            onClick={() => setShowPassword(!showPassword)}
            style={{ 
              position: 'absolute', 
              right: '1rem', 
              top: '50%', 
              transform: 'translateY(-50%)', 
              background: 'none', 
              border: 'none', 
              color: '#9CA3AF', 
              cursor: 'pointer', 
              display: 'flex', 
              alignItems: 'center', 
              padding: 0 
            }}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
    </div>
  );
};

export default Input;
