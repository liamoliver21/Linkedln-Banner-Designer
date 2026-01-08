
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://fgzdkhphgeltqfmnpyio.supabase.co'
const supabaseKey = 'sb_publishable_l74bG6owQJVq-EN0-BP1EQ_Wrpl8x95'

export const supabase = createClient(supabaseUrl, supabaseKey)
