// components/PasswordModal.js

import React from 'react';
import UpdatePasswordForm from './UpdatePasswordForm';

const PasswordModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded shadow-md">
        <button onClick={onClose} className="text-red-500">Close</button>
        <UpdatePasswordForm />
      </div>
    </div>
  );
};

export default PasswordModal;
