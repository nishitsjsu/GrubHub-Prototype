import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import { connect } from "react-redux";
import viewcartFetch_function from "../Action/ViewCartAction"
import { Link } from "react-router-dom";
import { Redirect } from 'react-router';
import rootURL from '../config';
import setAuthorizationToken from '../../utils/setAuthorizationToken'

class ViewCart extends Component {
    constructor() {
        super();
        this.state = {
            items: [],
            total: "",
            idcookie: cookie.load("id"),
            namecookie: cookie.load("name"),
            emailcookie: cookie.load("email"),
            address: ""
        }
        this.goBack = this.goBack.bind(this)
        this.placeOrder = this.placeOrder.bind(this)
        this.addressChangeHandler = this.addressChangeHandler.bind(this)
    }

    componentWillReceiveProps(nextProps) {

        console.log("in will recieve props for details", nextProps);
        this.setState({
            authFlag: nextProps.authFlag,
            items: nextProps.items,
        })
    }

    //Call the Will Mount to set the auth Flag to false
    componentWillMount() {
        this.setState({
            authFlag: false
        });
    }

    addressChangeHandler = e => {
        this.setState({
            address: e.target.value
        });
    };

    //get the items data from backend  
    componentDidMount() {
        var emailcookie = this.state.emailcookie;
        this.props.viewcartFetch_function(emailcookie)
        // axios.get('http://localhost:3001/viewcart', {
        //     params: {
        //         idcookie: this.state.idcookie,
        //         emailcookie: this.state.emailcookie
        //     }
        // })
        //     .then((response) => {
        //         console.log(response)
        //         //update the state with the response data
        //         this.setState({
        //             items: this.state.items.concat(response.data)
        //         });
        //     });
        setAuthorizationToken(localStorage.getItem('jwt'));
        axios.get(rootURL + '/calculateSum', {
            params: {
                idcookie: this.state.idcookie,
                emailcookie: this.state.emailcookie
            }
        })
            .then((response) => {
                console.log(response.data)
                //update the state with the response data
                this.setState({
                    total: response.data
                });
            });

    }

    goBack = (e) => {
        this.props.history.goBack();
    }

    placeOrder = e => {
        var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();
        const data = {
            items: this.state.items,
            idcookie: this.state.idcookie,
            namecookie: this.state.namecookie,
            address: this.state.address,
            emailcookie: this.state.emailcookie
        };
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        setAuthorizationToken(localStorage.getItem('jwt'));
        axios.post(rootURL + "/placeorder", data).then(response => {
            console.log("Status Code : ", response.status);
            if (response.status === 200) {
                console.log("Order placed successfully")
                window.location.replace("/buyerfutureorders")
                this.setState({
                    authFlag: true
                });
                // window.location.replace(`/sectiondetails/${this.state.sectionid}`)
            } else {
                this.setState({
                    authFlag: false
                });
            }
        });
    };

    render() {
        //iterate over items to create a table row
        let details = this.state.items.map(item => {
            return (
                <tr>
                    <td>{item.itemname}</td>
                    <td>{item.quantity}</td>
                    <td>{item.price}</td>
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
                <form>
                    {/* {redirectVar} */}
                    <div class="container">
                        <h2>List of All items</h2>
                        <table class="table table-bordered table-hover" style={{ textAlign: "left", backgroundColor: "#fafafa" }}>
                            <thead class="thead-dark" style={{ textAlign: "center" }}>
                                <tr>
                                    <th>Item</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/*Display the Tbale row based on data recieved*/}
                                {details}
                                <tr>
                                    <td>Total</td>
                                    <td></td>
                                    <td>{this.state.total}</td>
                                </tr>
                            </tbody>
                        </table>

                        <div>
                            <h2>Let's get your delivery details</h2>
                            <br>
                            </br>

                            <input type="text" onChange={this.addressChangeHandler} placeholder="Delivery Address" required></input>
                        </div>
                        <br></br>
                        <button onClick={this.placeOrder} className="btn btn-primary">Place Order</button>
                        <button style={{ marginLeft: "1%" }} onClick={this.goBack} className="btn btn-primary">Go Back</button>

                    </div>
                </form>

            </div>

        )
    }
}
//export ViewCart Component
// export default ViewCart;


function mapStateToProps(state) {
    console.log("in map state traveler_propfile", state);
    return {

        items: state.ViewCartReducer.items,
        authFlag: state.ViewCartReducer.authFlag,

    };
}

const mapDispachToProps = dispatch => {
    return {
        viewcartFetch_function: (emailcookie) => dispatch(viewcartFetch_function(emailcookie)),
    };
};

export default connect(
    mapStateToProps,
    mapDispachToProps
)(ViewCart);