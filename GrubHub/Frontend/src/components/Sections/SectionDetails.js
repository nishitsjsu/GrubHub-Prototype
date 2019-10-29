import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import { Link } from "react-router-dom";
import { Redirect } from 'react-router';
import { connect } from "react-redux";
import sectiondetailsFetch_function from "../Action/SectionDetailsAction"
import deleteSection_function from "../Action/DeleteSectionAction";
import SectionData from "../Extra/SectionData"
import SectionDetailsData from "../Sections/SectionDetailsData"

class SectionDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            authFlag: false,
            delFlag: false,
            section: this.props.match.params.sectionid,
            items: [],
            idcookie: cookie.load("id"),
            emailcookie: cookie.load("email")
        }
        this.deleteSection = this.deleteSection.bind(this);
    }


    componentWillReceiveProps(nextProps) {

        console.log("in will recieve props for details", nextProps);
        this.setState({
            items: nextProps.items,
            authFlag: nextProps.authFlag,
            delFlag: nextProps.delFlag,
        })
    }

    //Call the Will Mount to set the auth Flag to false
    componentWillMount() {
        this.setState({
            authFlag: false,
            delFlag: false,
        });
    }

    //get the books data from backend  
    componentDidMount() {
        console.log("SEction and cookie")
        var sectionid = this.props.match.params.sectionid;
        var emailcookie = this.state.emailcookie;

        // axios.get('http://localhost:3001/sectiondetails', {
        //     params: {
        //         sectionid: this.props.match.params.sectionid,
        //         idcookie: this.state.idcookie,
        //         emailcookie: this.state.emailcookie
        //     }
        // })
        //     .then((response) => {
        //         console.log("Received response")
        //         //update the state with the response data
        //         this.setState({

        //             items: this.state.items.concat(response.data)
        //         });
        //     });
        this.props.sectiondetailsFetch_function(emailcookie, sectionid)
    }

    deleteSection = e => {
        var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();
        const data = {
            sectionid: this.state.section,
            emailcookie: this.state.emailcookie
        };
        //set the with credentials to true
        // axios.defaults.withCredentials = true;
        // //make a post request with the user data
        // axios.post("http://localhost:3001/deletesection", data).then(response => {
        //     console.log("Status Code : ", response.status);
        //     if (response.status === 200) {
        //         window.location.replace("/ownersection");
        //         this.setState({
        //             authFlag: true
        //         });
        //     } else {
        //         this.setState({
        //             authFlag: false
        //         });
        //     }
        // });
        this.props.deleteSection_function(data);
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
        if (this.state.delFlag) {
            redirectVar = <Redirect to="/ownersection" />
        }
        return (
            <div>
                {redirectVar}
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
// export default SectionDetails;

function mapStateToProps(state) {
    console.log("in map state traveler_propfile", state);
    return {
        // authFlag: state.BuyerProfileReducer.authFlag,
        items: state.SectionDetailsReducer.items,
        authFlag: state.SectionDetailsReducer.authFlag,
        delFlag: state.DeleteSectionReducer.delFlag,
        //uploadFlag: state.BuyerProfileUploadReducer.uploadFlag,

    };
}

const mapDispachToProps = dispatch => {
    return {
        sectiondetailsFetch_function: (emailcookie, sectionid) => dispatch(sectiondetailsFetch_function(emailcookie, sectionid)),
        deleteSection_function: (data) => dispatch(deleteSection_function(data)),
        // imageUpload_function: (data, config) => dispatch(imageUpload_function(data, config))

    };
};

export default connect(
    mapStateToProps,
    mapDispachToProps
)(SectionDetails);
