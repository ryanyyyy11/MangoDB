import React, {useState} from "react";
import MainNav from "./mainpage.nav.component";
import axios from "axios";
import Cookie from 'js-cookie';

const Login = (props) => {

    const user = {
        email: '',
        password: ''
    };

    const [warning, setWarning] = useState('')

    const changeHandler=(e)=>{
        const name = e.target.name;
        user[name] = e.target.value;
        setWarning('');
    }

    const submitHandler = (e) => {
        e.preventDefault();
        if(user.email === '' || user.password === ''){
            setWarning('Email or password missing');
        }else if(user.email !== '' && user.password !== ''){
            axios.post('/login', {user})
                .then( (res) => {
                    if(res.headers.authtoken){
                        const userId = res.data.userID;
                        //console.log(res.headers.authtoken);
                        window.location.href = 'https://mangodb.herokuapp.com/Account/'+ userId
                        Cookie.set('userInfo', JSON.stringify({user}));
                    }

                    setTimeout(() => {setWarning('Incorrect email or password')}, 1000);
                    document.getElementById("Login").reset();

                });
            //setTimeout(() => {setWarning('Incorrect email or password')}, 1000);
        }

        //document.getElementById("Login").reset();
    };

        return (
            <div className='App'>
                <MainNav/>
                <div className="auth-wrapper">
                        <div className="auth-inner">
                            <form id="Login" autoComplete="off">
                                <h3>Sign In</h3>
                                <div className="form-group">
                                    <label>Email address</label>
                                    <input type="email" className="form-control" name="email" placeholder="Enter email" onChange={changeHandler} autoComplete="off"/>
                                </div>

                                <div className="form-group">
                                    <label>Password</label>
                                    <input type="password" className="form-control" name="password" placeholder="Enter password" onChange={changeHandler} autoComplete="off"/>
                                </div>

                                <div>
                                    <p className='text-danger'> {warning}</p>
                                </div>

                                {/* <div className="form-group">
                                    <div className="custom-control custom-checkbox">
                                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                                    </div>
                                </div> */}

                                <button type="text" className="btn btn-primary btn-block" onClick={submitHandler}>
                                    Log In
                                </button>

                                {/* <p className="forgot-password text-right">
                                    Forgot <a href="#">password?</a>
                                </p> */}
                            </form>
                        </div>
                    </div>
            </div>
        );

}

export default Login;