import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import useLogin from '../../hooks/useLogin';

const Login = () => {
    const navigate = useNavigate();
    const [username , setUsername] = useState('');
    const [password, setPassword] = useState('');

    const {loading,login} = useLogin();

    const handleSubmit =async (e) => {
        e.preventDefault();
        await login(username , password);
    }


  return (
    <div className='flex flex-col items-center justify-center min-w-96 mx-auto '>
        <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
            <h1 className='text-3xl font-semibold text-center text-white'>
                Login To
                <span className='text-blue-500'> ChatApp</span>
            </h1>
            <form onSubmit={handleSubmit} >
                <div>
                    <label className='label p-2'>
                        <span className='text-base label-text'>Username</span>
                    </label>
                    <input type="text" onChange={(e)=>setUsername(e.target.value)} name="" className='w-full input input-bordered h-10' placeholder='Enter username'   />
                </div>
                <div>
                    <label className='label p-2'>
                        <span className='text-base label-text'>Password</span>
                    </label>
                    <input type="password" name="" onChange={(e)=>setPassword(e.target.value)} className='w-full input input-bordered h-10' placeholder='Enter password'   />
                </div>
                <a onClick={()=>{navigate("/signup")}} className='text-sm cursor-pointer hover:underline hover:text-blue-600 mt-2 inline-block' >
                    {"Don't have an account? Sign up"}
                </a>
                <div>
                    <button type='submit' className='btn btn-block btn-sm mt-2' disabled={loading}>
                        {loading ? <span className='loading loading-spinner'></span> : "Login"}
                    </button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Login
