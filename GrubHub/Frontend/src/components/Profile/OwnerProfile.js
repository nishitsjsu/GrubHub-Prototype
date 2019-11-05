import React, { Component } from "react";
import "./op.css";
import axios from "axios";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import { resolve } from "url";
import { connect } from "react-redux";
import ownerProfile_function from "../Action/OwnerProfileAction";
import owner_dataUpdate_function from "../Action/OwnerProfileUpdateAction";
import rootURL from '../config';

//Define a Login Component
class OwnerProfile extends Component {
  //call the constructor method
  constructor(props) {
    //Call the constrictor of Super class i.e The Component
    super(props);
    //maintain the state required for this component
    this.state = {
      username: "",
      email: "",
      phone: "",
      restaurant: "",
      cuisine: "",
      imagePath: "",
      imagePath1: "",
      emailcookie: cookie.load("email"),
      idcookie: cookie.load("id"),
      authFlag: false
    };
    //Bind the handlers to this class
    this.usernameChangeHandler = this.usernameChangeHandler.bind(this);

    this.emailChangeHandler = this.emailChangeHandler.bind(this);
    this.phoneChangeHandler = this.phoneChangeHandler.bind(this);
    this.restaurantChangeHandler = this.restaurantChangeHandler.bind(this);
    this.cuisineChangeHandler = this.cuisineChangeHandler.bind(this);
    this.submitUpdate = this.submitUpdate.bind(this);
  }

