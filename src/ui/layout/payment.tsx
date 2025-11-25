import { useState } from 'react';
import type { Order } from './display-orders'

interface TogglePayment {
    togglePayment: ()=>void;
    order: Order[];
    clearOrders: ()=>void;
}

interface ButtonsFunction{
    numberButton: (number: string)=>void;
    deleteNumber: ()=>void;
    resetCash: ()=>void;
}

interface MessageProps{
    confirmMessage: ()=>void;
    orders: Order[];
    totalCost: number;
    cash: string;
    change: number;
}

function Payment({togglePayment, order, clearOrders}: TogglePayment){
    const totalCost = order.map(item=>item.amount*item.price).reduce((x,y)=>x+y);
    const [cash, setCash] = useState('0');
    const [confirmedMessage, setConfirmedMessage] = useState(false);
    const change = Number(cash) - totalCost;

    function numberButton(number: string){
        if(!Number(cash+number)) return;
        const newCash = cash!=='0'?cash.concat(number):number;
        setCash(newCash);
    }

    function deleteNumber(){
        if(cash.length==1){
            resetCash();
            return;
        }
        const newCash = cash.slice(0, -1);
        setCash(newCash);
    }

    function resetCash(){
        setCash('0');
    }

    function confirmPayment(){
        setConfirmedMessage(!confirmedMessage);
        setCash('0');
        togglePayment();
        clearOrders();
    }

    return (
        <div className="absolute top-0 left-0 w-screen h-screen bg-[rgba(0,0,0,0.3)] flex justify-center items-center">
            {confirmedMessage && 
            <PaymentConfirmedMessage
                confirmMessage={confirmPayment}
                orders={order}
                totalCost={totalCost}
                cash={cash}
                change={change} />
            }
            <div className={`bg-white p-2 border-solid border-4 border-blue-800 rounded-lg grid grid-cols-2`}>
                <div className="flex flex-col border-r-2 border-gray-600 p-2">
                    <label htmlFor="cost">Total Biaya:</label>
                    <input type="text" name="cost" id="cost" disabled value={`Rp. ${totalCost.toLocaleString('id')}`}
                        className="mb-4 border-2 border-blue-400 rounded-md px-2 text-right" />
                    <label htmlFor="cash">Uang Diterima:</label>
                    <input type="text" value={`Rp. ${Number(cash).toLocaleString('id')}`}
                        className="focus:outline-none mb-4 border-2 border-blue-400 rounded-md px-2 text-right" />
                    <label htmlFor="change">Kembalian:</label>
                    <input type="text" disabled value={change<0?'':`Rp. ${change.toLocaleString('id')}`}
                        className="mb-4 border-2 border-blue-400 rounded-md px-2 text-right" />
                </div>
                <NumberButtons numberButton={numberButton} deleteNumber={deleteNumber} resetCash={resetCash}/>
                <div className="flex fex-row col-span-2 justify-evenly border-t-2 border-gray-600 mt-2 pt-2">
                    <button className="px-4 py-2 rounded-md bg-red-600 text-white font-bold hover:cursor-pointer" onClick={()=>{togglePayment()}}>BATAL</button>
                    <button disabled={(change<0)}
                        className="px-4 py-2 rounded-md bg-green-600 text-white font-bold hover:cursor-pointer
                        disabled:bg-green-800 disabled:text-gray-600"
                        onClick={()=>{
                            setConfirmedMessage(!confirmedMessage);
                        }}>KONFIRMASI</button>
                </div>
            </div>
        </div>
    )
}

function NumberButtons({numberButton, deleteNumber, resetCash}: ButtonsFunction){
    return (
        <div className="grid grid-cols-3 text-white font-bold gap-2 p-2">
            {['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '00', '000', 'C', '', '<'].map(i=>{
                if(i=='') return <span></span>
                if(i=='C') return <button className="rounded-md bg-gray-400 hover:cursor-pointer" onClick={()=>{resetCash()}}>{i}</button>;
                if(i=='<') return <button className="rounded-md bg-gray-400 hover:cursor-pointer" onClick={()=>{deleteNumber()}}>{i}</button>;
                return <button className="rounded-md bg-gray-400 hover:cursor-pointer" onClick={()=>{numberButton(i)}}>{i}</button>;
            })}
        </div>
    )
}

function PaymentConfirmedMessage({confirmMessage, orders, totalCost, cash, change}: MessageProps){
    return (
        <div className='absolute w-full h-full bg-[rgba(0,0,0,0.3)] flex justify-center items-center'>
            <div className="bg-white p-4 border-solid border-4 border-blue-800 rounded-lg">
                <h2 className='text-center font-bold text-2xl'>Pesanan Terkonfirmasi</h2>
                <table className='border-collapse text-center my-6'>
                    <thead>
                        <tr className='border-b-2 bg-blue-400'>
                            <th className='px-2'>No.</th>
                            <th>Order</th>
                            <th>Jumlah</th>
                            <th>Harga</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order, i)=>{
                            return (
                                <tr key={order.id} className={`${i%2?'bg-blue-300 ':''}border-b-2 border-gray-600`}>
                                    <td>{i+1}.</td>
                                    <td className='px-2 text-left'>{order.name}</td>
                                    <td className='px-4'>{order.amount} x</td>
                                    <td className='px-4 text-right'>{`Rp. ${order.price.toLocaleString('id')}`}</td>
                                    <td className='px-4 text-right'>{`Rp. ${(order.price*order.amount).toLocaleString('id')}`}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                    <tfoot className='text-right bg-blue-400'>
                        <tr>
                            <td></td>
                            <td colSpan={3} className='text-left px-4'>Uang diterima</td>
                            <td className='px-4'>{`Rp. ${Number(cash).toLocaleString('id')}`}</td>
                        </tr>
                        <tr className='border-b-2 border-gray-600'>
                            <td></td>
                            <td colSpan={3} className='px-4 text-left'>Total Harga</td>
                            <td className='px-4'>{`Rp. ${totalCost.toLocaleString('id')}`}</td>
                        </tr>
                        <tr className='bg-white'>
                            <td></td>
                            <td colSpan={3} className='text-left px-4'>Kembalian</td>
                            <td className='px-4'>{`Rp. ${change.toLocaleString('id')}`}</td>
                        </tr>
                    </tfoot>
                </table>
                <button className="
                    block mx-auto
                    px-4 py-2 rounded-md bg-green-600 text-white font-bold hover:cursor-pointer
                    disabled:bg-green-800 disabled:text-gray-600"
                    onClick={()=>{confirmMessage()}}>OKE
                </button>
            </div>
        </div>
        
    )
}

export default Payment;