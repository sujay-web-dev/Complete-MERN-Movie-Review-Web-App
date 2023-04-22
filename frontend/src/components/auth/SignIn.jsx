import React from 'react'
import Container from '../Container'
import Title from '../form/Title'
import FormInput from '../form/FormInput'
import Submit from '../form/Submit'


function SignIn() {
    return (
        <div className='fixed inset-0 bg-primary -z-10 flex justify-center items-center'>
            <Container>
                <form className='bg-secondary rounded p-6 w-72 space-y-6'>
                    <Title>Email</Title>
                    <FormInput label='Email' placeholder="tom@email.com" name="email" />
                    <FormInput label='Password' placeholder="*****" name="password" />
                    <Submit value="Sign In" />
                    <div className='flex justify-between'>
                        <a href="#" className='text-dark-subtle hover:text-white transition'>Forgot Password</a>
                        <a href="#" className='text-dark-subtle hover:text-white transition'>Sign Up</a>
                    </div>
                </form>
            </Container>
        </div>
    )
}

export default SignIn