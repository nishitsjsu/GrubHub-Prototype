import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import { Link } from "react-router-dom";
import { Redirect } from 'react-router';
import SectionData from "../Extra/SectionData"
import SectionDetailsData from "../Sections/SectionDetailsData"

class SectionDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            section: this.props.match.params.sectionid,
            items: [],
            idcookie: cookie.load("id")
        }
        this.deleteSection = this.deleteSection.bind(this);
    }
    //get the books data from backend  
    componentDidMount() {
        console.log("SEction and cookie")
        axios.get('http://localhost:3001/sectiondetails', {
            params: {
                sectionid: this.props.match.params.sectionid,
                idcookie: this.state.idcookie
            }
        })
            .then((response) => {
                console.log("Received response")
                //update the state with the response data
                this.setState({

                    items: this.state.items.concat(response.data)
                });
            });
    }

    deleteSection = e => {
        var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();
        const data = {
            sectionid: this.state.section
        };
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post("http://localhost:3001/deletesection", data).then(response => {
            console.log("Status Code : ", response.status);
            if (response.status === 200) {
                window.location.replace("/ownersection");
                this.setState({
                    authFlag: true
                });
            } else {
                this.setState({
                    authFlag: false
                });
            }
        });
    };


    render() {
        //iterate over books to create a table row
        let details = this.state.items.map(item => {
            return (
                <tr>
                    <SectionDetailsData key={Math.random} data={item}></SectionDetailsData>
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
                    <h2>Section Details</h2>
                    <table class="table table-bordered table-hover" style={{ textAlign: "left" }}>
                        <thead class="thead-dark" style={{ textAlign: "center" }}>
                            <tr style={{ textAlign: "center" }}>
                                <th>Section</th>
                                <th>Item Name</th>
                                <th>Item Image</th>
                                <th>Item Description</th>
                                <th>Price($)</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/*Display the Tbale row based on data recieved*/}
                            {details}
                        </tbody>
                    </table>
                    <Link to={`/additem/${this.state.section}`} ><button className="btn btn-primary">Add New Item</button></Link>
                    <button className="btn btn-primary" onClick={this.deleteSection} style={{ marginLeft: "1%" }}>Delete Section</button>
                </div>

            </div>

        )
    }
}
//export Home Component
export default SectionDetails;