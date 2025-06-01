import React from 'react'
import { User } from '@/lib/types'

const UserCard = ({ user }: { user: User }) => {
  return (
    <div className="max-w-sm mx-auto my-4 bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
      <div className="p-6">
        <h1 className="text-xl font-semibold text-gray-800 mb-2">{user.name}</h1>
        <div className="space-y-1 text-gray-600">
          <p>
            <span className="font-medium text-gray-700">Email:</span> {user.email}
          </p>
          <p>
            <span className="font-medium text-gray-700">Phone:</span> {user.phone}
          </p>
          <p>
            <span className="font-medium text-gray-700">City:</span> {user.city}
          </p>
        </div>
      </div>
    </div>
  )
}

export default UserCard;