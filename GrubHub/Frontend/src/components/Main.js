import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Login from "./Login/Login";
import Home from "./Home/Home";
import Navbar from "./LandingPage/Navbar";
import BuyerSignup from "./Signup/BuyerSignup";
import OwnerSignup from "./Signup/OwnerSignup";
import BuyerProfile from "./Profile/BuyerProfile";
import OwnerProfile from "./Profile/OwnerProfile";
import OwnerHome from "./Home/OwnerHome";
import OwnerDetails from "./Home/OrderDetails";
import Test from "./Test/Test";
import OrderDetails from "./Home/OrderDetails";
import OwnerSection from "./Sections/OwnerSection";
import SectionDetails from "./Sections/SectionDetails";
import SectionDetailsData from "./Sections/SectionDetailsData";
import AddItem from "./Sections/AddItem";
import OwnerMenu from "./Menu/OwnerMenu";
import BuyerHome from "./Home/BuyerHome";
import ViewRestaurants from "./Home/ViewRestaurants";
import BuyerMenu from "./Menu/BuyerMenu";
import ViewCart from "./Cart/ViewCart";
import BuyerPastOrders from "./Orders/BuyerPastOrders";
import BuyerFutureOrders from "./Orders/BuyerFutureOrders";
import OwnerOldOrders from "./Orders/OwnerOldOrders";
import AddSection from "./Sections/AddSection";
import OwnerMessage from "./Message/OwnerMessage";
import BuyerViewMessage from "./Message/BuyerViewMessage";
import OwnerViewMessage from "./Message/OwnerViewMessage";
import BuyerMessage from "./Message/BuyerMessage";


//Create a Main Component
class Main extends Component {
  render() {
    return (
      <div>
        {/*Render Different Component based on Route*/}

        <Route path="/" component={Navbar} />
        <Route path="/login" component={Login} />
        <Route path="/home" component={Home} />
        <Route path="/buyersignup" component={BuyerSignup} />
        <Route path="/ownersignup" component={OwnerSignup} />
        <Route path="/buyerprofile" component={BuyerProfile} />
        <Route path="/ownerprofile" component={OwnerProfile} />
        <Route path="/ownerhome" component={OwnerHome} />
        <Route path="/orderdetails/:bookid" component={OrderDetails} />
        <Route path="/sectiondetails/:sectionid" component={SectionDetails} />
        <Route path="/sectiondetailsdata" component={SectionDetailsData} />
        <Route path="/ownersection" component={OwnerSection} />
        <Route path="/test" component={Test} />
        <Route path="/additem/:sectionid" component={AddItem} />
        <Route path="/ownermenu" component={OwnerMenu} />
        <Route path="/buyerhome" component={BuyerHome} />
        <Route path="/viewrestaurants/:itemname" component={ViewRestaurants} />
        <Route path="/buyermenu/:restaurantid" component={BuyerMenu} />
        <Route path="/viewcart" component={ViewCart} />
        <Route path="/buyerpastorders" component={BuyerPastOrders} />
        <Route path="/buyerfutureorders" component={BuyerFutureOrders} />
        <Route path="/owneroldorders" component={OwnerOldOrders} />
        <Route path="/addsection" component={AddSection} />
        <Route path="/ownermessage/:buyeremail/:buyername/:owneremail/:restaurant/:orderid" component={OwnerMessage} />
        <Route path="/buyerviewmessage" component={BuyerViewMessage} />
        <Route path="/ownerviewmessage" component={OwnerViewMessage} />
        <Route path="/buyermessage/:owneremail/:restaurant/:orderid" component={BuyerMessage} />

      </div>
    );
  }
}
//Export The Main Component
export default Main;
