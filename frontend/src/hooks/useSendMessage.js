import React, { useState } from 'react'
import toast from 'react-hot-toast';
import useConversation from '../../store/useConversation';

const useSendMessage = () => {

    const [loading, setLoading] = useState(false)
    const {messages , setMessages ,selectedConversation } = useConversation();

    const sendMessage = async (message) => {
        setLoading(true)
        try {
            const res = await fetch(`/API/messages/send/${selectedConversation._id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ message })
            })
            const data = await res.json()
            if(data.error){
                toast.error('Failed to send message');
            }
            setMessages([...messages, data])
            setLoading(false)
        } catch (error) {
            toast.error(error.message)
            setLoading(false)
        }
    }

    return {sendMessage , loading}

}

export default useSendMessage
