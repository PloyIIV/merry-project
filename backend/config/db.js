import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config();

const supabaseUrl = 'https://kytmoipjixhtewqymzuy.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY
export const supabase = createClient(supabaseUrl, supabaseKey)
export const supabaseAdmin = createClient(supabaseUrl, supabaseSecretKey, {
    auth: {
        autoRefreshToken: false,
        persistSession: false
    }
})