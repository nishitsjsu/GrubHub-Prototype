import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import { Link } from "react-router-dom";
import { Redirect } from 'react-router';
import { connect } from "react-redux";
import ownersectionFetch_function from "../Action/OwnerSectionAction"
import SectionData from "../Extra/SectionData"

class OwnerSection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            authFlag: false,
            sections: [],
            idcookie: cookie.load("id"),
            emailcookie: cookie.load("email")
        }
    }

    componentWillReceiveProps(nextProps) {

        console.log("in will recieve props for details", nextProps);
        this.setState({
            authFlag: nextProps.authFlag,
            sections: nextProps.sections,
        })
    }

    //Call the Will Mount to set the auth Flag to false
    componentWillMount() {
        this.setState({
            authFlag: false
        });
    }

    //get the books data from backend  
    componentDidMount() {

        var emailcookie = this.state.emailcookie;

        // axios.get('http://localhost:3001/ownersection', {
        //     params: {
        //         idcookie: this.state.idcookie,
        //         emailcookie: this.state.emailcookie
        //     }
        // })
        //     .then((response) => {
        //         console.log("Received response")
        //         //update the state with the response data
        //         this.setState({

        //             sections: this.state.sections.concat(response.data)
        //         });
        //     });
        this.props.ownersectionFetch_function(emailcookie);
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
// export default OwnerSection;

function mapStateToProps(state) {
    console.log("in map state traveler_propfile", state);
    return {
        // authFlag: state.BuyerProfileReducer.authFlag,

        sections: state.OwnerSectionReducer.sections,
        authFlag: state.OwnerSectionReducer.authFlag,
        //uploadFlag: state.BuyerProfileUploadReducer.uploadFlag,

    };
}

const mapDispachToProps = dispatch => {
    return {
        ownersectionFetch_function: (emailcookie) => dispatch(ownersectionFetch_function(emailcookie)),
    };
};

export default connect(
    mapStateToProps,
    mapDispachToProps
)(OwnerSection);