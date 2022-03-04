import { useState } from 'react'

const useField = ({ name, type }) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    name,
    value,
    onChange
  }
}

export default useField
