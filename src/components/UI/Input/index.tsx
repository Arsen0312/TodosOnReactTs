import React, { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    
}

const Input = ( props: InputProps ) => {
    return (
        <input
            {...props}
        />
    )
}

export default Input