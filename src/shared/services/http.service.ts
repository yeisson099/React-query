import { HTTP_METHODS, type IParams } from '@models/base-service.type'
import axios, { type AxiosInstance, type AxiosResponse, type AxiosRequestConfig } from 'axios'
import Cookies from 'js-cookie'

class HttpService {
  private readonly http: AxiosInstance
  private readonly baseURL = import.meta.env.VITE_API_URL

  constructor () {
    this.http = axios.create({
      baseURL: this.baseURL,
      withCredentials: false,
      headers: this.setupHeaders()
    })
  }

  public service () {
    this.injectInterceptors()
    return this
  }

  private get getAuthorization () {
    const accessToken = Cookies.get('AccessToken') ?? ''
    return accessToken ? { Authorization: `Bearer ${accessToken}` } : {}
  }

  private setupHeaders (hasAttachment = false) {
    return hasAttachment
      ? { 'Content-Type': 'multipart/form-data', ...this.getAuthorization }
      : { 'Content-Type': 'application/json', ...this.getAuthorization }
  }

  private async request<T>(
    method: HTTP_METHODS,
    url: string,
    options: AxiosRequestConfig
  ): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.http.request<T>({
        method,
        url,
        ...options
      })

      return response.data
    } catch (error) {
      return await this.normalizeError(error)
    }
  }

  public async get<T>(
    url: string,
    params?: IParams,
    hasAttachment = false
  ): Promise<T> {
    return await this.request<T>(HTTP_METHODS.GET, url, {
      params,
      headers: this.setupHeaders(hasAttachment)
    })
  }

  public async post<T, P>(
    url: string,
    payload: P,
    params?: IParams,
    hasAttachment = false
  ): Promise<T> {
    return await this.request<T>(HTTP_METHODS.POST, url, {
      params,
      data: payload,
      headers: this.setupHeaders(hasAttachment)
    })
  }

  public async update<T, P>(
    url: string,
    payload: P,
    params?: IParams,
    hasAttachment = false
  ): Promise<T> {
    return await this.request<T>(HTTP_METHODS.PUT, url, {
      params,
      data: payload,
      headers: this.setupHeaders(hasAttachment)
    })
  }

  public async delete<T>(
    url: string,
    params?: IParams,
    hasAttachment = false
  ): Promise<T> {
    return await this.request<T>(HTTP_METHODS.DELETE, url, {
      params,
      headers: this.setupHeaders(hasAttachment)
    })
  }

  private injectInterceptors () {
    // Set up request interceptor
    this.http.interceptors.request.use((request) => {
      // * Perform an action
      // TODO: implement an NProgress
      return request
    })

    // Set up response interceptor
    this.http.interceptors.response.use(
      (response) => {
        // * Do something
        return response
      },

      async (error) => {
        // * Implement a global error alert
        return await Promise.reject(error)
      }
    )
  }

  private async normalizeError (error: any) {
    return await Promise.reject(error.response.data)
  }
}

export { HttpService as default }
