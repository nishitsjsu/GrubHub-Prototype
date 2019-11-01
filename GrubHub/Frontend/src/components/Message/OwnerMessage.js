import React, { Component } from "react";
// import "./login.css";
import axios from "axios";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import { connect } from "react-redux";
import sendOwnerMessage_function from "../Action/OwnerMessageAction"
//var alert = require("react-alert");

//Define a Login Component
class OwnerMessage extends Component {
    //call the constructor method
    constructor(props) {
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            message: "",
            owneremail: this.props.match.params.owneremail,
            buyeremail: this.props.match.params.buyeremail,
            buyername: this.props.match.params.buyername,
            restaurant: this.props.match.params.restaurant,
            orderid: this.props.match.params.orderid,
            authFlag: false,
        };
        //Bind the handlers to this class
        this.messageChangeHandler = this.messageChangeHandler.bind(this);
        this.submitSend = this.submitSend.bind(this);
    }


    componentWillReceiveProps(nextProps) {

        console.log("in will recieve props for details", nextProps);
        this.setState({
            authFlag: nextProps.authFlag,
        })
    }

    //Call the Will Mount to set the auth Flag to false
    componentDidMount() {
        this.setState({
            authFlag: false
        });
    }

    componentWillMount() {
        this.setState({
            authFlag: false
        });
    }
    //username change handler to update state variable with the text entered by the user
    messageChangeHandler = e => {
        this.setState({
            message: e.target.value
        });
    };

    //submit Login handler to send a request to the node backend
    submitSend = e => {
        var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();
        const data = {
            message: this.state.message,
            owneremail: this.state.owneremail,
            buyeremail: this.state.buyeremail,
            restaurant: this.state.restaurant,
            orderid: this.state.orderid
        };
        //set the with credentials to true
        // axios.defaults.withCredentials = true;
        // //make a post request with the user data
        // axios.post("http://localhost:3001/login", data).then(response => {
        //   console.log("Status Code : ", response.status);
        //   if (response.status === 200) {
        //     if (this.state.radio === "buyer") {
        //       window.location.replace("/buyerhome");
        //     } else if (this.state.radio === "owner") {
        //       window.location.replace("/ownerhome");
        //     }
        //     this.setState({
        //       authFlag: true
        //     });
        //   }
        //   // else if (response.status === 201) {
        //   //   console.log("Inside 201 response");
        //   //   alert("Invalid credentials");
        //   //   this.setState({
        //   //     authFlag: false
        //   //   });
        //   // } 
        //   else {
        //     this.setState({
        //       authFlag: false
        //     });
        //   }
        // }).catch(res => {
        //   console.log("Inside error reponse")
        //   alert("Invalid credentials");
        //   this.setState({
        //     message: "Incorrect username or password"
        //   })
        // });

        this.props.sendOwnerMessage_function(data)
    };

    render() {
        //redirect based on successful login

        let invalidAlert = null;

        if (this.state.authFlag) {
            invalidAlert = (
                <p>Message sent successfully!</p>
            )
        }
        return (
            <div>


                <div class="wrapper fadeInDown">
                    <div id="formContent">

                        <div class="fadeIn first">
                            {/* <h2>Lets's log you in!</h2> */}
                            <img
                                // src="https://www.pnglot.com/pngfile/detail/192-1925683_user-icon-png-small.png"
                                src="https://help.apple.com/assets/5C0726C9680CE2CB37C5057C/5C0726CA680CE2CB37C50583/en_US/fe9efa2e670f770a12833f801b8b4387.png"
                                id="icon"
                                alt="User Icon"
                            />
                        </div>

                        <form>
                            <input
                                onChange={this.messageChangeHandler}
                                type="text"
                                id="msg"
                                class="fadeIn second"
                                name="msg"
                                placeholder="Message Body"
                            />



                            <br />

                            <input
                                type="button"
                                onClick={this.submitSend}
                                class="fadeIn fourth"
                                value="Send!"
                            />
                        </form>

                        <div id="formFooter">
                            <p>{invalidAlert ? `Message successfully sent to ${this.state.buyername}` : `Sending message to ${this.state.buyername}!`} |
                            &nbsp;
                            <a href="/ownerhome">Go to Home</a>
                            </p>


                        </div>
                    </div>
                </div>
            </div >
        );
    }
}
//export Login Component
// export default Login;

function mapStateToProps(state) {
    console.log("in map state login", state);
    return {
        authFlag: state.OwnerMessageReducer.authFlag,
        // invalidFlag: state.LoginReducer.invalidFlag
    };
}

const mapDispachToProps = dispatch => {
    return {
        sendOwnerMessage_function: (data) => dispatch(sendOwnerMessage_function(data)),

    };
};

export default connect(
    mapStateToProps,
    mapDispachToProps
)(OwnerMessage);
