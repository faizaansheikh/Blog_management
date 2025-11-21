import { Input } from 'antd'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'


function XInput(props) {
    const { name, control, validations, placeholder, errors } = props
    return (
        <>
            <Controller
                name={name}
                control={control}
                rules={{ ...validations }}
                render={({ field }) => (
                    <Input
                        {...field}
                        placeholder={placeholder}
                        style={{ padding: '8px', fontSize: '16px', background: '#F5F5F0',border:'black'}}
                        aria-invalid={errors[name] ? true : false}
                    />

                )}
            />

            {
                errors[name] && <p className='text-red-600' role='alert'>{errors[name]?.message}</p>
            }
        </>
    )
}

export default XInput