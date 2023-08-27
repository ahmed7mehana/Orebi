import React, { useState } from 'react'
import CreateForm from '../../components/AdminForm/CreateForm';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProd } from '../../redux/apiCall/productsCall';

function AdminProducts() {
  const dispatch = useDispatch();
  const createHandler=()=>{
    setForm(!Form)
  }
  const [Form,setForm]=useState(false)
  const [update,setUpdate]=useState(false)
  const { Products} = useSelector((state) => state.product)


  const updateForm=(id)=>{
    setUpdate(true)
    console.log(id)
  }

  return (
    <div className='p-5 flex flex-row flex-wrap   '>
    {Products.map((item)=>(
      <div key={item.id} className="w-[250px] m-5  ">
 <div className=" relative group  bg-[#6d6d6d] rounded-lg">
  <div className="max-w-80 max-h-80 relative overflow-y-hidden ">
    <div>
      <img className="w-full h-[300px]" src={item.image.url} />
    </div>
    <div className="w-full h-[300px] absolute bg-white -bottom-[330px] group-hover:bottom-0 duration-700">
      <ul className="w-full h-full flex flex-col items-end justify-center gap-2 font-titleFont px-2 border-l border-r">
        <li className="text-[#767676] hover:text-primeColor text-sm font-normal  hover:border-b-primeColor flex items-center justify-end gap- hover:cursor-pointer pb-1 duration-300 w-full">
          {item.description}
        </li>
  
      </ul>
    </div>
    
  </div>
  <div className="max-w-80 py-6 flex flex-col gap-1 border-[1px] border-t-0 px-4  ">
    <div className="flex items-center justify-between font-titleFont flex-wrap ">
      <h2 className="text-lg text-primeColor font-bold">
        {item.title}
      </h2>
      <p className="text-[#fcfcfc] text-[14px]">${item.price}</p>
    </div>
    <div>
      <p className="text-[#767676] text-[14px]">{item.color}</p>
    </div>
  </div>

{item.id !== "64ea9b417847addb1001bb6c"?(
  <div className=' m-2 text-center hover:bg-red-600 duration-500 p-2  rounded-lg '>
  <button className= '   rounded-lg' onClick={()=>dispatch(deleteProd(item.id))}>Delete</button>
  </div>
):""}


</div> 


  {Form?(
    <CreateForm item={item} Form={Form} setForm={setForm} />
  ):""}
      </div>
  
    ))}
    
    <button onClick={createHandler} className='bg-[#6d6d6d] p-5 rounded-lg m-auto'>Create New Item</button>
  
  </div>
  )
}

export default AdminProducts