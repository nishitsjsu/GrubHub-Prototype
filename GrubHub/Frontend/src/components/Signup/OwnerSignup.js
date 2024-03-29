import React, { Component } from "react";
import "../Login/login.css";
import axios from "axios";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import { connect } from "react-redux";
import ownerSignup_function from "../Action/OwnerSignupAction"

//Define a Login Component
class OwnerSignup extends Component {
  //call the constructor method
  constructor(props) {
    //Call the constrictor of Super class i.e The Component
    super(props);
    //maintain the state required for this component
    this.state = {
      username: "",
      password: "",
      email: "",
      restaurant: "",
      zipcode: "",
      authFlag: false
    };
    //Bind the handlers to this class
    this.usernameChangeHandler = this.usernameChangeHandler.bind(this);
    this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
    this.emailChangeHandler = this.emailChangeHandler.bind(this);
    this.restaurantChangeHandler = this.restaurantChangeHandler.bind(this);
    this.cuisineChangeHandler = this.cuisineChangeHandler.bind(this);
    this.zipcodeChangeHandler = this.zipcodeChangeHandler.bind(this);
    this.submitSignup = this.submitSignup.bind(this);
  }

  componentWillReceiveProps(nextProps) {

    console.log("in will recieve props for details", nextProps);
    this.setState({
      authFlag: nextProps.authFlag

    })
  }

  componentDidMount() {
    this.setState({
      authFlag: false
    });
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

  restaurantChangeHandler = e => {
    this.setState({
      restaurant: e.target.value
    });
  };

  cuisineChangeHandler = e => {
    this.setState({
      cuisine: e.target.value
    });
  };

  zipcodeChangeHandler = e => {
    this.setState({
      zipcode: e.target.value
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
      email: this.state.email,
      restaurant: this.state.restaurant,
      zipcode: this.state.zipcode,
      cuisine: this.state.cuisine
    };

    this.props.ownerSignup_function(data)
    //set the with credentials to true
    // axios.defaults.withCredentials = true;
    // //make a post request with the user data
    // axios.post("http://localhost:3001/ownersignup", data).then(response => {
    //   console.log("Status Code : ", response.status);
    //   if (response.status === 200) {
    //     window.location.replace("/login");
    //     this.setState({
    //       authFlag: true
    //     });
    //   } else {
    //     this.setState({
    //       authFlag: false
    //     });
    //   }
    // });
  };

  render() {
    //redirect based on successful login
    let redirectVar = null;
    if (this.state.authFlag) {
      redirectVar = <Redirect to="/login" />;
    }
    return (
      <div>
        {redirectVar}
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
                id="login"
                class="fadeIn second"
                name="login"
                placeholder="Username"
              />
              <input
                onChange={this.emailChangeHandler}
                type="email"
                id="login"
                class="fadeIn second"
                name="login"
                placeholder="Email"
              />
              <input
                onChange={this.passwordChangeHandler}
                type="text"
                id="password"
                class="fadeIn third"
                name="login"
                placeholder="Password"
              />
              <input
                onChange={this.restaurantChangeHandler}
                type="text"
                id="restaurant"
                class="fadeIn third"
                name="restaurant"
                placeholder="Restaurant Name"
              />
              <input
                onChange={this.cuisineChangeHandler}
                type="text"
                id="cuisine"
                class="fadeIn third"
                name="cuisine"
                placeholder="Cuisine"
              />
              <input
                onChange={this.zipcodeChangeHandler}
                type="number"
                id="zipcode"
                class="fadeIn third"
                name="zipcode"
                placeholder="Restaurant Zipcode"
              />
              <input
                onClick={this.submitSignup}
                type="submit"
                class="fadeIn fourth"
                value="Sign Up!"
              />
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
// export default Login;

function mapStateToProps(state) {
  console.log("in map state owner_signup", state);
  return {
    authFlag: state.OwnerSignupReducer.authFlag,

  };
}

const mapDispachToProps = dispatch => {
  return {
    ownerSignup_function: (data) => dispatch(ownerSignup_function(data)),

  };
};

export default connect(
  mapStateToProps,
  mapDispachToProps
)(OwnerSignup);
