const express = require("express");
const router = express.Router();
const csrf = require("csurf");

var session = require("express-session");

const csrfProtection = csrf();

router.use(csrfProtection);

const userController = require("../Controller/userController");

router.get("/addUserForm/", function (req, res, next) {
    res.locals.csrfToken = req.csrfToken()
    next()
},
    userController.addUserForm
);
router.post("/addUser/", userController.addUser);

router.get("/login/", function(req, res, next){
    if(session.username)
        res.redirect("/logged/");
    res.locals.session = session,
    res.locals.csrfToken = req.csrfToken()
    res.set({
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma' : 'no-cache',
        'Expires' : '0',
    })
    next()
},
userController.loginForm
);

router.get("/logged/", function(req, res, next){
    if(!session.username)
        res.redirect("/login/");
    res.locals.session = session
    res.set({
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma' : 'no-cache',
        'Expires' : '0',
    })
    next()
},
userController.loggedPage
); 

router.post("/loginCheck/", function(req, res, next){
    res.locals.session = session
    res.locals.csrfToken = req.csrfToken()
    next()
},
userController.loginCheck
);

router.get("/logout/", function(req, res, next){
    session.username = null;
    res.redirect("/login/");
});

module.exports = router;