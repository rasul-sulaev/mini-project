export const FormControl = ({
  tag = 'input',
  inputProps,
  type = 'text',
  placeholder,
  errorMessage = 'Заполните поле'
}) => {

  return (
    <div className="form-control">
      {tag === 'textarea' ? (
        <textarea {...inputProps} placeholder={placeholder}/>
      ) : (
        <input type={type} {...inputProps} placeholder={placeholder}/>
      )}
      {inputProps.isEmpty && (
        <p className="form-control_status-error">{errorMessage}</p>
      )}
    </div>
  )
}