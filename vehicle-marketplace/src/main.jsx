import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Contact } from "./contact"
import { Home } from "./home"


const router = createBrowserRouter([
   {
    path:'/',
    element:<Home/>
   },

   {
    path:'/contact',
    element:<Contact/>
   },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <RouterProvider router={router}/>
  </StrictMode>
)
