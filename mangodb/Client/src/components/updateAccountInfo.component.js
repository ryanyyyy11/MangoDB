import React, {useState} from "react";
import axios from "axios";

const UpdateAccountInfo = (props) => {

    const [emailMessage, setEmailMessage] = useState('');
    const [passwordMessage, setPasswordMessage] = useState('');
    const [zipcodeMessage, setZipCodeMessage] = useState('');
    const [addressMessage, setAddressMessage] = useState('');
    const [phoneNumberMessage, setPhoneNumberMessage] = useState('');


    //let message = "";
    let email = '';
    let pass = '';
    let pass2 = '';
    let zipcode = "";
    let address = "";
    let phoneNumber = "";
    const id = props.id;

    const emaillHandler = (e) => {
        e.preventDefault();
        axios.put('/updateEmail', {email:email, id: id})
        .then( (res) => {
            console.log('Update worked!');
            document.getElementById("updateEmail").reset();
        });
        if(email != ''){
            setEmailMessage('Email Updated');
            //message = "Email Updated";
        }
    };

    const passwordHandler = (e) => {
        e.preventDefault();
        const cmp = pass.localeCompare(pass2);

        if( cmp === 0){
            axios.put('/updatePassword', {pass:pass, id: id})
                .then( (res) => {
                    console.log('Update worked!');
                    document.getElementById("updatePassword").reset();
                });
                if(pass != '' && pass2 != ''){
                    setPasswordMessage('Password Updated');
                    //message = "Email Updated";
                }
        }
        else
        {
            console.log('Passwords do not match')
        }

    };

    const zipCodeHandler = (e) => {
        e.preventDefault();
        axios.put('/updateZipCode', {zipcode:zipcode, id: id})
        .then( (res) => {
            console.log('Update worked!');
            document.getElementById("updateZipCode").reset();
        });
        if(zipcode != ''){
            setZipCodeMessage('Zip Code Updated');
            //message = "Email Updated";
        }
    };

    const addressHandler = (e) => {
        e.preventDefault();
        axios.put('/updateAddress', {address:address, id: id})
        .then( (res) => {
            console.log('Update worked!');
            document.getElementById("updateAddress").reset();
        });
        if(address != ''){
            setAddressMessage('Address Updated');
            //message = "Email Updated";
        }
    };

    const phoneNumberCodeHandler = (e) => {
        e.preventDefault();
        axios.put('/updatePhoneNumber', {phoneNumber:phoneNumber, id: id})
        .then( (res) => {
            console.log('Update worked!');
            document.getElementById("updateNumber").reset();
        });
        if(phoneNumber != ''){
            setPhoneNumberMessage('Phone Number Updated');
            //message = "Email Updated";
        }
    };

    // const updateMessage = () => {
    //     setMessage("Parameter Updated!");
    //     console.log(message);
    // }

    return (
    <div>
        <div className="column3">
            <div className="auth-wrapper"> 
                <div className="auth-inner">
                    <form id="updateEmail">
                        <h3>Update Email</h3>
                        <div className="form-group">
                            <label>New Email address</label>
                            <input type="email" className="form-control" name="email" placeholder="Enter new email" onChange={(e) => {email = e.target.value}}/>
                        </div>
                        <p className='text-danger'> {emailMessage} </p>
                        <button type="text" className="btn btn-primary btn-block" onClick={emaillHandler}>Submit</button>
                    </form>

                    <form id='updatePassword'>
                        <h3>Update Password</h3>
                        <div className="form-group">
                            <label>New Password</label>
                            <input type="password" className="form-control" name="password" placeholder="Enter new password" onChange={(e) => {pass = e.target.value}}/>
                        </div>
                        <div className="form-group">
                            <label>Confirm Password</label>
                            <input type="password" className="form-control" name="password" placeholder="Re-Enter new password" onChange={(e) => {pass2 = e.target.value}}/>
                        </div>
                        <p className='text-danger'> {passwordMessage} </p>
                        <button type="text" className="btn btn-primary btn-block" onClick={passwordHandler}>Submit</button>
                    </form>
                    <form id="updateNumber">
                                <h3>Update Phone Number</h3>
                                <div className="form-group">
                                    <label>New Phone Number</label>
                                    <input type="phoneNumber" className="form-control" name="phoneNumber" placeholder="Enter new Phone Number" onChange={(e) => {phoneNumber = e.target.value}}/>
                                </div>
                                <p className='text-danger'> {phoneNumberMessage} </p>
                                <button type="text" className="btn btn-primary btn-block" onClick={phoneNumberCodeHandler}>Submit</button>
                            </form>
                    
                </div>
            </div>
        </div>

            <div className="column4">
                <div className="auth-wrapper">
                    <div className="auth-inner">
                        <form id="updateAddress">
                                <h3>Update Address</h3>
                                <div className="form-group">
                                    <label>New Address</label>
                                    <input type="address" className="form-control" name="address" placeholder="Enter new address" onChange={(e) => {address = e.target.value}}/>
                                </div>
                                <p className='text-danger'> {addressMessage} </p>
                                <button type="text" className="btn btn-primary btn-block" onClick={addressHandler}>Submit</button>
                        </form>
                        <form id="updateZipCode">
                            <h3>Update Zip Code</h3>
                            <div className="form-group">
                                <label>New Zip Code</label>
                                <input type="zipcode" className="form-control" name="zipcode" placeholder="Enter new zipcode" onChange={(e) => {zipcode = e.target.value}}/>
                            </div>
                            <p className='text-danger'> {zipcodeMessage} </p>
                        <button type="text" className="btn btn-primary btn-block" onClick={zipCodeHandler}>Submit</button>
                    </form>
                            
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UpdateAccountInfo;