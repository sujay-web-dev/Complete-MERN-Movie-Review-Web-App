import React from 'react'

function Title({ Children }) {
    return (
        <h1 className='text-xl text-white font-semibold text-center'>{Children}</h1>
    )
}

export default Title