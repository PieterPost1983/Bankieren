import AuthForm from '@/components/AuthForm'
import { getLoggedInUser } from '@/lib/actions/user.actions';
import React from 'react'

const Registreren = async () => {

  const loggedInUser = await getLoggedInUser();
  console.log(loggedInUser)
  
  return (
    <section className='flex-center size-full max-sm:px-6'>
      <AuthForm type='registreren'/>
    </section>
  )
}

export default Registreren