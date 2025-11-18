interface Order{
    id: number,
    name: string,
    amount: number,
    price: number,
}
interface OrderProp{
    order: Order[];
    addOrder: (menu: Order)=>void;
    decreaseOrder: (menu: Order)=>void;
    removeOrder: (menu: Order)=>void;
}

function DisplayOrders({order, addOrder, decreaseOrder, removeOrder}: OrderProp){
    return (
        <div className="flex flex-col bg-white rounded-md h-full">
            <h1 className="border-b-2 mx-4 border-gray-600 text-center">Order</h1>
            {order.length==0? <p className="m-auto">No Order</p> :<>
                <div className="mx-4 max-h-[300px] overflow-auto">
                    <OrderList order={order} addOrder={addOrder} decreaseOrder={decreaseOrder} removeOrder={removeOrder}/>
                </div>
                <div className="mt-auto p-4 bg-blue-800 border-4 rounded-b-md border-white">
                    <div className="block w-fit bg-white px-2 font-bold ml-auto">
                        {`Rp. ${order.map(item=>item.amount*item.price).reduce((x,y)=>x+y).toLocaleString('id')}`}
                    </div>
                    <button
                        className="
                            block m-auto min-w-[25%] px-6 py-2 hover:cursor-pointer
                            border-2 border-white
                            bg-amber-500 rounded-md text-white text-center font-bold">
                        PAY
                    </button>
                </div>
            </>
            }
        </div>
    )
}

function OrderList({order, addOrder, decreaseOrder, removeOrder}: OrderProp){

    return(
        <table className="w-full h-full">
            <thead className="hidden">
                <tr>
                    <th>ID</th> <th>Name</th> <th>Amount</th>
                    <th>Multiply</th> <th>Price</th> <th>Sub Total</th> <th>Buttons</th>
                </tr>
            </thead>
            <tbody>
                {order.map((item, i)=>{
                    return (
                        <tr key={item.id} className="border-b-2 border-gray-400">
                            <td className="px-2">{`${i+1}.`}</td>
                            <td className="px-2">{item.name}</td>
                            <td className="px-2">{item.amount}</td>
                            <td className="px-2">x</td>
                            <td className="px-2">{`Rp. ${item.price.toLocaleString('id')}`}</td>
                            <td className="px-2">{`Rp. ${(item.price*item.amount).toLocaleString('id')}`}</td>
                            <td>
                                <button
                                    className="size-6 rounded-md active:bg-red-500 bg-red-600 text-white text-xs font-bold hover:cursor-pointer"
                                    onClick={()=>{decreaseOrder(item)}}>-</button>
                                <button
                                    className="size-6 rounded-md active:bg-blue-600 bg-blue-700 text-white text-xs font-bold mx-2 hover:cursor-pointer"
                                    onClick={()=>{removeOrder(item)}}>C</button>
                                <button
                                    className="size-6 rounded-md active:bg-green-400 bg-green-500 text-white text-xs font-bold hover:cursor-pointer"
                                    onClick={()=>{addOrder(item)}}>+</button>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    );
}

export default DisplayOrders;