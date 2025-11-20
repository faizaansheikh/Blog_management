
// import '@ant-design/v5-patch-for-react-19';
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { IoEyeOutline } from "react-icons/io5";

import { Checkbox } from 'antd';

import { CiEdit } from "react-icons/ci";
import XHeader from './XHeader';
import XPagination from './XPagination';
import { data } from '../../dashboard/data';

function Register(props) {
    const { formName,formPath } = props
    const [column, setColumn] = useState([])
    const [rowData, setRowData] = useState([...data])
    const [selectedRow, setSelectedRow] = useState([])
    const onChangeAll = (e) => {
        console.log(`checked = ${e.target.checked}`);
    };
    const handleCheckbox = (e, row, i) => {


        if (e.target.checked) {

            setSelectedRow((prev) => [...prev, row])
        } else {
            setSelectedRow((prev) => prev.filter((z) => z.id !== row.id));

        }


    };


    useLayoutEffect(() => {
        const cols = Object.keys(data[0]) ?? []
        const [id, ...othersCols] = cols


        setColumn(othersCols)
    }, [])
    return (
        <>




            {/* ====================================table==================================== */}

            <div className='border-[#a7a5a5] rounded-2xl w-full h-[550px] overflow-y-scroll mt-2 px-2'>


                <div className='w-full h-[75px] bg-secondary sticky top-0 z-20' >
                    <XHeader formPath={formPath} title={formName || ''} selectedRows={selectedRow} rowData={rowData} setColumns={setColumn} column={column} />
                </div>
                <div className='w-full '>
                    <table className='w-full'>
                        <thead className=''>

                            <tr className='bg-primary' >
                                <td className='pr-4 pl-4 '><Checkbox onChange={onChangeAll}></Checkbox></td>
                                {
                                    column?.map((x, i) => (
                                        <td className='py-6 text-[white] font-bold text-[15px]' key={i}>{x}</td>
                                    ))
                                }
                                <td className='text-[white] text-[14px] font-bold '>Actions</td>

                            </tr>

                        </thead>
                        <tbody>
                            {
                                rowData.map((x, i) => (
                                    <tr style={{ backgroundColor: selectedRow.includes(x) ? '#fbd06d' : '' }} className={`bg-secondarys border-b border-[lightgrey] `} key={i}>
                                        <td className='pl-4'><Checkbox onChange={(e) => handleCheckbox(e, x, i)}></Checkbox></td>
                                        {
                                            column.map((z, ind) => (
                                                <td className='font-normal text-[13px] text-start py-1 ' key={ind}>{x[z]}</td>
                                            ))
                                        }

                                        <td className='text-[14px] text-start py-3'>
                                            <span className='flex gap-2 items-center r'>
                                                <CiEdit size={20} className=' transition-all duration-400 hover:border-primary hover:text-primary cursor-pointer' />
                                                <IoEyeOutline size={18} className=' transition-all duration-400 hover:border-primary hover:text-primary cursor-pointer' />

                                            </span>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
                <div className='w-full bg-primary flex justify-end items-center h-auto py-0  sticky bottom-0 z-20' >
                     <XPagination />
                </div>
              
            </div>
        </>
    )
}

export default Register