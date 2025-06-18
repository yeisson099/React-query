import React from 'react'
import { useFormContext } from 'react-hook-form'
import { FormField } from '@sharedComponents/forms/Form-field'
import { BANKS, TYPE_PERSON } from '../constants/form/select-values.const'
import type { SubmitHandler } from 'react-hook-form'
import { LoadingButton } from '@mui/lab'
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography
} from '@mui/material'
import { useMutatePse } from '../hooks/pse.hook'
import {
  type CountryIso2,
  defaultCountries,
  FlagImage,
  parseCountry,
  usePhoneInput
} from 'react-international-phone'
import 'react-international-phone/style.css'
import { useIPQuery } from '@hooks/useIP.hook'
import { type PaymentForm as PaymentFormType } from '@models/payment.type'

export const PaymentForm: React.FC = () => {
  const { data: ip } = useIPQuery()
  const { mutateAsync: psePayment, isPending: isLoading } = useMutatePse()
  const {
    handleSubmit,
    register
  } = useFormContext()
  const {
    country,
    setCountry,
    phone: dialCode
  } = usePhoneInput({
    countries: defaultCountries
  })

  const onSubmit: SubmitHandler<any> = async (
    paymentForm: Omit<PaymentFormType, 'ip'>
  ) => {
    await psePayment({ ...paymentForm, ip })
  }

  return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack direction="column" spacing={2}>
          <FormField
            type="select"
            name="bank"
            label="Entidad Bancaria"
            options={BANKS}
          />
          <Stack direction="row" spacing={2} width="100%">
            <FormField name="name" label="Nombre del Titular" />
            <FormField name="lastName" label="Apellido del Titular" />
          </Stack>
          <FormField
            name="docType"
            type="select"
            label="Tipo de Cliente"
            options={TYPE_PERSON}
          />
          <FormField name="docNumber" label="Número Documento" />
          <Stack direction="row" spacing={2} width="100%">
            <Stack>
              <FormControl fullWidth>
                <InputLabel id="phone-select-label">Celular</InputLabel>
                <Select
                  labelId="phone-select-label"
                  id="phone-select"
                  value={country.iso2}
                  size="small"
                  MenuProps={{
                    style: {
                      height: '300px',
                      width: '360px',
                      top: '10px',
                      left: '-34px'
                    }
                  }}
                  label="Celular"
                  onChange={(e) => {
                    setCountry(e.target.value as CountryIso2)
                  }}
                  renderValue={(value) => {
                    return (
                      <Stack direction="row" spacing={2} alignItems="center">
                        <FlagImage iso2={value} style={{ display: 'flex' }} />
                        <Typography color="gray">
                          +{country.dialCode}
                        </Typography>
                      </Stack>
                    )
                  }}
                >
                  {defaultCountries.map((c) => {
                    const country = parseCountry(c)
                    return (
                      <MenuItem key={country.iso2} value={country.iso2}>
                        <FlagImage
                          iso2={country.iso2}
                          style={{ marginRight: '8px' }}
                        />
                        <Typography marginRight="8px">
                          {country.name}
                        </Typography>
                        <Typography color="gray">
                          +{country.dialCode}
                        </Typography>
                      </MenuItem>
                    )
                  })}
                </Select>
              </FormControl>
            </Stack>
            <TextField
              label={'Teléfono'}
              type="number"
              size="small"
              {...register('cellPhone', { required: true })}
              variant="outlined"
              fullWidth
            />
          </Stack>
          <FormField name="email" label="Correo Electrónico" type="email" />
          <LoadingButton
            variant="contained"
            color="primary"
            loading={isLoading}
            type="submit"
            sx={{
              minHeight: '37px'
            }}
          >
            Pagar
          </LoadingButton>
        </Stack>
      </form>
  )
}
