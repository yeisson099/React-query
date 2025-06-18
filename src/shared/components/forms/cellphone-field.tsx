import React from 'react'
import { Controller, useFormContext, type FieldValues } from 'react-hook-form'
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText
} from '@mui/material'

interface Option {
  label: string
  value: string
}

interface SelectFieldProps {
  name: string
  label: string
  defaultValue?: string
  options?: Option[]
  showError?: boolean
}

export const PhoneField: React.FC<SelectFieldProps> = ({
  name,
  label,
  defaultValue = '',
  options = [],
  showError = true
}: SelectFieldProps) => {
  const {
    control,
    formState: { errors }
  } = useFormContext<FieldValues>()
  const message = errors[name]?.message as string

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field }) => (
        <>
          <FormControl fullWidth>
            <InputLabel id={`${name}-label`}>{label}</InputLabel>
            <Select
              labelId={`${name}-label`}
              id={name}
              {...field}
              label={label}
              defaultValue={defaultValue}
              size="medium"
            >
              {options.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {errors[name] && showError && (
            <FormHelperText error>{message}</FormHelperText>
          )}
        </>
      )}
    />
  )
}
