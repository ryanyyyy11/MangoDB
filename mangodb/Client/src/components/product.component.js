import React, { useState } from 'react';

const ProductScreen = (props) => {

    console.log(props.item.name)
    const [count, setCount] = useState(1);
    const addCart=()=>{
      props.item.quantity = count;
      props.addOrder(props.item);
    }

    
    // const decrementHandler = () => {
    //   if(count>1){
    //     setCount(count-1);
    //   }
    // }

    const addtoCart =()=>{
      setCount(1);
      addCart();
    }

    return(
    <div className="product-wrapper">
      <h1>{props.item.name}</h1>
      <h6>Brand: {props.item.brand}</h6>
      <img className="product-image" src={props.item.image} alt=""/>
      <div className='product-wrapper2'>
        <div className="product-description"> • {props.item.description}</div>
        <div className="product-price">${props.item.price}</div>
        <div className="product-rating">Rating: {props.item.rating} ({props.item.numReviews})</div>
        <div className="product-stock">Item in stock: {props.item.countInStock}</div>
        <div className="counter-btn">
          <label>Quantity:</label>
          <p></p>
          <button className='count-btn' onClick={count!=1?()=> setCount(count-1):null}>-</button>
          <p className='count-btn'>{count}</p>
          <button className='count-btn' onClick={count<props.item.countInStock?()=> setCount(count+1):null} >+</button>
        </div>
        <button className="add-to-cart" onClick={addtoCart}>Add to Cart</button>
      </div>
    </div>

  );
}

export default ProductScreen; 