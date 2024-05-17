import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import NoteCard from "../../components/Card/NoteCard";
import { MdAdd } from "react-icons/md";
import AddEditNotes from "./AddEditNotes";
import {Modal} from 'react-modal'


function Home() {

  const [openAddEditModal,setOpenAddEditModal]=useState({
    isShown: false,
    type:"add",
    data:null,
  });

  return (
    
    <div>
      <Navbar />
      <div className="container mx-auto">
        <div className="grid grid-cols-3 gap-4 mt-8">
          <NoteCard
            title="Meeting on 7th April"
            date="3rd Apr 2024"
            content="Meeting on 7th April"
            tags="Meeting"
            isPinned={true}
            onEdit={() => {}}
            onDelete={() => {}}
            onPinNote={() => {}}
          />
          </div>
          <button
            className="w-16 h-16 flex items-center justify-center rounded-2xl bg-primary 
            hover:bg-blue-600 absolute right-10 bottom-10"
            onClick={() => {}}
          >
            <MdAdd className='text-[32px]  text-white ' />
          </button>
          {/* <Modal
          isOpen ={openAddEditModal.isShown}
          onRequestClose={()=>{}}
          style={{
            overlay:{
              backgroundColor:"rgba (0,0,0,0.2)"
            },
          }}
          contentLabel=" "
          className="">
          </Modal> */}
          <AddEditNotes/>
      </div>
    </div>
  );
}

export default Home;