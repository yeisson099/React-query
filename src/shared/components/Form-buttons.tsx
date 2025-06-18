import {
  Grid,
  Button,
  Stack
} from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'

interface Props {
  setloading: boolean
  isLoading: boolean
  icon?: React.ReactNode
  gridSize: number
  isSubmit: boolean
  renderCancel: boolean
  callbackAction?: () => void
  cancelAction?: () => void
}
const styles = {
  minWidth: 0,
  lineHeight: 1.3,
  fontSize: 12,
  borderColor: 'rgba(0,0,0,0.3)',
  '& .MuiButton-endIcon': {
    marginLeft: '8px',
    marginRight: '0px',
    fontSize: '16px !important'
  }
}

export const FormButtons = ({
  icon,
  gridSize,
  isSubmit,
  callbackAction,
  cancelAction,
  renderCancel,
  setloading,
  isLoading
}: Props): any => {
  return (
    <Grid item xs={gridSize}>
      <Stack direction={'row'} justifyContent={'flex-end'} spacing={2}>
        {renderCancel && (
          <Button
            variant="outlined"
            onClick={cancelAction}
            color="inherit"
            disabled={isLoading}
            type={'button'}
            sx={styles}
          >
            cancelar
          </Button>
        )}

        {setloading
          ? (
          <LoadingButton
            loading={isLoading}
            variant={!isSubmit ? 'outlined' : 'contained'}
            onClick={callbackAction}
            color={!isSubmit ? 'inherit' : 'primary'}
            endIcon={!isSubmit ? icon : null}
            type={!isSubmit ? 'button' : 'submit'}
            sx={styles}
          >
            {!isSubmit ? 'editar' : 'guardar'}
          </LoadingButton>
            )
          : (
          <Button
            variant={!isSubmit ? 'outlined' : 'contained'}
            onClick={callbackAction}
            color={!isSubmit ? 'inherit' : 'primary'}
            endIcon={!isSubmit ? icon : null}
            type={!isSubmit ? 'button' : 'submit'}
            sx={styles}
          >
            {!isSubmit ? 'editar' : 'guardar'}
          </Button>
            )}
      </Stack>
    </Grid>
  )
}
