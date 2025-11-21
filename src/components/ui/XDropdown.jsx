import { Select } from 'antd'
import React from 'react'
import { Controller } from 'react-hook-form';

function XDropdown(props) {
    const { name, control, validations, placeholder, errors, options } = props
    const handleChange = (value, key) => {
        console.log(`Selected: ${value}`);
    };
    return (
        <div>
            <>
                <Controller
                    name={name}
                    control={control}
                    rules={{ ...validations }}
                    render={({ field }) => (
                        <Select
                            onChange={handleChange}
                            style={{ padding: '0', fontSize: '', background: '#F5F5F0', border: 'black', width: '100%', height: '45px' }}
                            className=''
                            {...field}
                            placeholder={placeholder}

                            aria-invalid={errors[name] ? true : false}
                            options={[...options]}
                        />


                    )}
                />

                {
                    errors[name] && <p className='text-red-600' role='alert'>{errors[name]?.message}</p>
                }
            </>

        </div>
    )
}

export default XDropdown