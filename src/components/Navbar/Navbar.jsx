import React, { useState } from 'react'
import ProfileInfo from '../Card/ProfileInfo'
import { useNavigate } from 'react-router-dom'
import SearchBar from '../SearchBar/SearchBar'



function Navbar() {
  const [searchQuery,setSearchQuery]=useState("");
const navigate=useNavigate()

   const onLogOut= ()=>{
    navigate('/login')
   }
   const handleSearch=()=>{
    
   }

  return (
    <div className="bg-white flex items-center justify-between px-6 py-2 drop-shadow">
        <h2 className="text-xl font-medium text-black py-2">Notes </h2>
        <SearchBar value={searchQuery}
        onChange={({target})=>{
          setSearchQuery(target.value)
        }}/>
        <ProfileInfo onLogOut={onLogOut}/>
    </div>
  )
}

export default Navbar