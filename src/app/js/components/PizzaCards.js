import React from 'react'

function PizzaCards(props) {
  let {item,i} = props
  return (
    <div className="card-body" key={i} style={{margin: '36px 9px',backgroundColor : item.orderBgColor ? item.orderBgColor : '#ffff69' , borderRadius : item.borderRadius ? item.borderRadius : '10px'}} >
        <h5 className="card-title" style={{color:item.textColor ? item.textColor : ''}} >Order ID - {item.id}</h5>
        <p className="card-text" style={{color:item.textColor ? item.textColor : ''}} >{item.pizzaType} pizza</p>
        <button type="button" class="btn btn-outline-success" onClick={props.onClickNext} style={{border : item.border ? item.border : '', borderRadius : item.borderRadius ? item.borderRadius : ''}}>
            Next
        </button>
    </div>
  )
}
export default PizzaCards;