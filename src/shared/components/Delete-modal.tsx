import React, { useEffect, useMemo, useState } from 'react'
import { WarningOutlined } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import { Alert, AlertTitle, Box, Button, type ButtonProps, Modal, Typography } from '@mui/material'

export const DeleteModal = ({ handleBulkDelete, openModal, setOpenModal, rowsId }: { handleBulkDelete: any, openModal: boolean, setOpenModal: any, rowsId: any }) => {
  const handleClose = () => setOpenModal(false)
  const [isLoading, setIsLoading] = useState(false)

  const modalDeleteStyles = useMemo(
    () => ({
      position: 'absolute' as 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 400,
      bgcolor: 'white',
      padding: '1rem',
      borderRadius: '1rem'
    }),
    []
  )

  const cancelButtonStylesModal = useMemo<ButtonProps['sx']>(
    () => ({
      color: 'black',
      height: 50
    }),
    []
  )

  const handleSendIds = async () => {
    setIsLoading(true)
    await handleBulkDelete(rowsId)
    setIsLoading(false)
    handleClose()
  }
  return (
        <Modal
            open={openModal}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={modalDeleteStyles}>
                <Box>
                    <Typography my={4} variant="subtitle2">
                        ¿Estás seguro de que deseas eliminar estas ordenes?
                    </Typography>

                    <Alert
                        sx={{ borderRadius: 0, background: 'rgb(211, 47, 47, .15)', color: '#D32F2F' }}
                        icon={<WarningOutlined fontSize="inherit" />}
                        severity="error">
                        <AlertTitle>Advertencia</AlertTitle>
                        No podrás deshacer esta acción
                    </Alert>
                </Box>
                <Box display="flex" my={4} justifyContent={'center'}>
                    <Button
                        type="button"
                        variant="text"
                        onClick={handleClose}
                        sx={cancelButtonStylesModal}
                    >
                        CANCELAR
                    </Button>

                    <LoadingButton
                        variant="contained"
                        sx={{ ml: 2, height: 50, background: 'rgb(255, 50, 102)', color: '#fff' }}
                        loading={isLoading}
                        onClick={handleSendIds}
                    >
                        BORRAR
                    </LoadingButton>
                </Box>
            </Box>

        </Modal>
  )
}
