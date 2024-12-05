import AuthForm from '@/components/AuthForm'

const Registreren = async () => {
  return (
    <section className='flex-center size-full max-sm:px-6'>
      <AuthForm type='registreren'/>
    </section>
  )
}

export default Registreren