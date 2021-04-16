import Validator from 'validator';

export const FormValidation = ({ fields }) => {
  const updatedFields = fields.map((fld) => {
    if (fld.isRequired) {
      if (fld.value === '') return { ...fld, error: fld.errorMsg }
      if (fld.value !== '' && fld.name === 'phone' && !Validator.isMobilePhone(fld.value)) {
        return { ...fld, error: 'Please type a valid phone number' }
      }
      return { ...fld, error: null }
    }
    return { ...fld, error: null }
  })

  return {
    updatedFields,
    isValid: updatedFields.filter(({ error }) => error !== null).length === 0
  }
}
