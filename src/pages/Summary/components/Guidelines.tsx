import React from 'react'
import Typography from '@mui/material/Typography'
import { Grid, Link } from '@mui/material'

const Guidelines: React.FC = () => {
  return (
    <>
      <Typography variant="h2" textAlign="justify" mt={1}>
        Información importante:
      </Typography>

      <Grid container component={'ul'} spacing={2} mt={1}>
        <Grid item component={'li'}>
          <Typography textAlign="justify">
            Descarga tu guía en el tab de “Envíos” e imprime dos copias para
            adjuntar a tu envío, recuerda que todos los envíos internacionales
            deben también llevar adjuntas dos copias de la factura original que
            deben coincidir con el contenido y valor declarado de la guía, en
            caso de no tener una factura a nombre de tu empresa puedes descargar
            nuestro template{' '}
            <Link
              href="https://shipal.co/2023/08/25/como-crear-una-factura-comercial"
              target="_blank"
              underline="always"
              color="inherit"
            >
              {'aquí'}
            </Link>
            . Debes tener en cuenta que algunas aduanas del mundo solo aceptan
            facturas originales.
          </Typography>
        </Grid>
        <Grid item component={'li'}>
          <Typography textAlign="justify">
            Todos los envíos internacionales deben hacer un proceso de aduanas
            en el país de destino, lo que puede generar cobros de impuestos y
            aranceles que serán cobrados al receptor. Por favor ten en cuenta
            que estos cobros no dependen de la transportadora y deben ser
            pagados obligatoriamente para la entrega del paquete.
          </Typography>
        </Grid>
        <Grid item component={'li'}>
          <Typography textAlign="justify">
            Si requieres programar una recolección lo podrás hacer desde el tab
            de envíos, es muy importante tener tu envío listo para la fecha de
            la solicitud pues generalmente los couriers no esperan más de 5
            minutos en la dirección de recolección.
          </Typography>
        </Grid>
        <Grid item component={'li'}>
          <Typography textAlign="justify">
            Según las normativas vigentes de envíos internacionales existen
            “productos prohibidos” de enviar, puedes consultar la lista completa{' '}
            <Link
              href="https://shipal.co/objetos-prohibidos"
              target="_blank"
              underline="always"
              color="inherit"
            >
              {'aquí'}
            </Link>{' '}
            para evitar tener problemas con tu envío.
          </Typography>
        </Grid>
        <Grid item component={'li'}>
          <Typography textAlign="justify">
            Recuerda que los envíos internacionales están sujetos a cargos
            extras tales como: áreas remotas o cambios de direcciones en destino
            en caso de ser solicitadas por el receptor. Estos cargos serán
            cobrados por Shipal al responsable de la cuenta en Colombia.
          </Typography>
        </Grid>
        <Grid item component={'li'}>
          <Typography textAlign="justify">
            ¡MUY IMPORTANTE! La información suministrada en el momento de la
            creación de la guía debe ser real y exacta, cualquier error o falta
            de información puede causar retraso en el tránsito del paquete,
            sobrecargos en el servicio, devolución o incluso decomiso.
          </Typography>
        </Grid>
        <Grid item component={'li'}>
          <Typography textAlign="justify">
            Si tienes alguna duda sobre nuestras políticas detérminos y
            condiciones las puedes consultar{' '}
            <Link
              href="https://shipal.co/terminos-y-condiciones"
              target="_blank"
              underline="always"
              color="inherit"
            >
              {'aquí'}
            </Link>{' '}
            o puedes contactarte con soporte.
          </Typography>
        </Grid>
      </Grid>
    </>
  )
}

export default Guidelines
