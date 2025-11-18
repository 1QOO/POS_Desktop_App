export interface Category {
    id: number,
    name: string
}

export interface Menu {
    id: number,
    name: string,
    price: number,
    cat_id: number
}

const CATEGORY_API_URL = "http://localhost:3000/category";
const MENU_API_URL = "http://localhost:3000/menu";

export async function getCategory(): Promise<Category[]>{
    const response = await fetch(CATEGORY_API_URL);

    if(!response.ok){
        throw new Error(`Error fetching categories: ${response.statusText}`);
    }
    return response.json();
}

export async function getMenu(): Promise<Menu[]>{
    const response = await fetch(MENU_API_URL);

    if(!response.ok){
        throw new Error(`Error fetching category: ${response.statusText}`);
    }
    return response.json();
}