import {createClient} from '@supabase/supabase-js';

export type Category = {
    id: number;
    kategori: string;
}
export type Menu = {
    id: number;
    nama: string;
    harga: number;
    id_kategori: number;
    image: string;
}

const key = import.meta.env.VITE_PUBLIC_SUPABASE_ANON_KEY;
const URL = import.meta.env.VITE_PUBLIC_SUPABASE_URL;

const supabase = createClient(URL, key);

export async function getCategory():Promise<Category[]>{
    const{data, error} = await supabase.from<"Kategori", Category>("Kategori").select("*");

    if(error){
        console.error(error);
        return [];
    }
    console.log(data);

    return data ?? [];
}

export async function getMenu():Promise<Menu[]>{
    const{data, error} = await supabase.from<"Menu", Menu>("Menu").select("*");

    if(error){
        console.error(error);
        return [];
    }

    return data ?? [];
}