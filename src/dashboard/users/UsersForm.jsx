
import React, { useEffect, useState } from 'react'
import FormElement from '../../components/ui/FormElement';

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
          label: 'Phone',
          key: 'phone',
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
          label: 'Address',
          key: 'address',
          placeholder: 'Enter Your Name',
          ChangeEv: () => { },
          type: 'input',
          validations: {
            required: { value: true, message: 'Please fill this field' },
            minLength: { value: 3, message: 'Min length at least 3' },
          }
        }
      ]
    },

  ]
  const handleSave = (d) => {
    console.log('d', d);
  }
  return (
    <div>
      <FormElement save={handleSave} setModel={setModel} model={model} elements={elems} />
    </div>
  )
}

export default UsersForm