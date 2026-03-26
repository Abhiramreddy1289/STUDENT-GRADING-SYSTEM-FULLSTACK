import React from 'react';

const Card = ({ children, title, className = '', elevated = false }) => {
  const baseClasses = 'bg-white rounded-xl border shadow-sm overflow-hidden';
  const elevation = elevated ? 'shadow-xl ring-1 ring-gray-900/5' : 'shadow-md hover:shadow-lg transition-shadow';

  return (
    <div className={`${baseClasses} ${elevation} ${className}`}>
      {title && (
        <div className="border-b border-gray-200 px-6 py-4 bg-gray-50">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        </div>
      )}
      <div className="p-6">
        {children}
      </div>
    </div>
  );
};

export default Card;
