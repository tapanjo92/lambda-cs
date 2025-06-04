import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-2xl shadow-xl">
        <h1 className="text-3xl font-bold mb-6">Welcome to Lambda ColdStart SaaS</h1>
        <Link href="/login">
          <span className="px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-semibold">
            Login to Continue
          </span>
        </Link>
      </div>
    </main>
  );
}

