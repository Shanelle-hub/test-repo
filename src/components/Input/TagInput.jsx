import React, { useState } from "react";
import { MdAdd, MdClose } from "react-icons/md";

function TagInput({ tags, setTags }) {
  const [inputValue, setInputValue] = useState("");
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  const addNewTag = () => {
    const newInput = inputValue.split(" ").join("")
    if (newInput !== "") {
      setTags([...tags, newInput]);
      setInputValue("");
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      addNewTag();
    }
  };
  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };
  return (
    <div className='flex  flex-col items-start gap-4 mt-3'>
      {tags?.length > 0 && (
        <div className='flex items-center gap-2  flex-wrap mt-2 '>
          {tags.map((tag, index) => (
            <span
              key={index}
              className='flex items-center gap-2 text-sm text-slate-900 bg-slate-100 px-3 py-1 rounded '
            >
              #{tag}
              <button
                onClick={() => {
                  handleRemoveTag(tag);
                }}
              >
                <MdClose />
              </button>
            </span>
          ))}
        </div>
      )}
      <div className="flex items-center w-full gap-3">
      <input
      value={inputValue}
        type='text'
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        className=' flex-1  text-sm bg-transparent-border border-2 px-3 py-2 rounded outline-none'
        placeholder='Add tags '
      />
      <button
        className='w-8 h-8 flex items-center justify-center  rounded border border-blue-700 hover:bg-blue-700'
        onClick={() => 
          addNewTag()
        }
      >
        <MdAdd className='text-2xltext-blue-700 hover:text-white' />
      </button>
      </div>
    </div>
  );
}

export default TagInput;
