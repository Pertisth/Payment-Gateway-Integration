const name1 = $(".name").text().toString();
const email =$(".email").text().toString();
const amount = $(".amount").text();
const id = document.getElementsByClassName("id").value;
const number = $(".mobNum").text().toString();

const amt = parseInt(amount)*100;
const actualAmt = amt.toString();



var options = {
    "key": "rzp_test_6vy99WxD93XUcz", // Enter the Key ID generated from the Dashboard
    "amount": actualAmt, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    "currency": "INR",
    "name": "Donation Camp",
    "description": "Test Transaction",
    "image": "https://www.thesparksfoundationsingapore.org/images/logo_small.png",
    "order_id": id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
    "callback_url": "https://damp-crag-13146.herokuapp.com/confirmation",  //https://eneqd3r9zrjok.x.pipedream.net/
    "prefill": {
        "name": name1,
        "email": email,
        "contact": number
    },
    "notes": {
        "address": "Razorpay Corporate Office"
    },
    "theme": {
        "color": "#3399cc"
    },
    "modal": {
        "ondismiss": function(e){
            alert("Payment Failed");
            e.preventDefault();
        }
    }
};
var rzp1 = new Razorpay(options);
document.getElementById('rzp-button1').onclick = function(e){
    rzp1.open();
    e.preventDefault();
}