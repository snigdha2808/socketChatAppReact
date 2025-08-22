
// import Left from './home/left/left.jsx'
// import Right from './home/right/right.jsx'
// import Logout from './home/Left1/Logout.jsx'
import { Routes, Route, Navigate } from 'react-router-dom'
import Signup from './components/Signup.jsx'
import Login from './components/Login.jsx'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useAuth } from './context/AuthProvider'
import Logout from './home/Left1/Logout.jsx'
import Left from './home/left/left.jsx'
import Right from './home/right/right.jsx'

function App() {
  const {authUser} = useAuth();
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Routes>
        <Route path="/" element={
          authUser ? <div className='flex flex-row h-screen w-full overflow-hidden relative bg-gray-100'>
            <Logout />
            <Left />
            <Right />
          </div> : <Login />
        } />
        <Route path="/chat" element={
          authUser ? <div className='flex flex-row h-screen w-full overflow-hidden relative bg-gray-100'>
            <Logout />
            <Left />
            <Right />
          </div> : <Login />
        } />
        <Route path="/login" element={ authUser ? <Navigate to="/" /> : <Login />} />
        <Route path="/signup" element={ authUser ? <Navigate to="/" /> : <Signup />} />
      </Routes>
    </>
  )
}

export default App
