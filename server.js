var faker = require("faker");
var express = require("express");
var bodyParser = require("body-parser");

var app = express();
app.use(bodyParser.json());


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

app.get("/api/demo", function (req, res) {

  let idStart = faker.random.number();
  let FirstName = faker.name.firstName();
  let LastName = faker.name.lastName();
  let card = faker.helpers.createCard();
  card.id = idStart++;
  card.name = `${FirstName} ${LastName}`
  card.email = faker.internet.email(FirstName, LastName);
  card.username = faker.internet.userName(FirstName, LastName);
  delete card.accountHistory;
  delete card.posts;


  res.status(200).json(card);

});

app.get("/api/demo/all", function (req, res) {

  let total = faker.random.number(20);

  let idStart = faker.random.number();

  let array = [];

  for (let index = 0; index < total; index++) {
    let FirstName = faker.name.firstName();
    let LastName = faker.name.lastName();
    let card = faker.helpers.createCard();
    card.id = idStart++;
    card.name = `${FirstName} ${LastName}`
    card.email = faker.internet.email(FirstName, LastName);
    card.username = faker.internet.userName(FirstName, LastName);
    delete card.accountHistory;
    delete card.posts;

    array.push(card);
  }

  res.status(200).json(array);

});

app.post("/api/contacts", function (req, res) {});

/*  "/api/contacts/:id"
 *    GET: find contact by id
 *    PUT: update contact by id
 *    DELETE: deletes contact by id
 */

app.get("/api/contacts/:id", function (req, res) {});

app.put("/api/contacts/:id", function (req, res) {});

app.delete("/api/contacts/:id", function (req, res) {});
