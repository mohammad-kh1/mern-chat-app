import React, { useEffect, useState } from 'react'

const useGetConversations = () => {
    const [loading , setLoading] = useState(false);
    const [conversations, setConversations] = useState([]);

    useEffect(()=>{
        const getConverstaions= async()=>{
            setLoading(true);
            try {
                const res = await fetch("/API/users");
                const data = await res.json();
                if(data.error){
                    toast.error('Failed to get conversations');
                }
                setConversations(data);
            } catch (error) {
                console.log(error)
            }finally{
                setLoading(false);
            }
        }
        getConverstaions();
    },[]);

    return {loading , conversations  };
}

export default useGetConversations
