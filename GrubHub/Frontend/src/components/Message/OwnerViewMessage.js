import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import { Link } from "react-router-dom";
import { Redirect } from 'react-router';
import { connect } from "react-redux";
import ownermessageFetch_function from "../Action/OwnerViewMessageAction"
import OrderData from "../Extra/OrderData";
import Draggable from "react-draggable";
import Pagination from "../Pagination"

class OwnerViewMessage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            authFlag: false,
            orders: [],
            emailcookie: cookie.load("email"),
            restaurantcookie: cookie.load("restaurant"),
            currenPage: 1,
            sectionsPerPage: 1,
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

        this.props.ownermessageFetch_function(emailcookie);
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
                        <td>{order.orderid}</td>
                        {/* <td>{order.restaurant}</td> */}
                        <td>{order.message}</td>
                        <td>{order.sender}</td>
                        <td><Link to={`/ownermessage/${order.sender}/${order.sender}/${this.state.emailcookie}/${this.state.restaurantcookie}/${order.orderid}`} ><button className="btn btn-primary">Message Buyer</button></Link></td>
                    </tr>
                </Draggable >
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
                    <h2>List of All Messages</h2>
                    <table class="table table-bordered table-hover" style={{ textAlign: "left", backgroundColor: "#fafafa" }}>
                        <thead class="thead-dark" style={{ textAlign: "center" }}>
                            <tr>
                                <th>Order ID</th>
                                {/* <th>Restaurant</th> */}
                                <th>Message</th>
                                <th>Sender</th>
                                <th>Reply</th>
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
// export default BuyerViewMessage;

function mapStateToProps(state) {
    console.log("in map state traveler_propfile", state);
    return {

        orders: state.OwnerMessageViewReducer.orders,
        authFlag: state.OwnerMessageViewReducer.authFlag,

    };
}

const mapDispachToProps = dispatch => {
    return {
        ownermessageFetch_function: (emailcookie) => dispatch(ownermessageFetch_function(emailcookie)),
    };
};

export default connect(
    mapStateToProps,
    mapDispachToProps
)(OwnerViewMessage);