
import { Col, Divider, Input, Row } from 'antd'
import React, { useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import XFormHeader from './XFormHeader';
import XInput from './XInput';
import XDropdown from './XDropdown';

function FormElement(props) {
    const { elements, setModel, model, save, title, id } = props
    const [mounted, setMounted] = useState(false);


    const {
        control,
        handleSubmit,
        register,
        reset,
        formState: { errors }
    } = useForm({
        defaultValues: { ...model },
    })

    const FormComponent = (x) => {

        switch (x.type) {
            case 'input':
                return <>
                    <XInput
                        name={x.key}
                        control={control}
                        validations={x.validations}
                        placeholder={x.placeholder}
                        errors={errors}
                    />

                </>
            case 'dropdown':
                return <>
                    <XDropdown
                        name={x.key}
                        control={control}
                        validations={x.validations}
                        placeholder={x.placeholder}
                        options={x.options}
                        errors={errors}

                    />
                </>

            default:
                break;
        }


    }

    useEffect(() => {
        
        if (id) {
            reset(model)
            
        }
    }, [id, model])

 

    return (
        <form onSubmit={handleSubmit(save)}>
            <XFormHeader title={title} id={id}/>
            <Row className=' pb-6'>
                {
                    elements?.map((x, i) => {
                        return (
                            <Col key={i} span={x.col}>
                                <div className='bg-secondarys rounded-xl p-4 my-4 shadow-lg'>

                                    <Row >
                                        {
                                            x.fields?.map((y, index) => {
                                                return (

                                                    <Col key={index} className="gutter-row my-1" span={y.col} xs={24} md={12} lg={y.col}>
                                                        <div className='py-1 px-2 font-medium'>{y.label}</div>
                                                        <div style={{ padding: '' }} className='px-2'>{FormComponent(y)}</div>

                                                    </Col>
                                                )
                                            })
                                        }
                                    </Row>
                                </div>
                            </Col>

                        )
                    })
                }
            </Row>

        </form>

    )
}

export default FormElement