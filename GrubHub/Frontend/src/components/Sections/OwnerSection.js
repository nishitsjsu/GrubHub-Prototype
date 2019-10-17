import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import { Link } from "react-router-dom";
import { Redirect } from 'react-router';
import SectionData from "../Extra/SectionData"

class OwnerSection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sections: [],
            idcookie: cookie.load("id")
        }

    }
    //get the books data from backend  
    componentDidMount() {
        axios.get('http://localhost:3001/ownersection', {
            params: {
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



    render() {
        //iterate over books to create a table row
        let details = this.state.sections.map(section => {
            return (
                <tr>
                    <SectionData key={Math.random} data={section}></SectionData>
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
                    <h2>List of Sections</h2>
                    <br />
                    <table class="table table-bordered table-hover" style={{ textAlign: "left" }}>
                        <thead class="thead-dark" style={{ textAlign: "center" }}>
                            <tr>
                                <th>Section ID</th>
                                <th>Section Name</th>
                                <th>Details</th>
                                {/* <th>Person Address</th>
                                <th>Order Status</th>
                                <th>Action</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {/*Display the Tbale row based on data recieved*/}
                            {details}
                        </tbody>
                    </table>
                    <Link to="/addsection"><button className="btn btn-primary" onClick={this.addSection}>Add Section</button></Link>
                </div>

            </div>

        )
    }
}
//export Home Component
export default OwnerSection;