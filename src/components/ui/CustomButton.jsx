import React from 'react'

function CustomButton(props) {
    const { label, className, onClick, type, loading } = props
    return (
        <button
            type={type || ''}
            onClick={onClick ? onClick : () => { }}
            className={`${className} bg-btn rounded-lg px-4 py-3 text-lg text-white cursor-pointer hover:bg-btn transition-all duration-500`}>
            {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
                label
            )}
        </button>
    )
}

export default CustomButton