
import React, { useEffect, useState } from 'react'
import FormElement from '../../components/ui/FormElement';
import { GeneralCoreService } from '../../api/GeneralCoreService';

function UsersForm() {
  const [model, setModel] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  })

  const elems = [
    {
      col: 24,
      type: 'fieldset',
      title: 'Basic Info',
      fields: [
        {
          col: 12,
          label: 'Name',
          key: 'name',
          placeholder: 'Enter Your Name',
          ChangeEv: () => { },
          type: 'input',

          validations: {
            required: { value: true, message: 'Please fill this field' },
            minLength: { value: 3, message: 'Min length at least 3' },
          }
        },
        {
          col: 12,
          label: 'Email',
          key: 'email',
          placeholder: 'Enter Your Name',
          ChangeEv: () => { },
          type: 'input',
          validations: {
            required: { value: true, message: 'Please fill this field' },
            minLength: { value: 3, message: 'Min length at least 3' },
          }
        },
        {
          col: 12,
          label: 'Password',
          key: 'Password',
          placeholder: 'Enter Password',
          ChangeEv: () => { },
          type: 'input',
          validations: {
            required: { value: true, message: 'Please fill this field' },
            minLength: { value: 3, message: 'Min length at least 3' },
          }
        },
        {
          col: 12,
          label: 'Role',
          key: 'role',
          placeholder: 'Select Your role',
          ChangeEv: () => { },
          type: 'dropdown',
          options: [
            { value: 'Admin', label: <span>Admin</span> },
            { value: 'Author', label: <span>Author</span> },
          ],

          validations: {
            required: { value: true, message: 'Please fill this field' },
          }
        },
      ]
    },

  ]
  const handleSave = (d) => {
    
    GeneralCoreService('users').GetAll()
      .then((res) => {
        console.log('res', res);

      }).catch(err => {
        console.log('error', err);

      })
  }
  return (
    <div>
      <FormElement save={handleSave} setModel={setModel} model={model} elements={elems} title='Users' />
    </div>
  )
}

export default UsersForm