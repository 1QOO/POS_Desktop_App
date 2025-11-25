import { useState } from "react";
import Payment from "./payment"

export interface Order{
    id: number,
    name: string,
    amount: number,
    price: number,
}
interface OrderListProp{
    order: Order[];
    addOrder: (menu: Order)=>void;
    decreaseOrder: (menu: Order)=>void;
    removeOrder: (menu: Order)=>void;
}
interface OrderProp{
    order: Order[];
    addOrder: (menu: Order)=>void;
    decreaseOrder: (menu: Order)=>void;
    removeOrder: (menu: Order)=>void;
    clearOrders: ()=>void;
}

function DisplayOrders({order, addOrder, decreaseOrder, removeOrder, clearOrders}: OrderProp){
    const [payment, setPayment] = useState(false);

    function togglePayment(){
        setPayment(!payment);
    }

    return (
        <div className="flex flex-col bg-white rounded-md h-full">
            {payment && <Payment togglePayment={togglePayment} order={order} clearOrders={clearOrders} />}
            <h1 className="border-b-2 mx-4 border-gray-600 text-center">Order</h1>
            {order.length!=0 && <div className="mx-4 max-h-[300px] overflow-auto">
                <OrderList order={order} addOrder={addOrder} decreaseOrder={decreaseOrder} removeOrder={removeOrder}/>
            </div>}
            <div className="mt-auto p-4 bg-blue-800 border-4 rounded-b-md border-white">
                <div className="block w-fit font-bold ml-auto">
                    <span className="mr-2 px-2 bg-white">Total:</span>
                    <span className="bg-white px-2 text-right min-w-30 inline-block">
                        {order.length?`Rp. ${order.map(item=>item.amount*item.price).reduce((x,y)=>x+y).toLocaleString('id')}`:"Rp. 0"}
                    </span>
                </div>
                <button
                    disabled={order.length==0}
                    onClick={()=>{togglePayment()}}
                    className="
                        block m-auto min-w-[25%] px-6 py-2 border-2 border-white
                        hover:cursor-pointer active:bg-amber-600 disabled:bg-amber-700 disabled:text-gray-500
                        bg-amber-500 rounded-md text-white text-center font-bold">
                    BAYAR
                </button>
            </div>
        </div>
    )
}

function OrderList({order, addOrder, decreaseOrder, removeOrder}: OrderListProp){

    return(
        <table className="w-full h-full">
            <thead className="hidden">
                <tr>
                    <th>Number</th> <th>Name</th> <th>Amount</th>
                    <th>Sub Total</th> <th>Buttons</th>
                </tr>
            </thead>
            <tbody>
                {order.map((item, i)=>{
                    return (
                        <tr key={item.id} className="border-b-2 border-gray-400 hover:cursor-default">
                            <td className="px-2">{`${i+1}.`}</td>
                            <td className="px-2" title={`Price: Rp. ${item.price.toLocaleString('id')}`}>{item.name}</td>
                            <td className="px-10">{item.amount}</td>
                            <td className="px-2 max-w-max">{`Rp. ${(item.price*item.amount).toLocaleString('id')}`}</td>
                            <td>
                                <div className="ml-auto flex flex-row w-fit gap-1 p-1">
                                    <button
                                        className="size-6 rounded-md active:bg-red-500 bg-red-600 text-white text-xs font-bold hover:cursor-pointer"
                                        onClick={()=>{decreaseOrder(item)}}>-</button>
                                    <button
                                        className="size-6 rounded-md active:bg-blue-600 bg-blue-700 text-white text-xs font-bold hover:cursor-pointer"
                                        onClick={()=>{removeOrder(item)}}>C</button>
                                    <button
                                        className="size-6 rounded-md active:bg-green-400 bg-green-500 text-white text-xs font-bold hover:cursor-pointer"
                                        onClick={()=>{addOrder(item)}}>+</button>
                                </div>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    );
}

export default DisplayOrders;