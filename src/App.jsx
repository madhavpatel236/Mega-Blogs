import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import './App.css'
import authservice from './appwrite/auth'
import { Footer, Header } from './components'
import { login, logout } from './store/authSlice'

function App() {

  const [loading, setloading] = useState(true);
  const dispatch = useDispatch()

  // Here we with the help of the appwrite services we get the userData and if user is present (userdata available) then we directly login with the help of the useDispatch() the user otherwise we show the logout at every useEffect time (relode Time)
  useEffect(() => {
    authservice.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login(userData))
        } else {
          dispatch(logout())
        }
      })
      .finally(() => setloading(false))

  }, [])

  return !loading ? (
    <div className='min-h-sc flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Header />
        <main>
          {/* Outlet */}
        </main>
        <Footer />
      </div>
    </div>
  ) : null

  return (
    <>
      <h1>Blogs App</h1>
    </>
  )
}

export default App
