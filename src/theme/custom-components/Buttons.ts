import { alpha, type CSSInterpolation } from '@mui/material/styles'
import { type Components, type ButtonProps } from '@mui/material'
import palette from '../palette'

// ----------------------------------------------------------------------

const COLORS = [
  'primary',
  'secondary',
  'info',
  'success',
  'warning',
  'error'
] as const

// NEW VARIANT
declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    soft: true
  }
}

export default function MuiButton (): Components['MuiButton'] {
  const isLight = palette('light').mode === 'light'

  const rootStyle = ({
    color,
    variant,
    size,
    disabled
  }: ButtonProps): CSSInterpolation => {
    const inheritColor = color === 'inherit'
    const containedVariant = variant === 'contained'
    const outlinedVariant = variant === 'outlined'
    const textVariant = variant === 'text'
    const softVariant = variant === 'soft'
    const smallSize = size === 'small'
    const largeSize = size === 'large'

    const defaultStyle = {
      ...(inheritColor && {
        // CONTAINED
        ...(containedVariant && {
          color: palette('light').grey[800],
          '&:hover': {
            backgroundColor: palette('light').grey[400]
          }
        }),
        // OUTLINED
        ...(outlinedVariant && {
          color: alpha('#000000', 0.85),
          borderColor: alpha('#000000', 0.85),
          fontSize: '13px',
          '&:hover': {
            borderColor: palette('light').text.primary,
            backgroundColor: palette('light').action.hover
          }
        }),
        // TEXT
        ...(textVariant && {
          '&:hover': {
            backgroundColor: palette('light').action.hover
          }
        }),
        // SOFT
        ...(softVariant && {
          color: palette('light').text.primary,
          backgroundColor: alpha(palette('light').grey[500], 0.08),
          '&:hover': {
            backgroundColor: alpha(palette('light').grey[500], 0.24)
          }
        })
      })
    }

    const colorStyle = COLORS.map((colorOption) => ({
      ...(color === colorOption && {
        // SOFT
        ...(softVariant && {
          color: palette('light')[colorOption][isLight ? 'dark' : 'light'],
          backgroundColor: alpha(palette('light')[colorOption].main, 0.16),
          '&:hover': {
            backgroundColor: alpha(palette('light')[colorOption].main, 0.32)
          }
        })
      })
    }))

    const disabledState = {
      '&.Mui-disabled': {
        // SOFT
        ...(softVariant && {
          backgroundColor: palette('light').action.disabledBackground
        })
      }
    }

    const sizeStyles = {
      ...(smallSize && {
        height: 30,
        fontSize: 13,
        ...(softVariant && {
          padding: '4px 10px'
        })
      }),
      ...(largeSize && {
        height: 48,
        fontSize: 15,
        ...(softVariant && {
          padding: '8px 22px'
        })
      })
    }

    return [
      ...colorStyle,
      defaultStyle,
      disabledState,
      sizeStyles,
      {
        fontWeight: 600,
        fontSize: '14px',
        borderRadius: '5px !important',
        textTransform: 'capitalize',
        padding: '5px 10px',
        lineHeight: '1.3px',
        minHeight: '28px'
      }
    ]
  }

  return {
    styleOverrides: {
      root: (props: { ownerState: ButtonProps }) => rootStyle(props.ownerState)
    }
  }
}
