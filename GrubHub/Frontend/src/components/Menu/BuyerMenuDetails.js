import React, { Component, Fragment } from "react";
import "../../App.css";
import axios from 'axios';
import cookie from "react-cookies";
import { Link } from "react-router-dom";
import { Redirect } from "react-router";
import { connect } from "react-redux";
import addtocart_function from "../Action/AddToCartAction"
import MenuData from "../Menu/MenuData";
import rootURL from '../config';

class MenuDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            itemid: this.props.data.itemid,
            itemname: this.props.data.name,
            itemimage: this.props.data.itemimage,
            itemdescription: this.props.data.description,
            itemprice: this.props.data.price,
            idcookie: cookie.load("id"),
            image: rootURL + "/profilepics/" + this.props.data.itemimage + "",
            quantity: "",
            owneremail: this.props.data.owneremail,
            restaurant: this.props.data.restaurantname,
            emailcookie: cookie.load("email"),
            authFlag: false,
        }
        this.submitAdd = this.submitAdd.bind(this);
        this.quantityChangeHandler = this.quantityChangeHandler.bind(this);
    }

    componentWillReceiveProps(nextProps) {

        console.log("in will recieve props for details", nextProps);
        this.setState({
            authFlag: nextProps.authFlag,
        })
    }

    //Call the Will Mount to set the auth Flag to false
    componentDidMount() {
        this.setState({
            authFlag: false
        });
    }

    quantityChangeHandler = e => {
        this.setState({
            quantity: e.target.value
        });
    };

    submitAdd = e => {
        var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();
        const data = {
            itemid: this.state.itemid,
            itemname: this.state.itemname,
            itemprice: this.state.itemprice,
            quantity: this.state.quantity,
            idcookie: this.state.idcookie,
            emailcookie: this.state.emailcookie,
            owneremail: this.state.owneremail,
            restaurant: this.state.restaurant
        };
        //set the with credentials to true
        // axios.defaults.withCredentials = true;
        // //make a post request with the user data
        // axios.post("http://localhost:3001/addtocart", data).then(response => {
        //     console.log("Status Code : ", response.status);
        //     if (response.status === 200) {
        //         console.log(response)
        //         this.setState({
        //             authFlag: true
        //         });
        //         window.location.reload();

        //     } else {
        //         this.setState({
        //             authFlag: false
        //         });
        //     }
        // });

        this.props.addtocart_function(data);
    };





    render() {
        console.log(this.props.data);
        //let book = this.props.books.BookID

        // let details = this.state.books.map((book) => {
        //     return (
        //         <div>

        //         </div>
        //     )
        // })
        var redirectVar = null;
        if (this.state.authFlag) {
            redirectVar = window.location.reload();
        }

        return (

            <Fragment>
                {redirectVar}
                <td>{this.props.data.name}</td>
                <td style={{ width: "20%" }}><img style={{ width: "50%", height: "20%" }} src={this.state.image} /></td>
                <td>{this.props.data.description}</td>
                <td>{this.props.data.price}</td>
                <td><input onChange={this.quantityChangeHandler} type="number" autoFocus placeholder="Quantity" style={{ width: "40%", height: "5%" }}></input></td>
                <td><button onClick={this.submitAdd} className="btn btn-primary">Add</button></td>
            </Fragment>
        )
    }
}

// export default MenuDetails;

function mapStateToProps(state) {
    console.log("in map state login", state);
    return {
        authFlag: state.BuyerMessageReducer.authFlag,
        // invalidFlag: state.LoginReducer.invalidFlag
    };
}

const mapDispachToProps = dispatch => {
    return {
        addtocart_function: (data) => dispatch(addtocart_function(data)),

    };
};

export default connect(
    mapStateToProps,
    mapDispachToProps
)(MenuDetails);
