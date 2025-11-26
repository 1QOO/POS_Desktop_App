import {createClient} from '@supabase/supabase-js';

const key = import.meta.env.VITE_PUBLIC_SUPABASE_ANON_KEY;
const URL = import.meta.env.VITE_PUBLIC_SUPABASE_URL;

export const supabase = createClient(key, URL);

export function test(){
    console.log(key,URL);
}