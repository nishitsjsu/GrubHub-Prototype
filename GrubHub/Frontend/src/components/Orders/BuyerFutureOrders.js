import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import { Link } from "react-router-dom";
import { Redirect } from 'react-router';
import OrderData from "../Extra/OrderData"

class BuyerFutureOrders extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orders: [],
            idcookie: cookie.load("id"),
            emailcookie: cookie.load("email"),
        }

    }
    //get the orders data from backend  
    componentDidMount() {
        axios.get('http://localhost:3001/buyerfutureorders', {
            params: {
                idcookie: this.state.idcookie
            }
        })
            .then((response) => {
                console.log("Received response")
                //update the state with the response data
                this.setState({

                    orders: this.state.orders.concat(response.data)
                });
            });
    }



    render() {
        //iterate over orders to create a table row
        let details = this.state.orders.map(order => {
            return (
                // <tr>
                //     <OrderData key={Math.random} data={order}></OrderData>
                // </tr>
                <tr key="index">
                    <td>{order.orderid}</td>
                    <td>{order.restaurantname}</td>
                    <td>{order.status}</td>
                </tr>
            )
        })
        //if not logged in go to login page
        let redirectVar = null;
        // if (!cookie.load('cookie')) {
        //     redirectVar = <Redirect to="/login" />
        // }
        return (
            <div>
                {/* {redirectVar} */}
                <div class="container">
                    <h2>List of All Future Orders</h2>
                    <table class="table table-bordered table-hover" style={{ textAlign: "left", backgroundColor: "#fafafa" }}>
                        <thead class="thead-dark" style={{ textAlign: "center" }}>
                            <tr>
                                <th>Order ID</th>
                                <th>Restaurant</th>
                                <th>Status</th>

                            </tr>
                        </thead>
                        <tbody>
                            {/*Display the Tbale row based on data recieved*/}
                            {details}
                        </tbody>
                    </table>
                </div>

            </div>

        )
    }
}
//export Home Component
export default BuyerFutureOrders;