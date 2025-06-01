import Link from "next/link";

export default function Home() {
  return (
    <>
      <h1 className="text-center text-3xl font-bold py-4">
        👥 User Management Dashboard
      </h1>

      <div className="text-center bg-gradient-to-r from-blue-500 to-purple-600  p-6 rounded-lg shadow-md max-w-md mx-auto mt-8">
    <h1 className="font-bold text-2xl mb-4 text-gray-800">🚀 Tech Stacks Used</h1>
     <ul className="space-y-2 text-lg text-gray-700">
      <li>⚛️ Next.js + TypeScript</li>
       <li>🎨 Tailwind CSS</li>
       <li>🌐 Fetch API</li>
       <li>🛡️ Zod</li>
       </ul>
       </div>


      <div className="text-center mt-4">
        <Link href="/dashboard" className="text-gray-600 hover:text-white">
          📊 Go to Dashboard Page
        </Link>
      </div>
    </>
  );
}
