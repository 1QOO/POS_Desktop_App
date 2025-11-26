import DisplayCategories from '../ui/layout/display-categories'
import { getCategory, getMenu } from '../lib/api/category-api'
import useCategory from '../lib/Hooks/useCategory';
import DisplayMenu from '../ui/layout/display-menu';
import DisplayOrders from '../ui/layout/display-orders';
import useOrder from '../lib/Hooks/useOrder';

function App(){
    const [
        category,
        selectedCategory,
        setSelectedCategory,
        menu
    ] = useCategory(getCategory, getMenu);
    const [
        order,
        addOrder,
        decreaseOrder,
        removeOrder,
        clearOrders
    ] = useOrder();

    return (
        <div className='size-full grid grid-cols-[3fr_4fr] grid-rows-[auto_1fr] p-3 gap-x-3 gap-y-8 bg-blue-400'>
            <DisplayCategories
                categories={category}
                selectedCategory={selectedCategory}
                selectCategory={setSelectedCategory}/>
            <DisplayMenu menu={menu} addOrder={addOrder} />
            <DisplayOrders order={order} addOrder={addOrder} decreaseOrder={decreaseOrder} removeOrder={removeOrder} clearOrders={clearOrders} />
        </div>
    )
}

export default App
