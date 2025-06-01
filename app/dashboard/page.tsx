// Change all text color classes from text-gray-800, text-lg, text-red-600, etc. to text-black where appropriate.

'use client';

import React, { useEffect, useState } from 'react';
import { User } from '@/lib/types';
import UserCard from '@/components/UserCard';
import { fetchUsers } from '@/lib/api';
import Link from 'next/link';

const DashboardPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        setLoading(true);
        const apiUsers = await fetchUsers();
        const localUsersStr = localStorage.getItem('users');
        const localUsers: User[] = localUsersStr ? JSON.parse(localUsersStr) : [];
        const combinedUsers = [...apiUsers, ...localUsers];
        setUsers(combinedUsers);
        setFilteredUsers(combinedUsers);
      } catch (err) {
        setError('Failed to fetch users');
      } finally {
        setLoading(false);
      }
    };
    loadUsers();
  }, []);

  useEffect(() => {
    const filtered = users.filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.city.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [searchTerm, users]);

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
      <p className="text-black text-lg font-medium animate-pulse">Loading...</p>
    </div>
  );
  if (error) return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
      <p className="text-black text-lg font-medium">{error}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex flex-col items-center px-4 py-10">
      <div className="w-full max-w-5xl bg-white/90 rounded-3xl shadow-2xl p-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <h1 className="text-4xl font-extrabold text-black tracking-tight">User Dashboard</h1>
          <Link href="/dashboard/add">
            <button className="flex items-center gap-2 bg-blue-600 hover:bg-purple-600 text-white px-5 py-2.5 rounded-xl font-semibold shadow transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-600">
              Add New User
            </button>
          </Link>
        </div>

        <div className="mb-8">
          <input
            type="text"
            placeholder="Search by name or city"
            className="w-full p-4 border border-blue-400 rounded-2xl shadow focus:outline-none focus:ring-2 focus:ring-blue-400 bg-neutral-50 text-lg text-black transition"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <div key={user.id} className="transition-transform hover:-translate-y-1 hover:shadow-xl">
                <UserCard user={user} />
              </div>
            ))
          ) : (
            <p className="text-black text-center col-span-full">No users found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
