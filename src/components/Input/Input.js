import React from 'react';
import './Input.css';

const Input = ({
  value,
  name,
  placeholder,
  error,
  inputType,
  type,
  label,
  onChange,
  width,
  min,
  max,
  options,
  defaultVal
}) => {
  const hasError = error !== null;
  let formGroup = null

  switch (inputType) {
    case 'text':
      formGroup = (<div className={`form-group my-3 ${width} ${hasError && 'hasError'}`}>
        <label className='label'>
          {
            hasError ? error : label
          }
        </label>
        <input
          className="form-control"
          type={type}
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={(e) =>
            onChange(e.target.value)}
        />
      </div>)
      break;
    case 'number':
      formGroup = (<div className={`my-3 ${width} ${hasError && 'hasError'}`}>
        <label className='label'>
          {
            hasError ? error : label
          }
          <input
            className="form-control"
            type={type}
            name={name}
            min={min}
            max={max}
            value={value}
            onChange={(e) =>
              onChange(e.target.value)
            }
          />
        </label>
      </div>)
      break;
    case 'select':
      formGroup = (<div className={`my-3 ${width} ${hasError && 'hasError'}`}>
        <label className='label'>
          {
            hasError ? error : label
          }
        </label>
        {
          <select className="form-control"
            id="exampleFormControlSelect1"
            name={name}
            onChange={(e) => onChange(e.target.value)}
            value={value}
          >
            {
              options.map(({ name, id }) => {
                return <option
                  style={{ textTransform: "capitalize" }}
                  key={id}
                  value={name}
                >{name}</option>
              })
            }
          </select>
        }
      </div>
      )
      break;
    case 'datetime-local':
      formGroup = (<div className={`my-3 ${width} ${hasError && 'hasError'}`}>

        <label className='label'>
          {
            hasError ? error : label
          }
          <input
            className="form-control col-md-12"
            type={type}
            name={name}
            value={value}
            onChange={(e) =>
              onChange(e.target.value)
            }
          />
        </label>
      </div>)
      break;

    default:
      break;
  }
  return (formGroup)
};

export default Input;
