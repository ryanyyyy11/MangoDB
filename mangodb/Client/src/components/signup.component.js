import React from "react";
import MainNav from "./mainpage.nav.component";
import axios from "axios";

const SignUp = (props) => {

    const user = {
        name: '',
        email: '',
        address: '',
        zipcode: '',
        phoneNumber: '',
        password: '',
        userType: ''
    };

    const changeHandler = (e) => {
        const name = e.target.name;
        user[name] = e.target.value;
       // console.log(e.target.value);
    };

    const submitHandler = (e) => {
        e.preventDefault();
        console.log(user);
        axios.post('/register', {user})
        .then( () => {
            console.log('Axios Worked')
            window.location.href = 'https://mangodb.herokuapp.com/sign-in';
        });

        document.getElementById("signUp").reset();

    };

        return (
            <div className='App'>
                <MainNav/>
                <div className="auth-wrapper">
                        <div className="auth-inner">
                            <form id="signUp">
                                <h3>Sign Up</h3>

                                <div className="form-group">
                                    <label>Name</label>
                                    <input type="name" className="form-control" name="name" placeholder="First name" onChange={changeHandler}/>
                                </div>

                                <div className="form-group">
                                    <label>Email address</label>
                                    <input type="email" className="form-control" name="email" placeholder="Enter email"  onChange={changeHandler}/>
                                </div>

                                <div className="form-group">
                                    <label>Password</label>
                                    <input type="password" className="form-control" name="password" placeholder="Enter password"  onChange={changeHandler}/>
                                </div>
                            
                                <div className="form-group">
                                    <label>Customer</label>
                                    <input type="radio" className='' name='userType' onChange={changeHandler} value={1}></input>
                                </div>

                                <div className="form-group">
                                    <label>Delivery Person</label>
                                    <input type="radio" className='' name='userType' onChange={changeHandler} value={2}></input>
                                </div>

                                <button type="text" className="btn btn-primary btn-block" onClick={submitHandler}>Sign Up</button>
                                <p className="forgot-password text-right">
                                    Already registered <a href="sign-in">sign in?</a>
                                </p>
                            </form>
                        </div>
                </div>
            </div>

        );

};

export default SignUp;