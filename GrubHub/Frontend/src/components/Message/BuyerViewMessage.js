import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import { Link } from "react-router-dom";
import { Redirect } from 'react-router';
import { connect } from "react-redux";
import buyermessageFetch_function from "../Action/BuyerViewMessageAction"
import OrderData from "../Extra/OrderData"

class BuyerViewMessage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            authFlag: false,
            orders: [],
            emailcookie: cookie.load("email"),
        }
    }

    componentWillReceiveProps(nextProps) {

        console.log("in will recieve props for details", nextProps);
        this.setState({
            authFlag: nextProps.authFlag,
            orders: nextProps.orders,
        })
    }

    //Call the Will Mount to set the auth Flag to false
    componentWillMount() {
        this.setState({
            authFlag: false
        });
    }




    //get the orders data from backend  
    componentDidMount() {
        var emailcookie = this.state.emailcookie;

        // axios.get('http://localhost:3001/buyerfutureorders', {
        //     params: {
        //         idcookie: this.state.idcookie,
        //         emailcookie: this.state.emailcookie,
        //     }
        // })
        //     .then((response) => {
        //         console.log("Received response")
        //         //update the state with the response data
        //         this.setState({

        //             orders: this.state.orders.concat(response.data)
        //         });
        //     });

        this.props.buyermessageFetch_function(emailcookie);
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
                    <td>{order.restaurant}</td>
                    <td>{order.message}</td>
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
                    <h2>List of All Messages</h2>
                    <table class="table table-bordered table-hover" style={{ textAlign: "left", backgroundColor: "#fafafa" }}>
                        <thead class="thead-dark" style={{ textAlign: "center" }}>
                            <tr>
                                <th>Order ID</th>
                                <th>Restaurant</th>
                                <th>Message</th>

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
// export default BuyerViewMessage;

function mapStateToProps(state) {
    console.log("in map state traveler_propfile", state);
    return {

        orders: state.BuyerMessageViewReducer.orders,
        authFlag: state.BuyerMessageViewReducer.authFlag,

    };
}

const mapDispachToProps = dispatch => {
    return {
        buyermessageFetch_function: (emailcookie) => dispatch(buyermessageFetch_function(emailcookie)),
    };
};

export default connect(
    mapStateToProps,
    mapDispachToProps
)(BuyerViewMessage);