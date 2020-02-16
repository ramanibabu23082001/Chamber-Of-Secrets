const User = require("../models/user");

exports.addUserForm = (req, res, next) => {
    res.render('addUserForm', {
        csrfToken: res.locals.csrfToken
    });
};

exports.addUser = (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    const name = req.body.name;

    const user = new User({username: username, password: password, name: name});
    user.save()
    .then(
        console.log("User created successfully!"),
        res.redirect("/addUserForm/")
    )
    .catch(err => {
        console.log(err);
    });
};

exports.loginForm = (req, res, next) => {
    if(res.locals.session.username)
        res.redirect("/logged/");
    res.render("loginForm", {
        message: "",
        csrfToken: res.locals.csrfToken
    });
};

exports.loginCheck = (req, res, next) => {
    var credentials = {username: req.body.username, password: req.body.password};
    User.find(credentials)
    .then(user => {
        console.log(user);
        if(JSON.stringify(user) !== JSON.stringify([])){
            res.locals.session.username = req.body.username;
            res.redirect("/logged/");
        }
        else{
            res.redirect("/login/");
        }
    })
    .catch(err => {
        console.log(err);
    });
};

exports.loggedPage = (req, res, next) => {
    User.find({username: res.locals.session.username})
    .then(user => {
        res.render("logged", {
            loggedUser: user
        });
    })
    .catch(err => {
        console.log(err);
    });
};