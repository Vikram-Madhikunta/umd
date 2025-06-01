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

  if (loading) return <p className="text-primary">Loading...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="min-h-screen bg-neutral-light px-4 py-8">
      <h1 className="text-3xl font-bold text-primary mb-6">User Dashboard</h1>

      <input
        type="text"
        placeholder="Search by name or city"
        className="w-full p-3 border border-secondary rounded-2xl mb-6 shadow-sm focus:outline-none focus:ring-2 focus:ring-secondary"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <UserCard key={user.id} user={user} />
          ))
        ) : (
          <p className="text-neutral-dark">No users found</p>
        )}
      </div>

      <div className="flex justify-center mt-10">
        <Link href="/dashboard/add">
          <button className="bg-accent text-white px-6 py-3 rounded-xl font-medium hover:bg-accent-dark transition-colors duration-300 shadow-lg">
            ➕ Add New User
          </button>
        </Link>
      </div>
    </div>
  );
};

export default DashboardPage;
