import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext';

const useSignup = () => {
  const [loading , setLoading] = useState(false);

  const {authUser , setAuthUser} = useAuthContext();

  const signup = async ({fullName, username, password , confirmPassword , gender}) => {
    const success = handleInputErros({fullName,username, password , confirmPassword , gender});
    if(!success) return ;
    setLoading(true);
    try {
        const res = await fetch("/API/auth/register" , {
            method:"POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({fullName,username, password, confirmPassword, gender}),
        });

        const data = await res.json();
        if(data.message === "User created successfully!"){
            toast.success('Signup successful');
            localStorage.setItem('chatUser', JSON.stringify(data.user));
            setAuthUser(data);
        }
        if(data.message === "Username already exists!"){
            toast.error('Username already exists');
        }


    } catch (error) {
        toast.error('Failed to signup');
    }finally{
        setLoading(false);
    }
  }
  return {loading , signup  };
}

export default useSignup


function handleInputErros({fullName, username , password , confirmPassword , gender}){
    if(!fullName ||!username ||!password ||!confirmPassword ||!gender) {
        toast.error('Please fill all fields');
        return false;
    }
    if(password != confirmPassword) {
        toast.error('Passwords do not match');
        return false;
    }
    if(password.length < 6) {
        toast.error('Password must be at least 6 characters long');
        return false;
    }

    return true;  // If all validations pass, return true.
} 