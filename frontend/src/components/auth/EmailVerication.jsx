import React, { useEffect, useState, useRef } from 'react'
import Container from '../Container'
import Title from '../form/Title'
import Submit from '../form/Submit'

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
        <div className='fixed inset-0 bg-primary -z-10 flex justify-center items-center'>
            <Container>
                <form className='bg-secondary rounded p-6 space-y-6'>
                    <div>
                        <Title>Please Enter the OTP to verify your Account</Title>
                        <p className='text-center text-dark-subtle'>OTP has been sent to your Email</p>
                    </div>
                    <div className='flex justify-center items-center space-x-4'>
                        {otp.map((_, index) => {

                            return <input key={index} value={otp[index] || ""} onChange={(e) => handleOtpChange(e, index)}
                                ref={activeOtpIndex === index ? inputRef : null} type='number'
                                onKeyDown={(e) => handleKeyDown(e, index)}
                                className='border-2 border-dark-subtle focus:border-white 
                                rounded bg-transparent outline-none text-center text-white font-semibold 
                                text-xl w-12 h-12 spin-button-none' />

                        })}
                    </div>
                    <Submit value="Send Link" />
                </form>
            </Container>
        </div>
    )
}

export default EmailVerication