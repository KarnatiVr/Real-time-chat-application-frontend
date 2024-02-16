import React from 'react'
import ContactsCard from '../components/contactsCard'
import Chat from '../components/chat'

const Chats = () => {
  return (
    <div className="chats--page flex flex-row justify-center">
      <ContactsCard />
      <Chat />
    </div>
  );
}

export default Chats