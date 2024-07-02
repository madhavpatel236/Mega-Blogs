// In this components we make one common Btn for the anywhere Btn uae. 
// now we can directly use this componenets any where we need a Btn. 

import React from 'react'

function Button({
    children,
    type = 'button',
    bgColor = 'bg-blue-600', // this are the initial state if user don't give the value then we use them.
    textColor = 'text-white',
    className = '',
    ...props
}) {
    return (
        <button
        className={`px-4 py-2 rounded-lg ${bgColor} ${textColor} ${className} `} {...props}
        > {children} </button>
    )
}

export default Button