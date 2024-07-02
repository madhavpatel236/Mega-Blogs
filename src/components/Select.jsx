// This component generally we use for the select buttton for the active of deactive user
// Here we use the another method of forwerdRef() usage. please show at the export

import React, { useId } from 'react'

function Select({
  options,
  lable,
  className = '',
  ...props
}, ref) {

  const ID = useId();

  return (
    <div className='w-full'>
      {lable && <lable htmlFor={ID}> </lable>}

      <select
        {...props}
        id={ID}
        ref={ref}
        className={` px-3 py-2 rounded-ld bg-white text-black outline-none focus:bg-gray-500 duration-200 border-gray-200 w-full  ${className} `}
      >
        {
          options?.map( (Option) => (
            <option key={Option} value={Option}>
              {Option}
            </option>
          ) )
        }
      </select>
    </div>
  )
}

export default React.forwardRef(Select)