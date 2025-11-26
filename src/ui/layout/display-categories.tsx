import type { Dispatch, SetStateAction } from "react";
import type { Category } from "../../lib/api/category-api";

interface CategoryProp{
    categories: Category[];
    selectedCategory: number;
    selectCategory: Dispatch<SetStateAction<number>>
}

function DisplayCategories({categories, selectedCategory, selectCategory}: CategoryProp){
    
    return (
        <div className="bg-white rounded-md h-fit">
            <h1 className="text-center border-b-2 border-gray-600 mx-4">Kategori</h1>
            {
            categories.length === 0?
            <p className="text-center my-8">Loading...</p>:
            <nav className="flex flex-col p-4">
                {categories.map(c=>{
                    
                    return (
                    <button
                        key={c.id}
                        className={`hover:bg-gray-300 focus:outline-none${c.id==selectedCategory?" font-bold":""}`}
                        onClick={()=>{selectCategory(c.id)}}>
                        {c.kategori}
                    </button>
                    )
                })}
            </nav>
            }
        </div>
    )
}

export default DisplayCategories;