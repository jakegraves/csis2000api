var faker = require("faker");
var express = require("express");
var bodyParser = require("body-parser");

var app = express();
app.use(bodyParser.json());

app.use(express.static(__dirname + "/public"));

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

 const AccessTokens = [
  '76e994ad-fac7-4cc7-b41a-0d11e0920882',
  '5d067f80-cbcb-40a0-828e-8ad86374ea34',
  '686b4c6f-589d-4feb-8e60-088ea214f8d0',
  'e745d685-dad8-4202-9fc0-38494d846d33',
  '05bd690d-43ae-4a17-8ccc-cd94eed9d8fb',
  'f10399ff-9d4b-40e8-af6d-c7bbb38785f3',
  '9f4fd9dc-fcb0-4bbf-b955-cb749a97f2e0',
  'a590f1cf-8697-4274-977c-98fde123e240',
  'fa819634-a351-4591-a090-442d99958c3c',
  '14e84528-434e-43f2-8f52-55fe61f3e9e1',
  'dfe548d0-50ed-4f0b-880b-81a680624063',
  '38b6eb34-f5ac-4a9c-b3cd-2ec293d8272f',
  '5f411f9b-2d40-44e9-8264-cee70d856271',
  'bd6352e2-806b-4fd4-965d-55b41fce86b5',
  '3d023969-c5e4-4519-9fe9-5b4ca75a8f8d',
  '32e85e5f-c3c0-4b8b-8b29-597389fb7545',
  'f1de90e5-2bb3-4011-9570-3d173001308b',
  '05176834-fd09-4c78-9d10-f359d986bce1',
  '89b0775e-494b-4643-a50c-09a5d42e7b5f',
  '85b0ac6f-b22a-433f-9e8d-f8ecbe484b1f',
  '9e8e6999-222c-47d8-b004-341f00c98fd6',
  '8571a488-3ff1-431d-bd63-8a65115ed205',
  'dd0afe7f-d177-4bf1-8244-2edd367af45e',
  '4cdf5b86-e373-49d7-8437-0a9a22ec29c8',
  '5aad7af3-72c9-4d44-8f6b-5e9d38536e94',
  '47f4ca4a-f555-480d-9afc-ba7044e289df',
  '53d966aa-7441-4dc7-8e82-2daeca4a807c',
  'd908da74-05e8-4e73-a265-1db329d970f2',
  'a21baf75-dbdc-45fb-98dd-d71cbde9d9cd',
  '5d7e0735-c28f-49a1-b31f-f5fda11bd474'
]

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
    return card;
 }

 app.get("/login", function (req, res) {

  const username = req.UserName;
  const password = req.Password;

  if(username !== 'admin' && password !== 'icannottellyou') {
    res.status(401).json('Username or Password not found.');
    return;
  }

  const token = {AccessToken: AccessTokens[faker.random.number({max: AccessTokens.length, min: 0})]}

  res.status(200).json(token);

});

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

function getTransaction(id) {
  let transaction = faker.helpers.createTransaction();
  transaction.amount = `$${transaction.amount}`;
  transaction.id = id;
  transaction.purchaseImageUrl = faker.image.imageUrl(300, 300);
  return transaction;
}

app.get("/transactions", function (req, res) {

  let total = faker.random.number({max:20, min:2});

  let idStart = faker.random.number();

  let array = [];

  for (let i = 0; i < total; i++) {
    array.push(getTransaction(idStart++));
  }

  res.status(200).json(array);

});

function getAccount(id) {
  let firstName = faker.name.firstName();
  let lastName = faker.name.lastName();

  return {
    id,
    accountName: faker.finance.accountName(),
    accountNumber: faker.finance.account(),
    amount: faker.finance.amount(1111, 999999, undefined, "$"),
    owner: `${firstName} ${lastName}`,
    ownerPhone: faker.phone.phoneNumberFormat(),
    ownerEmail: faker.internet.email(firstName, lastName),
    ownerImageUrl: faker.image.people(300,300)
  }

}


app.get("/accounts", function (req, res) {

  let total = faker.random.number({max:20, min:2});

  let idStart = faker.random.number();

  let array = [];

  for (let i = 0; i < total; i++) {
    array.push(getAccount(idStart++));
  }

  res.status(200).json(array);

});

function getComputers(id) {
  let firstName = faker.name.firstName();
  let lastName = faker.name.lastName();

  return {
    id,
    userName: faker.internet.userName(firstName, lastName),
    ip: faker.internet.ip(),
    ipv6: faker.internet.ipv6(),
    macAddress: faker.internet.mac(),
    userAgent: faker.internet.userAgent(),
    password: faker.internet.password(),
    locationUrl: faker.image.city(300,300)
  }

}


app.get("/computers", function (req, res) {

  let total = faker.random.number({max:20, min:2});

  let idStart = faker.random.number();

  let array = [];

  for (let i = 0; i < total; i++) {
    array.push(getComputers(idStart++));
  }

  res.status(200).json(array);

});
