import React, { Component, Fragment } from "react";
import "../../App.css";
import { Link } from "react-router-dom";
import { Redirect } from "react-router";
import OrderDetails from "../Home/OrderDetails";

class ViewRestaurantsData extends Component {
    constructor(props) {
        super(props);
        // this.state = {
        //     books: this.props.books
        // }

    }

    render() {
        console.log(this.props.data);

        return (
            <Fragment>
                <td>{this.props.data.restaurantname}</td>
                <td>{this.props.data.cuisine}</td>
                {/* <td>{this.props.data.personaddress}</td>
                <td>{this.props.data.status}</td> */}
                <Link to={`/buyermenu/${this.props.data.id}`} ><button style={{ marginLeft: "2%" }} className="btn btn-primary">Details</button></Link>
            </Fragment>
        )


    }
}

export default ViewRestaurantsData;
