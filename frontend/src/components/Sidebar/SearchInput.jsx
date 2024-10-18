import React, { useState } from 'react'
import { IoSearchSharp } from 'react-icons/io5'
import useGetConversations from "../../hooks/useGetConversations";
import useConversation from "../../../store/useConversation";
import toast from 'react-hot-toast';

const SearchInput = () => {
    const [search , setSearch] = useState('');
    const {setSelectedConversation} = useConversation();
    const {conversations} = useGetConversations();
    const handleSubmit =(e) =>{
        e.preventDefault();
        if(!search) return;
        if(search.length < 3){
            return toast.error("search query should be at least 3 characters long! ^^");
        }
        const filterdConversation = conversations.find((c)=>c.fullName.toLowerCase().includes(search.toLowerCase()));
        
        if(filterdConversation){
            setSelectedConversation(filterdConversation);
            setSearch('');

        }else{
            toast.error("No conversation found with that name!");
            setSearch('');
        }
    }

  return (
    <form onSubmit={handleSubmit} className='flex items-center gap-2'>
        <input value={search} onChange={(e)=>{setSearch(e.target.value)}} type="text" placeholder='Search...' className='input input-bordered rounded-full' />
        <button type='submit' className='btn btn-circle bg-sky-500 text-white'>
            <IoSearchSharp className='h-6 w-6 outline-none' />
        </button>
    </form>
)
}

export default SearchInput
