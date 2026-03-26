import React from 'react';
import { IconClose } from './Icons';
import Button from './Button';

const Modal = ({ isOpen, onClose, title, children, confirmLabel = 'Confirm', onConfirm, cancelLabel = 'Cancel' }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between p-6 border-b">
          <h3 className="text-xl font-bold text-gray-900">{title}</h3>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full">
            <IconClose className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6">
          {children}
        </div>
        {(onConfirm || cancelLabel) && (
          <div className="flex gap-3 p-6 pt-0 border-t bg-gray-50 rounded-b-2xl">
            <Button variant="outline" onClick={onClose} className="flex-1">
              {cancelLabel}
            </Button>
            {onConfirm && (
              <Button variant="danger" onClick={onConfirm} className="flex-1">
                {confirmLabel}
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};



export default Modal;
