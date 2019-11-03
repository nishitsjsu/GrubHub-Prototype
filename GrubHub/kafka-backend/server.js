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
