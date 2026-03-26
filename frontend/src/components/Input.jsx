import React from 'react';

const Input = ({ label, error, success, type = 'text', value, onChange, className = '', required = false, iconStart, ...props }) => {
  const baseClasses = 'w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-1 transition-all duration-200 text-base';
  
  const stateClasses = {
    default: 'border-gray-300 bg-white text-gray-900 focus:ring-blue-500 focus:border-blue-500',
    error: 'border-red-500 bg-red-50 text-red-900 focus:ring-red-500 focus:border-red-500',
    success: 'border-green-500 bg-green-50 text-green-900 focus:ring-green-500 focus:border-green-500'
  };

  const state = error ? 'error' : success ? 'success' : 'default';

  return (
    <div className={`space-y-1 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <div className="relative">
        {iconStart && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {iconStart}
          </div>
        )}
        <input
          type={type}
          value={value}
          onChange={onChange}
          className={`${baseClasses} ${stateClasses[state]} ${iconStart ? 'pl-10' : ''}`}
          aria-invalid={!!error}
          aria-describedby={error ? 'error-msg' : undefined}
          {...props}
        />
      </div>
      {error && (
        <p id="error-msg" className="text-sm text-red-600 mt-1">{error}</p>
      )}
      {success && (
        <p className="text-sm text-green-600 mt-1">{success}</p>
      )}
    </div>
  );
};

export default Input;
