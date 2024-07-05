import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { AuthLayout, Login, Signup } from './components/index.js'
import { SignUp, AddBlog, AllBlogs, EditBlog, Home, Blog } from './Pages/PagesIndex.js'


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/Login",
        element: (
          <AuthLayout>
            <Login />
          </AuthLayout>
        )
      },
      {
        path: "/SignUp",
        element: (
          <AuthLayout authentication={false}>
            <SignUp />
          </AuthLayout>
        ),
      },
      {
        path: "/AllBlogs",
        element: (
          <AuthLayout authentication>
            {" "}
            <AllBlogs />
          </AuthLayout>
        ),
      },
      {
        path: "/AddBlog",
        element: (
          <AuthLayout authentication>
            {" "}
            <AddBlog />
          </AuthLayout>
        ),
      },
      {
        path: "/edit-post/:slug",
        element: (
          <AuthLayout authentication>
            {" "}
            <EditBlog />
          </AuthLayout>
        ),
      },
      {
        path: "/post/:slug",
        element: <Blog />,
      },
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)