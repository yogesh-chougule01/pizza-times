import React, { Fragment, useEffect, useState } from 'react'
import ToastMessage from './ToastMessage';
import Navbar from './Navbar';
import { undefinedOrZero } from '../utils/Validations';

function PizzaForm() {
    const [orders , setOrders] = useState(JSON.parse(localStorage.getItem('placedOrders')) ? JSON.parse(localStorage.getItem('placedOrders')) : [])
    const [formDetails , setFormDetails] = useState({pizzaType:'',pizzaSize:'',pizzaBase:''})
    let [showToast, setShowToast] = useState({ show: false, message: "", success: false });

    useEffect(()=>{
        if(!undefinedOrZero(orders)){
            localStorage.setItem('placedOrders', JSON.stringify(orders));
        }
    },[orders])

    function onSubmitOrder(e){
        e.preventDefault();
        if (orders.length >= 10) {
            setShowToast({...showToast , show : true , message : 'Not taking order for now please wait for sometime' , success : false})
            return;
        }
        if(formDetails.pizzaBase =='' || formDetails.pizzaSize =='' || formDetails.pizzaBase == ''){
            setShowToast({...showToast , show : true , message : 'please fill all the details to place the order' , success : false})
            return
        }
        let newOrder = {
            ...formDetails,
            id: Math.random().toString(36).substr(2, 9),
            stage: 'Order Placed',
            timestamp: Date.now(),
        }
        setOrders((prevOrders) => [...prevOrders, newOrder]);  
        setShowToast({...showToast , show : true , message : 'Order placed successfully' , success : true})
        setFormDetails({...formDetails , pizzaBase : '',pizzaType : '',pizzaSize : ''})
    }
    function renderForm() {
        return (
            <div className="App">
                <form className='pizza-order-form-container'>
                    <h2 className='form-header'>Welcome to pizza times </h2>
                    <div className="form-group pizza-type-div">
                        <p className='ten-orders-note'>Note - "The restaurant can only accommodate up to 10 orders at once, beyond that, orders will not be taken."</p>
                        <p className='mandatory'> All fields are mandatory *</p>
                        <p className='pizza-label-title'>Pizza Type</p>
                        <select className="form-control" value={formDetails.pizzaType} onChange={(e) => setFormDetails({...formDetails,pizzaType: e.target.value}) } >
                            <option value=''>select pizza type</option>
                            <option value='veg'>Veg</option>
                            <option value='non-veg'>Non Veg</option>
                        </select>
                    </div>
                    <div className="form-group pizza-size-div" style={{  }}>
                        <p className="pizza-label-title" >Pizza Size</p>
                        <select className="form-control" value={formDetails.pizzaSize} onChange={(e) => setFormDetails({...formDetails,pizzaSize: e.target.value}) }>
                            <option value=''>select pizza size</option>
                            <option value='large'>Large</option>
                            <option value='medium'>Medium</option>
                            <option value='small'>small</option>
                        </select>
                    </div>
                    <div className="form-group pizza-base-div" >
                        <p className='pizza-label-title'>Pizza Base</p>
                        <select className="form-control" value={formDetails.pizzaBase} onChange={(e) => setFormDetails({...formDetails,pizzaBase: e.target.value}) }>
                            <option value=''>select pizza base</option>
                            <option value='thin'>Thin</option>
                            <option value='thick'>Thick</option>
                        </select>
                    </div>
                    <button className="btn btn-primary placed-order" onClick={onSubmitOrder}>Place your Order</button>
                </form>
            </div>
        )
    }

    function renderToast() {
        return (
            <ToastMessage show={showToast.show} success={showToast.success} message={showToast.message}
                showSet={() => setShowToast({ ...showToast, show: false })} />
        )
    }

    function renderHeader(){
        return (
            <Navbar />
        )
    }
    
    return (
    <Fragment>
        {renderHeader()}
        {renderForm()}
        {renderToast()}
    </Fragment>
  )
}
export default PizzaForm;