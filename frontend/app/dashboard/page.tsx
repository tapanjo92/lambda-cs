'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getCurrentUserSession } from '../../lib/auth';
import { userPool } from '../../lib/cognito';

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    getCurrentUserSession().then(session => {
      if (!session) {
        router.replace('/login');
      } else {
        setLoading(false);
      }
    });
  }, [router]);

  const handleLogout = () => {
    const user = userPool.getCurrentUser();
    if (user) {
      user.signOut();
      window.location.href = '/login';
    }
  };

  if (loading) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  const data = [
    { timestamp: '2024-06-04 13:05', tenant: 'demo-tenant', details: 'Sample cold start event' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-6">
        <button
          className="mb-4 px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600"
          onClick={handleLogout}
        >
          Logout
        </button>
        <h1 className="text-2xl font-bold mb-4">Lambda Cold Starts Dashboard</h1>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="border-b p-2">Timestamp</th>
              <th className="border-b p-2">Tenant</th>
              <th className="border-b p-2">Details</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr key={i}>
                <td className="border-b p-2">{row.timestamp}</td>
                <td className="border-b p-2">{row.tenant}</td>
                <td className="border-b p-2">{row.details}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

