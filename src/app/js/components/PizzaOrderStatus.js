import React, { Fragment, useEffect, useState } from 'react'
import {undefinedOrZero} from '../utils/Validations'
import PizzaCards from './PizzaCards';
import ToastMessage from './ToastMessage';

function PizzaOrderStatus(props) {
    const [placedOrders, setPlacedOrders] = useState(JSON.parse(localStorage.getItem('placedOrders')));
    const [makingOrders, setMakingOrders] = useState( JSON.parse(localStorage.getItem('makingOrders')));
    const [readyOrders, setReadyOrders] = useState( JSON.parse(localStorage.getItem('readyOrders')));
    const [pickedOrders, setPickedOrders] = useState( JSON.parse(localStorage.getItem('pickedOrders')));  
    let [showToast, setShowToast] = useState({ show: false, message: "", success: false });

    useEffect(()=>{
        if(!undefinedOrZero(placedOrders)){
            console.log(" place ",getTimeIntervel(placedOrders))
            let data = JSON.parse(localStorage.getItem('placedOrders'));
            let timerId = setTimeout(()=>{
                let tempData = setWarningStylesToOrders(data,'placedOrders')
                setPlacedOrders(tempData)             
            },getTimeIntervel(placedOrders))
            return ()=>clearTimeout(timerId)
        }
    },[placedOrders])

    useEffect(()=>{
        if(!undefinedOrZero(makingOrders)){
            console.log(" make ",getTimeIntervel(makingOrders))
            let data = JSON.parse(localStorage.getItem('makingOrders'));
            let timerId = setTimeout(()=>{
                let tempData = setWarningStylesToOrders(data,'makingOrders')
                setMakingOrders(tempData)             
            },getTimeIntervel(makingOrders))
            return ()=>clearTimeout(timerId)
        }
    },[makingOrders])

    useEffect(()=>{
        if(!undefinedOrZero(readyOrders)){
            console.log(" ready ",getTimeIntervel(readyOrders))
            let data = JSON.parse(localStorage.getItem('readyOrders'));
            let timerId = setTimeout(()=>{
                let tempData = setWarningStylesToOrders(data,'readyOrders')
                setReadyOrders(tempData)             
            },getTimeIntervel(readyOrders))
            return ()=>clearTimeout(timerId)
        }
    },[readyOrders])

    function getTimeIntervel(stage) {
        let time = 0; 
        if (!undefinedOrZero(stage)) { 
            stage.forEach(ele => {
                time = ele.pizzaSize === 'small' ? 3 * 60 * 1000 : ele.pizzaSize === 'medium' ? 4 * 60 * 1000 : ele.pizzaSize === 'large' ? 5 * 60 * 1000 : 3 * 60 * 1000
            });
        }
        return time;
    }

    function setWarningStylesToOrders(data,localStorageKey){
        if(!undefinedOrZero(data)){
            data.forEach(element => {
                element.orderBgColor = "red"
                element.textColor = "white"
                element.borderRadius = "10px"
                element.border = "1px solid white"
            }); 
            localStorage.setItem(localStorageKey, JSON.stringify(data)); 
        }   
        return data;
    }

    function deleteWarningStylesOrders(item){
        delete item.border;
        delete item.borderRadius
        delete item.orderBgColor
        delete item.textColor
    }

    function updatedCurrentsNextOrders(item , localStorageKey,stage){
        let existingOrders = JSON.parse(localStorage.getItem(localStorageKey)) ? JSON.parse(localStorage.getItem(localStorageKey)) : []; 
        item.stage = stage;
        let updatedOrders = existingOrders.concat([item]);
        console.log("updatedOrders ",updatedOrders)
        localStorage.setItem(localStorageKey, JSON.stringify(updatedOrders));
        return updatedOrders;
    }

    function onClickOrderPlacedNext(item , index){
        let data = placedOrders.filter((elem, idx) => idx !== index);
        localStorage.setItem('placedOrders', JSON.stringify(data));
        let updatedOrders = updatedCurrentsNextOrders(item,"makingOrders","Order In Making")
        setPlacedOrders(data);
        deleteWarningStylesOrders(item)
        setMakingOrders(updatedOrders);
    }
    
    function onClickMakingOrderNext(item , index){
        let data = makingOrders.filter((elem, idx) => idx !== index);
        localStorage.setItem('makingOrders', JSON.stringify(data));
        let updatedOrders = updatedCurrentsNextOrders(item,"readyOrders","Order Ready")
        setMakingOrders(data);
        deleteWarningStylesOrders(item)
        setReadyOrders(updatedOrders);
    }
    function onClickOrderReadyNext(item , index){
        let data = readyOrders.filter((elem, idx) => idx !== index);
        localStorage.setItem('readyOrders', JSON.stringify(data));
        let updatedOrders = updatedCurrentsNextOrders(item,"pickedOrders","")
        setReadyOrders(data);
        deleteWarningStylesOrders(item);
        setPickedOrders(updatedOrders);
    }
   

    function getOrderDelayWarningStyles(){
        let obj = {
            width: "16rem", 
            margin: '40px',
        }        
        return obj;
    }

    function renderStages(){
        return (
            <div className='pizza-stages-main-container'>
                <p className='pizza-order-status-note'><b>Note - </b> "Pizzas are prepared in order of size, so with smaller pizza size will take priority for faster service."</p>
                <table>
                    <thead>
                        <tr>
                            <th>Order In place</th>
                            <th>Order In Making</th>
                            <th>Order Ready</th>
                            <th>Order Picked</th>
                        </tr>
                    </thead>
                    <tbody>                    
                        <tr>
                            <td>                            
                                <div className="card" style={getOrderDelayWarningStyles()}>
                                    {placedOrders && placedOrders.map((ele,i)=>{ return <PizzaCards key={i} item={ele} onClickNext={()=>onClickOrderPlacedNext(ele,i)} /> })}
                                </div>                            
                            </td>
                            <td>                             
                                <div className="card" style={getOrderDelayWarningStyles()}>
                                {!undefinedOrZero(makingOrders) && makingOrders.map((ele,i)=>{ return <PizzaCards key={i} item={ele} onClickNext={()=>onClickMakingOrderNext(ele,i)} /> })}
                                </div>                      
                            </td>
                            <td> 
                            <div className="card" style={getOrderDelayWarningStyles()}>
                                {!undefinedOrZero(readyOrders) && readyOrders.map((ele,i)=>{ return <PizzaCards key={i} item={ele} onClickNext={()=>onClickOrderReadyNext(ele,i)} /> })}
                                </div>
                            </td>
                            <td>                            
                                <div className="card order-picked-card-div">
                                {!undefinedOrZero(pickedOrders) && pickedOrders.map((ele,i)=>{
                                return (
                                        <div className="card-body" key={i} style={{margin: '36px 9px',backgroundColor : '#84caff' , borderRadius : ele.borderRadius ? ele.borderRadius : ''}} >
                                            <h5 className="card-title" style={{color:ele.textColor ? ele.textColor : ''}} >Order ID - {ele.id}</h5>
                                            <p className="card-text" style={{color:ele.textColor ? ele.textColor : ''}} >{ele.pizzaType} pizza</p>
                                            <p className='order-picked-succ-btn'>Order Picked successfully </p>                                        
                                        </div>
                                    )
                                })}
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }

    function allOrderedPizas(){
        let tempArray=[];
        !undefinedOrZero(placedOrders) && placedOrders.forEach(ele=>{tempArray.push(ele) })
        !undefinedOrZero(makingOrders) && makingOrders.forEach(ele=>{tempArray.push(ele) })
        !undefinedOrZero(readyOrders) && readyOrders.forEach(ele=>{tempArray.push(ele) })
        return tempArray;
    }

    function onClickCancelOrder(item,index){
        if(item.stage === 'Order Placed'){
            let placedOrder = placedOrders.filter((elem) => elem.id !== item.id);
            setPlacedOrders(placedOrder)
            localStorage.setItem('placedOrders', JSON.stringify(placedOrder));
        } else if(item.stage === 'Order In Making'){
            let makingOrder = makingOrders.filter((elem) => elem.id !== item.id);
            setMakingOrders(makingOrder)
            localStorage.setItem('makingOrders', JSON.stringify(makingOrder));
        }
        setShowToast({...showToast , show : true , message : 'order cancelled successfully' , success : true})
    }

    function renderMainSection(){
        return (
            <div className='main-section-container'>
                <h3 className='main-section-title'>Main Section</h3>
                <table>
                    <thead>
                        <tr>
                            <th >Order Id</th>
                            <th>Stage</th>
                            <th>Type</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>                    
                        {!undefinedOrZero(allOrderedPizas()) && allOrderedPizas().map((ele,i)=>{
                            return (
                                <tr>
                                    <td className='center-align'> Order ID - {ele.id}  </td>
                                    <td className='center-align'> Stage - {ele.stage}  </td>
                                    <td className='center-align'> {ele.pizzaType}  </td>                                    
                                    {ele.stage !== "Order Ready" && <td className='center-align' onClick={()=>onClickCancelOrder(ele,i)}> <button type="button" class="btn btn-outline-primary cancel-order-btn">Cancel Order</button> </td>}
                                </tr>
                            )
                        })}                        
                    </tbody>
                </table>
            </div>
        )
    }

    function displayOrderStatusBody(){
        return (
            <>   
                <h2 className='order-status-page-title'>Order Status Page</h2>    
                {renderStages()}
                <hr/>
                {renderMainSection()}
                <hr/>
                <div className='delivered-pizza-container'>
                    <h5> Total Pizzas Delivered - {!undefinedOrZero(pickedOrders) ? pickedOrders.length : 0}</h5> 
                </div>
            </>
        )
    }
    function renderToast() {
        return (
            <ToastMessage show={showToast.show} success={showToast.success} message={showToast.message}
                showSet={() => setShowToast({ ...showToast, show: false })} />
        )
    }
    
  return (    
    <Fragment>
        {displayOrderStatusBody()}
        {renderToast()}
    </Fragment>
    
  )
}
export default PizzaOrderStatus;