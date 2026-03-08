import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  // This creates a client specifically for the browser
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}