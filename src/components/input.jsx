// This component generally use for the form inputs, means whenever we need a input field in our application we use this component instand of the make it each time.

import React, { useId } from 'react'
// This is the one type of Syntex which we normally use.
// function input({}) {
//     const id = useId();
//     return (
//         <div>input</div>
//     )
// }

// this is the batter practice to write code in the way which we normally follow.

const Input = React.forwardRef(function Input({
    type = 'text',
    lable,
    className = "",
    ...props
}, ref) { // here we have a ref which is used to connect the lable.
    const ID = useId();
    return (
        <div className='w-full'>
            {lable &&
                <lable
                    className='block mb-1'
                    htmlFor={ID}>
                    {lable}
                </lable>
            }
            <input
                type={type}
                className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-500 duration-200 border-gray-200 w-full
                    ${className} `}
                    ref={ref}
                    {...props}
                    id={ID}
            />

        </div>
    )
})

export default Input