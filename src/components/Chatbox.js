import React from 'react'

const Chatbox = ({onChatboxClick}) => {
  return (
    <div className='chatbox' onClick={onChatboxClick}>
        <img src={`icons/Chat.png`} className='chat-icon'/>
    </div>
  )
}

export default Chatbox
