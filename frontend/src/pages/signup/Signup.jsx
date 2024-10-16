import React, { useState } from 'react'
import GenderCheckbox from './GenderCheckbox'
import { useNavigate } from 'react-router-dom'
import useSignup from '../../hooks/useSignup';

const Signup = () => {
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({
        username: '',
        fullName:'',
        password: '',
        confirmPassword: '',
        gender: '',
    });

    const {loading , signup} = useSignup();

    const handleSubmit = async(e) => {
        e.preventDefault();
        await signup(inputs);

    }

    const handleCheckboxChange = (gender) => {
        setInputs({...inputs, gender });
    }

  return (
    <div className='flex flex-col items-center justify-center min-w-96 mx-auto '>
        <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
            <h1 className='text-3xl font-semibold text-center text-white'>
                Login To
                <span className='text-blue-500'> ChatApp</span>
            </h1>
            <form action="" onSubmit={handleSubmit}>
                <div>
                    <label className='label p-2'>
                        <span className='text-base label-text'>Full name</span>
                    </label>
                    <input type="text" value={inputs.fullName} onChange={(e)=>{setInputs({...inputs , fullName:e.target.value})}} name="" className='w-full input input-bordered h-10' placeholder='Enter your name'   />
                </div>
                <div>
                    <label className='label p-2'>
                        <span className='text-base label-text'>Username</span>
                    </label>
                    <input type="text" name="" value={inputs.username} onChange={(e)=>{setInputs({...inputs , username:e.target.value})}} className='w-full input input-bordered h-10' placeholder='Enter username'   />
                </div>
                <div>
                    <label className='label p-2'>
                        <span className='text-base label-text'>Password</span>
                    </label>
                    <input type="password" value={inputs.password} onChange={(e)=>{setInputs({...inputs , password:e.target.value})}} name="" className='w-full input input-bordered h-10' placeholder='Enter password'   />
                </div>
                <div>
                    <label className='label p-2'>
                        <span className='text-base label-text'>Confirm Password</span>
                    </label>
                    <input type="password" value={inputs.confirmPassword} onChange={(e)=>{setInputs({...inputs , confirmPassword:e.target.value})}} name="" className='w-full input input-bordered h-10' placeholder='Retype Password for confirmation'   />
                </div>

                <GenderCheckbox onCheckboxChange={handleCheckboxChange} selectedGender={inputs.gender} />

                <a onClick={()=>{navigate("/login")}} className='text-sm hover:underline cursor-pointer hover:text-blue-600 mt-2 inline-block' >
                    {"Already have an account? Sign in"}
                </a>
                <div>
                    <button type='submit' className='btn btn-block btn-sm mt-2' disabled={loading}>
                        {loading ? <span className='loading loading-spinner'></span> : "Sign Up" }
                    </button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Signup
