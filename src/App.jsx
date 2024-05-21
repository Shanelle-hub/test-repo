import React,{useEffect} from 'react'
import Home from './pages/Home/Home'
import Signup from './pages/Signup/Signup'
import Login from './pages/Login/Login'
import { BrowserRouter  as  Router,Routes,Route,useNavigate} from 'react-router-dom'



 const Routers = ()=>{
  return(
  <Router>                         
    <Routes>
        <Route path='/dashboard' exact element={<Home />}/>
        <Route path='/signup' exact element={<Signup />} />
        <Route path='/login' exact element={<Login/>} />
        <Route path='/' element={<Landing/>}/>
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

function Landing() {
  const navigate=useNavigate()
  useEffect(()=>{
 navigate('/dashboard')
  },[])
  return 
}

export default App