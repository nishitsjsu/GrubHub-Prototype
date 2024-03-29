import React, { Component } from "react";
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import { Link } from "react-router-dom";
import { Redirect } from 'react-router';
import { connect } from "react-redux";
import viewrestaurantsFetch_function from "../Action/ViewRestaurantsAction"
import ViewRestaurantsData from "../Extra/ViewRestaurantsData"
import Pagination from "../Pagination"

class ViewRestaurants extends Component {

    constructor(props) {
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            itemname: "",
            search: "",
            items: [],
            // description: "",
            // price: "",
            // sectionid: this.props.match.params.sectionid,
            // imagePath: "http://localhost:3001/profilepics/d.jpeg",
            // itemimage: "",
            authFlag: false,
            currenPage: 1,
            sectionsPerPage: 4,
        };
        //Bind the handlers to this class
        this.itemnameChangeHandler = this.itemnameChangeHandler.bind(this);
        // this.descriptionChangeHandler = this.descriptionChangeHandler.bind(this);
        this.selectChangeHandler = this.selectChangeHandler.bind(this);
        //this.submitSearch = this.submitSearch.bind(this);
    }


    componentWillReceiveProps(nextProps) {

        console.log("in will recieve props for details", nextProps);
        this.setState({
            authFlag: nextProps.authFlag,
            items: nextProps.items,
        })
    }

    //Call the Will Mount to set the auth Flag to false
    componentWillMount() {
        this.setState({
            authFlag: false
        });
    }


    selectChangeHandler = e => {
        this.setState({
            search: e.target.value.substr(0, 20)

        });
        console.log(" change 0]" + this.state.cuisine)
    };


    itemnameChangeHandler = e => {
        this.setState({
            itemname: e.target.value
        });
    };

    componentDidMount() {
        console.log("Cuisine " + this.state.cuisine)
        var itemname = this.props.match.params.itemname;
        // axios.get('http://localhost:3001/viewrestaurants', {
        //     params: {
        //         itemname: this.props.match.params.itemname,
        //         // cuisine: this.state.cuisine
        //     }
        // })
        //     .then((response) => {
        //         console.log("Received response")
        //         //update the state with the response data
        //         this.setState({

        //             items: this.state.items.concat(response.data)
        //         });
        //     });
        this.props.viewrestaurantsFetch_function(itemname);
    }


    submitFilter = e => {
        window.location.reload();
    };

    render() {


        let predetails = this.state.items.filter((item) => {
            return item.cuisine.indexOf(this.state.search) != -1
        })

        const indexOfLastSection = this.state.currenPage * this.state.sectionsPerPage;
        const indexOfFirstSection = indexOfLastSection - this.state.sectionsPerPage;
        const currenSections = predetails.slice(indexOfFirstSection, indexOfLastSection);

        const paginate = (pageNumber) => {
            this.setState({
                currenPage: pageNumber
            })
        }

        let details = currenSections.map(item => {
            return (
                <tr>
                    <ViewRestaurantsData key={Math.random} data={item}></ViewRestaurantsData>
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

        let options = this.state.items.map((data) =>
            <option
                key={data.cuisine}
                value={data.cuisine}
            >
                {data.cuisine}
            </option>
        );

        return (

            <div>
                {/* {redirectVar} */}
                <div class="container">
                    <h2>List of All Restaurants</h2>
                    <table class="table table-bordered table-hover" style={{ textAlign: "left", backgroundColor: "#fafafa" }}>
                        <thead class="thead-dark" style={{ textAlign: "center" }}>
                            <tr>
                                <th>Restaurant Name</th>
                                <th>Cuisine</th>
                                <th>Action</th>
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




                    <br />

                    <input type="text" placeholder="Type here to filter content based on cuisine" onChange={this.selectChangeHandler}></input>

                    <Pagination postsPerPage={this.state.sectionsPerPage} totalPosts={predetails.length} paginate={paginate} />


                </div>

            </div>
        );
    }
}


// export default BuyerHome;


function mapStateToProps(state) {
    console.log("in map state traveler_propfile", state);
    return {

        items: state.ViewRestaurantsReducer.items,
        authFlag: state.ViewRestaurantsReducer.authFlag,

    };
}

const mapDispachToProps = dispatch => {
    return {
        viewrestaurantsFetch_function: (itemname) => dispatch(viewrestaurantsFetch_function(itemname)),
    };
};

export default connect(
    mapStateToProps,
    mapDispachToProps
)(ViewRestaurants);


