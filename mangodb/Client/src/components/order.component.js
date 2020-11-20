import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Paypal from './paypal.component'
//hi
//Screen to display and confirm order and go to purchase
const Order = (props) => {
    //Total amount
    const [total, setTotal] = useState(0);
    const [paid, setPaid] = useState(0);
    const [orders, setOrders] = useState(0);

   /* if (orders.length === 0)
    setOrders(props.Orders);
*/
    const changeTotal = (newSum) => {
        setTotal(newSum.toFixed(2));
    }

    // const orders = props.Orders.map(order=>{
    //     <li>{order}</li>
    // })
    console.log(props.Orders)

    //call Calculate
    useEffect(() => {
        if(props.Orders.length > 0){
            calculateTotal(props.Orders);
        }
    }, [props.Orders])

    //total
    const calculateTotal = (orderDetail) => {
        let sum = 0;
        orderDetail.map(item => {
            sum += item.price*item.quantity;
        });
        changeTotal(sum);
    }

    const deleteHandler = (e) =>{
        console.log(props.Orders);
        console.log(orders);
        console.log(e.target.value);
        console.log(props.Orders);
        changeTotal(total-(props.Orders[e.target.value].price*props.Orders[e.target.value].quantity));
        delete props.Orders[e.target.value];
        setOrders(e.target.value)    
    }

    //onSuccess
    const transactionSuccess = (data) => {
    //Commenting this out because I don't know enough about handlers
       let variables = {
            userInfo: {
                id: props.id,
                name: props.name,
                email: props.email,
                address: props.address,
                zipcode: props.zipcode,
                phoneNumber: props.phoneNumber,
                type: props.type
            },
            orderDetail: props.Orders,
            paymentData: data
        }
        axios.post('/successBuy', {variables}).then(res => 
        {  
            console.log("payment success")
            setPaid(1);
        })
    }

    //transactionError
    const transactionError = () => {
        console.log('Paypal transaction error');
    }

    //onCancel
    const transactionCanceled = () => {
        console.log('Paypal transaction canceled');
    }

    const shoppingCart=props.Orders.map((order,index)=>{
        return(
            <tr key={order.name}>
                <td className="extra-padding">Item: {order.name} </td>
                <td className="extra-padding">Cost: {(order.price*order.quantity).toFixed(2)}</td>
                <td className="extra-padding">Quantity: {order.quantity}</td>
                <button className="nav-item" type="text" onClick={deleteHandler} value={index}>Remove Item</button> 
            </tr>
        )
    });
    
    return(
        <div className="auth-wrapper">
            <div className="auth-inner">
                <form>
                    {paid==0?<h3>Products Added to Cart</h3>:<h3>Products Successfully Ordered</h3>}
                </form>
                <p>{shoppingCart}</p>
            
            <div>
                <h2>Total amount: ${total}</h2>
            </div>
            {props.verified?
            <Paypal 
                toPay={total}
                onSuccess={transactionSuccess}
                transactionError={transactionError}
                transactionCanceled={transactionCanceled}
            />:<p>Contact an Admin for Verification at: admin@mangodb.com</p>}
            </div>
        </div>
    );
}

export default Order;