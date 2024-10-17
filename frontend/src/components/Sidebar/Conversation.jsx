import React from 'react'

const Conversation = ({conversation , lastIdx}) => {
  return (
    <>
        <div className='flex gap-2 items-center hover:bg-sky-500 rounded px-2 py-1 cursor-pointer '>
            <div className='avatar online'>
                <div className='w-12 rounded-full '>
                    <img src={conversation?.profilePic} alt="user profile" />
                </div>
            </div>
            <div className='flex flex-col flex-1 '>
                <div className='flex gap-3 justify-between'>
                    <p className='font-bold text-gray-200 '>{conversation?.fullName}</p>
                    <span className='text-xl '>😎</span>
                </div>
            </div>
        </div>

    { !lastIdx && <div className='divider px-3'></div>}
    </>
)
}

export default Conversation
