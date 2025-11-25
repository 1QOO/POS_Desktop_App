import { useState } from "react";

interface Order {
    id: number;
    name: string;
    amount: number;
    price: number;
}

function useOrder(): 
([Order[], (menu: Order)=>void, (menu: Order)=>void, (menu: Order)=>void, ()=>void]){

    const [order, setOrder] = useState<Order[]>([]);

    function addOrder(menu: Order){
        if(order.find(item=>item.id==menu.id)){
            setOrder(prevOrder=>{
                return prevOrder.map(item=>{
                    return item.id==menu.id? {...item, amount:item.amount+1} : {...item}
                })
            })
        }else{
            setOrder(prevOrder=>{
                return prevOrder.concat(menu);
            })
        }
    }

    function decreaseOrder(menu: Order){
        if(order.find(item=>item.id==menu.id)){
            const newOrder = order.map(item=>{
                return item.id==menu.id?{...item, amount: item.amount-1}:{...item};
            });
             setOrder(newOrder.filter(item=>item.amount>0));
        }
    }

    function removeOrder(menu: Order){
        const newOrder = order.filter(item=>item.id!=menu.id);
        setOrder(newOrder);
    }

    function clearOrders(){
        setOrder([]);
    }

    return [order, addOrder, decreaseOrder, removeOrder, clearOrders];
}

export default useOrder;