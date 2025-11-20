import React from 'react'
import CustomLayout from '../components/layout/CustomLayout'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import UsersList from './users/UsersList'
import Dashboard from './Dashboard'
import UsersForm from './users/UsersForm'

function Page() {
  return (
    <div>
      <CustomLayout>


        <Routes>
          <Route
            path="/"
            element={<Dashboard />}
          />


          {/* Users */}

          <Route
            path="users"
            element={<UsersList />}
          />
          <Route
            path="users/usersform"
            element={<UsersForm />}
          />
        </Routes>

      </CustomLayout>
    </div>
  )
}

export default Page