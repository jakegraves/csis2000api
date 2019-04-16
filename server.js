var faker = require("faker");
var express = require("express");
var bodyParser = require("body-parser");
var fs = require("fs");


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

app.get('/public/:fileId', function(req, res){
  authCheck(req, res);

  const fileId = req.params.fileId;
  console.log(fileId);
  fs.readFile(`./public/${fileId}`, function (err,data){
    res.contentType("image/jpg");
    res.status(200).send(data);
  });
});

app.delete('/public/:fileId', function(req, res){
  authCheck(req, res);

  const fileId = req.params.fileId;
  console.log(fileId);
  fs.exists(`./public/${fileId}`, function (err,data){
    fs.unlink(`./public/${fileId}`, err => {
      if (err) throw err;
      res.status(204).send();
    });
  });
});

app.post('/public', function (req, res) {
  authCheck(req, res);

  var data = Buffer.from('')
  req.on('data', function (chunk) {
    data = Buffer.concat([data, chunk]);
  });
  req.on('end', function () {
    done(res, data);
  });
});

function done(res, buffer) {
  var length;
  fs.readdir('./public', (err, files) => {
    length = files.length
    fs.writeFile(`./public/${length}`, buffer, function (err) {
      if (err) {
        console.log(err)
      }
      res.status(201).json(`public/${length}`);
    });
  });
}


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

const COMPANY_ID = 78903;

