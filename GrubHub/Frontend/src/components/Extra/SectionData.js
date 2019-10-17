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
                <td>{this.props.data.sectionname}</td>
                {/* <td>{this.props.data.personaddress}</td>
                <td>{this.props.data.status}</td> */}
                <td><Link to={`/sectiondetails/${this.props.data.sectionid}`} ><button className="btn btn-primary">Details</button></Link></td>
            </Fragment>
        )


    }
}

export default SectionData;
