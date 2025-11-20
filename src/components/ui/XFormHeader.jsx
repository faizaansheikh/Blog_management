import React from 'react'
import { IoArrowBack } from "react-icons/io5";
import CustomButton from './CustomButton';
import { useNavigate } from 'react-router-dom';

function XFormHeader(props) {
    const { title } = props
    const navigate = useNavigate();

    const showLabel = () => {
        return 'Save Changes'
    }
    return (

        <div className=' w-full  flex justify-between items-center   bg-[]  bg-secondarys border-b  p-4 my-4 z-200'>
            <div className='flex gap-2 items-center justify-center'>

                <span
                    onClick={() => navigate(-1)}
                    className="border border-black rounded-3xl p-1 cursor-pointer relative right-0 hover:right-1 transition-all duration-300 ease-in-out"
                >
                    <IoArrowBack size={22} />
                </span>

                <span className='text-3xl  ml-2'>{title}</span>
            </div>
            <div className='flex items-center gap-4'>

                <span><CustomButton label={'Cancel'} onClick={() => { }} /></span>
                <span><CustomButton label={showLabel()} /></span>




            </div>




        </div>
    )
}

export default XFormHeader