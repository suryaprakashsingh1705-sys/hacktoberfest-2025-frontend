import React from 'react';
import { useSelector } from 'react-redux';

export default function Profile() {
  const user = useSelector((state) => state.auth.user) || {};
  const name = user.name || user.fullName || user.username || user.email || 'User';

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Hello, {name} 👋</h1>
      <p className="text-sm text-gray-600">This is your profile page. Only logged-in users can see this.</p>
    </div>
  );
}