function getUserCard(id) {
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

app.post("/login", function (req, res) {

  const username = req.body.UserName;
  const password = req.body.Password;

  if (username !== 'admin' && password !== 'icannottellyou') {
    res.status(401).json('Username or Password not found.');
    return;
  }

  const token = {
    AccessToken: AccessTokens[faker.random.number({
      max: AccessTokens.length,
      min: 0
    })],
    CompanyId: COMPANY_ID
  }

  res.status(200).json(token);

});

app.get("/companies/:companyId", function (req, res) {

  authCheck(req, res);

  let id = parseInt(req.params.companyId, 10);

  if (id !== COMPANY_ID) {
    res.status(400).json("Not found.");
  }

  res.status(200).json(getUserCard(id));

});

app.get("/companies/:companyId/images", function (req, res) {

  authCheck(req, res);

  let id = parseInt(req.params.companyId, 10);

  if (id !== COMPANY_ID) {
    res.status(400).json("Not found.");
  }

  res.status(200).json([{
    "Id": 0,
    "Author": "Alejandro Escamilla",
    "PublicUrl": "https://picsum.photos/200/300?image=0"
  }, {
    "Id": 1,
    "Author": "Alejandro Escamilla",
    "PublicUrl": "https://picsum.photos/200/300?image=1"
  }, {
    "Id": 2,
    "Author": "Alejandro Escamilla",
    "PublicUrl": "https://picsum.photos/200/300?image=2"
  }, {
    "Id": 3,
    "Author": "Alejandro Escamilla",
    "PublicUrl": "https://picsum.photos/200/300?image=3"
  }, {
    "Id": 4,
    "Author": "Alejandro Escamilla",
    "PublicUrl": "https://picsum.photos/200/300?image=4"
  }, {
    "Id": 5,
    "Author": "Alejandro Escamilla",
    "PublicUrl": "https://picsum.photos/200/300?image=5"
  }, {
    "Id": 6,
    "Author": "Alejandro Escamilla",
    "PublicUrl": "https://picsum.photos/200/300?image=6"
  }, {
    "Id": 7,
    "Author": "Alejandro Escamilla",
    "PublicUrl": "https://picsum.photos/200/300?image=7"
  }, {
    "Id": 8,
    "Author": "Alejandro Escamilla",
    "PublicUrl": "https://picsum.photos/200/300?image=8"
  }, {
    "Id": 9,
    "Author": "Alejandro Escamilla",
    "PublicUrl": "https://picsum.photos/200/300?image=9"
  }, {
    "Id": 10,
    "Author": "Paul Jarvis",
    "PublicUrl": "https://picsum.photos/200/300?image=10"
  }, {
    "Id": 11,
    "Author": "Paul Jarvis",
    "PublicUrl": "https://picsum.photos/200/300?image=11"
  }, {
    "Id": 12,
    "Author": "Paul Jarvis",
    "PublicUrl": "https://picsum.photos/200/300?image=12"
  }, {
    "Id": 13,
    "Author": "Paul Jarvis",
    "PublicUrl": "https://picsum.photos/200/300?image=13"
  }, {
    "Id": 14,
    "Author": "Paul Jarvis",
    "PublicUrl": "https://picsum.photos/200/300?image=14"
  }, {
    "Id": 15,
    "Author": "Paul Jarvis",
    "PublicUrl": "https://picsum.photos/200/300?image=15"
  }, {
    "Id": 16,
    "Author": "Paul Jarvis",
    "PublicUrl": "https://picsum.photos/200/300?image=16"
  }, {
    "Id": 17,
    "Author": "Paul Jarvis",
    "PublicUrl": "https://picsum.photos/200/300?image=17"
  }, {
    "Id": 18,
    "Author": "Paul Jarvis",
    "PublicUrl": "https://picsum.photos/200/300?image=18"
  }, {
    "Id": 19,
    "Author": "Paul Jarvis",
    "PublicUrl": "https://picsum.photos/200/300?image=19"
  }, {
    "Id": 20,
    "Author": "Aleks Dorohovich",
    "PublicUrl": "https://picsum.photos/200/300?image=20"
  }, {
    "Id": 21,
    "Author": "Alejandro Escamilla",
    "PublicUrl": "https://picsum.photos/200/300?image=21"
  }, {
    "Id": 22,
    "Author": "Alejandro Escamilla",
    "PublicUrl": "https://picsum.photos/200/300?image=22"
  }, {
    "Id": 23,
    "Author": "Alejandro Escamilla",
    "PublicUrl": "https://picsum.photos/200/300?image=23"
  }, {
    "Id": 24,
    "Author": "Alejandro Escamilla",
    "PublicUrl": "https://picsum.photos/200/300?image=24"
  }, {
    "Id": 25,
    "Author": "Alejandro Escamilla",
    "PublicUrl": "https://picsum.photos/200/300?image=25"
  }, {
    "Id": 26,
    "Author": "Vadim Sherbakov",
    "PublicUrl": "https://picsum.photos/200/300?image=26"
  }, {
    "Id": 27,
    "Author": "Yoni Kaplan-Nadel",
    "PublicUrl": "https://picsum.photos/200/300?image=27"
  }, {
    "Id": 28,
    "Author": "Jerry Adney",
    "PublicUrl": "https://picsum.photos/200/300?image=28"
  }, {
    "Id": 29,
    "Author": "Go Wild",
    "PublicUrl": "https://picsum.photos/200/300?image=29"
  }, {
    "Id": 30,
    "Author": "Shyamanta Baruah",
    "PublicUrl": "https://picsum.photos/200/300?image=30"
  }, {
    "Id": 31,
    "Author": "How-Soon Ngu",
    "PublicUrl": "https://picsum.photos/200/300?image=31"
  }, {
    "Id": 32,
    "Author": "Rodrigo Melo",
    "PublicUrl": "https://picsum.photos/200/300?image=32"
  }, {
    "Id": 33,
    "Author": "Alejandro Escamilla",
    "PublicUrl": "https://picsum.photos/200/300?image=33"
  }, {
    "Id": 34,
    "Author": "Aleks Dorohovich",
    "PublicUrl": "https://picsum.photos/200/300?image=34"
  }, {
    "Id": 35,
    "Author": "Shane Colella",
    "PublicUrl": "https://picsum.photos/200/300?image=35"
  }, {
    "Id": 36,
    "Author": "Vadim Sherbakov",
    "PublicUrl": "https://picsum.photos/200/300?image=36"
  }, {
    "Id": 37,
    "Author": "Austin Neill",
    "PublicUrl": "https://picsum.photos/200/300?image=37"
  }, {
    "Id": 38,
    "Author": "Allyson Souza",
    "PublicUrl": "https://picsum.photos/200/300?image=38"
  }, {
    "Id": 39,
    "Author": "Luke Chesser",
    "PublicUrl": "https://picsum.photos/200/300?image=39"
  }, {
    "Id": 40,
    "Author": "Ryan Mcguire",
    "PublicUrl": "https://picsum.photos/200/300?image=40"
  }]);

});

function authCheck(req, res) {
  var token = req.header("Authorization").split(' ')[1];

  if (AccessTokens.indexOf(token) === -1) {
    res.status(401).json("Unauthorized.");
  }
}
