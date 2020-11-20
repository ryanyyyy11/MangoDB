import React, {useEffect, useState} from 'react'
import axios from 'axios'
import ProductScreen from "./product.component";

const ManageUsers = (props) => {

    const [unverified, setUnverified] = useState([]);
    const [userList, setUserList] = useState([]);

    if(unverified.length === 0) {
        axios.post('/getUnverified').then((res) => {
            setUnverified(res.data);
        });
    }

    if(userList.length === 0) {
        axios.post('/getUsers').then((res) => {
            setUserList(res.data);
        });
    }

    const updateLists = () =>{
        axios.post('/getUnverified').then((res) => {
            setUnverified(res.data);
            axios.post('/getUsers').then((res) => {
                        setUserList(res.data);
            });
        });
    }

    const verifyClick = (e) => {
        axios.put('/verify', {email:e.target.value})
        .then( (res) => {

            if(res)
                console.log('Person has been verified!');
            updateLists();
        });
    }

    const banClick = (e) => {
        axios.delete('/ban', {data:{email:e.target.value}})
            .then( (res) => {

                if(res)
                    console.log(res);

                updateLists();
            });
    }

    const unverifiedList = unverified.map(element => {

        let userType = '';
    
        switch(element.userType){
            case 1:
                userType = 'Customer';
                break;
            case 2: 
                userType = 'Delivery Person';
                break;
            case 3:
                userType = 'Admin';
                break;  
            default:
                userType = 'what';
                break;                  
        }

        return(
            <tr key={element.name}>
                <td className="extra-padding">{element.name} </td>
                <td className="extra-padding">{userType} </td>
                <td className="extra-padding">{element.email}</td>
                <button className="nav-item" type="text" onClick={verifyClick} value={element.email}>Verify</button> 
            </tr>
        )
    });

    const users = userList.map(element => {
        let userType = '';
    
        switch(element.userType){
            case 1:
                userType = 'Customer';
                break;
            case 2: 
                userType = 'Delivery Person';
                break;
            case 3:
                userType = 'Admin';
                break;  
            default:
                userType = 'what';
                break;                  
        }

        return(
            <tr key={element.name}>
                <td className="extra-padding">{element.name} </td>
                <td className="extra-padding">{userType} </td>
                <td className="extra-padding">{element.email}</td>
                <button className="nav-item" type="text" onClick={banClick} value={element.email}>Ban</button>
            </tr>
        )
    });

    return(
        <div>
            <div className='column3'>
                <div className='auth-wrapper'>
                    <div className="admin-inner">
                        <div className="form-group">
                            <label>Still to verify:</label>
                            {unverifiedList}
                        </div>
                    </div>
                </div>
            </div>
            <div className='column4'>
                <div className='auth-wrapper'>
                    <div className="admin-inner">
                        <div className="form-group">
                            <label>Current users:</label>
                            {users}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ManageUsers;
/*
<div className='product-wrapper'>
    <h1>Still to verify</h1>
    {unverifiedList}
</div>

*/
