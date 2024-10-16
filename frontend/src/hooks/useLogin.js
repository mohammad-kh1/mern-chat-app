import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from '../context/AuthContext';

const useLogin = () => {
    const [loading , setLoading] = useState(false);
    const {setAuthUser} = useAuthContext();

    const login = async (username, password) => {
        const success = handleInputErros({username, password });
        if(!success) return ;
        setLoading(true);
        try {
            const res = await fetch("/API/auth/login" , {
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({username, password})
            });

            const data = await res.json();
            if(data.message == "Logged in successfully!"){
                toast.success(data.message);
                localStorage.setItem("chatUser" , JSON.stringify(data.user));
                setAuthUser(data);
            }
            if(data.message == "Invalid credentials!"){
                toast.error(data.message);
            }

        } catch (error) {
            toast.error("Failed to login");
            
        }finally{
            setLoading(false);
        }
    }
    return {loading , login};
}

export default useLogin;

function handleInputErros({username , password}){
    if(!username ||!password ) {
        toast.error('Please fill all fields');
        return false;
    }


    return true;  // If all validations pass, return true.
} 