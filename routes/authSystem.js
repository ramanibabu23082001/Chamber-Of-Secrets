const express = require("express");
const router = express.Router();
const csrf = require("csurf");

var session = require("express-session");
var i = 0;

const csrfProtection = csrf();

//router.use(csrfProtection);

const userController = require("../Controller/userController");

router.get("/addUserForm/", function (req, res, next) {
    //res.locals.csrfToken = req.csrfToken()
    next()
},
    userController.addUserForm
);
router.post("/addUser/", userController.addUser);

router.get("/login/", function (req, res, next) {
    if (session.email)
        res.redirect("/logged/");
    res.locals.session = session,
        //res.locals.csrfToken = req.csrfToken()
    res.set({
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
    })
    next()
},
    userController.loginForm
);

router.get("/logged/", function (req, res, next) {
    //console.log("hi");
    console.log(session.email);
    if (!session.email){
        res.redirect("/");
        //session.email = "hari@gmail.com";
    }
    
    res.locals.session = session
    res.set({
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
    })
    next()
},
    userController.loggedPage
);

router.post("/loginCheck/", function (req, res, next) {
    res.locals.session = session
    //res.locals.csrfToken = req.csrfToken()
    next()
},
    userController.loginCheck
);

router.get("/logout/", function (req, res, next) {
    session.email = null;
    res.redirect("/");
});

router.get("/", function (req, res, next) {
    if (session.email)
        res.redirect("/logged/");
    //res.locals.csrfToken = req.csrfToken()
    next()
},
    userController.landingPage
);

router.post("/validateAnswer/", function (req, res, next) {
    /*
    const tex = req.body.name;
    
   const jsonParsed = require("../JSON/question.json");
   if (jsonParsed[i].answer === tex) {
        res.json({ data: "1", path: jsonParsed[i + 1].question, number: jsonParsed[i].number, gif: jsonParsed[i].gif });
        i = i + 1;
    }
    else {
        console.log(jsonParsed[i].gif);
        res.json({ data: "0" });
    }
    */
   res.locals.session = session
   res.locals.text = req.body.name
   next()
},
    userController.validateAnswer
);

module.exports = router;