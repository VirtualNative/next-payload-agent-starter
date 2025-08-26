// AI-CONTEXT: Type-safe API client for consistent data fetching
// PATTERN: Centralized error handling and request/response typing
// FEATURES: Automatic retries, timeout, auth headers

import { env } from '@/lib/env'

// Custom error class for API errors
export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public data?: any
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

// Request options
interface RequestOptions extends RequestInit {
  params?: Record<string, string | number | boolean>
  timeout?: number
  retry?: number
}

// Base API client class
class ApiClient {
  private baseURL: string
  private defaultHeaders: HeadersInit
  private timeout: number

  constructor(baseURL: string, defaultHeaders: HeadersInit = {}, timeout = 30000) {
    this.baseURL = baseURL
    this.defaultHeaders = defaultHeaders
    this.timeout = timeout
  }

  private async request<T>(
    endpoint: string,
    options: RequestOptions = {}
  ): Promise<T> {
    const {
      params,
      timeout = this.timeout,
      retry = 0,
      headers,
      ...fetchOptions
    } = options

    // Build URL with params
    const url = new URL(endpoint, this.baseURL)
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.set(key, String(value))
      })
    }

    // Merge headers
    const requestHeaders = {
      'Content-Type': 'application/json',
      ...this.defaultHeaders,
      ...headers,
    }

    // Create abort controller for timeout
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), timeout)

    try {
      const response = await fetch(url.toString(), {
        ...fetchOptions,
        headers: requestHeaders,
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      // Handle non-2xx responses
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new ApiError(
          errorData.message || `HTTP ${response.status}`,
          response.status,
          errorData
        )
      }

      // Handle empty responses
      if (response.status === 204) {
        return {} as T
      }

      return await response.json()
    } catch (error) {
      clearTimeout(timeoutId)

      // Handle timeout
      if (error instanceof Error && error.name === 'AbortError') {
        throw new ApiError('Request timeout', 408)
      }

      // Retry logic
      if (retry > 0 && error instanceof ApiError && error.status >= 500) {
        await new Promise(resolve => setTimeout(resolve, 1000))
        return this.request<T>(endpoint, { ...options, retry: retry - 1 })
      }

      throw error
    }
  }

  // HTTP methods
  async get<T>(endpoint: string, options?: RequestOptions): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'GET' })
  }

  async post<T>(endpoint: string, data?: any, options?: RequestOptions): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    })
  }

  async patch<T>(endpoint: string, data?: any, options?: RequestOptions): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
    })
  }

  async put<T>(endpoint: string, data?: any, options?: RequestOptions): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    })
  }

  async delete<T = void>(endpoint: string, options?: RequestOptions): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'DELETE' })
  }
}

// Create and export default API client
export const apiClient = new ApiClient(env.NEXT_PUBLIC_API_URL)

// Helper function for authenticated requests
export function createAuthenticatedClient(token: string) {
  return new ApiClient(
    env.NEXT_PUBLIC_API_URL,
    { Authorization: `Bearer ${token}` }
  )
}

// Type-safe API factory
export function createTypedClient<T extends Record<string, any>>(
  config: { baseURL?: string; headers?: HeadersInit } = {}
) {
  const client = new ApiClient(
    config.baseURL || env.NEXT_PUBLIC_API_URL,
    config.headers
  )

  return {
    collection: <K extends keyof T>(name: K) => ({
      list: (options?: RequestOptions) => 
        client.get<T[K][]>(`/api/${String(name)}`, options),
        
      get: (id: string, options?: RequestOptions) => 
        client.get<T[K]>(`/api/${String(name)}/${id}`, options),
        
      create: (data: Partial<T[K]>, options?: RequestOptions) => 
        client.post<T[K]>(`/api/${String(name)}`, data, options),
        
      update: (id: string, data: Partial<T[K]>, options?: RequestOptions) => 
        client.patch<T[K]>(`/api/${String(name)}/${id}`, data, options),
        
      delete: (id: string, options?: RequestOptions) => 
        client.delete(`/api/${String(name)}/${id}`, options),
    })
  }
}
