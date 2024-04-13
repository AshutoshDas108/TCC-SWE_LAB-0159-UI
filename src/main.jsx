import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {RouterProvider, createBrowserRouter, createRoutesFromElements, Route} from 'react-router-dom'
import Home from "./components/Home/Home.jsx";
import Root from './Root.jsx'
import Login from './components/Auth/Login.jsx'
import Register from './components/Auth/Register.jsx'
import Trucks from './components/Trucks/Trucks.jsx'
import Consignments from './components/Consignments/Consignments.jsx'
import About from './components/About/About.jsx'
import AllEmployees from './components/Employee/AllEmployees.jsx'
import EmployeeDetail from './components/Employee/EmployeeDetails.jsx'
import Offices from './components/Offices/Offices.jsx'
import OfficeDetails from './components/Offices/OfficeDetails.jsx'
import TruckDetails from './components/Offices/InternalOfficeDetails/TruckDetails.jsx'
import TruckDetail from './components/Trucks/TruckDetail.jsx'
import Bills from './Bills/Bills.jsx'


const router = createBrowserRouter(
  createRoutesFromElements(
      <Route path='/' element={<Root/>}>
          <Route path='' element={<Home/>} />
          <Route path='login' element={<Login/>} />
          <Route path='register' element={<Register/>} />
          <Route path ='trucks' element={<Trucks/>} />
          <Route path ='trucks/:id' element={<TruckDetail/>}/>
          <Route path ='consignments' element={<Consignments/>} />
          <Route path="bills" element={<Bills/>} />
          <Route path='about' element={<About/>} />
          <Route path='employees' element={<AllEmployees/>} />
          <Route path='employees/:id' element ={<EmployeeDetail/>}/>
          <Route path='offices' element={<Offices/>} />
          <Route path='offices/:id' element={<OfficeDetails/>} />
          <Route path='consignments' element={<Consignments/>}/>
      </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
