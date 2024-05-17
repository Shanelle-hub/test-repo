import React from "react";
import { getInitials } from "../../utils/helper";

function ProfileInfo({ onLogOut }) {
  return (
    <div className='flex items-center gap-3'>
      <div className='w-12 h-12  flex items-center justify-content-center rounded-full text-slate-950 font-medium bg-slate-100'>
        {getInitials("John Williams")}
      </div>
      <div>
        <p className='text-sm font-medium'>John William</p>
        <button className='text-sm text-slate underline' onClick={onLogOut}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default ProfileInfo;
