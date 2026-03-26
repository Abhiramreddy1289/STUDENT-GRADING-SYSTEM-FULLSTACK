import React from 'react';
import { IconClose, IconCheckCircle, IconAlertCircle, IconInfo } from './Icons';

const Notification = ({ id, type, message, onClose }) => {
  const icons = {
    success: IconCheckCircle,
    error: IconAlertCircle,
    info: IconInfo
  };
  const Icon = icons[type] || IconInfo;
  const bgColors = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    info: 'bg-blue-500'
  };

  return (
    <div className={`flex items-start gap-3 p-4 rounded-lg shadow-lg border-l-4 ${bgColors[type || 'info']} text-white max-w-md mx-auto`}>
      <Icon className="w-5 h-5 mt-0.5 flex-shrink-0" />
      <div className="flex-1">
        <p className="font-medium">{message}</p>
      </div>
      <button
        onClick={() => onClose(id)}
        className="ml-2 p-1 -my-1 rounded hover:bg-white/20 transition-colors"
        aria-label="Dismiss"
      >
        <IconClose className="w-4 h-4" />
      </button>
    </div>
  );
};

export default Notification;

