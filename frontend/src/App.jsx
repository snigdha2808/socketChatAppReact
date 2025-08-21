
// import Left from './home/left/left.jsx'
// import Right from './home/right/right.jsx'
// import Logout from './home/Left1/Logout.jsx'
import { Routes, Route } from 'react-router-dom'
import Signup from './components/Signup.jsx'
import Login from './components/Login.jsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      {/* Add more routes as needed */}
      {/* <Logout />
    <Left />
    <Right /> */}
    </Routes>
  )
}

export default App
