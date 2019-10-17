import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import { Link } from "react-router-dom";
import { Redirect } from 'react-router';
import BuyerMenuData from "../Menu/BuyerMenuData"

class BuyerMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sections: []
        }
    }
    //get the books data from backend  
    componentDidMount() {
        axios.get('http://localhost:3001/buyersection', {
            params: {
                restaurantid: this.props.match.params.restaurantid
            }
        })
            .then((response) => {
                console.log("Received response")
                //update the state with the response data
                this.setState({

                    sections: this.state.sections.concat(response.data)
                });
            });
    }

    render() {
        //iterate over books to create a table row
        let details = this.state.sections.map(section => {
            return (
                <tr>
                    <BuyerMenuData key={Math.random} data={section}></BuyerMenuData>
                </tr>
                // <tr key="index">
                //     <td>{book.BookID}</td>
                //     <td>{book.Title}</td>
                //     <td>{book.Author}</td>
                //     <td>{book.Status}</td>
                //     <input type="button" onClick={this.viewButton(index)} value="view details"></input>
                // </tr>
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
                    <h2>Select Items from the Menu!</h2>
                    {/* <table class="table">
                        <thead>
                            <tr>
                                <th>Section ID</th>
                                <th>Section Name</th>
                                {/* <th>Person Address</th>
                                <th>Order Status</th>
                                <th>Action</th> */}
                    {/* </tr>
                        </thead>
                        <tbody>
                            {/*Display the Tbale row based on data recieved*/}
                    {/* {details} */}
                    {/* </tbody> */}
                    {/* </table> */}
                    <div>
                        {details}
                    </div>
                    <Link to={`/viewcart`} > <button class="btn btn-success" type="submit">View Cart</button></Link>
                </div>

            </div>

        )
    }
}
//export Home Component
export default BuyerMenu;