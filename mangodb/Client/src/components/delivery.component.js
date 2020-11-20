import React, {useState} from 'react'
import axios from 'axios'

const Delivery = (props) => {

    const [zip,setZip] = useState('');
    const [orders, setOrders] = useState([]);
    const [orderContents, setOrderContents] = useState([])
    const [delivery, setDelivery] = useState('')
    const [takenMessage, setTakenMessage] = useState('');
    const [orderMessage, setOrderMessage] = useState('');

    const changeHandler = (e) => {
        setZip(e.target.value);
        console.log(zip);
    }

    const submitHandler = (e) => {
        e.preventDefault();
        const toSubmit = Number(zip);
        axios.post('/getPaymentByZip', {zipcode:toSubmit}).then((res) => {

            if(res.data.length !== 0)
                setOrders(res.data);
            else
                setOrderMessage('No Orders in your Area');
        });
    }

    const seeOrderHandler = (e) => {
        const orderId = e.target.value;

        axios.post('/getPaymentById', {_id: orderId}).then( (res) => {
            
            if(res.data.length !== 0){
                setOrderContents(res.data.product);
                setDelivery(orderId);
            }
            
        });
    }

    const takeOrderHandler = (e) => {
        setTakenMessage('Order Taken');
        props.takeOrder(delivery);
        
    }

    const orderList = orders.map(element => {
        return(
            <tr key={element.name}>
                <td className="extra-padding">{element.user[0].name} </td>
                <td className="extra-padding">{element.user[0].address}</td>
                <td className="extra-padding">{element._id}</td>
                <button className="nav-item" type="text" value = {element._id} onClick={seeOrderHandler}>See order</button> 
            </tr>
        )
    });

    const orderDescription = orderContents.map(element => {

        console.log(element);

        return(
            <tr key={element.name}>
                <td className="extra-padding">{element.name} </td>
                <td className="extra-padding">{element.price}</td>
                <td className="extra-padding">{element.quantity}</td>
            </tr>
        )
    });


    if(orderList.length === 0){
        return (
            <div className="auth-wrapper">
                    <div className="auth-inner">
                        <form id="Zipcode" autoComplete="off">
                            <h3>Type in your Zip code</h3>
                            <div className="form-group">
                                <label>Zipcode</label>
                                <input type="text" className="form-control" name="zipcode" placeholder="Enter Zip code" onChange={changeHandler} autoComplete="off"/>
                            </div>

                            <button type="text" className="btn btn-primary btn-block" onClick={submitHandler}>
                                Search for delivery jobs
                            </button>
                            <p className='text-danger'>{orderMessage}</p>
                        </form>
                    </div>
                </div>
        ); 
    }
    else{
        return (

            <div>
                <div className='column1'>
                    <div className="search-inner2">
                        <div className="form-group">
                            <label>Orders available:</label>
                            {orderList}
                        </div>
                    </div>
                </div>            
                <div className='column2'>
                    <div className='auth-wrapper'>
                        <div className="admin-inner">
                            <div className="form-group">
                                <label>Order Description:</label>
                                {orderDescription}
                                {orderDescription.length > 0 && 
                                <button className="nav-item" type="text" onClick={takeOrderHandler}>Take order</button>
                                }
                                <p className='text-danger'>{takenMessage}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        ); 
    }
}

export default Delivery;
