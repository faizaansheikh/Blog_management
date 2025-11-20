import React from 'react'
import { Input } from 'antd';
import CustomButton from '../components/ui/CustomButton';
import { Navigate, useNavigate } from 'react-router-dom';
function Login() {
    const navigate = useNavigate();
    const handleLogin = () => {
        navigate("/dashboard");
    }
    return (
        <div className='bg-[whitesmoke] w-full h-screen flex justify-center items-center'>
            <div className='w-[400px] h-[400px] border-2 border-black rounded-2xl shadow-2xl'>
                <p className='text-centers px-4 text-3xl pt-3'>Welcome Back!</p>
                <p className='text-centers px-4 text-md py-4'>Sign in to access your dashboard</p>
                <div className='flex flex-col gap-4 px-4'>
                    <Input placeholder=" Username" className='h-12' style={{ fontSize: '18px' }} />
                    <Input placeholder=" Password" className='h-12' style={{ fontSize: '18px' }} />

                    <div className=' w-full'>
                        <CustomButton label='Login' className='w-full' onClick={handleLogin} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login