import React, { Component, Fragment } from "react";
import "../../App.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { Redirect } from "react-router";
import SectionDetails from "../Sections/SectionDetails";
import { Z_BLOCK } from "zlib";

class SectionDetailsData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.data.name,
            description: this.props.data.description,
            price: this.props.data.price,
            itemid: this.props.data.itemid,
            image: "http://localhost:3001/profilepics/" + this.props.data.itemimage + "",
            image1: "http://localhost:3001/profilepics/d.jpeg",
            authFlag: false
        }
        this.submitUpdate = this.submitUpdate.bind(this);
        this.submitDelete = this.submitDelete.bind(this);
        this.nameChangeHandler = this.nameChangeHandler.bind(this);
        this.desciptionChangeHandler = this.desciptionChangeHandler.bind(this);
        this.priceChangeHandler = this.priceChangeHandler.bind(this);
    }



    nameChangeHandler = e => {
        this.setState({
            name: e.target.value
        });
    };
    //password change handler to update state variable with the text entered by the user
    desciptionChangeHandler = e => {
        this.setState({
            description: e.target.value
        });
    };

    priceChangeHandler = e => {
        this.setState({
            price: e.target.value
        });
    };
    //submit Login handler to send a request to the node backend
    submitUpdate = e => {
        var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();
        const data = {
            name: this.state.name,
            description: this.state.description,
            price: this.state.price,
            itemid: this.state.itemid
        };
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post("http://localhost:3001/updatesectionitems", data).then(response => {
            console.log("Status Code : ", response.status);
            if (response.status === 200) {
                this.setState({
                    authFlag: true
                });
                window.location.reload();
            } else {
                this.setState({
                    authFlag: false
                });
            }
        });
    };


    submitDelete = e => {
        var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();
        const data = {

            itemid: this.state.itemid
        };
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post("http://localhost:3001/deletesectionitems", data).then(response => {
            console.log("Status Code : ", response.status);
            if (response.status === 200) {

                this.setState({
                    authFlag: true
                });
                window.location.reload();
            } else {
                this.setState({
                    authFlag: false
                });
            }
        });
    };

    render() {
        console.log(this.props.data);

        return (
            <Fragment>
                <td>{this.props.data.sectionid}</td>
                <td><input onChange={this.nameChangeHandler} type="text" id="name" name="name" value={this.state.name} /></td>
                <td style={{ width: "20%" }}><img style={{ width: "50%", height: "20%" }} src={this.state.image} /></td>
                <td><input onChange={this.desciptionChangeHandler} type="text" id="description" name="description" value={this.state.description} onChange={this.desciptionChangeHandler} /></td>
                <td><input onChange={this.priceChangeHandler} type="text" id="price" name="price" value={this.state.price} /></td>
                <td><button className="btn btn-primary" onClick={this.submitUpdate}>Update</button> </td>
                <td><button className="btn btn-primary" onClick={this.submitDelete}>Delete</button></td>

            </Fragment>
        )
    }
}

export default SectionDetailsData;
