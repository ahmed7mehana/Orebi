import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfile, } from '../../redux/apiCall/User';


function Profile() {
    const { profile } = useSelector((state) => state.profile);
    const { user } = useSelector((state) => state.auth);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUserProfile(user?._id));
        window.scrollTo(0, 0);
      }, [user?._id]);



  return (
    <div
    className=' h-[100vh] bg-no-repeat bg-cover'
    style={{ backgroundImage: "url('https://images.pexels.com/photos/4068314/pexels-photo-4068314.jpeg?auto=compress&cs=tinysrgb&w=1000')" }}

    >
<div className=' text-center w-full lg:w-[50%] flex flex-col justify-center items-center absolute left-[50%]  top-[60%] translate-x-[-50%] translate-y-[-50%] transform bg-white p-5 rounded-lg uppercase text-[20px]'>

    <>
      <i className="bi bi-patch-check verify-email-icon"></i>
      <img src={profile?.profilePhoto?.url} width={100} height={100} className=' rounded-lg'/>
      <h1 className="verfiy-email-title uppercase">
        hi {profile?.username} i hope you ingoy shoping here 
      </h1>
      <a href="/shop" className="  cursor-pointer font-bold text-red-300 hover:text-red-500 duration-300">
        Keep shoping !?
      </a>
    </>

</div>        

        </div>
  )
}

export default Profile