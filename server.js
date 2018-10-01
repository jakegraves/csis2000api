var faker = require("faker");
var express = require("express");
var bodyParser = require("body-parser");

var app = express();
app.use(bodyParser.json());

app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});
var server = app.listen(process.env.PORT || 8080, function () {
  var port = server.address().port;
  console.log("App now running on port", port);
});

function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({
    "error": message
  });
}

/*  "/api/contacts"
 *    GET: finds all contacts
 *    POST: creates a new contact
 */

 function getUserCard(id){
    let FirstName = faker.name.firstName();
    let LastName = faker.name.lastName();
    let address = faker.address;
    let card = faker.helpers.createCard();

    card.address = `${address.streetAddress(true)}, ${address.city()}, ${address.state()}, ${address.zipCode()}`
    card.avatar = faker.image.avatar();
    card.id = id;
    card.name = `${FirstName} ${LastName}`
    card.email = faker.internet.email(FirstName, LastName);
    card.username = faker.internet.userName(FirstName, LastName);
    card.company = faker.company.companyName();

    delete card.accountHistory;
    delete card.posts;
    return card
 }

app.get("/demo", function (req, res) {

  let id = faker.random.number();
  res.status(200).json(getUserCard(id));

});

app.get("/demo/all", function (req, res) {

  let total = faker.random.number({max:20, min:2});

  let idStart = faker.random.number();

  let array = [];

  for (let i = 0; i < total; i++) {
    array.push(getUserCard(idStart++));
  }

  res.status(200).json(array);

});
