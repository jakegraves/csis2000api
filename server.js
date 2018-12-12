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

const songBirdArray = [{
    id: 1,
    school: "Albertus Magnus College",
    state: "CT",
    name: "Lillian Ray",
    email: "ray@albertus.edu"
  },
  {
    id: 2,
    school: "University of Connecticut",
    state: "CT",
    name: "Lynn Murphy",
    email: "murphy@uconn.edu"
  },
  {
    id: 3,
    school: "University of Hartford",
    state: "CT",
    name: "Roland Patrick",
    email: "patrick@hartford.edu"
  },
  {
    id: 4,
    school: "Husson University",
    state: "ME",
    name: "Faith Reynolds",
    email: "reynolds@husson.edu"
  },
  {
    id: 5,
    school: "University of Southern Maine",
    state: "ME",
    name: "Heidi Fields",
    email: "fields@usm.maine.edu"
  },
  {
    id: 6,
    school: "University of New England",
    state: "ME",
    name: "Roy Wallace",
    email: "wallace@une.edu"
  },
  {
    id: 7,
    school: "Boston University",
    state: "MA",
    name: "Bessie Crawford",
    email: "crawford@bu.edu"
  },
  {
    id: 8,
    school: "Harvard University",
    state: "MA",
    name: "Monica Morales",
    email: "morales@harvard.edu"
  },
  {
    id: 9,
    school: "Cambridge College",
    state: "MA",
    name: "Juanita Stanley",
    email: "stanley@cambridge.edu"
  },
  {
    id: 10,
    school: "University of New Hampshire",
    state: "NH",
    name: "Irma Chandler",
    email: "chandler@unh.edu"
  },
  {
    id: 11,
    school: "Plymouth State University",
    state: "NH",
    name: "Ralph Warner",
    email: "warner@plymouth.edu"
  },
  {
    id: 12,
    school: "Rivier University",
    state: "NH",
    name: "Pauline Johnston",
    email: "johnston@rivier.edu"
  },
  {
    id: 13,
    school: "Kean University",
    state: "NJ",
    name: "Sylvia Mcdonald	mcdonald@kean.edu"
  },
  {
    id: 14,
    school: "Montclair State University",
    state: "NJ",
    name: "Gustavo Brock",
    email: "brock@montclair.edu"
  },
  {
    id: 15,
    school: "The College of New Jersey",
    state: "NJ",
    name: "Otis Richardson",
    email: "richardson@tcnj.edu"
  },
  {
    id: 16,
    school: "City University of New York",
    state: "NY",
    name: "Joy Swanson",
    email: "swanson@cuny.edu"
  },
  {
    id: 17,
    school: "Binghamton University",
    state: "NY",
    name: "Christie Shaw",
    email: "shaw@binghamton.edu"
  },
  {
    id: 18,
    school: "Buffalo State College",
    state: "NY",
    name: "Elsie Carter",
    email: "carter@buffalostate.edu"
  },
  {
    id: 19,
    school: "Temple University",
    state: "PA",
    name: "Nadine Ross",
    email: "ross@temple.edu"
  },
  {
    id: 20,
    school: "Pennsylvania State University",
    state: "PA",
    name: "Leslie Fox",
    email: "fox@psu.edu"
  },
  {
    id: 21,
    school: "University of Pittsburgh",
    state: "PA",
    name: "Leona Duncan",
    email: "duncan@pitt.edu"
  },
  {
    id: 22,
    school: "Providence College",
    state: "RI",
    name: "Clayton Brown",
    email: "brown@providence.edu"
  },
  {
    id: 23,
    school: "Brown University",
    state: "RI",
    name: "Louise Hubbard",
    email: "hubbard@brown.edu"
  },
  {
    id: 24,
    school: "University of Rhode Island",
    state: "RI",
    name: "Mitchell Mccormick",
    email: "mccormick@uri.edu"
  },
  {
    id: 25,
    school: "Northern Vermont University",
    state: "VT",
    name: "Mamie Terry",
    email: "terry@norvt.edu"
  },
  {
    id: 26,
    school: "College of St. Joseph",
    state: "VT",
    name: "Winston Cortez",
    email: "cortez@csj.edu"
  },
  {
    id: 27,
    school: "Norwich University",
    state: "VT",
    name: "Oliver Dunn",
    email: "dunn@norwich.edu"
  },
  {
    id: 28,
    school: "University of Illinois",
    state: "IL",
    name: "Jan Flowers",
    email: "flowers@uillinois.edu"
  },
  {
    id: 29,
    school: "Chicago State University",
    state: "IL",
    name: "Andrea Gregory",
    email: "gregory@csu.edu"
  },
  {
    id: 30,
    school: "Northern Illinois University",
    state: "IL",
    name: "Becky Briggs",
    email: "briggs@niu.edu"
  },
  {
    id: 31,
    school: "Ball State University",
    state: "IN",
    name: "Judith Nelson",
    email: "nelson@bsu.edu"
  },
  {
    id: 32,
    school: "Indiana State University",
    state: "IN",
    name: "Gerald Watson",
    email: "watson@isu.edu"
  },
  {
    id: 33,
    school: "Purdue University Northwest",
    state: "IN",
    name: "Anne Reed",
    email: "reed@pnw.edu"
  },
  {
    id: 34,
    school: "Iowa State University",
    state: "IA",
    name: "Julia Thomas",
    email: "thomas@iastate.edu"
  },
  {
    id: 35,
    school: "University of Iowa",
    state: "IA",
    name: "Sandra Alexander",
    email: "alexander@uiowa.edu"
  },
  {
    id: 36,
    school: "University of Northern Iowa",
    state: "IA",
    name: "Albert Long",
    email: "long@uni.edu"
  },
  {
    id: 37,
    school: "Wichita State University",
    state: "KA",
    name: "Lisa Wright",
    email: "wright@witchita.edu"
  },
  {
    id: 38,
    school: "Kansas State University",
    state: "KA",
    name: "Emily Butler",
    email: "butler@k-state.edu"
  },
  {
    id: 39,
    school: "University of Kansas",
    state: "KA	Judy Lopez",
    email: "lopez@ku.edu"
  },
  {
    id: 40,
    school: "Kettering University",
    state: "MI	Frank Martinez",
    email: "martinez@kettering.edu"
  },
  {
    id: 41,
    school: "Central Michigan University",
    state: "MI",
    name: "Suzanna Stillwell",
    email: "stillwell@cmich.edu"
  },
  {
    id: 42,
    school: "Eastern Michigan University",
    state: "MI",
    name: "Willetta Finnegan",
    email: "finnegan@emich.edu"
  },
  {
    id: 43,
    school: "Winona State University",
    state: "MN",
    name: "Mariana Aiken",
    email: "aiken@winona.edu"
  },
  {
    id: 44,
    school: "Bemidji State University",
    state: "MN",
    name: "Neely Tyree",
    email: "tyree@bemidji.edu"
  },
  {
    id: 45,
    school: "Metropolitan State University",
    state: "MN",
    name: "Fawn Causey",
    email: "causey@metrostate.edu"
  },
  {
    id: 46,
    school: "Truman State University",
    state: "MO",
    name: "Karri Turnbull",
    email: "turnbull@truman.edu"
  },
  {
    id: 47,
    school: "University of Missouri",
    state: "MO",
    name: "Dion Osteen",
    email: "osteen@missouri.edu"
  },
  {
    id: 48,
    school: "Lincoln University",
    state: "MO",
    name: "Elma Pruitt",
    email: "pruitt@lincolnu.edu"
  },
  {
    id: 49,
    school: "Peru State College",
    state: "NE",
    name: "Leana Khan",
    email: "khan@peru.edu"
  },
  {
    id: 50,
    school: "Wayne State College",
    state: "NE",
    name: "Luanne Herring",
    email: "herring@wsc.edu"
  },
  {
    id: 51,
    school: "University of Nebraska",
    state: "NE",
    name: "Alethea Zhang",
    email: "zhang@uneb.edu"
  },
  {
    id: 52,
    school: "University of Mary",
    state: "ND",
    name: "Chiquita Connell",
    email: "connell@umary.edu"
  },
  {
    id: 53,
    school: "Bismarck State College",
    state: "ND",
    name: "Ngan Jobe",
    email: "jobe@bismarck.edu"
  },
  {
    id: 54,
    school: "Minot State University",
    state: "ND",
    name: "Troy Funk",
    email: "funk@minot.edu"
  },
  {
    id: 55,
    school: "Ohio State University",
    state: "OH",
    name: "Zane Burkholder",
    email: "burkholder@osu.edu"
  },
  {
    id: 56,
    school: "Ohio University",
    state: "OH",
    name: "Jamar Foley",
    email: "foley@ohio.edu"
  },
  {
    id: 57,
    school: "University of Cincinnati",
    state: "OH",
    name: "Lyndsay Bills",
    email: "bills@uc.edu"
  },
  {
    id: 58,
    school: "Black Hills State University",
    state: "SD",
    name: "Renea Carswell",
    email: "carswell@bhsu.edu"
  },
  {
    id: 59,
    school: "Dakota State University",
    state: "SD",
    name: "Sharen Olivas",
    email: "olivas@dsu.edu"
  },
  {
    id: 60,
    school: "University of South Dakota",
    state: "SD",
    name: "Odis Tam",
    email: "tam@usd.edu"
  },
  {
    id: 61,
    school: "University of Wisconsin",
    state: "WI",
    name: "Andrew Sullivan",
    email: "sullivan@uww.edu"
  },
  {
    id: 62,
    school: "Lakeland University",
    state: "WI",
    name: "Jimmy Poole",
    email: "poole@lakeland.edu"
  },
  {
    id: 63,
    school: "Marquette University",
    state: "WI",
    name: "Cora Barrett",
    email: "barrett@marquette.edu"
  },
  {
    id: 64,
    school: "Jacksonville State University",
    state: "AL",
    name: "Anne Hoffman",
    email: "hoffman@jsu.edu"
  },
  {
    id: 65,
    school: "Alabama State University",
    state: "AL",
    name: "Cedric Chavez",
    email: "chavez@alasu.edu"
  },
  {
    id: 66,
    school: "Auburn University",
    state: "AL",
    name: "Alejandro Farmer",
    email: "farmer@auburn.edu"
  },
  {
    id: 67,
    school: "University of Arkansas",
    state: "AK",
    name: "Gregory Fuller",
    email: "fuller@urak.edu"
  },
  {
    id: 68,
    school: "Arkansas State University",
    state: "AK",
    name: "Johnathan Mathis",
    email: "mathis@astate.edu"
  },
  {
    id: 69,
    school: "Harding University",
    state: "AK",
    name: "Enrique Jenkins",
    email: "jenkins@harding.edu"
  },
  {
    id: 70,
    school: "Delaware State University",
    state: "DE",
    name: "Misty Parsons",
    email: "parsons@desu.edu"
  },
  {
    id: 71,
    school: "University of Delaware",
    state: "DE",
    name: "Wade West",
    email: "west@udel.edu"
  },
  {
    id: 72,
    school: "Wilmington University",
    state: "DE",
    name: "Joann Douglas",
    email: "douglas@wilmu.edu"
  },
  {
    id: 73,
    school: "Palm Beach State College",
    state: "FL",
    name: "Darrell Munoz",
    email: "munoz@palmbeachstate.edu"
  },
  {
    id: 74,
    school: "Florida State University",
    state: "FL",
    name: "Guy Wong",
    email: "wong@flsu.edu"
  },
  {
    id: 75,
    school: "State College of Florida",
    state: "FL",
    name: "Devin Newton",
    email: "newton@scf.edu"
  },
  {
    id: 76,
    school: "University of North Georgia",
    state: "GA",
    name: "Gregory Cannon",
    email: "cannon@ung.edu"
  },
  {
    id: 77,
    school: "Georgia Southern University",
    state: "GA",
    name: "Beatrice Diaz",
    email: "diaz@geosu.edu"
  },
  {
    id: 78,
    school: "Albany State University",
    state: "GA",
    name: "Harold Johnston",
    email: "johnston@asurams.edu"
  },
  {
    id: 79,
    school: "University of Louisville",
    state: "KY",
    name: "Clarence Ford",
    email: "ford@lousivelle.edu"
  },
  {
    id: 80,
    school: "Kentucky State University",
    state: "KY",
    name: "Alton Pierce",
    email: "pierce@kysu.edu"
  },
  {
    id: 81,
    school: "University of Kentucky",
    state: "KY",
    name: "Ryan Harper",
    email: "harper@uky.edu"
  },
  {
    id: 82,
    school: "University of Louisiana",
    state: "LA",
    name: "Anthony Cruz",
    email: "cruz@lua.edu"
  },
  {
    id: 83,
    school: "Louisiana State University",
    state: "LA",
    name: "Kari Ortega",
    email: "ortega@lusu.edu"
  },
  {
    id: 84,
    school: "Southern University",
    state: "LA",
    name: "Tricia Houston",
    email: "houston@lasu.edu"
  },
  {
    id: 85,
    school: "Morgan State University",
    state: "MD",
    name: "Dolores Logan",
    email: "logan@morgan.edu"
  },
  {
    id: 86,
    school: "Bowie State University",
    state: "MD",
    name: "Wm Garcia",
    email: "garcia@bowie.edu"
  },
  {
    id: 87,
    school: "University of Baltimore",
    state: "MD",
    name: "Casey Hamilton",
    email: "hamilton@ubalt.edu"
  },
  {
    id: 88,
    school: "Mississippi Valley State University",
    state: "MS",
    name: "Malcolm Doyle",
    email: "doyle@mvsu.edu"
  },
  {
    id: 89,
    school: "University of Southern Mississippi",
    state: "MS",
    name: "Joanne Watkins",
    email: "watkins@usm.edu"
  },
  {
    id: 90,
    school: "University of Mississippi",
    state: "MS",
    name: "Leticia Bates",
    email: "bates@olemiss.edu"
  },
  {
    id: 91,
    school: "University of North Carolina",
    state: "NC",
    name: "Alfonso Munoz",
    email: "munoz@unca.edu"
  },
  {
    id: 92,
    school: "East Carolina University",
    state: "NC",
    name: "Violet Frazier",
    email: "frazier@ecu.edu"
  },
  {
    id: 93,
    school: "North Carolina State University",
    state: "NC",
    name: "Gene Nguyen",
    email: "nguyen@ncsu.edu"
  },
  {
    id: 94,
    school: "Cameron University",
    state: "OK",
    name: "Marion Matthews",
    email: "matthews@cameron.edu"
  },
  {
    id: 95,
    school: "University of Oklahoma",
    state: "OK",
    name: "Marguerite Baker",
    email: "baker@ou.edu"
  },
  {
    id: 96,
    school: "Oklahoma State University",
    state: "OK",
    name: "Rhonda Miles",
    email: "miles@okstate.edu"
  },
  {
    id: 97,
    school: "College of Charleston",
    state: "SC",
    name: "Betty Rowe",
    email: "rowe@cofc.edu"
  },
  {
    id: 98,
    school: "University of South Carolina",
    state: "SC",
    name: "Maurice Long",
    email: "long@usca.ed9"
  }
]

app.get("/collegerep", function (req, res) {

  res.status(200).json(songBirdArray);

});

app.get("/collegerep/:id", function (req, res) {
  let id = +req.params.id;
  console.log(id)
  let rep = songBirdArray.filter(item => {
    return item.id === id;
  })[0];

  if (rep) {
    res.status(200).json(rep);
  } else {
    res.status(404).json({
      message: "Id not found."
    });

  }
});
