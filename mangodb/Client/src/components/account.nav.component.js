import React from 'react'

const AccountNav = (props) => {

    let optionType;
    let searchButton;

    ///Work in progress. Need to implement Find Order and Manage User components in Account component
    if(props.type.localeCompare('Customer') === 0){
        optionType = <button className="nav-item" onClick={() =>{props.changePage(1)}}>Manage Cart</button>;
        searchButton = <button className="navbar-brand" onClick={()=>{props.changePage(4)}}>Mango Delivery Search</button>;
    }
    else if(props.type.localeCompare('Delivery Person') === 0){
        optionType = <button className="nav-item" onClick={() =>{props.changePage(7)}}>Find Orders</button>;
        searchButton = <button className="navbar-brand" onClick={()=>{props.changePage(8)}}>Mango Delivery Orders</button>;
    }
    else if(props.type.localeCompare('Admin') === 0){
        optionType = <button className="nav-item" onClick={() =>{props.changePage(6)}}>Manage Users</button>;
        searchButton = <button className="navbar-brand">Mango Delivery</button>;;
    }

    return(
            <nav className="navbar navbar-expand-lg navbar-light fixed-left">
                <div className="container">
                    {searchButton}
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                        <ul className="navbar-nav ml-auto">
                          <button className="nav-item" onClick={() =>{props.changePage(0)}}>Account Info</button>
                            {optionType}
                            <button className="nav-item" onClick={() =>{props.changePage(2)}}>Update Account Info</button>
                            <button className="nav-item" onClick={() =>{window.location.href = 'https://mangodb.herokuapp.com/sign-in'}}>Logout</button>
                        </ul>
                    </div>
                </div>
            </nav>
    );
}

export default AccountNav;
