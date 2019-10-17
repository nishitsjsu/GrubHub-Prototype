import React, { Component, Fragment } from "react";
import "../../App.css";
import { Link } from "react-router-dom";
import { Redirect } from "react-router";
import MenuData from "../Menu/MenuData";

class MenuDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: "http://localhost:3001/profilepics/" + this.props.data.itemimage + "",
        }
        this.viewButton = this.viewButton.bind(this);
    }



    state = {};

    viewButton = e => {
        console.log("Button clicked");
        // <Link to={`./orderdetails:bookid=${this.props.data.BookID}`} component={OrderDetails}></Redirect >
    }




    render() {
        console.log(this.props.data);
        //let book = this.props.books.BookID

        // let details = this.state.books.map((book) => {
        //     return (
        //         <div>

        //         </div>
        //     )
        // })

        return (
            <Fragment>
                <td>{this.props.data.sectionid}</td>
                <td>{this.props.data.name}</td>
                <td style={{ width: "20%" }}><img style={{ width: "50%", height: "20%" }} src={this.state.image} /></td>
                <td>{this.props.data.description}</td>
                <td>{this.props.data.price}</td>
            </Fragment>
        )


    }
}

export default MenuDetails;
