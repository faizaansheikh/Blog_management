
// import '@ant-design/v5-patch-for-react-19';
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { IoEyeOutline } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";
import { Checkbox, Modal } from 'antd';

import { CiEdit } from "react-icons/ci";
import XHeader from './XHeader';
import XPagination from './XPagination';
import { data } from '../../dashboard/data';
import { GeneralCoreService } from '../../api/GeneralCoreService';
import { useNavigate } from 'react-router-dom';
import CustomButton from './CustomButton';
import { useAntdMessage } from '../../customHooks/useAntdMessage';

function Register(props) {
    const { formName, formPath, title } = props
    const navigate = useNavigate()
    const { contextHolder, success, error, warning } = useAntdMessage();
    const [column, setColumn] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [rowData, setRowData] = useState([...data])
    const [selectedRow, setSelectedRow] = useState([])
    const [deleteItem, setDeleteItem] = useState(null)
    const [loading, setLoading] = useState(false)
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

    const fetcLists = () => {
        GeneralCoreService(formName).GetAll()
            .then((res) => {
                if (res.status === 200) {
                    let cols = Object.keys(res?.data[0]) ?? []
                    const [_id, ...othersCols] = cols
                    setColumn(othersCols);
                    setRowData(res?.data)
                }

            }).catch(err => {
                console.log('error', err);

            })
    }
    const handleEdit = (row) => {

        navigate(`${formPath}/${row._id}`)
    }
    const handleDelete = (row) => {
        setIsModalOpen(true)
        setDeleteItem(row)
    }
    const handleDeleteItem = () => {
        setLoading(true)
        GeneralCoreService(formName).Delete(deleteItem?._id)
            .then((res) => {
                if (res) {
                    success(res.message)
                    setIsModalOpen(false)
                    fetcLists()
                }
                setLoading(false)
            }).catch(err => {
                console.log('error', err);
                error('Error deleting record')
                setLoading(false)
            })
    }
    useEffect(() => {
        fetcLists()

    }, [])

    return (
        <>



            {contextHolder}
            {/* ====================================table==================================== */}
            <Modal
                title="Confirmation"
                closable={{ 'aria-label': 'Custom Close Button' }}
                open={isModalOpen}
                // onOk={handleOk}
                // onCancel={handleCancel}
                footer={
                    <div className='flex justify-end gap-2' >
                        <CustomButton onClick={() => setIsModalOpen(false)} label='Cancel' />
                        <button onClick={() => handleDeleteItem()} label='Delete' className={` bg-[red] rounded-lg px-4 py-3 text-lg text-white cursor-pointer hover:bg-btn transition-all duration-500`}>
                            {loading ? (
                                <div className="w-5 h-5 flex justify-center items-center border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            ) : (
                                "Delete"
                            )}
                        </button>
                    </div>
                }
            >
                <p>Are you sure you want to delete this item?</p>
            </Modal>

            <div className='border-[#a7a5a5] rounded-2xl w-full h-[550px] overflow-y-scroll mt-2 px-2'>


                <div className='w-full h-[75px] bg-secondary sticky top-0 z-20' >
                    <XHeader formPath={formPath} title={title || ''} selectedRows={selectedRow} rowData={rowData} setColumns={setColumn} column={column} />
                </div>
                <div className='w-full '>
                    <table className='w-full'>
                        <thead className=''>

                            <tr className='bg-primary' >
                                {/* <td className='pr-4 pl-4 '><Checkbox onChange={onChangeAll}></Checkbox></td> */}
                                {
                                    column?.map((x, i) => (
                                        <td className='py-6 text-[white] font-bold text-[15px] pl-4' key={i}>{x}</td>
                                    ))
                                }
                                <td className='text-[white] text-[14px] font-bold '>Actions</td>

                            </tr>

                        </thead>
                        <tbody>
                            {
                                rowData.map((x, i) => (
                                    <tr style={{ backgroundColor: selectedRow.includes(x) ? '#fbd06d' : '' }} className={` bg-secondarys border-b border-[lightgrey] `} key={i}>
                                        {/* <td className='pl-4'><Checkbox onChange={(e) => handleCheckbox(e, x, i)}></Checkbox></td> */}
                                        {
                                            column.map((z, ind) => (
                                                <td className='font-normal text-[13px] text-start py-1 pl-4' key={ind}>{x[z]}</td>
                                            ))
                                        }

                                        <td className='text-[14px] text-start py-3'>
                                            <span className='flex gap-2 items-center r'>
                                                <CiEdit size={20} className=' transition-all duration-400 hover:border-primary hover:text-primary cursor-pointer' onClick={() => handleEdit(x)} />
                                                <MdDeleteOutline size={18} className=' transition-all duration-400 hover:border-primary hover:text-primary cursor-pointer' onClick={() => handleDelete(x)} />

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