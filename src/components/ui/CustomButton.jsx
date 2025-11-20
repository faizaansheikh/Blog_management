import React from 'react'

function CustomButton(props) {
    const { label, className, onClick } = props
    return (
        <button
            onClick={onClick ? onClick : () => { }}
            className={`${className} bg-primary px-4 py-3 text-lg text-white cursor-pointer hover:bg-secondary transition-all duration-500`}>
            {label}
        </button>
    )
}

export default CustomButton