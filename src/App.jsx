import React,{useEffect} from 'react'
import Home from './pages/Home/Home'
import Signup from './pages/Signup/Signup'
import Login from './pages/Login/Login'
import { BrowserRouter  as  Router,Routes,Route,useNavigate} from 'react-router-dom'



 const Routers = ()=>{
  return(
  <Router>                         
    <Routes>
         <Route path='/' element={<Landing/>}/>
        <Route path='/dashboard'  element={<Home />}/>
        <Route path='/signup'  element={<Signup />} />
        <Route path='/login'  element={<Login/>} />
       </Routes>
    </Router>
    )
  }  

function App() {
  return (
    <div>
      <Routers/>
    </div>
  )
}
function Landing(){
  const navigate =useNavigate()
  return(
    navigate('/dashboard')
  )
}


export default App