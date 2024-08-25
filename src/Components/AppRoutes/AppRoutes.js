import React from 'react'
import {  Route, Routes } from 'react-router-dom'
import Dashboard from '../../Pages/Dashboard'
import Orders from '../../Pages/Orders'
import Customers from '../../Pages/Customers'
import Inventory from '../../Pages/Inventory'

const AppRoutes = () => {
  return (
        <Routes>
            <Route path='/' element={<Dashboard/>}></Route>
            <Route path='/inventory' element={<Inventory/>}></Route>
            <Route path='/orders' element={<Orders/>}></Route>
            <Route path='/Customers' element={<Customers/>}></Route>
        </Routes>
  )
}

export default AppRoutes;