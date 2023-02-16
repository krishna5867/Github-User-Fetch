import './App.css';
import {Routes, Route} from 'react-router-dom'
import Home from "./components/Home"
import Login from "./components/Login"
import Register from "./components/Register"
import FetchUser from "./components/FetchUsers"
import Navbar from './components/Navbar'


function App() {
  
  return(
    <>
      <Navbar/>
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/createuser" element={<Register />}></Route>
      <Route path="/getuser" element={<FetchUser />}></Route>
      </Routes>
    </>
  )

}

export default App;
