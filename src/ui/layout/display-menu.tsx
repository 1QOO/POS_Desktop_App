import type { Menu } from "../../lib/api/category-api";

interface Order{
    id: number;
    name: string;
    amount: number;
    price: number;
}

interface MenuProp{
    menu: Menu[];
    addOrder: (menu: Order)=>void;
}

function DisplayMenu({menu, addOrder}: MenuProp){

    return(
        <div className="row-span-2 bg-white rounded-md overflow-y-scroll relative">
            <h1 className="text-center border-b-2 border-gray-600 mx-4 sticky top-0 bg-white">Menu</h1>
            <div className={
                menu.length==0?
                `flex h-full w-full justify-center items-center`:
                `grid grid-cols-4 w-full p-4 gap-4`}>
            {
                menu.length===0?
                <p>Loading...</p>:
                menu.map(m=>{
                    return <MenuCard menu={m} addOrder={addOrder} />
                })
            }
            </div>
        </div>
    )
}

interface CardProp{
    menu: Menu;
    addOrder: (menu: Order)=>void;
}

function MenuCard({menu, addOrder}: CardProp){
    return (
        <div key={menu.id} className="
        flex flex-col justify-between gap-4
        border-2 border-gray-600
        rounded-md bg-gray-200 p-2" >
            <div>
                <div className="bg-gray-400 w-full aspect-square">
                    <img src={menu.image} alt={menu.nama} />
                </div>
                <h2>{menu.nama}</h2>
            </div>
            <div className="text-right">
                <p>{`Rp. ${menu.harga.toLocaleString('id')}`}</p>
                <button
                    className="bg-green-600 text-white font-bold rounded-md px-2 py-1 text-sm hover:cursor-pointer"
                    onClick={()=>addOrder({
                        id: menu.id,
                        name: menu.nama,
                        amount: 1,
                        price: menu.harga
                    })}>
                    Add
                </button>
            </div>
        </div>
    )
}

export default DisplayMenu;