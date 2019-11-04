var connection = new require('./kafka/Connection');
//topics files
//var signin = require('./services/signin.js');
var Books = require('./services/books.js');
var BuyerSignup = require('./services/buyersignup');
var OwnerSignup = require('./services/ownersignup');
var PostOwnerProfile = require('./services/postownerprofile');
var PostBuyerProfile = require('./services/postbuyerprofile');
var GetOwnerProfile = require('./services/getownerprofile');
var GetBuyerProfile = require('./services/getbuyerprofile');
var OwnerHome = require('./services/ownerhome');
var OrderItemDetails = require('./services/orderitemdetails');
var ChangeStatus = require('./services/changestatus');
var OwnerSection = require('./services/ownersection');
var SectionDetails = require('./services/sectiondetails');
var UpdateSectionItems = require('./services/updatesectionitems');
var AddItem = require('./services/additem');
var DeleteSectionItems = require('./services/deletesectionitems');
var AddSection = require('./services/addsection');
var DeleteSection = require('./services/deletesection');
var OwnerOldOrders = require('./services/owneroldorders');
var OwnerMessage = require('./services/ownermessage');
var OwnerViewMessage = require('./services/ownerviewmessage');
var ViewRestaurants = require('./services/viewrestaurants');
var BuyerSection = require('./services/buyersection');
var SectionDetailsBuyer = require('./services/sectiondetailsbuyer');
var AddToCart = require('./services/addtocart');
var ViewCart = require('./services/viewcart');
var CalculateSum = require('./services/calculateSum');
var CartItems = require('./services/cartitems');
var PlaceOrder = require('./services/placeorder');
var BuyerPastOrders = require('./services/buyerpastorders');
var BuyerFutureOrders = require('./services/buyerfutureorders');
var BuyerMessage = require('./services/buyermessage');
var BuyerViewMessage = require('./services/buyerviewmessage');

function handleTopicRequest(topic_name, fname) {
    //var topic_name = 'root_topic';
    var consumer = connection.getConsumer(topic_name);
    var producer = connection.getProducer();
    console.log('server is running ');
    consumer.on('message', function (message) {
        console.log('message received for ' + topic_name + " ", fname);
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);

        fname.handle_request(data.data, function (err, res) {
            console.log('after handle' + res);
            var payloads = [
                {
                    topic: data.replyTo,
                    messages: JSON.stringify({
                        correlationId: data.correlationId,
                        data: res
                    }),
                    partition: 0
                }
            ];
            producer.send(payloads, function (err, data) {
                console.log(data);
            });
            return;
        });

    });
}
// Add your TOPICs here
//first argument is topic name
//second argument is a function that will handle this topic request
// handleTopicRequest("post_book",Books)
handleTopicRequest("buyer_signup", BuyerSignup)
handleTopicRequest("owner_signup", OwnerSignup)
handleTopicRequest("post_ownerprofile", PostOwnerProfile)
handleTopicRequest("post_buyerprofile", PostBuyerProfile)
handleTopicRequest("get_ownerprofile", GetOwnerProfile)
handleTopicRequest("get_buyerprofile", GetBuyerProfile)
handleTopicRequest("ownerhome", OwnerHome)
handleTopicRequest("orderitemdetails", OrderItemDetails)
handleTopicRequest("changestatus", ChangeStatus)
handleTopicRequest("ownersection", OwnerSection)
handleTopicRequest("sectiondetails", SectionDetails)
handleTopicRequest("updatesectionitems", UpdateSectionItems)
handleTopicRequest("additem", AddItem)
handleTopicRequest("deletesectionitems", DeleteSectionItems)
handleTopicRequest("addsection", AddSection)
handleTopicRequest("deletesection", DeleteSection)
handleTopicRequest("owneroldorders", OwnerOldOrders)
handleTopicRequest("ownermessage", OwnerMessage)
handleTopicRequest("ownerviewmessage", OwnerViewMessage)
handleTopicRequest("viewrestaurants", ViewRestaurants)
handleTopicRequest("buyersection", BuyerSection)
handleTopicRequest("sectiondetailsbuyer", SectionDetailsBuyer)
handleTopicRequest("addtocart", AddToCart)
handleTopicRequest("viewcart", ViewCart)
handleTopicRequest("calculateSum", CalculateSum)
handleTopicRequest("cartitems", CartItems)
handleTopicRequest("placeorder", PlaceOrder)
handleTopicRequest("buyerpastorders", BuyerPastOrders)
handleTopicRequest("buyerfutureorders", BuyerFutureOrders)
handleTopicRequest("buyermessage", BuyerMessage)
handleTopicRequest("buyerviewmessage", BuyerViewMessage)

