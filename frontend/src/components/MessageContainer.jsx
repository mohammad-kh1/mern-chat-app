import React from 'react'
import Messages from './MessageContainer/Messages'
import MessageInput from './MessageContainer/MessageInput'

function MessageContainer() {
  return (
    <div className='md:min-w-[450px] flex flex-col '>
      <>
      {/* HEADER */}
      <div className='bg-slate-500 px-4 py-2 mb-2 '>
        <span className='label-text'>To : </span><span className='text-gray-900 font-bold'>Jhon</span>
      </div>
      <Messages />
      <MessageInput />
      </>
    </div>
  )
}

export default MessageContainer
