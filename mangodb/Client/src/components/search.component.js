 import React, {useState} from 'react';
import data from "../data.js";
import ProductScreen from './product.component'

const Search = (props) => {

    console.log(data);

    const [filter, setFilter] = useState('');

    const [selectedItem, setSelectedItem] = useState(0);

    const arrayToMap = data.products;

    const display = arrayToMap.map(element => {
        if(element.name.toLowerCase().includes(filter.toLowerCase())){
            return (
                <tr key={element._id} onClick={()=>setSelectedItem(element._id)}>
                    {/* <b>{element._id}</b> */}
                    <td>{element.name} </td>
                </tr>
            );
        }
    });


    const handleChange = (e) =>{
        setFilter(e.target.value);
    }

    //console.log(<ProductScreen item={arrayToMap[selectedItem-1]} addOrder={props.addOrder}/>?true:false);
    return(
        <div>
                <div className='column1'>
                    <div className="search-inner">
                        <div className="form-group">
                            <label>Enter Item:</label>
                            <input type="text" className="form-control" placeholder="Enter item" onChange={handleChange}/>
                            {display}
                        </div>
                    </div>
                </div>
        
                <div className='column2'>
                    {selectedItem?<ProductScreen item={arrayToMap[selectedItem-1]} addOrder={props.addOrder}/>:<p className="auth-inner">Select a product to view</p>}
                    { /*<button className="nav-item" onClick={() =>{ProductScreen}}>{data.products.name}</button>*/ }
                </div>
        </div>
    );
}
export default Search;
/*
<div className='auth-wrapper'>
    <div className="auth-inner">
        <div className="form-group">
            <label>Enter Item:</label>
            <input type="item" className="form-control" placeholder="Enter item" onChange={handleChange}/>
        </div>
        <button type="submit" className="btn btn-primary btn-block">Search</button>
        <div>{filteredData}</div>
    </div>
</div>*/