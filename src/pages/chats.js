import React from 'react'
import ContactsCard from '../components/contactsCard'
import Chat from '../components/chat'

const Chats = () => {
  return (
    <div className='chats--page'>
        <Chat/>
        <ContactsCard/>
    </div>
  )
}

export default Chats