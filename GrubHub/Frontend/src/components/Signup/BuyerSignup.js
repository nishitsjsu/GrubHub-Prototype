import React, { Component } from "react";
import "../Login/login.css";
import axios from "axios";
import cookie from "react-cookies";
import { Redirect } from "react-router";

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
      email: "",
      authFlag: false
    };
    //Bind the handlers to this class
    this.usernameChangeHandler = this.usernameChangeHandler.bind(this);
    this.emailChangeHandler = this.emailChangeHandler.bind(this);
    this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
    this.submitSignup = this.submitSignup.bind(this);
  }
  //Call the Will Mount to set the auth Flag to false
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

  emailChangeHandler = e => {
    this.setState({
      email: e.target.value
    });
  };

  //submit Login handler to send a request to the node backend
  submitSignup = e => {
    var headers = new Headers();
    //prevent page from refresh
    e.preventDefault();
    const data = {
      username: this.state.username,
      password: this.state.password,
      email: this.state.email
    };
    //set the with credentials to true
    axios.defaults.withCredentials = true;
    //make a post request with the user data
    axios.post("http://localhost:3001/buyersignup", data).then(response => {
      console.log("Status Code : ", response.status);
      if (response.status === 200) {
        window.location.replace("/login");
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
    //redirect based on successful login
    let redirectVar = null;
    if (cookie.load("cookie")) {
      redirectVar = <Redirect to="/home" />;
    }
    return (
      <div>

        {/* {redirectVar} */}
        <div class="wrapper fadeInDown">
          <div id="formContent">
            <div class="fadeIn first">
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
                id="username"
                class="fadeIn second"
                name="username"
                placeholder="Username"
              />
              <input
                onChange={this.emailChangeHandler}
                type="email"
                id="email"
                class="fadeIn second"
                name="email"
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
              <input onClick={this.submitSignup} type="submit" class="fadeIn fourth" value="Sign Up!" />
            </form>

            <div id="formFooter">
              <a class="underlineHover" href="/login">
                Go to Login!
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
//export Login Component
export default Login;
