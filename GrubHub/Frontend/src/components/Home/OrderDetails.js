import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookie';
import { Link } from "react-router-dom";
import { Redirect } from 'react-router';
import { connect } from "react-redux";
import orderdetailsFetch_function from "../Action/OrderDetailsAction"
import changeStatus_function from "../Action/ChangeStatusAction"
import OrderData from "../Extra/OrderData"

class OrderDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            status: "",
            authFlag: false,
            authFlagCh: false,
        }


        this.changeStatus = this.changeStatus.bind(this);
        this.handleDropdown = this.handleDropdown.bind(this);
    }

    componentWillReceiveProps(nextProps) {

        console.log("in will recieve props for details", nextProps);
        this.setState({
            authFlag: nextProps.authFlag,
            items: nextProps.items,
            authFlagCh: nextProps.authFlagCh
        })
    }

    //Call the Will Mount to set the auth Flag to false
    componentWillMount() {
        this.setState({
            authFlag: false,
            authFlagCh: false
        });
    }


    //get the books data from backend  
    componentDidMount() {
        var orderid = this.props.match.params.bookid;
        this.props.orderdetailsFetch_function(orderid);

        // axios.get('http://localhost:3001/orderitemdetails', {
        //     params: {
        //         orderid: this.props.match.params.bookid
        //     }
        // })
        //     .then((response) => {
        //         console.log("Received response")
        //         //update the state with the response data
        //         this.setState({
        //             items: this.state.items.concat(response.data)
        //         });
        //     });
    }

    handleDropdown = e => {
        this.setState({
            status: e.target.value
        });
    };

    changeStatus = e => {

        e.preventDefault();
        const data = {
            orderid: this.props.match.params.bookid,
            status: this.state.status
        };
        this.props.changeStatus_function(data)
        //set the with credentials to true
        // axios.defaults.withCredentials = true;
        // //make a post request with the user data
        // axios.post("http://localhost:3001/changestatus", data).then(response => {
        //     console.log("Status Code : ", response.status);
        //     if (response.status === 200) {
        //         console.log("status changed!")
        //         window.location.replace("/ownerhome");
        //         this.setState({
        //             authFlag: true
        //         })

        //     } else {
        //         this.setState({
        //             authFlag: false
        //         });
        //     }
        // });
    };





    render() {
        console.log("params " + this.props.match.params)
        console.log("items " + this.state.items)
        //iterate over books to create a table row
        let details = this.state.items.map(item => {
            return (
                <tr>
                    <td>{item.orderid}</td>
                    <td>{item.itemname}</td>
                    <td>{item.itemquantity}</td>
                    <td>{item.itemprice}</td>
                </tr>
            )
        })
        //if not logged in go to login page
        let redirectVar = null;
        if (this.state.authFlagCh) {
            redirectVar = <Redirect to="/ownerhome" />
        }
        return (
            <div>
                {redirectVar}
                <div class="container">
                    <h2>Details of the order</h2>
                    <table class="table table-bordered table-hover" style={{ textAlign: "left", backgroundColor: "#fafafa" }}>
                        <thead class="thead-dark" style={{ textAlign: "center" }}>
                            <tr>
                                <th>Order id</th>
                                <th>Item Name</th>
                                <th>Quantity</th>
                                <th>Price($)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/*Display the Tbale row based on data recieved*/}
                            {details}
                        </tbody>
                    </table>


                    <h2>Change Order Status</h2>
                    <br />
                    <select class="form-control" onChange={this.handleDropdown}>
                        <option value="select">Status</option>
                        <option value="New">New</option>
                        <option value="Preparing">Preparing</option>
                        <option value="Ready">Ready</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancel">Cancel</option>
                    </select>
                    <br />
                    <button onClick={this.changeStatus} className="btn btn-primary">Change Status!</button>

                </div>

            </div>

        )
    }
}
//export Home Component
// export default OrderDetails;

function mapStateToProps(state) {
    console.log("in map state traveler_propfile", state);
    return {
        // authFlag: state.BuyerProfileReducer.authFlag,
        // username: state.BuyerProfileReducer.username,
        // email: state.BuyerProfileReducer.email,
        // phone: state.BuyerProfileReducer.phone,
        items: state.OrderDetailsReducer.items,
        authFlag: state.OrderDetailsReducer.authFlag,
        authFlagCh: state.ChangeStatusReducer.authFlagCh,

    };
}

const mapDispachToProps = dispatch => {
    return {
        orderdetailsFetch_function: (orderid) => dispatch(orderdetailsFetch_function(orderid)),
        changeStatus_function: (data) => dispatch(changeStatus_function(data)),
        // imageUpload_function: (data, config) => dispatch(imageUpload_function(data, config))

    };
};

export default connect(
    mapStateToProps,
    mapDispachToProps
)(OrderDetails);
