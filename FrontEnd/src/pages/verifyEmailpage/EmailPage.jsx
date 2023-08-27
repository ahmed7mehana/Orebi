import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { verifyEmail } from '../../redux/apiCall/authCall';

function EmailPage() {
    const dispatch = useDispatch();

    const { isEmailVerified } = useSelector(state => state.auth);
  
    const {userId ,token , userid ,id} = useParams();
  

    useEffect(() => {
      dispatch(verifyEmail(id, token));
    }, [id, token]);
  
  return (
    <div className=' h-screen' 
    style={{ backgroundImage: "url('https://i.pinimg.com/564x/cd/db/fe/cddbfe1851459ab890963a4a184ddc55.jpg')" }}
    >
<div className=' flex flex-col items-center absolute left-[50%]  top-[50%] translate-x-[-50%] translate-y-[-50%] transform bg-white p-5 rounded-lg uppercase text-[20px]'>

{isEmailVerified ? (
    <>
      <i className="bi bi-patch-check verify-email-icon"></i>
      <h1 className="verfiy-email-title">
        Your email address has been successfully verified
      </h1>
      <a href="/signin" className="  cursor-pointer font-bold text-red-300 hover:text-red-500 duration-300">
        Go To Login Page
      </a>
    </>
  ) : (
    <>
      <h1 className="verify-email-not-found">Not Found</h1>
    </>
  )}
</div>


    </div>
  )
}

export default EmailPage