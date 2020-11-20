import React, {useState} from 'react'
import axios from 'axios'

const AccountInfo = (props) => {

    const [orders,setOrders] = useState([]);

    if(orders.length === 0){
        console.log('Making axios request')
        axios.post('/getOrderStatus', {email:props.email}).then((res) => {
            setOrders(res.data);
        });
    }

    const orderList = orders.map(element => {
        return(
            <tr key={element.name}>
                <td className='extra-padding'>{element.paymentID} </td>
                <td className='extra-padding'>{(element.isDelivered && "Has been delivered") || (!element.isDelivered && "Is in progress")}</td>
            </tr>
        )
    });

    return(
        <div className="auth-wrapper">
            <div className="account-inner">
                <form>
                    <h3>Account Info</h3>
                    <div className="form-group">
                        <label>Logged in as: {props.name} </label>
                    </div>

                    <div className="form-group">
                        <label>Email address: {props.email}</label>
                    </div>

                    <div className="form-group">
                        <label>Address: {props.address}</label>
                    </div>

                    <div className="form-group">
                        <label>Zip code: {props.zipcode}</label>
                    </div>

                    <div className="form-group">
                        <label>Phone Number: {props.phoneNumber}</label>
                    </div>

                    <div className="form-group">
                        <label>You are signed in as a: {props.type}</label>
                    </div>

                    <div>
                        <label> Orders: </label>
                        {orderList}
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AccountInfo;