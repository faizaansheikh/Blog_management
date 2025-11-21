import React, { useState } from 'react'
import { Input, Select } from 'antd';
import CustomButton from '../components/ui/CustomButton';
import { Navigate, useNavigate } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { GeneralCoreService } from '../api/GeneralCoreService';
import { useAntdMessage } from '../customHooks/useAntdMessage';
function Register() {
    const navigate = useNavigate();
    const { contextHolder, success, error, warning } = useAntdMessage();
    const [loading, setLoading] = useState(false)
    const {
        control,
        handleSubmit,
        register,
        formState: { errors, isSubmitted }
    } = useForm({
        defaultValues: {
            name: '',
            email: '',
            password: '',
            role: '',
        },
    })





    const handleRegister = (data) => {
        GeneralCoreService('auth/register').Save(data)
            .then(res => {
                console.log('res', res);
                if (res.status === 201) {
                    success(res.msg)
                    navigate("/login");
                } else {
                    error(res.msg)
                }
            })
            .catch(err => console.log('error', err))

        console.log('data', data);


    }

    return (
        <div className='bg-[whitesmoke] w-full h-screen flex justify-center items-center'>
                {contextHolder}
            <div className='w-[400px] h-auto border-2 border-black rounded-2xl shadow-2xl pb-4'>
                <p className='text-centers px-4 text-3xl pt-3'>Welcome Back!</p>
                <p className='text-centers px-4 text-md py-4'>Sign in to access your dashboard</p>

                <form onSubmit={handleSubmit(handleRegister)} className='flex flex-col gap-0 px-4'>
                    <Controller
                        name="name"
                        control={control}
                        rules={{
                            required: { value: true, message: 'Please fill this field' },
                            minLength: { value: 3, message: 'Min length at least 3' },
                        }}
                        render={({ field }) => (
                            <Input placeholder=" Name" className='h-12' style={{ fontSize: '18px', margin: '5px 0' }} {...field} />


                        )}
                    />

                    {
                        errors['name'] && <p className='text-red-600 p-0' role='alert'>{errors['name']?.message}</p>
                    }


                    <Controller
                        name="email"
                        control={control}
                        rules={{
                            required: { value: true, message: 'Please fill this field' },
                            minLength: { value: 3, message: 'Min length at least 3' },
                        }}
                        render={({ field }) => (
                            <Input placeholder=" Email" className='h-12' style={{ fontSize: '18px', margin: '5px 0' }} {...field} />


                        )}
                    />

                    {
                        errors['email'] && <p className='text-red-600' role='alert'>{errors['email']?.message}</p>
                    }


                    <Controller
                        name="password"
                        control={control}
                        rules={{
                            required: { value: true, message: 'Please fill this field' },
                            minLength: { value: 6, message: 'Password must be atleast 6 characters' },
                        }}
                        render={({ field }) => (
                            <Input placeholder=" Passoword" className='h-12' style={{ fontSize: '18px', margin: '5px 0' }} {...field} />


                        )}
                    />

                    {
                        errors['password'] && <p className='text-red-600' role='alert'>{errors['password']?.message}</p>
                    }


                    <Controller
                        name="role"
                        control={control}
                        rules={{
                            required: { value: true, message: 'Please fill this field' },
                            minLength: { value: 3, message: 'Min length at least 3' },
                        }}
                        render={({ field }) => (
                            <Select
                                // onChange={handleChange}
                                style={{ padding: '0', fontSize: '', margin: '5px 0', background: '#F5F5F0', border: 'black', width: '100%', height: '45px' }}
                                className=''
                                {...field}
                                placeholder={'Role'}

                                aria-invalid={errors['Role'] ? true : false}
                                options={[
                                    { value: 'Admin', label: <span>Admin</span> },
                                    { value: 'Author', label: <span>Author</span> },
                                ]}
                            />


                        )}
                    />

                    {
                        errors['role'] && <p className='text-red-600' role='alert'>{errors['role']?.message}</p>
                    }



                    <div className='flex justify-between py-4'>
                        <p className=''>Already have an account </p>
                        <p className='text-primary cursor-pointer' onClick={() => navigate("/login")}>Sign in</p>
                    </div>

                    <div className=' w-full'>
                        <CustomButton label='Register' type='submit' className='w-full' loading={loading || false} />
                    </div>

                </form>

            </div>
        </div>
    )
}

export default Register