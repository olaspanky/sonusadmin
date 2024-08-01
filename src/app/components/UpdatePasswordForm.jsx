import { useState } from 'react';

const UpdatePasswordForm = () => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setMessage('Passwords do not match.');
      return;
    }

    try {
      const response = await fetch('/api/updatePasswordByEmail', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, newPassword }),
      });

      const data = await response.json();

      if (data.success) {
        setMessage('Password updated and user logged out.');
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      console.error('Error updating password:', error);
      setMessage('An error occurred.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">End Previous Session and Re-login</h2>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="mb-4 relative">
        <label className="block text-gray-700 text-sm font-bold mb-2">New Password:</label>
        <div className='flex justify-between w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500'>
          <input
            type={passwordVisible ? 'text' : 'password'}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            className=""
          />
          <button
            type="button"
            className=" pr-3 flex items-center justify-center text-center text-sm leading-5"
            onClick={() => setPasswordVisible(!passwordVisible)}
          >
            {passwordVisible ? 'Hide' : 'Show'}
          </button>
        </div>
      </div>
      <div className="mb-6 relative">
        <label className="block text-gray-700 text-sm font-bold mb-2">Confirm Password:</label>
        <div className='flex justify-between w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500'>
          <input
            type={passwordVisible ? 'text' : 'password'}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className=""
          />
          <button
            type="button"
            className=" pr-3 flex items-center justify-center text-center text-sm leading-5"
            onClick={() => setPasswordVisible(!passwordVisible)}
          >
            {passwordVisible ? 'Hide' : 'Show'}
          </button>
        </div>
      </div>
      <button
        type="submit"
        className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
      >
        Update
      </button>
      {message && <p className="mt-4 text-center text-sm text-green-500">{message}</p>}
    </form>
  );
};

export default UpdatePasswordForm;
