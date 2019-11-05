import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import buyerfutureordersFetch_function from "../Action/BuyerFutureOrdersAction"
import { Redirect } from 'react-router';
import OrderData from "../Extra/OrderData"
import Draggable from "react-draggable";
import Pagination from "../Pagination"

class BuyerFutureOrders extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orders: [],
            idcookie: cookie.load("id"),
            emailcookie: cookie.load("email"),
            authFlag: false,
            currenPage: 1,
            sectionsPerPage: 2,
            activeDrags: 0,
            deltaPosition: {
                x: 0, y: 0
            },
            controlledPosition: {
                x: -400, y: 200
            }
        }

    }


    handleDrag = (e, ui) => {
        const { x, y } = this.state.deltaPosition;
        this.setState({
            deltaPosition: {
                x: x + ui.deltaX,
                y: y + ui.deltaY,
            }
        });
    };

    onStart = () => {
        this.setState({ activeDrags: ++this.state.activeDrags });
    };

    onStop = () => {
        this.setState({ activeDrags: --this.state.activeDrags });
    };

    // For controlled component
    adjustXPos = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const { x, y } = this.state.controlledPosition;
        this.setState({ controlledPosition: { x: x - 10, y } });
    };

    adjustYPos = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const { controlledPosition } = this.state;
        const { x, y } = controlledPosition;
        this.setState({ controlledPosition: { x, y: y - 10 } });
    };

    onControlledDrag = (e, position) => {
        const { x, y } = position;
        this.setState({ controlledPosition: { x, y } });
    };

    onControlledDragStop = (e, position) => {
        this.onControlledDrag(e, position);
        this.onStop();
    };



    componentWillReceiveProps(nextProps) {

        console.log("in will recieve props for details", nextProps);
        this.setState({
            authFlag: nextProps.authFlag,
            orders: nextProps.orders,
        })
    }

    //Call the Will Mount to set the auth Flag to false
    componentWillMount() {
        this.setState({
            authFlag: false
        });
    }

    //get the orders data from backend  
    componentDidMount() {

        var emailcookie = this.state.emailcookie;
        this.props.buyerfutureordersFetch_function(emailcookie)
        // axios.get('http://localhost:3001/buyerfutureorders', {
        //     params: {
        //         idcookie: this.state.idcookie,
        //         emailcookie: this.state.emailcookie,
        //     }
        // })
        //     .then((response) => {
        //         console.log("Received response")
        //         //update the state with the response data
        //         this.setState({

        //             orders: this.state.orders.concat(response.data)
        //         });
        //     });
    }



    render() {

        const indexOfLastSection = this.state.currenPage * this.state.sectionsPerPage;
        const indexOfFirstSection = indexOfLastSection - this.state.sectionsPerPage;
        const currenSections = this.state.orders.slice(indexOfFirstSection, indexOfLastSection);

        const paginate = (pageNumber) => {
            this.setState({
                currenPage: pageNumber
            })
        }

        const dragHandlers = { onStart: this.onStart, onStop: this.onStop };
        const { deltaPosition, controlledPosition } = this.state;

        //iterate over orders to create a table row
        let details = currenSections.map(order => {
            return (
                // <tr>
                //     <OrderData key={Math.random} data={order}></OrderData>
                // </tr>
                <Draggable {...dragHandlers}>
                    <tr key="index">
                        <td>{order._id}</td>
                        <td>{order.restaurant}</td>
                        <td>{order.status}</td>
                        <td><td><Link to={`/buyermessage/${order.owneremail}/${order.restaurant}/${order._id}`} ><button className="btn btn-primary">Message Restaurant</button></Link></td></td>
                    </tr>
                </Draggable>
            )
        })
        //if not logged in go to login page
        let redirectVar = null;
        // if (!cookie.load('cookie')) {
        //     redirectVar = <Redirect to="/login" />
        // }
        return (
            <div>
                {/* {redirectVar} */}
                <div class="container">
                    <h2>List of All Future Orders</h2>
                    <table class="table table-bordered table-hover" style={{ textAlign: "left", backgroundColor: "#fafafa" }}>
                        <thead class="thead-dark" style={{ textAlign: "center" }}>
                            <tr>
                                <th>Order ID</th>
                                <th>Restaurant</th>
                                <th>Status</th>
                                <th>Messages</th>

                            </tr>
                        </thead>
                        <tbody>
                            {/*Display the Tbale row based on data recieved*/}
                            {details}
                        </tbody>
                    </table>
                    <Pagination postsPerPage={this.state.sectionsPerPage} totalPosts={this.state.orders.length} paginate={paginate} />
                </div>

            </div>

        )
    }
}
//export Home Component
// export default BuyerFutureOrders;

function mapStateToProps(state) {
    console.log("in map state traveler_propfile", state);
    return {

        orders: state.BuyerFutureOrdersReducer.orders,
        authFlag: state.BuyerFutureOrdersReducer.authFlag,

    };
}

const mapDispachToProps = dispatch => {
    return {
        buyerfutureordersFetch_function: (emailcookie) => dispatch(buyerfutureordersFetch_function(emailcookie)),
    };
};

export default connect(
    mapStateToProps,
    mapDispachToProps
)(BuyerFutureOrders);