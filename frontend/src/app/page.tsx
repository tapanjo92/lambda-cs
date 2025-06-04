export default function Dashboard() {
  // Static data for now
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="bg-white rounded-xl shadow-lg p-10 max-w-2xl w-full">
        <h1 className="text-3xl font-bold mb-4">Lambda Cold Starts Dashboard</h1>
        <table className="table-auto w-full border">
          <thead>
            <tr>
              <th className="border px-4 py-2">Timestamp</th>
              <th className="border px-4 py-2">Tenant</th>
              <th className="border px-4 py-2">Details</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-4 py-2">2024-06-04 13:05</td>
              <td className="border px-4 py-2">demo-tenant</td>
              <td className="border px-4 py-2">Example cold start</td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  );
}

