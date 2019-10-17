import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import { Link } from "react-router-dom";
import { Redirect } from 'react-router';
import OrderData from "../Extra/OrderData"

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            books: [],
            idcookie: cookie.load("id"),
            emailcookie: cookie.load("email"),
        }
        this.viewButton = this.viewButton.bind(this);
    }
    //get the books data from backend  
    componentDidMount() {
        axios.get('http://localhost:3001/ownerhome', {
            params: {
                idcookie: this.state.idcookie
            }
        })
            .then((response) => {
                console.log("Received response")
                //update the state with the response data
                this.setState({

                    books: this.state.books.concat(response.data)
                });
            });
    }

    viewButton = (index) => {
        console.log("Button clicked")
        console.log("index is : " + index)

        var headers = new Headers();
        //prevent page from refresh
        // e.preventDefault();
        // const data = {
        //     username: this.state.username,
        //     password: this.state.password,
        //     email: this.state.email,
        //     restaurant: this.state.restaurant,
        //     zipcode: this.state.zipcode
        // };


        //set the with credentials to true

    };

    render() {
        //iterate over books to create a table row
        let details = this.state.books.map(book => {
            return (
                <tr>
                    <OrderData key={Math.random} data={book}></OrderData>
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
                    <h2>List of All Open Orders</h2>
                    <table class="table table-bordered table-hover" style={{ textAlign: "left", backgroundColor: "#fafafa" }}>
                        <thead class="thead-dark" style={{ textAlign: "center" }}>
                            <tr>
                                <th>Order ID</th>
                                <th>Person Name</th>
                                <th>Person Address</th>
                                <th>Order Status</th>
                                <th>Action</th>
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
export default Home;