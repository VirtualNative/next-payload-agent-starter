// AI-CONTEXT: Environment variable validation and type safety
// PATTERN: Single source of truth for all environment config
// SECURITY: Validates all env vars at build/runtime

import { z } from 'zod'

// Define the schema for your environment variables
const envSchema = z.object({
  // Node environment
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  
  // URLs
  NEXT_PUBLIC_APP_URL: z.string().url().default('http://localhost:3000'),
  NEXT_PUBLIC_API_URL: z.string().url().default('http://localhost:3001'),
  
  // Payload CMS
  PAYLOAD_PUBLIC_SERVER_URL: z.string().url().optional(),
  
  // Database (for Payload)
  DATABASE_URI: z.string().url().optional(),
  
  // Authentication
  PAYLOAD_SECRET: z.string().min(32, 'PAYLOAD_SECRET must be at least 32 characters'),
  
  // Optional: Analytics
  NEXT_PUBLIC_GA_ID: z.string().optional(),
  NEXT_PUBLIC_POSTHOG_KEY: z.string().optional(),
  NEXT_PUBLIC_POSTHOG_HOST: z.string().url().optional(),
  
  // Optional: Error tracking
  NEXT_PUBLIC_SENTRY_DSN: z.string().url().optional(),
  SENTRY_AUTH_TOKEN: z.string().optional(),
  
  // Optional: Feature flags
  NEXT_PUBLIC_ENABLE_PWA: z.coerce.boolean().default(false),
  NEXT_PUBLIC_ENABLE_ANALYTICS: z.coerce.boolean().default(false),
  
  // Optional: n8n integration
  N8N_URL: z.string().url().optional(),
  N8N_HMAC_SECRET: z.string().min(16).optional(),
})

// Parse and validate environment variables
function validateEnv() {
  try {
    const parsed = envSchema.parse(process.env)
    return parsed
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errorMessage = error.errors
        .map((e) => `  ${e.path.join('.')}: ${e.message}`)
        .join('\n')
      
      console.error('❌ Environment validation failed:\n' + errorMessage)
      
      // In development, show detailed error
      if (process.env.NODE_ENV === 'development') {
        throw new Error(`Invalid environment variables:\n${errorMessage}`)
      }
      
      // In production, fail gracefully
      throw new Error('Configuration error. Please check environment variables.')
    }
    throw error
  }
}

// Export validated environment variables
export const env = validateEnv()

// Type-safe environment variable access
export type Env = z.infer<typeof envSchema>

// Helper to check if running in production
export const isProduction = env.NODE_ENV === 'production'
export const isDevelopment = env.NODE_ENV === 'development'
export const isTest = env.NODE_ENV === 'test'

// Helper to get public runtime config
export const publicConfig = {
  appUrl: env.NEXT_PUBLIC_APP_URL,
  apiUrl: env.NEXT_PUBLIC_API_URL,
  enablePWA: env.NEXT_PUBLIC_ENABLE_PWA,
  enableAnalytics: env.NEXT_PUBLIC_ENABLE_ANALYTICS,
  gaId: env.NEXT_PUBLIC_GA_ID,
  posthog: {
    key: env.NEXT_PUBLIC_POSTHOG_KEY,
    host: env.NEXT_PUBLIC_POSTHOG_HOST,
  },
  sentry: {
    dsn: env.NEXT_PUBLIC_SENTRY_DSN,
  },
}

// Helper for server-only config
export const serverConfig = {
  payloadSecret: env.PAYLOAD_SECRET,
  databaseUri: env.DATABASE_URI,
  n8n: {
    url: env.N8N_URL,
    hmacSecret: env.N8N_HMAC_SECRET,
  },
  sentry: {
    authToken: env.SENTRY_AUTH_TOKEN,
  },
}

// Log environment info (safe values only)
if (isDevelopment) {
  console.log('🔧 Environment:', {
    NODE_ENV: env.NODE_ENV,
    APP_URL: env.NEXT_PUBLIC_APP_URL,
    API_URL: env.NEXT_PUBLIC_API_URL,
    Features: {
      PWA: env.NEXT_PUBLIC_ENABLE_PWA,
      Analytics: env.NEXT_PUBLIC_ENABLE_ANALYTICS,
    }
  })
}
