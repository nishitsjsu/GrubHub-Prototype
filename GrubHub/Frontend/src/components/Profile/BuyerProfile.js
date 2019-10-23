import React, { Component } from "react";
import "./op.css";
import axios from "axios";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import { connect } from "react-redux";
import dataFetch_function from "../Action/BuyerProfileAction"
import dataUpdate_function from "../Action/BuyerProfileUpdateAction";

//Define a Login Component
class BuyerProfile extends Component {
  //call the constructor method
  constructor(props) {
    //Call the constrictor of Super class i.e The Component
    super(props);
    //maintain the state required for this component
    this.state = {
      username: "",
      email: "",
      phone: "",
      imagePath: "",
      emailcookie: cookie.load("email"),
      authFlag: false
    };
    //Bind the handlers to this class
    this.usernameChangeHandler = this.usernameChangeHandler.bind(this);
    this.emailChangeHandler = this.emailChangeHandler.bind(this);
    this.phoneChangeHandler = this.phoneChangeHandler.bind(this);
    this.submitUpdate = this.submitUpdate.bind(this);
  }

  componentWillReceiveProps(nextProps) {

    console.log("in will recieve props for details", nextProps);
    this.setState({
      username: nextProps.username,
      email: nextProps.email,
      phone: nextProps.phone,
      imagePath: "http://localhost:3001/profilepics/" + nextProps.profileimage + ""
    })
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
  emailChangeHandler = e => {
    this.setState({
      email: e.target.value
    });
  };

  phoneChangeHandler = e => {
    this.setState({
      phone: e.target.value
    });
  };
  //submit Login handler to send a request to the node backend
  submitUpdate = e => {
    var headers = new Headers();
    //prevent page from refresh
    e.preventDefault();
    const data = {
      username: this.state.username,
      email: this.state.email,
      phone: this.state.phone,
      emailcookie: this.state.emailcookie


    };
    //set the with credentials to true
    // axios.defaults.withCredentials = true;
    // //make a post request with the user data
    // axios.post("http://localhost:3001/buyerprofile", data).then(response => {
    //   console.log("Status Code : ", response.status);
    //   if (response.status === 200) {
    //     this.setState({
    //       authFlag: true
    //     });
    //   } else {
    //     this.setState({
    //       authFlag: false
    //     });
    //   }
    // });
    this.props.dataUpdate_function(data)
  };


  componentDidMount() {

    var emailcookie = this.state.emailcookie;

    this.props.dataFetch_function(emailcookie)

    // axios.get('http://localhost:3001/buyerprofile', {
    //   params: {
    //     emailcookie: this.state.emailcookie
    //   }
    // })
    //   .then((response) => {
    //     console.log(response.data)

    //     this.setState({
    //       username: response.data.username,
    //       email: response.data.email,
    //       phone: response.data.phone,
    //       imagePath: "http://localhost:3001/profilepics/" + response.data.profileimage + ""


    //     })
    //update the state with the response data
    // this.setState({
    //   books: this.state.books.concat(response.data)
    // });
    // });
  }

  //Image change handler
  imageChangeHandler = e => {
    // console.log('image change handle name: ' + e.target.name)
    // console.log('image change handle value: ' + e.target.files[0])
    this.setState({
      file: e.target.files[0]
    })
  }

  //Upoad image function:

  uploadImage = e => {
    e.preventDefault()
    // var headers = new Headers();
    const formData = new FormData()
    console.log(this.state.file.name)
    // var imagedata = document.querySelector('input[type="file"]').files[0];
    formData.append('myImage', this.state.file, this.state.file.name)
    formData.append('emailcookie', this.state.emailcookie)
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }
    axios
      .post('http://localhost:3001/buyerprofileuploadimage', formData, config)
      .then(response => {
        console.log('The file is successfully uploaded')
        console.log(response.data.filename)
        this.setState({
          imagePath: "http://localhost:3001/profilepics/" + response.data.filename + ""

        })
      })
      .catch(error => { })
    // prevent page from refresh
  }

  render() {
    //redirect based on successful login
    let redirectVar = null;
    if (cookie.load("cookie")) {
      redirectVar = <Redirect to="/home" />;
    }
    return (
      <div>
        {/* {redirectVar} */}
        <div class="row">
          <div className="profile-img">

            <div class="col-md-10.5">
              <img
                // src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS52y5aInsxSm31CvHOFHWujqUx_wWTS9iM6s7BAm21oEN_RiGoog"
                src={this.state.imagePath}
                id="icon"
                style={{ WebkitBorderRadius: "50%" }}
                alt="User Icon"
              />
            </div>
          </div>
        </div>


        <br></br>
        <div style={{ marginLeft: "45%" }}><input type="file" onChange={this.imageChangeHandler}></input></div>
        <br></br>
        <form onSubmit={this.uploadImage} enctype='multipart/form-data' style={{ textAlign: "Center" }}>
          <input type="submit" value="Update Picture" />
        </form>
        <div class="wrapper fadeInDown">
          <div id="formContent">
            <form onSubmit>
              <input
                onChange={this.usernameChangeHandler}
                type="text"
                id="username"
                class="fadeIn second"
                name="username"
                placeholder="Username"
                value={this.state.username}
              />
              <input
                onChange={this.emailChangeHandler}
                type="text"
                id="email"
                class="fadeIn second"
                name="email"
                placeholder="Email"
                disabled
                value={this.state.email}
              />

              <input
                onChange={this.phoneChangeHandler}
                type="text"
                id="phone"
                class="fadeIn third"
                name="phone"
                placeholder="Phone Number"
                value={this.state.phone}
              />
              <input type="submit" onClick={this.submitUpdate} class="fadeIn fourth" value="Update Profile!" />
            </form>


          </div>
        </div>
      </div >
    );
  }
}
//export Login Component
// export default Login;

function mapStateToProps(state) {
  console.log("in map state traveler_propfile", state);
  return {
    // authFlag: state.BuyerProfileReducer.authFlag,
    username: state.BuyerProfileReducer.username,
    email: state.BuyerProfileReducer.email,
    phone: state.BuyerProfileReducer.phone,
    profileimage: state.BuyerProfileReducer.profileimage,
    authFlag: state.BuyerProfileUpdateReducer.authFlag,
    //uploadFlag: state.BuyerProfileUploadReducer.uploadFlag,

  };
}

const mapDispachToProps = dispatch => {
  return {
    dataFetch_function: (emailcookie) => dispatch(dataFetch_function(emailcookie)),
    dataUpdate_function: (data) => dispatch(dataUpdate_function(data)),
    // imageUpload_function: (data, config) => dispatch(imageUpload_function(data, config))

  };
};

export default connect(
  mapStateToProps,
  mapDispachToProps
)(BuyerProfile);
