import React, { useState } from 'react'
import Container from '../Container'
import Title from '../form/Title'
import FormInput from '../form/FormInput'
import Submit from '../form/Submit'
import CustomLink from '../CustomLink'
import FormContainer from '../form/FormContainer'
import { commonModalClasses } from '../../utils/theme'
import { createUser } from '../../api/auth'

function SignUp() {

    const [userInfo, setUserInfo] = useState({
        name: "",
        email: "",
        password: ""
    });

    const { name, email, password } = userInfo;

    const handleChange = ({ target }) => {
        const { value, name } = target;
        setUserInfo({ ...userInfo, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { ok, error } = validateUserInfo(userInfo)

        if (!ok) return console.log(error);

        const response = await createUser(userInfo);
        if (response.error) return console.log(response.error);
        console.log(response.user);
    }

    const validateUserInfo = ({ name, email, password }) => {

        const isValidEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        const isValidName = /^[a-z A-Z]+$/;

        if (!name?.trim()) return { ok: false, error: "Name is missing!" };
        if (!isValidName.test(name)) return { ok: false, error: "Inavlid Name!" };

        if (!email?.trim()) return { ok: false, error: "Email is missing!" };
        if (!isValidEmail.test(email)) return { ok: false, error: "Inavlid Email!" };

        if (!password?.trim()) return { ok: false, error: "Password is missing!" };
        if (password.length < 8) return { ok: false, error: "Password Must 8 characters Long!" };

        return { ok: true };
    }

    return (
        <FormContainer>
            <Container>
                <form onSubmit={handleSubmit} className={commonModalClasses + ' w-72'}>
                    <Title>Sign Up</Title>
                    <FormInput value={name} onChange={handleChange} label='Name' placeholder="Tom Holland" name="name" />
                    <FormInput value={email} onChange={handleChange} label='Email' placeholder="tom@email.com" name="email" />
                    <FormInput value={password} onChange={handleChange} type='password' label='Password' placeholder="*****" name="password" />
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