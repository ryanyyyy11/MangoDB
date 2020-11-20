import React, {useState} from 'react'
import axios from 'axios'
import AccountNav from "./account.nav.component";
import AccountInfo from "./accountInfo.component"
import Order from "./order.component";  ///1
import UpdateAccountInfo from "./updateAccountInfo.component";   ///2
import Search from "./search.component"; //5
import ManageUsers from "./manage.users.component";
import Delivery from "./delivery.component.js"
import DeliveryOrder from "./deliveryOrder.component"
//import Display from "./display.component";

const Account = (props) => {

    const id = props.location.pathname.substring(9);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [zipcode, setZipcode] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [verified, setVerified] = useState('');
    const [type, setType] = useState('')
    const [page, setPage] = useState(0);
    const [orders, setOrders] = useState([]);
    const [taken, setTaken] = useState('');
    let toRender;
    //let orders = [];

    if(name === ''){
        axios.post('/user/' + id).then( (res) => {
            //console.log(res.data.userName);
            setName(res.data.userName);
            setEmail(res.data.userEmail);
            setAddress(res.data.userAddress);
            setZipcode(res.data.userZipcode);
            setPhoneNumber(res.data.userPhoneNumber);
            setVerified(res.data.userVerified);


            if (res.data.userType === 1){
                setType("Customer");
            }else if(res.data.userType === 2){
                setType("Delivery Person");
            }else if(res.data.userType === 3){
                setType("Admin");
            }
        });
    }

    const changePage = (newPage) => {
        setPage(newPage);
    }

    const addOrder = (order) => {
        setOrders(orders.concat(order));
    }

    const takeOrder = (order) => {
        setTaken(order);
    }

    switch(page){
        case 0:
            toRender = <AccountInfo name={name} address={address} zipcode={zipcode} phoneNumber={phoneNumber} email={email}  type={type} />
            break;
        case 1:
            toRender = <Order id={id} name={name} address={address} zipcode={zipcode} verified={verified} phoneNumber={phoneNumber} email={email} type={type}  verified={verified} Orders={orders}/>;
            break;
        case 2:
            toRender = <UpdateAccountInfo id={id}/>;
            break;
        case 4:
            toRender = <Search addOrder={addOrder} />
            break;
        case 6:
            toRender = <ManageUsers/>;
            break;
        case 7:
            toRender = <Delivery takeOrder={takeOrder}/>
            break;
        case 8:
            toRender = <DeliveryOrder orderID={taken}/>
            break;
        default:
            toRender = null;
            break;
    }

    return(
        <div className='App'>
            <AccountNav changePage={changePage} type={type}/>
            {toRender}
        </div>

    );
}

export default Account;
