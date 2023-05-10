import React from 'react';
import {ImSpinner9} from 'react-icons/im'

function Submit({ value,busy }) {
    return (
        <button type='submit' className='w-full rounded 
        dark:bg-white bg-secondary 
        dark:text-secondary text-white hover:bg-opacity-90 
        transition font-semibold text-lg cursor-pointer h-10 flex items-center justify-center'
        >
            { busy ? <ImSpinner9 className='animate-spin'/> : value}
        </button>
    )
}

export default Submit