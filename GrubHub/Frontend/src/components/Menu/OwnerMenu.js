import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import { Link } from "react-router-dom";
import { Redirect } from 'react-router';
import MenuData from "../Menu/MenuData"

class OwnerMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sections: [],
            idcookie: cookie.load("id")
        }
        this.viewButton = this.viewButton.bind(this);
    }
    //get the books data from backend  
    componentDidMount() {
        axios.get('http://localhost:3001/ownersection', {
            params: {
                sectionid: this.props.match.params.sectionid,
                idcookie: this.state.idcookie
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
        let details = this.state.sections.map(section => {
            return (
                <tr>
                    <MenuData key={Math.random} data={section}></MenuData>
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
                    <h2>Your Menu :</h2>
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
                </div>

            </div>

        )
    }
}
//export Home Component
export default OwnerMenu;