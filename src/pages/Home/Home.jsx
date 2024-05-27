import React, { useState,useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import NoteCard from "../../components/Card/NoteCard";
import { MdAdd } from "react-icons/md";
import AddEditNotes from "./AddEditNotes";
import Modal from 'react-modal'
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosinstance";
import Toast from "../../components/ToastMessage/Toast";



function Home() {

  const[userInfo,setUserInfo]=useState(null)
  const[allNotes,setAllNotes]=useState([])
  const [openAddEditModal,setOpenAddEditModal]=useState({
    isShown: false,
    type:"add",
    data:null,
  });
  const [showToastMessage,setShowToastMessage]=useState({
    isShown: false,
    message:"",
    type:"add"
  })
  const showToastMsg=(message,type)=>{
    setShowToastMessage({
      isShown:true,
      message,
      type
    })
  }
   const handleCloseToast= ()=>{
    setShowToastMessage({
      ishShown:false,
      message:""
    })
   }
   
   const navigate=useNavigate()
   const handleEdit =(noteDetails)=>{
   setOpenAddEditModal({isShown:true, data:noteDetails,type:"edit"})
   }
   const getUserInfo= async ()=>{
    try{
      const response = await axiosInstance.get("/get-user")
      if(response.data && response.data.user){
        setUserInfo(response.data.user)
      }
    }
    catch(error){
      if(error.response.status === 401){
        localeStorge.clear()
        navigate('/login')
      }
    }
   }
   const getAllNotes= async ()=>{
    try{
      const response = await axiosInstance.get("/get-all-notes")
      if(response.data && response.data.notes){
        setAllNotes(response.data.notes)
      }
    }
    catch(error){
      console.log("An unexpected error occured  . Please try again .")
    }
   }

   useEffect(()=>{
    getAllNotes()
    getUserInfo()
    return ()=>{}
   },[])

  return (
    
    <div>
      <Navbar  userInfo={userInfo}/>
      <div className="container mx-auto">
        <div className="grid grid-cols-3 gap-4 mt-8">
          {allNotes.map((item,index)=>{
            <NoteCard
            key={item._id}
            title={item.title}
            date={item.createdOn}
            content={item.content}
            tags={item.tags}
            isPinned={item.isPinned}
            onEdit={() => handleEdit()}
            onDelete={() => {}}
            onPinNote={() => {}}
          />
          })}
          
          </div>

          </div>
          <button
            className="w-16 h-16 flex items-center justify-center rounded-2xl bg-primary 
            hover:bg-blue-600 absolute right-10 bottom-10"
            onClick={() => {setOpenAddEditModal({isShown:true,type :"add", data:null})}}
          >
            <MdAdd className='text-[32px]  text-white ' />
          </button>
          <Modal
          isOpen ={openAddEditModal.isShown}
          onRequestClose={()=>{}}
          style={{
            overlay:{
              backgroundColor:"rgba (0,0,0,0.2)"
            },
          }}
          contentLabel=" "
          className="w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 border" >
            <AddEditNotes
            onClose={()=>{ setOpenAddEditModal({isShown:false,type:"add" ,data:null})}}
            type={openAddEditModal.type}
            noteData={openAddEditModal.data}
            getAllNotes = {getAllNotes}
            />
          </Modal>
          <Toast
          ishShown={showToastMessage.isShown}
          message={showToastMessage.message}
          type={showToastMessage.type}
          onClose={handleCloseToast}/>
    </div>
  );
}

export default Home;
