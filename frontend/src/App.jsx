
// import Left from './home/left/left.jsx'
// import Right from './home/right/right.jsx'
// import Logout from './home/Left1/Logout.jsx'
import { Routes, Route } from 'react-router-dom'
import Signup from './components/Signup.jsx'
import Login from './components/Login.jsx'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
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
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {/* Add more routes as needed */}
        {/* <Logout />
      <Left />
      <Right /> */}
      </Routes>
    </>
  )
}

export default App
