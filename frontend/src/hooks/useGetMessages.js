import React, { useEffect, useState } from 'react'
import useConversation from '../../store/useConversation';
import toast from 'react-hot-toast';

const useGetMessages = () => {

    const [loading , setLoading] = useState(false);
    const {messages , setMessages , selectedConversation } = useConversation();

    useEffect(()=>{

        const getMessages = async()=>{
            setLoading(true);
            try {
                
                const res = await fetch(`/API/messages/${selectedConversation._id}`);

                const data = await res.json();

                if(data.error){
                    toast.error('Failed to get messages');
                }

                setMessages(data);

            } catch (error) {
                toast.error(error);
            }finally{
                setLoading(false);
            }
        }

        if(selectedConversation?._id)  getMessages();

    },[selectedConversation?._id , setMessages]);

    return {messages , loading};

}

export default useGetMessages
