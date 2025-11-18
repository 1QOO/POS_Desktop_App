import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import type { Category, Menu } from "../api/category-api";

function useCategory(getCategory: ()=>Promise<Category[]>, getMenu: ()=>Promise<Menu[]>):
    [Category[], number, Dispatch<SetStateAction<number>>, Menu[]] {

    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<number>(0);
    const [allMenu, setAllMenu] = useState<Menu[]>([]);
    const menu = allMenu.filter(item=>{
        if(item.cat_id==selectedCategory) return item;
    });

    useEffect(() => {
        let mounted = true;
        Promise.all([getCategory(), getMenu()])
        .then(data => {
            if (!mounted) return;
            const [categoriesData, menuData] = data;
            setCategories(categoriesData);
            setAllMenu(menuData);
            if (categoriesData && categoriesData.length > 0) setSelectedCategory(categoriesData[0].id);
        });

        return () => { mounted = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return [categories, selectedCategory, setSelectedCategory, menu];
}

export default useCategory;