import React from 'react'

function Dashboard() {
  return (
    <div className='bg-red-00 w-full h-screen flex gap-4 '>
      <div className='w-full h-[200px] bg-secondary rounded-2xl m-2 flex justify-between items-center text-4xl px-6 shadow-xl'>
        <p>Users</p>
        <p>12</p>
      </div>
      <div className='w-full h-[200px] bg-primary rounded-2xl m-2 flex justify-between items-center text-4xl px-6 shadow-xl'>
        <p>Posts</p>
        <p>12</p>
      </div>
    </div>
  )
}

export default Dashboard