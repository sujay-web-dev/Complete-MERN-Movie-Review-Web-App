import React from 'react'
import Container from '../Container'
import Title from '../form/Title'
import FormInput from '../form/FormInput'
import Submit from '../form/Submit'
import CustomLink from '../CustomLink'
import FormContainer from '../form/FormContainer'
import { commonModalClasses } from '../../utils/theme'

function SignUp() {
    return (
        <FormContainer>
            <Container>
                <form className={commonModalClasses + ' w-72'}>
                    <Title>Sign Up</Title>
                    <FormInput label='Name' placeholder="Tom Holland" name="name" />
                    <FormInput label='Email' placeholder="tom@email.com" name="email" />
                    <FormInput label='Password' placeholder="*****" name="password" />
                    <Submit value="Sign Up" />
                    <div className='flex justify-between'>
                        <CustomLink to="/auth/forget-password">Forget Password</CustomLink>
                        <CustomLink to="/auth/signin">Sign In</CustomLink>
                    </div>
                </form>
            </Container>
        </FormContainer>
    )
}

export default SignUp