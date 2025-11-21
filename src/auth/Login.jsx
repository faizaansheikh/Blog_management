import React, { useState } from 'react'
import { Input } from 'antd';
import CustomButton from '../components/ui/CustomButton';
import { Navigate, useNavigate } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { GeneralCoreService } from '../api/GeneralCoreService';
import { useAntdMessage } from '../customHooks/useAntdMessage';
import { useAuthToken } from '../customHooks/useAuthToken';
function Login() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const { contextHolder, success, error, warning } = useAntdMessage();
    const { setToken } = useAuthToken();
    const {
        control,
        handleSubmit,
        register,
        reset,
        formState: { errors, isSubmitted }
    } = useForm({
        defaultValues: {
            name: '',
            password: '',
        },
    })


    const handleLogin = (data) => {
        setLoading(true)
        GeneralCoreService('auth/login').Save(data)
            .then(res => {
               
                if (res.status === 201) {
                    success(res.msg)
                    navigate("/dashboard");
                    if (res) {
                        setToken(res?.token)
                        localStorage.setItem('userInfo', JSON.stringify(res?.user))
                    }
                } else {
                    error(res.msg)
                }
            })
            .catch(err => console.log('error', err))
            .finally(() => {
                setLoading(false)
            })

    }
    console.log(isSubmitted);

    return (
        <div className='bg-[whitesmoke] w-full h-screen flex justify-center items-center'>
            {contextHolder}
            <div className='w-[400px] h-auto border-2 border-black rounded-2xl shadow-2xl pb-4'>
                <p className='text-centers px-4 text-3xl pt-3'>Welcome Back!</p>
                <p className='text-centers px-4 text-md py-4'>Sign in to access your dashboard</p>
                <form onSubmit={handleSubmit(handleLogin)} className='flex flex-col gap-2 px-4'>
                    <Controller
                        name="name"
                        control={control}
                        rules={{
                            required: { value: true, message: 'Please fill this field' },
                            minLength: { value: 3, message: 'Min length at least 3' },
                        }}
                        render={({ field }) => (
                            <Input placeholder=" Username" className='h-12' style={{ fontSize: '18px' }} {...field} />


                        )}
                    />

                    {
                        errors['name'] && <p className='text-red-600' role='alert'>{errors['name']?.message}</p>
                    }

                    <Controller
                        name="password"
                        control={control}
                        rules={{
                            required: { value: true, message: 'Please fill this field' },
                            minLength: { value: 3, message: 'Min length at least 3' },
                        }}
                        render={({ field }) => (
                            <Input.Password
                                {...field}
                                placeholder="enter password"
                                className='h-12' style={{ fontSize: '18px' }}
                                iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                            />
                            // <Input placeholder=" Password"  className='h-12' style={{ fontSize: '18px' }} {...field} />


                        )}
                    />

                    {
                        errors['password'] && <p className='text-red-600' role='alert'>{errors['password']?.message}</p>
                    }


                    <div className='flex justify-between py-3'>
                        <p>Dont have an account </p>
                        <p className='text-primary cursor-pointer' onClick={() => navigate("/register")}>Signup</p>
                    </div>
                    <div className=' w-full'>
                        <CustomButton label='Login' className='w-full' type='submit' loading={loading || false} />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login