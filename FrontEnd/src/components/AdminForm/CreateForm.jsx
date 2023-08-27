import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createProduct, updateProdImage } from '../../redux/apiCall/productsCall'
import { toast } from 'react-toastify'
import { AiFillCloseCircle } from "react-icons/ai";
function CreateForm({item,Form,setForm}) {
const [title , setTitle]=useState()
const [description , setdescription]=useState()
const [category , setcategory]=useState()
const [price , setprice]=useState()
const [file,setFile] = useState(null);

const dispatch = useDispatch();
  const SubmitHandler = (e,id) => {
    e.preventDefault();
    if (title.trim() === "") return toast.error("Post Title is required");
    if (description.trim() === "") return toast.error("Post Description is required");
    if (category.trim() === "") return toast.error("Post category is required");
    if (!file) return toast.error("Post Image is required");

const formData = new FormData();
    formData.append("image", file);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("price", price);

    dispatch(createProduct(formData));

    setForm(false)
    setTimeout(()=>{window.location.reload()}, 2000);
  };
  

  return (
    <div >

    <form key={item.id} className=" bg-[#e0e0e0] rounded-lg p-5 w-[80%] fixed left-[50%]  top-[50%] translate-x-[-50%] translate-y-[-50%] ">
  
  <div className=' flex flex-row justify-between m-3'>
    <input
        type="file"
        name="file"
        id="file"
        className="create-post-upload"
        onChange={(e) => setFile(e.target.files[0])}
      />
    <AiFillCloseCircle size={30}  className=' cursor-pointer text-[#6d6d6d]' onClick={()=>setForm(false)}/>

  </div>


    <div className="mb-4">
      <label htmlFor="title" className="block text-gray-700 font-medium">title</label>
      <input
        type="text"
        name="title"
        value={title}
        placeholder={'what is new item ?'}
        onChange={(e) => setTitle(e.target.value)}
        className="mt-1 px-4 py-2 w-full border rounded focus:outline-none focus:border-blue-500"
        required
      />
    </div>
    <div className="mb-4">
      <label htmlFor="description" className="block text-gray-700 font-medium">description</label>
      <input
        type="text"
        name="description"
        value={description}
        placeholder={'write what binfet in this item ?'}

        onChange={(e) => setdescription(e.target.value)}
        className="mt-1 px-4 py-2 w-full border rounded focus:outline-none focus:border-blue-500"
        required
      />
    </div>
    <div className="mb-4">
    <label htmlFor="category" className="block text-gray-700 font-medium">category</label>
    <input
      type="category"
      value={category}
      placeholder={'what category rhis item belonge to ? '}
      onChange={(e) => setcategory(e.target.value)}
      className="mt-1 px-4 py-2 w-full border rounded focus:outline-none focus:border-blue-500"
      required
    />
  </div>
    <div className="mb-4">
    <label htmlFor="price" className="block text-gray-700 font-medium">price</label>
    <input
      type="number"
      value={price}
      placeholder={"price ?"}

      onChange={(e) => setprice(e.target.value)}
      className="mt-1 px-4 py-2 w-full border rounded focus:outline-none focus:border-blue-500"
      required
    />
  </div>
    <div className="mt-6">
      <button
        type="submit"
        onClick={(e)=>SubmitHandler(e,item.id)}
        className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none"
      >
       Create
      </button>
    </div>
  </form>
    
    </div>
  )
}

export default CreateForm