'use client';

export default function DashboardPage() {
  // Static mock data
  const data = [
    {
      timestamp: '2024-06-04 13:05',
      tenant: 'demo-tenant',
      details: 'Sample cold start event'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-6">
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
