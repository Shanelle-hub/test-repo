import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import NoteCard from "../../components/Card/NoteCard";
import { MdAdd } from "react-icons/md";
import AddEditNotes from "./AddEditNotes";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosinstance";
import Toast from "../../components/ToastMessage/Toast";
import EmptyCard from "../../components/EmptyCard/EmptyCard";
import AddNotesImg from "../../../public/images/add-notes.svg";
import NoDataImg from "../../../public/images/no-data.svg";

function Home() {
  const [userInfo, setUserInfo] = useState(null);
  const [allNotes, setAllNotes] = useState([]);
  const [isSearch, setIsSearch] = useState(false);
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });
  const [showToastMessage, setShowToastMessage] = useState({
    isShown: false,
    message: "",
    type: "add",
  });
  const showToastMsg = (message, type) => {
    setShowToastMessage({
      isShown: true,
      message,
      type,
    });
  };
  const handleCloseToast = () => {
    setShowToastMessage({
      ishShown: false,
      message: "",
    });
  };

  const navigate = useNavigate();
  const handleEdit = (noteDetails) => {
    setOpenAddEditModal({ isShown: true, data: noteDetails, type: "edit" });
  };
  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/get-user");
      if (response.data && response.data.user) {
        setUserInfo(response.data.user);
      }
    } catch (error) {
      if (error.response.status === 401) {
        localeStorge.clear();
        navigate("/login");
      }
    }
  };
  const getAllNotes = async () => {
    try {
      const response = await axiosInstance.get("/get-all-notes");
      if (response.data && response.data.notes) {
        setAllNotes(response.data.notes);
      }
    } catch (error) {
      console.log("An unexpected error occured  . Please try again .");
    }
  };
  const deleteNotes = async (data) => {
    const noteId = data._id;
    try {
      const response = await axiosInstance.post("/delete-note", +noteId);
      if (response.data && response.data.note) {
        showToastMessage("Note Deleted  successfully !");
        getAllNotes();
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        console.log("An unexpected error occured  . Please try again .");
      }
    }
  };

  const onSearchNote = async (query) => {
    try {
      const response = await axiosInstance.post("/search-note", {
        params: { query },
      });
      if (response.data && response.data.note) {
        setIsSearch(true);
        setAllNotes(response.data.notes);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClearSearch = async () => {
    setIsSearch(false);
    getAllNotes();
  };
   const updateIsPinned = async (noteData)=>{
    const noteId = noteData._id;
    try {
      const response = await axiosInstance.post("/update-note-pinned", +noteId,{
        isPinned: ! noteData.isPinned
      });
      if (response.data && response.data.note) {
        showToastMessage("Note Deleted  successfully !");
        getAllNotes();
        onClose()
      }
    } catch (error) {
      
        console.log(error);
    }
  };
   
   

  useEffect(() => {
    getAllNotes();
    getUserInfo();
    return () => {};
  }, []);

  return (
    <div>
      <Navbar
        userInfo={userInfo}
        onSearchNote={onSearchNote}
        handleClearSearch={handleClearSearch}
      />
      <div className='container mx-auto'>
        {allNotes.length > 0 ? (
          <div className='grid grid-cols-3 gap-4 mt-8'>
            {allNotes.map((item, index) => {
              <NoteCard
                key={item._id}
                title={item.title}
                date={item.createdOn}
                content={item.content}
                tags={item.tags}
                isPinned={item.isPinned}
                onEdit={() => handleEdit(item)}
                onDelete={() => deleteNotes(item)}
                onPinNote={() =>updateIsPinned(item)}
              />;
            })}
          </div>
        ) : (
          <EmptyCard
            imgSrc={isSearch ? NoDataImg : AddNotesImg}
            message={isSearch ?`Ooops ! No notes found your search `:`start creating your notes click the 'Add' button to 
          join ideas and thoughts , ideas and reminders  .Let's get started `}
          />
        )}
      </div>
      <button
        className='w-16 h-16 flex items-center justify-center rounded-2xl bg-primary 
            hover:bg-blue-600 absolute right-10 bottom-10'
        onClick={() => {
          setOpenAddEditModal({ isShown: true, type: "add", data: null });
        }}
      >
        <MdAdd className='text-[32px]  text-white ' />
      </button>
      <Modal
        isOpen={openAddEditModal.isShown}
        onRequestClose={() => {}}
        style={{
          overlay: {
            backgroundColor: "rgba (0,0,0,0.2)",
          },
        }}
        contentLabel=' '
        className='w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 border'
      >
        <AddEditNotes
          onClose={() => {
            setOpenAddEditModal({ isShown: false, type: "add", data: null });
          }}
          type={openAddEditModal.type}
          noteData={openAddEditModal.data}
          getAllNotes={getAllNotes}
          showToastMessage={showToastMsg}
        />
      </Modal>
      <Toast
        ishShown={showToastMessage.isShown}
        message={showToastMessage.message}
        type={showToastMessage.type}
        onClose={handleCloseToast}
      />
    </div>
  )
}

export default Home;
