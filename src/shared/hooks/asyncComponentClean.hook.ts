import { type AxiosResponse } from 'axios'
import { useEffect } from 'react'

type AsyncFunction = () => Promise<AxiosResponse<any, any>>

export const useAsync = (
  asyncFn: AsyncFunction,
  successFunction: (data: any) => void,
  returnFunction?: () => void,
  dependencies: any[] = []
): void => {
  useEffect(() => {
    let isActive = true
    asyncFn().then((result) => {
      if (isActive) successFunction(result.data)
    }).catch((error) => {
      console.error('Error fetching data:', error)
    })

    return () => {
      returnFunction?.()
      isActive = false
    }
  }, dependencies)
}
