import React from 'react'

const ContactsCard = () => {
  return (
    <div className='contacts--card'>
        <h1 className='text-xl font-bold px-5 py-5'>Messages</h1>
        <input type='text' placeholder='Search' className=' search--box mx-5 '>
        </input>
    </div>
  )
}

export default ContactsCard