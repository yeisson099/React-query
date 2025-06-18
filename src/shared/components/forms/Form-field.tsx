import React from 'react'
import { useFormContext, Controller, type FieldValues } from 'react-hook-form'
import { TextField, Select, MenuItem, FormHelperText, InputLabel, FormControl } from '@mui/material'

interface Option {
  label: string
  value: string
}

interface FormFieldProps {
  name: string
  label: string
  defaultValue?: string
  options?: Option[]
  type?: string
  showError?: boolean
  size?: 'small' | 'medium'
}

export const FormField: React.FC<FormFieldProps> = ({
  name,
  label,
  defaultValue = '',
  options = [],
  type = 'text',
  showError = false,
  size = 'small'
}: FormFieldProps) => {
  const { control, formState } = useFormContext<FieldValues>()
  const { errors } = formState
  const message = errors[name]?.message as string

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field }) => (
        <>
          {type === 'select'
            ? (
            <FormControl>
              <InputLabel id="select-label">{label}</InputLabel>
              <Select
                labelId="select-label"
                id="select"
                {...field}
                label={label}
                defaultValue={defaultValue}
                size='medium'
              >
                {options.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
              )
            : (
            <TextField
              {...field}
              label={label}
              variant="outlined"
              type={type}
              error={!!errors[name]}
              helperText={errors[name] && showError ? message : ''}
              fullWidth
              size={size}
            />
              )}
          {errors[name] && showError && (
            <FormHelperText error>{message}</FormHelperText>
          )}
        </>
      )}
    />
  )
}
