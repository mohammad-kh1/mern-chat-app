import { useState } from "react"
import { useAuthContext } from "../context/AuthContext";

const useLogout = () => {
    const [loading ,setLoading] = useState(false);
    const { setAuthUser} = useAuthContext();
    const logout = async()=>{
        setLoading(true);
        try {
           const res = await fetch("/API/auth/logout", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await res.json();
        
        localStorage.removeItem("chatUser");
        setAuthUser(null);

    } catch (error) {
        toast.error('Failed to logout');    
        }finally{
            setLoading(false);
        }
    }
    return {loading , logout  };
}


export default useLogout;