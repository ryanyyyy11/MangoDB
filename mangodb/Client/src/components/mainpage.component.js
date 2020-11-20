import React, { Component } from "react";
import MainNav from "./mainpage.nav.component";
import mangos from "../mangos"

export default class Main extends Component {

    render() {
        return (
            
            <div className='App'>
                <MainNav/> 
                {/*<div> 
                    <img className="mango-wrapper1" src={mangos.products[0].image} width="300px" height="300px" alt=""/>
                </div>

                <div> 
                    <img className="mango-wrapper2" src={mangos.products[0].image} width="300px" height="300px" alt=""/>
                </div>*/}

                <div className="auth-wrapper">
                
                    <div className="main-inner">
                        <h3>Mango Delivery Boys</h3>
                        <img className="mango-wrapper3" src={mangos.products[0].image} width="300px" height="300px" alt=""/>
                    </div>


                </div>
                
            </div>
        );
    }
}