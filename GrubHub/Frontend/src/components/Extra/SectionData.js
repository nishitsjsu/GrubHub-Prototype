import React, { Component, Fragment } from "react";
import "../../App.css";
import { Link } from "react-router-dom";
import { Redirect } from "react-router";
import OrderDetails from "../Home/OrderDetails";

class SectionData extends Component {
    constructor(props) {
        super(props);
        // this.state = {
        //     books: this.props.books
        // }
    }

    state = {};

    render() {
        console.log(this.props.data);

        return (
            <Fragment>
                <td>{this.props.data.sectionid}</td>
                <td>{this.props.data.sectionname}</td>
                {/* <td>{this.props.data.personaddress}</td>
                <td>{this.props.data.status}</td> */}
                <td><Link to={`/sectiondetails/${this.props.data.sectionname}`} ><button className="btn btn-primary">Details</button></Link></td>
            </Fragment>
        )


    }
}

export default SectionData;

//changing section id to section name in details button
