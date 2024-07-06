import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import './App.css'
import authservice from './appwrite/auth'
import { Footer, Header } from './components'
import { login, logout } from './store/authSlice'
import { Outlet } from 'react-router-dom'

function App() {

  const [loading, setloading] = useState(true);
  const dispatch = useDispatch()

  // Here with the help of the appwrite services we get the userData and if user is present (userdata available) then we directly login with the help of the useDispatch() the user otherwise we show the logout at every useEffect time (relode Time)
  useEffect(() => {
    authservice.getCurrentUser() // here we check the current user from the appwrite services.
      .then((userData) => {
        if (userData) { 
          dispatch(login({userData}))  // if user data present that means that user is Active so we can directly dispatch the  login method from the  store/authSlice and from that also state of the user also change in the Store.
        } else {
          dispatch(logout()) // if user data is not present thet means that user has no account so we can directly call the logout from the Store/authSlice and from that also state of the user also change in the Store.
        }
      })
      .finally(() => setloading(false))
  }, [])


  // below code is for the batter optimization code of the loding.
  return !loading ? (
    <div className='min-h-sc flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : null


}

export default App
