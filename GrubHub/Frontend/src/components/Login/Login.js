import React, { Component } from "react";
import "./login.css";
import axios from "axios";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import { connect } from "react-redux";
import login_function from "../Action/LoginAction"
//var alert = require("react-alert");

//Define a Login Component
class Login extends Component {
  //call the constructor method
  constructor(props) {
    //Call the constrictor of Super class i.e The Component
    super(props);
    //maintain the state required for this component
    this.state = {
      username: "",
      password: "",
      radio: "",
      authFlag: false,
      invalidFlag: false
    };
    //Bind the handlers to this class
    this.usernameChangeHandler = this.usernameChangeHandler.bind(this);
    this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
    this.submitLogin = this.submitLogin.bind(this);
    this.radioChangeHandler = this.radioChangeHandler.bind(this);
  }


  componentWillReceiveProps(nextProps) {

    console.log("in will recieve props for details", nextProps);
    this.setState({
      authFlag: nextProps.authFlag,
      invalidFlag: nextProps.invalidFlag

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
  usernameChangeHandler = e => {
    this.setState({
      username: e.target.value
    });
  };
  //password change handler to update state variable with the text entered by the user
  passwordChangeHandler = e => {
    this.setState({
      password: e.target.value
    });
  };

  radioChangeHandler = e => {
    this.setState({
      radio: e.target.value
    });
  };
  //submit Login handler to send a request to the node backend
  submitLogin = e => {
    var headers = new Headers();
    //prevent page from refresh
    e.preventDefault();
    const data = {
      username: this.state.username,
      password: this.state.password,
      radio: this.state.radio
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

    this.props.login_function(data)
  };

  render() {
    //redirect based on successful login
    let redirectVar = null;
    let invalidAlert = null;
    let redirectAuth = null;
    // if (cookie.load("cookie")) {
    //   redirectVar = <Redirect to="/home" />;
    // }
    // if (cookie.load("cookie")) {
    //   redirectAuth = <Redirect to="/home" />;
    // }
    if (this.state.authFlag && this.state.radio == "owner") {
      console.log("inside owner")

      redirectAuth = <Redirect to="/ownerhome" />;
      // redirectAuth = <Redirect to= />;
    } else if (this.state.authFlag && this.state.radio == "buyer") {
      console.log("inside buyer")

      redirectAuth = <Redirect to="/buyerhome" />;

    }
    if (!this.state.authFlag) {
      console.log("inside else")
      redirectAuth = <Redirect to="/login" />;
    }
    if (this.state.invalidFlag) {
      invalidAlert = (
        <h3>Invalid credentials!</h3>

      )
    }
    return (
      <div>
        {/* {redirectVar} */}
        {redirectAuth}
        <div class="wrapper fadeInDown">
          <div id="formContent">
            {invalidAlert}
            <div class="fadeIn first">
              {/* <h2>Lets's log you in!</h2> */}
              <img
                src="https://www.pnglot.com/pngfile/detail/192-1925683_user-icon-png-small.png"
                id="icon"
                alt="User Icon"
              />
            </div>

            <form>
              <input
                onChange={this.usernameChangeHandler}
                type="text"
                id="login"
                class="fadeIn second"
                name="login"
                placeholder="Email"
              />
              <input
                onChange={this.passwordChangeHandler}
                type="password"
                id="password"
                class="fadeIn third"
                name="password"
                placeholder="Password"
              />

              <div class="martop" onChange={this.radioChangeHandler}>
                <fieldset>
                  <input type="radio" name="role" value="buyer" /> Buyer &nbsp;
                  <input type="radio" name="role" value="owner" /> Owner
                </fieldset>
              </div>
              <br />

              <input
                type="button"
                onClick={this.submitLogin}
                class="fadeIn fourth"
                value="Log In"
              />
            </form>

            <div id="formFooter">
              <a href="/buyersignup">Buyer Signup </a>|
              <a href="/ownersignup"> Owner Signup</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
//export Login Component
// export default Login;

function mapStateToProps(state) {
  console.log("in map state login", state);
  return {
    authFlag: state.LoginReducer.authFlag,
    invalidFlag: state.LoginReducer.invalidFlag
  };
}

const mapDispachToProps = dispatch => {
  return {
    login_function: (data) => dispatch(login_function(data)),

  };
};

export default connect(
  mapStateToProps,
  mapDispachToProps
)(Login);
