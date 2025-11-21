
import React, { useEffect, useState } from 'react'
import FormElement from '../../components/ui/FormElement';
import { GeneralCoreService } from '../../api/GeneralCoreService';
import { useAntdMessage } from '../../customHooks/useAntdMessage';
import { useNavigate, useParams } from 'react-router-dom';

function PostForm() {
    const navigate = useNavigate()
    const { id } = useParams();

    const [model, setModel] = useState({
        title: '',
        content: '',
        author: ''
    })
    const { contextHolder, success, error, warning } = useAntdMessage();
    const elems = [
        {
            col: 24,
            type: 'fieldset',
            title: 'Basic Info',
            fields: [
                {
                    col: 12,
                    label: 'Title',
                    key: 'title',
                    placeholder: 'Enter Your title',
                    ChangeEv: () => { },
                    type: 'input',

                    validations: {
                        required: { value: true, message: 'Please fill this field' },
                        minLength: { value: 3, message: 'Min length at least 3' },
                    }
                },
                {
                    col: 12,
                    label: 'Status',
                    key: 'status',
                    placeholder: 'Enter Your author',
                    ChangeEv: () => { },
                    type: 'dropdown',
                    options: [
                        { value: 'Draft', label: <span>Draft</span> },
                        { value: 'Published', label: <span>Published</span> },
                    ],

                    validations: {
                        required: { value: true, message: 'Please fill this field' },
                    }
                },
                {
                    col: 24,
                    label: 'Content',
                    key: 'content',
                    placeholder: 'Enter Your content',
                    ChangeEv: () => { },
                    type: 'input',
                    validations: {
                        required: { value: true, message: 'Please fill this field' },
                        minLength: { value: 3, message: 'Min length at least 3' },
                    }
                },
            ]
        },

    ]
    const handleSave = (data) => {
      
        const userinfo = JSON.parse(localStorage.getItem('userInfo'))
        let payload = {
            ...data,
            author: userinfo?._id
        }
        GeneralCoreService('posts').Save(payload,id)
            .then((res) => {
                success(res.message)
                navigate(-1)
            }).catch(err => {
                console.log('error', err);
                error(err || 'error')
            })
    }
    useEffect(() => {
        if (id) {
            GeneralCoreService('posts').GetAll(id)
                .then((res) => {
                    setModel(res?.data)
                }).catch(err => {
                    console.log('error', err);
                    error(err || 'error')
                })
        }
    }, [id])

    return (
        <div>
            {contextHolder}
            <FormElement save={handleSave} setModel={setModel} model={model} elements={elems} title='Posts' id={id} />
        </div>
    )
}

export default PostForm