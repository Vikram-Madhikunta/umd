import React from 'react'
import { User } from '@/lib/types'

const UserCard = ({user} : {user:User}) => {
  return (
    <>
    <div className="border mx-2 px-3 my-3 rounded">
        <h1>{user.name}</h1>
    <p>Email : {user.email}</p>
    <p>Phone : {user.phone}</p>
    <p>City : {user.city}</p>
    </div>
    </>
  )
}

export default UserCard;