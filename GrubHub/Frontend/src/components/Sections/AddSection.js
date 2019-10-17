import React, { Component } from "react";
import "../Profile/op.css";
import axios from "axios";
import cookie from "react-cookies";
import { Redirect } from "react-router";

//Define a Login Component
class AddSection extends Component {
    //call the constructor method
    constructor(props) {
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            sectionname: "",
            msg: "",
            idcookie: cookie.load("id"),
            authFlag: false
        };
        //Bind the handlers to this class
        this.sectionnameChangeHandler = this.sectionnameChangeHandler.bind(this);
        this.submitAdd = this.submitAdd.bind(this);
    }
    //Call the Will Mount to set the auth Flag to false
    componentWillMount() {
        this.setState({
            authFlag: false
        });
    }
    //username change handler to update state variable with the text entered by the user
    sectionnameChangeHandler = e => {
        this.setState({
            sectionname: e.target.value
        });
    };

    //submit Login handler to send a request to the node backend
    submitAdd = e => {
        var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();
        const data = {
            sectionname: this.state.sectionname,
            idcookie: this.state.idcookie

        };

        console.log(data)
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post("http://localhost:3001/addsection", data).then(response => {
            console.log("Status Code : ", response.status);
            if (response.status === 200) {
                console.log("Item added successfully")
                this.setState({
                    msg: "Section has been added successfully!",
                    authFlag: true
                });
                window.location.replace(`/ownersection`)
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
                        <form onSubmit>
                            <input
                                onChange={this.sectionnameChangeHandler}
                                type="text"
                                id="sectionname"
                                class="fadeIn second"
                                name="sectionname"
                                placeholder="Section Name"

                            />
                            <input type="submit" onClick={this.submitAdd} class="fadeIn fourth" value="Add Section!" />
                        </form>


                    </div>
                </div>
                <br />
                <label>{this.state.msg}</label>
            </div >
        );
    }
}
//export Login Component
export default AddSection;
