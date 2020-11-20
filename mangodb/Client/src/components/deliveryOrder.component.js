import React, {useState} from 'react'
import axios from 'axios'

const DeliveryOrder = (props) =>{

    const [order, setOrder] = useState([]);
    const [orderUser, setOrderUser] = useState([]);

    if(order.length === 0 && props.orderID !== ''){
        axios.post('/getPaymentById', {_id: props.orderID}).then( (res) => {
                
            if(res.data.length !== 0){
                setOrder(res.data.product);
                setOrderUser(res.data.user[0])
            }
            
        }); 
    }

    const deliveredHandler = (e) => {
        axios.post('/delivered', {_id: props.orderID}).then( (res) => {
            
            setOrder([]);
            setOrderUser([]);
            console.log('Delivery status changed successfully');
            
        })
    }

    const orderDescription = order.map(element => {

        return(
            <tr key={element.name}>
                <td className="extra-padding">{element.name} </td>
                <td className="extra-padding">{element.price}</td>
                <td className="extra-padding">{element.quantity}</td>
            </tr>
        )
    });

    console.log(orderUser);

    return(
        <div className='auth-wrapper'>
            <div className="admin-inner">
                <div className="form-group">
                    <label>Customer Info:</label> <br/>
                    {orderUser.name} <br/>
                    {orderUser.phoneNumber} <br/>
                    {orderUser.email} <br/>
                    {orderUser.address} <br/>
                    {orderUser.zipcode} <br/>
                    <br/>
                    <label>Order Description:</label>
                    {orderDescription}
                    {orderDescription.length > 0 && 
                    <button className="nav-item" type="text" onClick={deliveredHandler}>Delivered</button>
                    }
                </div>
            </div>
        </div>
    )
}
export default DeliveryOrder