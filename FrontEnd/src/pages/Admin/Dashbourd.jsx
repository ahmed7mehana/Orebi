import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deleteProd, getAllProd } from '../../redux/apiCall/productsCall';

import Users from './User';
import AdminProducts from './AdminProducts';

function Dashbourd() {
  const [prods,setProducts]=useState(false)
const [users,setUsers]=useState(true)

const dispatch = useDispatch();

useEffect(() => {
  dispatch(getAllProd());
}, []);




const handleuser=()=>{
  
  setUsers(true)
  setProducts(false)

}
const handleprod=()=>{
  setUsers(false)
  setProducts(true)
}

  return (
    <div className='flex flex-wrap '>
      
<div className=' bg-[#6d6d6d] lg:w-[150px]  w-full lg:min-h-screen'>
  <div className='py-3 px-2 text-center flex flex-col w-full'>
    <a>
    <button className=' bg-white rounded-lg mt-2 p-1 w-full' onClick={handleuser}> Users</button>
    </a>
    <a>
    <button className=' bg-white rounded-lg mt-2 p-1 w-full' onClick={handleprod}> Products</button>
    </a>
  </div>
</div>

<div className=' bg-[#bdbdbd] w-[60%] flex-grow min-h-screen justify-center'>
{users?(
<div className='sm:p-5'>
<Users/>
</div>
):""}

{prods?(
 <AdminProducts  /> 
):""}


</div>

    </div>
  )
}

export default Dashbourd
