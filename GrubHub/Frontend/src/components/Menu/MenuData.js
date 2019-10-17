import React, { Component, Fragment } from "react";
import "../../App.css";
import axios from 'axios';
import { Link } from "react-router-dom";
import { Redirect } from "react-router";
import MenuDetails from "../Menu/MenuDetails";
import cookie from "react-cookies";

class MenuData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            section: this.props.data.sectionid,
            items: [],
            idcookie: cookie.load("id")
        }

    }


    componentDidMount() {
        axios.get('http://localhost:3001/sectiondetails', {
            params: {
                sectionid: this.props.data.sectionid,
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





    render() {

        let details = this.state.items.map(item => {
            return (
                <tr>
                    <MenuDetails key={Math.random} data={item}></MenuDetails>
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

        return (
            <div>
                <h3>{this.props.data.sectionname}</h3>
                <table class="table table-bordered table-hover" style={{ textAlign: "left" }}>
                    <thead class="thead-dark" style={{ textAlign: "center" }}>
                        <tr>
                            <th>Section</th>
                            <th>Item Name</th>
                            <th>Item Image</th>
                            <th>Item Description</th>
                            <th>Price($)</th>

                        </tr>
                    </thead>
                    <tbody>
                        {/*Display the Tbale row based on data recieved*/}
                        {details}
                    </tbody>
                </table>
            </div>
        )


    }
}

export default MenuData;
