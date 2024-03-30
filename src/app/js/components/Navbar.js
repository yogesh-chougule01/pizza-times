import React from 'react'
import { Link } from 'react-router-dom'

function Navbar(props) {
  return (
    <nav class="navbar sticky-top navbar-light" style={{backgroundColor:'#b81a6a'}}>
        <div class="container-fluid">
        <p class="navbar-brand" style={{color:'white',marginLeft:'50px'}}>Pizza Times</p>
        <Link className="navbar-brand" to={{ pathname: '/order-status'}}> <p  className="view-order-status-btn">view order status </p> </Link>
        </div>
    </nav>
  )
}
export default Navbar;