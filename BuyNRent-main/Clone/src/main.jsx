import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
// import {BrowserRouter} from 'react-router-dom'
import {createBrowserRouter,RouterProvider} from 'react-router-dom';
import LoginPage from './pages/LoginPage.jsx';
import Layout from './Layout.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import axios from 'axios'
import { UserContextProvider } from './UserContext.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import PlacesPage from './pages/PlacesPage.jsx';
import PlacesFormPage from './pages/PlacesFormPage.jsx';
import IndexPage from './pages/IndexPage.jsx';
import PlacePage from './pages/PlacePage.jsx';
import BookingsPage from './pages/BookingsPage.jsx';
import BookingPage from './pages/BookingPage.jsx';
axios.defaults.baseURL='http://localhost:4000';
axios.defaults.withCredentials = true;
const router = createBrowserRouter([
  {path :'/',
  element : <Layout/>,
  children:[
    {
  path : '/',
  element : <IndexPage />,
},
{
  path : '/register',
  element : <RegisterPage />,
},
{
  path:'/place/:id',
  element:<PlacePage/>
},
{
  path:'/account/bookings',
  element:<BookingsPage/>
},
{
  path:'/account/bookings/:id',
  element:<BookingPage/>
},
{
  path : "/account",
  element : <ProfilePage />,
  
},
{
  path:"/account/places",
  element:<PlacesPage/>,
  
  
},
{
  path:"/account/places/:id",
  element:<PlacesFormPage/>
},
{
  path:'/account/places/new',
  element:<PlacesFormPage/>
},
{
  path:'/login',
  element :<LoginPage/>,
},]}
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserContextProvider>
    <RouterProvider router={router}/>
    </UserContextProvider>
  </React.StrictMode>,
)