  componentWillReceiveProps(nextProps) {

    console.log("in will recieve props for details", nextProps);
    this.setState({
      username: nextProps.username,
      email: nextProps.email,
      phone: nextProps.phone,
      restaurant: nextProps.restaurant,
      cuisine: nextProps.cuisine,
      imagePath: rootURL + "/profilepics/" + nextProps.imagePath + "",
      imagePath1: rootURL + "/profilepics/" + nextProps.imagePath1 + "",
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

  imageChangeHandler = e => {
    this.setState({
      file: e.target.files[0]
    })
  }

  //submit Login handler to send a request to the node backend
  submitUpdate = e => {
    var headers = new Headers();
    //prevent page from refresh
    e.preventDefault();
    const data = {
      username: this.state.username,
      email: this.state.email,
      phone: this.state.phone,
      restaurant: this.state.restaurant,
      cuisine: this.state.cuisine,
      idcookie: this.state.idcookie,
      emailcookie: this.state.emailcookie
    };
    //set the with credentials to true
    // axios.defaults.withCredentials = true;
    // //make a post request with the user data
    // axios.post("http://localhost:3001/ownerprofile", data).then(response => {
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
    this.props.owner_dataUpdate_function(data)
  };


  componentDidMount() {
    var emailcookie = this.state.emailcookie;
    this.props.ownerProfile_function(emailcookie)
    // axios.get('http://localhost:3001/ownerprofile', {
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
    //       restaurant: response.data.restaurant,
    //       cuisine: response.data.cuisine,
    //       imagePath: "http://localhost:3001/profilepics/" + response.data.profileimage + "",
    //       imagePath1: "http://localhost:3001/profilepics/" + response.data.restaurantimage + ""

    //     })
    //     //update the state with the response data
    //     // this.setState({
    //     //   books: this.state.books.concat(response.data)
    //     // });
    //   });
  }


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
      .post(rootURL + '/ownerprofileuploadprofile', formData, config)
      .then(response => {
        console.log('The file is successfully uploaded')
        console.log(response.data.filename)
        this.setState({
          imagePath: rootURL + "/profilepics/" + response.data.filename + ""

        })
      })
      .catch(error => { })
    // prevent page from refresh
  }

  uploadImage1 = e => {
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
      .post(rootURL + '/ownerprofileuploadrestaurant', formData, config)
      .then(response => {
        console.log('The file is successfully uploaded')
        console.log(response.data.filename)
        this.setState({
          imagePath1: rootURL + "/profilepics/" + response.data.filename + ""

        })
      })
      .catch(error => { })
    // prevent page from refresh
  }



  render() {
    //redirect based on successful login
    // let redirectVar = null;
    // if (cookie.load("cookie")) {
    //   redirectVar = <Redirect to="/home" />;
    // }
    return (
      <div>
        {/* {redirectVar} */}


        <div class="rw">
          <div class="comn">
            <div class="profile-img">
              <img
                // src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS52y5aInsxSm31CvHOFHWujqUx_wWTS9iM6s7BAm21oEN_RiGoog"
                src={this.state.imagePath}
                id="icon"
                style={{ WebkitBorderRadius: "50%" }}
                style={{ marginRight: "-26%" }}
                alt="User Icon"
              />
            </div>
          </div>
          <div class="comn">
            <div class="profile-img">
              <img
                // src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS52y5aInsxSm31CvHOFHWujqUx_wWTS9iM6s7BAm21oEN_RiGoog"
                src={this.state.imagePath1}
                id="icon"
                style={{ WebkitBorderRadius: "50%" }}
                style={{ marginLeft: "-45%" }}
                alt="User Icon"
              />
            </div>
          </div>
        </div>

        <br></br>
        {/* <div style={{ marginLeft: "45%", float: "left" }} ><input type="file"></input></div>
        <div style={{ marginLeft: "45%", float: "left" }}><input type="file"></input></div> */}
        <div className="rw" style={{ marginLeft: "35%", float: "left" }}>
          <div style={{ marginLeft: "9%" }}>
            <input type="file" onChange={this.imageChangeHandler}></input>
          </div>
          <div style={{ marginLeft: "-17%" }} onChange={this.imageChangeHandler}>
            <input type="file"></input>
          </div>
        </div>
        <br /><br />
        <div className="rw" style={{ marginLeft: "35%", float: "left" }}>
          <div style={{ marginLeft: "15%" }}>
            <form onSubmit={this.uploadImage} enctype='multipart/form-data' style={{ textAlign: "Center" }}>
              <button className="btn btn-primary" type="submit" >Upload Proile Image</button>
            </form>
          </div>
          <div style={{ marginLeft: "2%" }}>
            <form onSubmit={this.uploadImage1} enctype='multipart/form-data' style={{ textAlign: "Center" }}>
              <button className="btn btn-primary" type="submit">Upload Restaurant Image</button>
            </form>
          </div>
        </div>

        <div class="wrapper fadeInDown">
          <div id="formContent">
            <form>
              <input
                onChange={this.usernameChangeHandler}
                type="text"
                id="username"
                class="fadeIn second"
                name="username"
                placeholder="Username"
                enabled
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
                placeholder="Phone number"
                value={this.state.phone}
              />
              <input
                onChange={this.restaurantChangeHandler}
                type="text"
                id="restaurant"
                class="fadeIn third"
                name="restaurant"
                placeholder="Restaurant Name"
                value={this.state.restaurant}
              />
              <input
                onChange={this.cuisineChangeHandler}
                type="text"
                id="cuisine"
                class="fadeIn third"
                name="cuisine"
                placeholder="Cuisine"
                value={this.state.cuisine}
              />
              <input onClick={this.submitUpdate} type="button" class="fadeIn fourth" value="Update!" />
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
    // authFlag: state.OwnerProfileReducer.authFlag,
    username: state.OwnerProfileReducer.username,
    email: state.OwnerProfileReducer.email,
    phone: state.OwnerProfileReducer.phone,
    restaurant: state.OwnerProfileReducer.restaurant,
    cuisine: state.OwnerProfileReducer.cuisine,
    imagePath: state.OwnerProfileReducer.imagePath,
    imagePath1: state.OwnerProfileReducer.imagePath1,
    authFlag: state.OwnerProfileUpdateReducer.authFlag,
    //uploadFlag: state.BuyerProfileUploadReducer.uploadFlag,

  };
}

const mapDispachToProps = dispatch => {
  return {
    ownerProfile_function: (emailcookie) => dispatch(ownerProfile_function(emailcookie)),
    owner_dataUpdate_function: (data) => dispatch(owner_dataUpdate_function(data)),
    // imageUpload_function: (data, config) => dispatch(imageUpload_function(data, config))

  };
};

export default connect(
  mapStateToProps,
  mapDispachToProps
)(OwnerProfile);