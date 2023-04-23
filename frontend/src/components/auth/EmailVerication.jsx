import React, { useEffect, useState, useRef } from 'react'
import Container from '../Container'
import Title from '../form/Title'
import Submit from '../form/Submit'
import { commonModalClasses } from '../../utils/theme';
import FormContainer from '../form/FormContainer';

const OTP_LENGTH = 6;

function EmailVerication() {

    const [otp, setOtp] = useState(new Array(OTP_LENGTH).fill(""));
    const [activeOtpIndex, setActiveOtpIndex] = useState(0);
    const inputRef = useRef();

    const focusNextInputField = (index) => {
        setActiveOtpIndex(index + 1)
    }

    const focusPrevInputField = (index) => {
        let nextIndex;
        const diff = index - 1;
        nextIndex = diff !== 0 ? diff : 0;
        setActiveOtpIndex(nextIndex)
    }

    const handleOtpChange = ({ target }, index) => {
        const { value } = target;
        const newOtp = [...otp];
        newOtp[index] = value.substring(value.length - 1, value.length);
        if (!value) focusPrevInputField(index);
        else focusNextInputField(index);

        setOtp([...newOtp]);
    }

    useEffect(() => {
        inputRef.current?.focus()
    }, [activeOtpIndex]);

    const handleKeyDown = ({ key }, index) => {
        if (key === "Backspace") {
            focusPrevInputField(index);
        }

    }


    return (
        <FormContainer>
            <Container>
                <form className={commonModalClasses}>
                    <div>
                        <Title>Please Enter the OTP to verify your Account</Title>
                        <p className='text-center dark:text-dark-subtle text-light-subtle'>OTP has been sent to your Email</p>
                    </div>
                    <div className='flex justify-center items-center space-x-4'>
                        {otp.map((_, index) => {

                            return <input key={index} value={otp[index] || ""} onChange={(e) => handleOtpChange(e, index)}
                                ref={activeOtpIndex === index ? inputRef : null} type='number'
                                onKeyDown={(e) => handleKeyDown(e, index)}
                                className='border-2 dark:border-dark-subtle border-light-subtle dark:focus:border-white
                                focus:border-primary rounded bg-transparent outline-none text-center 
                                dark:text-white text-primary font-semibold text-xl w-12 h-12 spin-button-none' />

                        })}
                    </div>
                    <Submit value="Send Link" />
                </form>
            </Container>
        </FormContainer>
    )
}

export default EmailVerication