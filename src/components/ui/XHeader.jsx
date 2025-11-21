import React, { useState } from 'react'

import { MdOutlineFileDownload } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { FaFilter } from "react-icons/fa";
import { Checkbox, Input, Popover } from 'antd';
import { CiSearch } from "react-icons/ci";
import { CiCircleList } from "react-icons/ci";
import CustomButton from './CustomButton';
import { useNavigate } from 'react-router-dom';
import { useAntdMessage } from '../../customHooks/useAntdMessage';

function XHeader(props) {

    const { title, selectedRows, rowData, setColumns, column, formPath } = props
    const [userinfo, setUserinfo] = useState(JSON.parse(localStorage.getItem('userInfo')) ?? {})
    const { contextHolder, warning } = useAntdMessage()

    const navigate = useNavigate()
    const onChangeAll = (e, label) => {

        const val = e.target.checked
        if (val) {

            setColumns((prev) => prev.filter((x) => x !== label))
        } else {
            setColumns([
                label,
                ...column,
            ])
        }
    };
    const handleAddNew = () => {

        if (userinfo.role === "Author") {
            warning('you dont have the access to manage posts')
        } else {
            navigate(formPath)
        }
    }


    return (


        <div className=' w-full  flex justify-between items-center  sticky top-0 z-200 py-4 px-4 '>
            {contextHolder}
            <div className='flex items-center'>

                <span className='text-2xl '>{title}</span>
            </div>
            <div className='flex items-center gap-0'>

                <span> <Input style={{ width: '300px', padding: '7px 7px' }} placeholder="Search" prefix={<CiSearch className='mx-1' size={20} />} /></span>
                {formPath !== '' && <span className='px-3'><CustomButton label='Add New' type='' onClick={() => handleAddNew()} /></span>}

                <Popover trigger='click' className=' cursor-pointer  px-0 py-2 flex items-center gap-2 rounded-lg' placement="bottom" title={"Columns"} content={
                    <div className='flex flex-col gap-2'>
                        {Object.keys(rowData[0])?.map((x, i) => (
                            <span key={i}>
                                <span className='pr-3'><Checkbox onChange={(e) => onChangeAll(e, x)}></Checkbox></span>
                                <span>{x}</span>
                            </span>
                        ))}


                    </div>
                }>

                    <span className='px-0 pl-2 text-[white] hover:text-[#fff1f1] '><FaFilter size={18} /></span>

                </Popover>




                <span className='px-2 cursor-pointer text-[white] hover:text-[#fff1f1]'><MdOutlineFileDownload size={30} /></span>
                <span className='pr-1 cursor-pointer text-[white] hover:text-[#fff1f1]'><CiCircleList size={30} /></span>
                {selectedRows.length > 0 && <span className='ml-2 bg-[] border-1 border-[red] rounded-lg cursor-pointer hover:shadow '>
                    <MdDelete className='p-2 text-[red] ' size={37} />

                </span>}
                {/* <span className='bg-[#fbd06d] rounded-lg cursor-pointer hover:shadow flex items-center gap-2'>

                    <MdOutlineFileDownload className='p-2 text-primary ' size={37} />
                </span> */}

            </div>



        </div>


    )
}

export default XHeader