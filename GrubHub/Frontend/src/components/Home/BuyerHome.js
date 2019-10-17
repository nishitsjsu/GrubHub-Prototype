import React, { Component } from "react";
import { Link } from "react-router-dom";

class BuyerHome extends Component {

    constructor(props) {
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            itemname: "",
            authFlag: false
        };
        //Bind the handlers to this class
        this.itemnameChangeHandler = this.itemnameChangeHandler.bind(this);
    }


    itemnameChangeHandler = e => {
        this.setState({
            itemname: e.target.value
        });
    };

    render() {
        return (
            <div>
                <br />
                <div class="container">
                    <form>
                        <div className="rw">

                            <div style={{ width: "30%" }} class="form-group">
                                <input
                                    onChange={this.itemnameChangeHandler}
                                    type="text"
                                    class="form-control"
                                    name="itemname"
                                    placeholder="Item Name"
                                    required
                                />
                            </div>

                            <div style={{ width: "30%" }}>
                                <Link to={`/viewrestaurants/${this.state.itemname}`} ><button class="btn btn-success" type="submit">Search</button></Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}


export default BuyerHome;
