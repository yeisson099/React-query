export interface ApiIpResponse {
  ip: string
  status: number
  statusText: string
  headers: Record<string, string>
  config: {
    transitional: {
      silentJSONParsing: boolean
      forcedJSONParsing: boolean
      clarifyTimeoutError: boolean
    }
    adapter: string[]
    transformRequest: Array<null | (() => void)>
    transformResponse: Array<null | (() => void)>
    timeout: number
    xsrfCookieName: string
    xsrfHeaderName: string
    maxContentLength: number
    maxBodyLength: number
    env: Record<string, unknown>
    headers: {
      Accept: string
    }
    method: string
    url: string
  }
  request: Record<string, unknown>
}
