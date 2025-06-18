export enum SHIPPING_TYPE {
  NATIONAL = 'national',
  INTERNATIONAL = 'international',
}

const calculateSizeVolumen = (
  width: number,
  height: number,
  depth: number,
  typeShipping: SHIPPING_TYPE
) => {
  const volumeSizes = Math.ceil(width) * Math.ceil(height) * Math.ceil(depth)
  const divisionRegion = typeShipping === SHIPPING_TYPE.NATIONAL ? 2500 : 5000
  return volumeSizes / divisionRegion
}

const calculatePesos = (
  weight: number,
  width: number,
  height: number,
  depth: number,
  typeShipping: SHIPPING_TYPE
) => {
  const pesoVol = calculateSizeVolumen(width, height, depth, typeShipping)
  const pesoVolCeil = Math.ceil(pesoVol * 2) / 2
  const weightsCeil = Math.ceil(weight * 2) / 2
  return { pesoVolCeil, weightsCeil }
}

export const comparativeMoreHeight = (
  weight: number,
  width: number,
  height: number,
  depth: number,
  typeShipping: SHIPPING_TYPE
) => {
  const { pesoVolCeil, weightsCeil } = calculatePesos(
    weight,
    width,
    height,
    depth,
    typeShipping
  )
  const heigestWeight = Math.max(weightsCeil, pesoVolCeil).toFixed(1)
  return heigestWeight
}

export const pesoVol = (
  width: number,
  height: number,
  depth: number,
  typeShipping: SHIPPING_TYPE
) => {
  const pesoVol = calculateSizeVolumen(width, height, depth, typeShipping)
  const pesoVolCeil = Math.ceil(pesoVol * 2) / 2
  return pesoVolCeil
}

export const calculateGrossWeight = (weightPackages: number[]) => {
  return weightPackages.reduce((stack, value) => stack + value, 0)
}
export const calculateDeclareValue = (valuePackages: number[]) => {
  return valuePackages.reduce((stack, value) => stack + value, 0)
}
