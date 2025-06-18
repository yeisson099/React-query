import { Grid, Typography, Skeleton } from '@mui/material'
import { type Variant } from '@mui/material/styles/createTypography'

interface Props {
  gridSize: number
  titleVariant: Variant
  descriptionVariant?: Variant
  title: string
  description?: string
  isLoading: boolean
}

export const BasicInfo = ({ gridSize, titleVariant, descriptionVariant, title, description, isLoading }: Props): any => {
  return (
    <Grid
      item
      xs={gridSize}
      sx={{ paddingTop: '0 !important', paddingRight: '10%' }}
    >
      <Typography variant={titleVariant}>
        {isLoading ? <Skeleton animation="wave" /> : title}
      </Typography>
      {description && (
        <Typography variant={descriptionVariant}>
          {isLoading ? <Skeleton animation="wave" /> : description}
        </Typography>
      )}
    </Grid>
  )
}
