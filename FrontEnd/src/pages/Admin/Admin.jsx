import React, { useState } from 'react'
import { Form, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'

function Admin() {
const [name,setName]=useState('')
const [pass,setPass]=useState('')
const navigate=useNavigate()
  const handlesub=()=>{
if(name==='ahmed' || pass === '123456'){
navigate('/Dashbourd')
}else if(name === " " || pass === " "){
  toast.error("where password and name ?");
}else{
  toast.error("you are not admin");

}
  }
  return (
    <div className=' h-screen' 
    style={{ backgroundImage: "url('https://i.pinimg.com/564x/cd/db/fe/cddbfe1851459ab890963a4a184ddc55.jpg')" }}
    >
<div className='absolute left-[50%]  top-[50%] translate-x-[-50%] translate-y-[-50%] transform bg-white p-5 rounded-lg uppercase text-[20px]'>

<Form className=' flex flex-col p-5 '>
   <label>name</label>
   <input type='text' placeholder='enter your name ' className='px-3' value={name} onChange={(e)=>setName(e.target.value)}/>
   <label>password</label>
   <input type='password' placeholder='enter your password ' className='px-3' value={pass} onChange={(e)=>setPass(e.target.value)}/>
   <button onClick={handlesub} className=' bg-green-500 rounded-lg m-3 mt-5'>Submit</button>
</Form>

</div>
<ToastContainer />


    </div>
  )
}

export default Admin