import { FormHelperText, Grid, TextField } from '@mui/material'
import { type FieldErrors, type UseFormRegister } from 'react-hook-form'
import LoadingButton from '@mui/lab/LoadingButton'

interface ActionButtonProp {
  name: string
  isLoading: boolean
}

interface FieldProp {
  fieldName: string
  fieldPlaceholder: string
  defaultValue?: string
}
interface FormGroupComponentProps {
  register: UseFormRegister<any>
  field: FieldProp
  errors: FieldErrors
  gridSize: number
  callbackActionButton?: () => void
  actionButton?: ActionButtonProp
  fullWidth?: boolean
}

export const FormGroupComponent = ({
  gridSize,
  errors,
  field,
  register,
  actionButton,
  callbackActionButton,
  fullWidth
}: FormGroupComponentProps): React.ReactNode => {
  const message = errors[field.fieldName]?.message as string
  return (
    <>
      <Grid item xs={gridSize}>
        <Grid container>
          <Grid item xs={actionButton ? 6 : 12}>
            <TextField
              fullWidth={fullWidth}
              id="outlined-basic"
              label={field.fieldPlaceholder}
              defaultValue={field.defaultValue}
              {...register(field.fieldName)}
              variant="outlined"
              size="small"
            />
            {errors[field.fieldName] != null && (
              <FormHelperText error>{message}</FormHelperText>
            )}
          </Grid>
          {actionButton && (
            <Grid item xs={6}>
              <LoadingButton
                onClick={callbackActionButton}
                loading={actionButton.isLoading}
              >
                {actionButton.name}
              </LoadingButton>
            </Grid>
          )}
        </Grid>
      </Grid>
    </>
  )
}
