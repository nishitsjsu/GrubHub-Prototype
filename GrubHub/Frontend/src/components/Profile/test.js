import React, { Component } from "react";
import "./ownerprofile.css";
import axios from "axios";
import cookie from "react-cookies";
import { Redirect } from "react-router";

//Define a Login Component
class Login extends Component {
  //call the constructor method
  constructor(props) {
    //Call the constrictor of Super className i.e The Component
    super(props);
    //maintain the state required for this component
    this.state = {
      username: "",
      password: "",
      authFlag: false
    };
    //Bind the handlers to this className
    this.usernameChangeHandler = this.usernameChangeHandler.bind(this);
    this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
    this.submitLogin = this.submitLogin.bind(this);
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
  //submit Login handler to send a request to the node backend
  submitLogin = e => {
    var headers = new Headers();
    //prevent page from refresh
    e.preventDefault();
    const data = {
      username: this.state.username,
      password: this.state.password
    };
    //set the with credentials to true
    axios.defaults.withCredentials = true;
    //make a post request with the user data
    axios.post("http://localhost:3001/login", data).then(response => {
      console.log("Status Code : ", response.status);
      if (response.status === 200) {
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
        {redirectVar}
        <div className="wrapper fadeInDown">
          <div id="formContent">
            <h2>Hi There, Username!</h2>
            <form>
              <div className="container emp-profile">
                <form>
                  <div className="row">
                    <div className="col-md-4">
                      <div className="profile-img">
                        <img
                          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS52y5aInsxSm31CvHOFHWujqUx_wWTS9iM6s7BAm21oEN_RiGoog"
                          alt=""
                        />
                      </div>
                    </div>

                    <div className="col-md-4">
                      <div className="profile-img">
                        <img
                          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS52y5aInsxSm31CvHOFHWujqUx_wWTS9iM6s7BAm21oEN_RiGoog"
                          alt=""
                        />
                      </div>
                    </div>
                  </div>

                  <br />
                  <div className="row" style={{ marginLeft: "43px" }}>
                    <div className="col-md-4">
                      <input type="file"></input>
                    </div>

                    <div className="col-md-4" style={{ marginLeft: "23px" }}>
                      <input type="file"></input>
                    </div>
                  </div>

                  <br />

                  <div className="col-md-8">
                    <div className="tab-content profile-tab" id="myTabContent">
                      <div
                        className="tab-pane fade show active"
                        id="home"
                        role="tabpanel"
                        aria-labelledby="home-tab"
                      >
                        <div className="row" style={{ marginLeft: "3.5%" }}>
                          <div className="col-md-6">
                            <label>Name</label>
                          </div>
                          <div className="col-md-6">
                            <input
                              type="text"
                              className="type"
                              value="ABCD"
                              disabled
                            ></input>
                          </div>
                        </div>
                        <div className="row" style={{ marginLeft: "2%" }}>
                          <div className="col-md-6">
                            <label>Email</label>
                          </div>
                          <div className="col-md-6">
                            <input type="text" value="Nishit"></input>
                          </div>
                        </div>
                        <div className="row" style={{ marginLeft: "2%" }}>
                          <div className="col-md-6">
                            <label>Phone</label>
                          </div>
                          <div className="col-md-6">
                            <input
                              type="text"
                              className="type"
                              value="kshitighelani@gmail.com"
                            ></input>
                          </div>
                        </div>
                        <div className="row" style={{ marginLeft: "2%" }}>
                          <div className="col-md-6">
                            <label>Restaurant Name</label>
                          </div>
                          <div className="col-md-6">
                            <input
                              type="text"
                              className="type"
                              value="XYZ"
                            ></input>
                          </div>
                        </div>
                        <div className="row" style={{ marginLeft: "7%" }}>
                          <div className="col-md-6">
                            <label>Restaurant Zip code</label>
                          </div>
                          <div className="col-md-6">
                            <input
                              type="text"
                              className="type"
                              value="hi there"
                              style={{ width: "max-content" }}
                            ></input>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-2">
                    <input
                      type="submit"
                      className="profile-edit-btn"
                      name="btnAddMore"
                      value="Edit Profile"
                    ></input>
                  </div>
                </form>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
//export Login Component
export default Login;
